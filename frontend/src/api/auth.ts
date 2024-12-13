import { api } from 'config/axios';
import { AuthResponse, User, RegisterInput, LoginInput } from 'types/api';

export const getUser = async (): Promise<User> => {
	const response = (await api.get('/auth/me')) as { data: User };
	return response.data;
};

export const registerWithEmailAndPassword = (data: RegisterInput): Promise<AuthResponse> => {
	return api.post('/auth/signup', data);
};

export const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
	return api.post('/auth/login', data);
};
