import API from '../api/axiosConfig';

export const registerUser = async (name, email, password) => {
  try {
    const response = await API.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
};
