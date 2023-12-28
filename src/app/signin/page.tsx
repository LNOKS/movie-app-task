'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/base/Button/Button';
import { Checkbox } from '@/components/base/Checkbox/Checkbox';
import { Input } from '@/components/base/Input/Input';

import styles from './SignIn.module.scss';

enum SignInFormFields {
	email = 'email',
	password = 'password',
}

const signInValidationSchema = z.object({
	[SignInFormFields.email]: z.string().email(),
	[SignInFormFields.password]: z.string().min(6),
});

type SignInFormValues = z.infer<typeof signInValidationSchema>;

export default function Signin() {
	const router = useRouter();
	const signInForm = useForm<SignInFormValues>({
		resolver: zodResolver(signInValidationSchema),
	});

	const onSubmit = async (formData: SignInFormValues) => {
		const user = await signIn('credentials', {
			password: formData[SignInFormFields.password],
			email: formData[SignInFormFields.email],
			redirect: false,
		});
		if (user?.ok) {
			router.push('/');
		} else {
			signInForm.setError('email', {
				message: 'Invalid email or password',
			});
			signInForm.setError('password', {
				message: 'Invalid email or password',
			});
		}
	};

	return (
		<main className={styles.container}>
			<h1 className={styles.signIn}>Sign In</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					signInForm.handleSubmit(onSubmit)();
				}}
				className={styles.form}
			>
				<Controller
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<div style={{ width: 300 }}>
							<Input
								value={value}
								onChange={onChange}
								errorMessage={error?.message}
								placeholder="Email"
								type="email"
							/>
						</div>
					)}
					control={signInForm.control}
					name={SignInFormFields.email}
				/>
				<Controller
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<div style={{ width: 300 }}>
							<Input
								value={value}
								onChange={onChange}
								errorMessage={error?.message}
								placeholder="Passsword"
								type="password"
							/>
						</div>
					)}
					control={signInForm.control}
					name={SignInFormFields.password}
				/>

				<div className={styles.rememberMeContainer}>
					<Checkbox /> <p> Remember me</p>
				</div>
				<Button variant="submit">Login</Button>
			</form>
		</main>
	);
}
