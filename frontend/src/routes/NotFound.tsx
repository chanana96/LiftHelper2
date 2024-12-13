import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<div style={{}}>
			<h1>404 not found?!</h1>
			<Link to={'/'} replace>
				Home
			</Link>
		</div>
	);
};
