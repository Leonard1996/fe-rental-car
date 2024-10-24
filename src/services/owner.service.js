import apiClient from '../client/http-client';

export class OwnerSerivce {
  static getReservationsByCompany = async (data, companyId) => {
    try {
      const res = await apiClient.post(`/companies/${companyId}/reservations`, data);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };
}
