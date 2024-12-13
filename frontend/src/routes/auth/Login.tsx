import { LoginForm } from 'components/forms/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from 'config/paths';

export const Login = () => {
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
			<LoginForm onSuccess={onSuccess} />
		</>
	);
};
