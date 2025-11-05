import { useMutation } from "@tanstack/react-query";
import { disconnectOrcid } from "../../api/OrcidApiSlice";

export const useDisconnectOrcid = () => {
  return useMutation({
    mutationFn: () => disconnectOrcid(),
  });
};
