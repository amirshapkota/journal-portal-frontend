import { instance } from "@/lib/instance";

export const getOrcidUrl = async () => {
  try {
    const response = await instance.get("integrations/orcid/authorize/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrcidStatus = async () => {
  try {
    const response = await instance.get("integrations/orcid/status/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disconnectOrcid = async () => {
  try {
    const response = await instance.post("integrations/orcid/disconnect/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
