import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from 'lib/auth';

type Inputs = {
	Email: string;
	Password: string;
};

export const LoginForm = ({ onSuccess }) => {
	const registering = useLogin({ onSuccess });
	const submitHandler: SubmitHandler<Inputs> = (inputValues) => {
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
								LOG IN
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
										autoFocus
										autoComplete='username'
										type='text'
									/>
								</Grid>

								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										{...register('Password', { required: true, minLength: 8 })}
										label='Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='password'
										type='password'
									/>
								</Grid>

								<Grid size={{ md: 12, xs: 8 }}>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}>
										Log in
									</Button>
								</Grid>
							</Grid>
							<Grid container justifyContent='center'>
								<Grid>
									<Link to='/auth/signup'>Don't have an account? Sign up</Link>
								</Grid>
							</Grid>
						</div>
					</Box>
				</form>
			</Container>
		</>
	);
};
