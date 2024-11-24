import { apiUrl } from '../env'
import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/user/profile`;

export const userServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        getUserInfo: () => request.get(`${baseUrl}/user-info`),
    }
}