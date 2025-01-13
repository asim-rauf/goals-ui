/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

type FormData = {
  email: string;
  password: string;
  code: string;
};

const ForgotPasswordPage: NextPage = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push('/');
    return null;
  }

  const create = async (data: FormData) => {
    const { email } = data;

    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError('');
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'Something went wrong');
    }
  };

  const resetPassword = async (data: FormData) => {
    const { password, code } = data;

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result?.status === 'needs_second_factor') {
        setSecondFactor(true);
        setError('');
      } else if (result?.status === 'complete') {
        setActive({ session: result.createdSessionId });
        setError('');
      }
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'Something went wrong');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-xl'>
        <Card className='rounded-md p-[1rem]'>
          <CardContent>
            <h1 className='text-2xl font-bold mb-6 text-center'>
              Forgot Password?
            </h1>
            <form
              className='flex flex-col gap-4'
              onSubmit={
                successfulCreation
                  ? handleSubmit(resetPassword)
                  : handleSubmit(create)
              }>
              {!successfulCreation && (
                <>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    type='email'
                    placeholder='e.g john@doe.com'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <Alert variant='destructive'>
                      <AlertDescription>
                        {errors.email.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button>Send password reset code</Button>
                </>
              )}
              {successfulCreation && (
                <>
                  <Label htmlFor='password'>Enter your new password</Label>
                  <Input
                    type='password'
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                      },
                    })}
                  />
                  {errors.password && (
                    <Alert variant='destructive'>
                      <AlertDescription>
                        {errors.password.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Label htmlFor='code'>
                    Enter the password reset code that was sent to your email
                  </Label>
                  <Input
                    type='text'
                    {...register('code', {
                      required: 'Reset code is required',
                    })}
                  />
                  {errors.code && (
                    <Alert variant='destructive'>
                      <AlertDescription>{errors.code.message}</AlertDescription>
                    </Alert>
                  )}

                  <Button>Reset</Button>
                </>
              )}
              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {secondFactor && (
                <p className='text-yellow-500'>
                  2FA is required, but this UI does not handle that
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
