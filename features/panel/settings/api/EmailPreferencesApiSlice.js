import { instance } from '@/lib/instance';

export const getEmailPreferences = async () => {
  try {
    const response = await instance.get('notifications/email-preferences/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmailPreferences = async (preferences) => {
  try {
    const response = await instance.post(
      'notifications/email-preferences/update_preferences/',
      preferences
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableAllNotifications = async () => {
  try {
    const response = await instance.post('notifications/email-preferences/enable_all/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disableAllNotifications = async () => {
  try {
    const response = await instance.post('notifications/email-preferences/disable_all/');
    return response.data;
  } catch (error) {
    throw error;
  }
};
