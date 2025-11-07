import { instance } from "@/lib/instance";

export const patchProfile = async ({ id, data }) => {
  const response = await instance.patch(`profiles/${id}/`, data);
  return response.data;
};
