import { instance } from "@/lib/instance";

export const checkVerificationStatus = async () => {
  try {
    const response = await instance.get(`auth/me/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
