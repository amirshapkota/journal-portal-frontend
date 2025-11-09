import { instance } from "@/lib/instance";

export const getAllUsers = async () => {
  try {
    const response = await instance.get("users/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PATCH update user
export const updateUser = async (userId, data) => {
  try {
    const response = await instance.patch(`users/${userId}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
