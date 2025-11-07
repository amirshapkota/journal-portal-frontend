import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmailPreferences } from "../../api/EmailPreferencesApiSlice";
import { toast } from "sonner";

export const useUpdateEmailPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences) => updateEmailPreferences(preferences),
    onSuccess: () => {
      queryClient.invalidateQueries(["email-preferences"]);
      toast.success("Email preferences updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update email preferences"
      );
    },
  });
};
