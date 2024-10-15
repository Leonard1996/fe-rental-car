import apiClient from '../client/http-client';

export class UserService {
  static login = async (data) => {
    try {
      const res = await apiClient.post('/auth/register', data);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };

  static getConfirmationCode = async (data) => {
    try {
      const res = await apiClient.post('/auth/resend-code', data);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };

  static confirmAccount = async (data) => {
    try {
      const res = await apiClient.post('/auth/confirm', data);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };
}