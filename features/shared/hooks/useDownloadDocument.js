import { instance } from "@/lib/instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Download a document file
 * @param {string} url - The download URL
 * @param {string} fileName - The file name to save as
 */
const downloadDocument = async ({ url, fileName }) => {
  const response = await instance.get(url, {
    responseType: "blob",
  });

  // Create download link
  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);

  return blob;
};

export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: downloadDocument,
    onSuccess: (_, variables) => {
      toast.success(`${variables.fileName} downloaded successfully`);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to download document");
    },
  });
};
