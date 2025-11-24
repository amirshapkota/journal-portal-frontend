import { instance } from "@/lib/instance";
import { useQuery } from "@tanstack/react-query";

const fetchDocumentVersions = async (documentId) => {
  const response = await instance.get(
    `submissions/documents/${documentId}/versions/`
  );
  return response.data;
};

export const useGetDocumentVersions = (documentId, open = true) => {
  return useQuery({
    queryKey: ["document-versions", documentId, open],
    queryFn: () => fetchDocumentVersions(documentId),
    enabled: open && !!documentId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
