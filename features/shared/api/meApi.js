import { instance } from '@/lib/instance';

export const getMe = async () => {
  const response = await instance.get('auth/me/');
  return response.data;
};
