import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ModelViewer } from 'components/ModelViewer';

export const Index = () => {
	const { handleSubmit, control, reset } = useForm<any>({});
	const onSubmit: SubmitHandler<any> = (data) => console.log(data);

	return (
		<Container>
			<ModelViewer />
		</Container>
	);
};
