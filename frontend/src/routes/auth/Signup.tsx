import { SignupForm } from 'components/forms/SignupForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from 'config/paths';

export const Signup = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const onSuccess = () => {
		navigate(`${redirectTo ? `${redirectTo}` : paths.app.dashboard.path}`, {
			replace: true,
		});
	};
	const onError = (setError) => (errorMessage: string) => {
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
