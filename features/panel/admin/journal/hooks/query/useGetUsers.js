import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/journalsApi";

export const useGetUsers = (options = {}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
