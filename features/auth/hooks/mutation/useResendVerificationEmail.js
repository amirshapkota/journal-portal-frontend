import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../../api/passwordApi";
import { toast } from "sonner";

export const useResendVerificationEmail = (enabled) => {
  return useMutation({
    mutationFn: resendVerificationEmail,
    enabled: enabled,
    onSuccess: (data) => {
      toast.success("Verification email sent successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to send verification email";
      toast.error(errorMessage);
    },
  });
};
