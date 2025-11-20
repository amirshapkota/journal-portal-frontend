"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Reusable Confirmation Popup Component with Input Field
 *
 * A modal dialog for confirmations that require user input (e.g., change summary, reason, notes).
 * Supports async operations with loading states and auto-close on success.
 *
 * @param {Object} props - Component props
 * @param {string} [props.title="Confirm Action"] - Dialog title
 * @param {string} [props.description="Please provide details below."] - Dialog description/message
 * @param {React.ReactNode} [props.icon] - Optional icon to display above title
 * @param {string} [props.inputLabel="Details"] - Label for input field
 * @param {string} [props.inputPlaceholder="Enter details..."] - Placeholder for input field
 * @param {string} [props.cancelText="Cancel"] - Text for cancel button
 * @param {string} [props.confirmText="Confirm"] - Text for confirm button
 * @param {Function} props.onConfirm - Callback function when confirm is clicked (receives input value)
 * @param {boolean} [props.isPending=false] - Loading state for async operations
 * @param {boolean} [props.isSuccess=false] - Success state to auto-close dialog
 * @param {Function} props.onOpenChange - Callback to control dialog open/close state
 * @param {boolean} props.open - Controls dialog visibility
 * @param {('danger'|'primary'|'warning')} [props.variant='primary'] - Button variant style
 * @param {boolean} [props.autoClose=true] - Whether to auto-close on success
 * @param {string} [props.loadingText="Processing..."] - Text to display during loading state
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {('input'|'textarea')} [props.inputType='textarea'] - Type of input field
 *
 * @returns {React.ReactElement} Confirmation dialog component with input
 *
 * @example
 * <ConfirmationInputPopup
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Submit for Review"
 *   description="Please provide a summary of changes made to the document."
 *   inputLabel="Change Summary"
 *   inputPlaceholder="Describe your changes..."
 *   confirmText="Submit"
 *   variant="primary"
 *   required={true}
 *   onConfirm={(value) => handleSubmit(value)}
 *   isPending={isSubmitting}
 *   isSuccess={submitSuccess}
 * />
 */
const ConfirmationInputPopup = ({
  title = "Confirm Action",
  description = "Please provide details below.",
  icon,
  inputLabel = "Details",
  inputPlaceholder = "Enter details...",
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  isPending = false,
  isSuccess = false,
  onOpenChange,
  open,
  variant = "primary",
  autoClose = true,
  loadingText = "Processing...",
  required = false,
  inputType = "textarea",
}) => {
  const [inputValue, setInputValue] = useState("");

  /**
   * Auto-close dialog when operation succeeds and reset input
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
   * Reset input when dialog closes
   */
  useEffect(() => {
    if (!open) {
      // Use setTimeout to avoid calling setState during render
      const timer = setTimeout(() => {
        setInputValue("");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  /**
   * Get button styles based on variant
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
        return `${baseStyles} bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`;
    }
  };

  const handleConfirm = () => {
    if (required && !inputValue.trim()) {
      return;
    }
    onConfirm(inputValue);
  };

  const isConfirmDisabled =
    isPending || isSuccess || (required && !inputValue.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card flex flex-col gap-2 max-w-md"
      >
        {/* Header with icon and title */}
        <div className="flex flex-col items-center gap-2">
          {icon && <div className="shrink-0">{icon}</div>}
          <DialogTitle className="text-lg font-semibold leading-6">
            {title}
          </DialogTitle>
        </div>

        {/* Description */}
        <DialogDescription className="text-sm text-center leading-5">
          {description}
        </DialogDescription>

        {/* Input Field */}
        <div className="space-y-2 mt-2">
          <Label htmlFor="confirmation-input" className="text-sm font-medium">
            {inputLabel}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {inputType === "textarea" ? (
            <Textarea
              id="confirmation-input"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isPending || isSuccess}
              className="min-h-[100px]"
              required={required}
            />
          ) : (
            <input
              id="confirmation-input"
              type="text"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isPending || isSuccess}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required={required}
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-4">
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
            disabled={isConfirmDisabled}
            onClick={handleConfirm}
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

export default ConfirmationInputPopup;
