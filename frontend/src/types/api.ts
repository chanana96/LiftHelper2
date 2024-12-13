import { z } from 'zod';

const registerInputSchema = z.object({
	Email: z.string().min(1, 'Required'),
	Password: z.string().min(8, 'Required'),
	ConfirmPassword: z.string().min(8, 'Required'),
	AllowEmails: z.boolean(),
});
const loginInputSchema = z.object({
	Email: z.string().min(1, 'Required').email('Invalid email'),
	Password: z.string().min(5, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;

export type User = {};

export type AuthResponse = {
	Token: string;
	User: User;
};

//need to autogenerate types from backend here
