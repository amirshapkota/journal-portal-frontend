// DELETE user
export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`users/${userId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
import { instance } from '@/lib/instance';

export const getAllUsers = async (userRole = '', params = {}) => {
  try {
    const response = await instance.get(`users/?role=${userRole}`, { params });
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
