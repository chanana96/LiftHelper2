import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1>404 not found?!</h1>
			<Link to={'/'} replace>
				Home
			</Link>
		</div>
	);
};
