import * as React from 'react';
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

type Inputs = {
	Email: string;
	Password: string;
	ConfirmPassword: string;
	AllowEmails: boolean;
};

export const SignupForm = ({ onSuccess }) => {
	const registering = useSignup({ onSuccess });
	const submitHandler: SubmitHandler<Inputs> = (inputValues) => {
		console.log(inputValues);
		registering.mutate(inputValues);
	};
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	return (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={handleSubmit(submitHandler)} style={{ marginTop: '5vh' }}>
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
										{...register('Email', { required: true })}
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
										{...register('Password', { required: true, minLength: 8 })}
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
										{...register('ConfirmPassword', {
											required: true,
											minLength: 8,
										})}
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
