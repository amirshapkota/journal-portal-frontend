"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import {
  RoleBasedRoute,
  sidebarConfig,
  UnifiedAppbar,
  UnifiedSidebar,
  useCurrentRole,
} from "@/features";
import { useSelector } from "react-redux";

export default function PanelLayout({ children }) {
  const userData = useSelector((state) => state.auth?.userData);
  const { setCurrentRole, userRoles, currentRole } = useCurrentRole();

  // Get the primary role (first role in the array)
  const userName = userData
    ? `${userData.first_name || ""} ${userData.last_name || ""}`.trim() ||
      "User"
    : "User";

  // Get menu items for the current role
  const menuItems = sidebarConfig[currentRole] || sidebarConfig.READER;

  // Allowed roles - user can access if they have any role
  const allowedRoles = ["READER", "AUTHOR", "REVIEWER", "EDITOR", "ADMIN"];

  return (
    <RoleBasedRoute allowedRoles={allowedRoles}>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background">
          <UnifiedSidebar menuItems={menuItems} />
          <div className="flex-1 pt-3 flex flex-col  px-2">
            <UnifiedAppbar
              userRole={currentRole}
              userName={userName}
              roles={userRoles}
              userDetails={userData}
              setNewRole={setCurrentRole}
            />
            <main className="flex-1 p-5 px-0">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </RoleBasedRoute>
  );
}
