import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Typography,
	Container,
	Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignup } from 'lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupInputSchema } from 'types/api';
import { z } from 'zod';
import { useFormAlert } from 'hooks/useFormAlert';
import { FormAlert } from 'components/forms/Alert';

type Inputs = z.infer<typeof signupInputSchema>;

export const SignupForm = ({ onSuccess, onError }) => {
	const form = useForm<Inputs>({
		resolver: zodResolver(signupInputSchema),
	});

	const { register, handleSubmit, setError } = form;

	const formAlert = useFormAlert(form);

	const registering = useSignup({ onSuccess, onError: onError(setError) });
	const submitHandler: SubmitHandler<Inputs> = (inputValues) => {
		registering.mutate(inputValues);
	};
	return (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={handleSubmit(submitHandler)} className='mt-28'>
					<FormAlert
						show={formAlert.hasErrors}
						message={formAlert.errorMessage}
						onClose={formAlert.handleClearErrors}
					/>
					<Box className='shadow-md p-4 bg-form-bg text-primary'>
						<div className='flex-6'>
							<Typography component='h1' variant='h5' className='pb-2'>
								SIGN UP
							</Typography>

							<Grid
								container
								spacing={2}
								className='flex items-center justify-center mb-2'>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('Email')}
										label='Email'
										variant='outlined'
										fullWidth
										required
										autoComplete='email'
										type='email'
										className='w-full'
									/>
								</Grid>

								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('Password')}
										label='Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
										className='w-full'
									/>
								</Grid>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('ConfirmPassword')}
										label='Confirm Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
										className='w-full'
									/>
								</Grid>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<FormControlLabel
										control={
											<Checkbox
												{...register('AllowEmails', {
													setValueAs: (value) => value === true,
												})}
												color='primary'
											/>
										}
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid>

								<Grid className='w-full md:w-full xs:w-2/3'>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										className='mt-3 mb-2'>
										Sign Up
									</Button>
								</Grid>
							</Grid>
							<Grid container justifyContent='center'>
								<Grid>
									<Link to='/auth/login'>Already have an account? Sign in</Link>
								</Grid>
							</Grid>
						</div>
					</Box>
				</form>
			</Container>
		</>
	);
};
