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

	return (
		<>
			<SignupForm onSuccess={onSuccess} />
		</>
	);
};
