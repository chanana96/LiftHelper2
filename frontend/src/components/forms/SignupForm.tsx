import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
				<form onSubmit={handleSubmit(submitHandler)} style={{ marginTop: '5vh' }}>
					<FormAlert
						show={formAlert.hasErrors}
						message={formAlert.errorMessage}
						onClose={formAlert.handleClearErrors}
					/>
					<Box
						sx={{
							boxShadow: 3,
							padding: 2,
							bgcolor: '#656565',
							color: 'text.primary',
						}}>
						<div style={{ flex: '6' }}>
							<Typography component='h1' variant='h5' sx={{ mb: '20' }}>
								SIGN UP
							</Typography>

							<Grid
								container
								spacing={2}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										{...register('Email')}
										label='Email'
										variant='outlined'
										fullWidth
										required
										autoComplete='email'
										type='email'
									/>
								</Grid>

								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										{...register('Password')}
										label='Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
									/>
								</Grid>
								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										{...register('ConfirmPassword')}
										label='Confirm Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
									/>
								</Grid>
								<Grid size={{ md: 12, xs: 8 }}>
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

								<Grid size={{ md: 12, xs: 8 }}>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}>
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
