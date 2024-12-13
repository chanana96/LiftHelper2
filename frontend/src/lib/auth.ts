import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from 'config/axios';
import { AuthResponse, User } from 'types/api';

const userQueryKey = ['user'];
const registerInputSchema = z.object({
	email: z.string().min(1, 'Required'),
	password: z.string().min(8, 'Required'),
	confirm_password: z.string().min(8, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const getUser = async (): Promise<User> => {
	const response = (await api.get('/auth/me')) as { data: User };
	return response.data;
};

export const getUserQueryOptions = () => {
	return queryOptions({
		queryKey: userQueryKey,
		queryFn: getUser,
	});
};

export const useSignup = ({ onSuccess }: { onSuccess?: () => void }) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: registerWithEmailAndPassword,
		onSuccess: (data) => {
			queryClient.setQueryData(userQueryKey, data.user);
			onSuccess?.();
		},
	});
};

const registerWithEmailAndPassword = (data: RegisterInput): Promise<AuthResponse> => {
	return api.post('/auth/signup', data);
};
