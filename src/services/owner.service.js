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

  static updateReservation = async (data, companyId, reservationId) => {
    try {
      const res = await apiClient.patch(`/companies/${companyId}/reservations/${reservationId}`, data);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };

  static getCarReservationOptions = async (companyId, reservationId) => {
    try {
      const res = await apiClient.get(`/companies/${companyId}/reservations/${reservationId}/options`);
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  };
}
