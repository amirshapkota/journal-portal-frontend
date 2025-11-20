import { useMutation } from "@tanstack/react-query";
import { saveSuperdocDocument } from "../../api/superDocApi";
import { toast } from "sonner";

/**
 * Hook to save SuperDoc document
 */
export const useSaveSuperdocDocument = (options) => {
  return useMutation({
    mutationFn: ({ documentId, payload }) =>
      saveSuperdocDocument(documentId, payload),
    onSuccess: () => {
      toast.success("Document saved successfully");
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error) => {
      const message =
        error?.message ||
        error?.response?.data?.detail ||
        "Failed to save document";
      toast.error(message);
      if (options?.onError) {
        options.onError(error);
      }
    },
    ...options,
  });
};
