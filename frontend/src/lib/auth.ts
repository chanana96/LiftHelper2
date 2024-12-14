import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, registerWithEmailAndPassword, loginWithEmailAndPassword } from 'api/auth';

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
	return queryOptions({
		queryKey: userQueryKey,
		queryFn: getUser,
	});
};

export const useSignup = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (errorMessage: string) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: registerWithEmailAndPassword,
		onSuccess: (data) => {
			queryClient.setQueryData(userQueryKey, data.User);
			onSuccess?.();
		},
		onError: (error) => {
			onError(error.message);
		},
	});
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: loginWithEmailAndPassword,
		onSuccess: (data) => {
			queryClient.setQueryData(userQueryKey, data.User);
			onSuccess?.();
		},
	});
};
