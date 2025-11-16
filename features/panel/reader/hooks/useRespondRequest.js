import { useMutation } from "@tanstack/react-query";
import { respondToInfoRequest } from "../api/RespondToInfoRequestApi";
import { toast } from "sonner";

export const useRespondRequest = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => respondToInfoRequest(id, data),
    onSuccess: () => {
      toast.success("Response submitted successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit response"
      );
    },
  });
};
