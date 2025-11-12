"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Reusable Confirmation Popup Component
 *
 * A universal modal dialog for confirmations like logout, delete, or any action requiring user confirmation.
 * Supports async operations with loading states and auto-close on success.
 *
 * @param {Object} props - Component props
 * @param {string} [props.title="Confirm Action"] - Dialog title
 * @param {string} [props.description="Are you sure you want to proceed?"] - Dialog description/message
 * @param {React.ReactNode} [props.icon] - Optional icon to display above title
 * @param {string} [props.cancelText="Cancel"] - Text for cancel button
 * @param {string} [props.confirmText="Confirm"] - Text for confirm button
 * @param {Function} props.onConfirm - Callback function when confirm is clicked
 * @param {boolean} [props.isPending=false] - Loading state for async operations
 * @param {boolean} [props.isSuccess=false] - Success state to auto-close dialog
 * @param {Function} props.onOpenChange - Callback to control dialog open/close state
 * @param {boolean} props.open - Controls dialog visibility
 * @param {('danger'|'primary'|'warning')} [props.variant='danger'] - Button variant style
 * @param {boolean} [props.autoClose=true] - Whether to auto-close on success
 * @param {string} [props.loadingText="Processing..."] - Text to display during loading state
 * @param {React.ReactNode} [props.triggerButton] - Optional trigger button element
 *
 * @returns {React.ReactElement} Confirmation dialog component
 *
 * @example
 * // Logout confirmation
 * <ConfirmationPopup
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Logout"
 *   description="Are you sure you want to logout?"
 *   confirmText="Logout"
 *   variant="danger"
 *   onConfirm={handleLogout}
 *   isPending={isLoggingOut}
 *   isSuccess={logoutSuccess}
 * />
 *
 * @example
 * // Delete confirmation
 * <ConfirmationPopup
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Delete Item"
 *   description="This action cannot be undone."
 *   confirmText="Delete"
 *   variant="danger"
 *   onConfirm={handleDelete}
 *   isPending={isDeleting}
 * />
 */
const ConfirmationPopup = ({
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  icon,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  isPending = false,
  isSuccess = false,
  onOpenChange,
  open,
  variant = "danger",
  autoClose = true,
  loadingText = "Processing...",
  triggerButton,
}) => {
  /**
   * Auto-close dialog when operation succeeds
   */
  useEffect(() => {
    if (isSuccess && autoClose) {
      const timer = setTimeout(() => {
        onOpenChange?.(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onOpenChange, autoClose]);

  /**
   * Get button styles based on variant
   *
   * @returns {string} CSS classes for confirm button
   */
  const getConfirmButtonStyles = () => {
    const baseStyles =
      "rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

    switch (variant) {
      case "danger":
        return `${baseStyles} bg-red-500 hover:bg-red-600`;
      case "primary":
        return `${baseStyles} bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`;
      case "warning":
        return `${baseStyles} bg-yellow-600 hover:bg-yellow-700`;
      default:
        return `${baseStyles} bg-red-500 hover:bg-red-600`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="bg-card flex flex-col items-center gap-2"
      >
        {/* Header with icon and title */}
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="flex items-center">
          <DialogTitle className="text-lg font-semibold leading-6">
            {title}
          </DialogTitle>
        </div>

        {/* Description */}
        <DialogDescription className="mb-2 text-sm text-center leading-5 max-w-[80%]">
          {description}
        </DialogDescription>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => onOpenChange?.(false)}
            type="button"
            variant="outline"
            className="px-4 py-2 rounded-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isPending || isSuccess}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            className={getConfirmButtonStyles()}
            disabled={isPending || isSuccess}
            onClick={onConfirm}
          >
            {isPending ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                {loadingText}
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationPopup;
