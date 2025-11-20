"use client";

/**
 * useCurrentRole Hook
 * @module hooks/useCurrentRole
 *
 * A universal hook to manage user's current role based on pathname and localStorage.
 * Automatically detects role from URL and persists user's role selection.
 */

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const VALID_ROLES = ["READER", "AUTHOR", "REVIEWER", "EDITOR", "ADMIN"];
const ROLE_STORAGE_KEY = "currentRole";

/**
 * Custom hook to manage current user role
 *
 * @returns {Object} Role management object
 * @returns {string} currentRole - The current active role
 * @returns {Function} setCurrentRole - Function to manually set the role
 * @returns {Array<string>} userRoles - All roles the user has
 *
 * @example
 * const { currentRole, setCurrentRole, userRoles } = useCurrentRole();
 *
 * // Use in components
 * <button onClick={() => setCurrentRole('AUTHOR')}>Switch to Author</button>
 * <div>Current Role: {currentRole}</div>
 */
export function useCurrentRole() {
  const pathname = usePathname();
  const userData = useSelector((state) => state.auth?.userData);
  const userRoles = useMemo(() => userData?.roles || [], [userData]);
  const queryClient = useQueryClient();

  /**
   * Derive role from pathname, localStorage, or first user role
   * This derived value is the source of truth
   */
  const currentRole = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const routeRole = pathSegments[0]?.toUpperCase();

    if (VALID_ROLES.includes(routeRole) && userRoles.includes(routeRole)) {
      if (typeof window !== "undefined") {
        const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
        if (savedRole !== routeRole) {
          localStorage.setItem(ROLE_STORAGE_KEY, routeRole);
        }
      }
      return routeRole;
    }

    // 2. Try to get from localStorage
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
      if (savedRole && userRoles.includes(savedRole)) {
        return savedRole;
      }
    }

    // 3. Fallback to first user role
    return userRoles[0] || "READER";
  }, [pathname, userRoles]);

  const [manualRole, setManualRole] = useState(null);

  /**
   * Custom setter that updates localStorage and manual override
   * Clears React Query cache when role changes to prevent stale data
   * Manual role takes precedence over derived role
   */
  const setCurrentRole = (newRole) => {
    if (VALID_ROLES.includes(newRole) && userRoles.includes(newRole)) {
      // Only clear cache if role is actually changing
      if (newRole !== activeRole) {
        // Clear all cached queries when switching roles
        queryClient.clear();
      }

      setManualRole(newRole);
      if (typeof window !== "undefined") {
        localStorage.setItem(ROLE_STORAGE_KEY, newRole);
      }
    } else {
      console.warn(`Invalid role: ${newRole}. User doesn't have this role.`);
    }
  }; // Return manual role if set, otherwise use derived role
  const activeRole = manualRole || currentRole;

  return {
    currentRole: activeRole,
    setCurrentRole,
    userRoles,
  };
}

/**
 * Clear stored role (useful for logout)
 */
export function clearStoredRole() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }
}
