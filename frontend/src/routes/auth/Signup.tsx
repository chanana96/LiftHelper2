import { SignupForm } from 'components/forms/SignupForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from 'config/paths';
import type { UseFormSetError } from 'react-hook-form';

export const Signup = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const onSuccess = () => {
		navigate(`${redirectTo ? `${redirectTo}` : '/'}`, {
			replace: true,
		});
	};
	const onError =
		<T,>(setError: UseFormSetError<T>) =>
		(errorMessage: string) => {
			setError('root', {
				type: 'custom',
				message: errorMessage,
			});
		};
	return (
		<>
			<SignupForm onSuccess={onSuccess} onError={onError} />
		</>
	);
};
