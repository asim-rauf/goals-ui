/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import loginImage from '@/images/login-right.jpg';
import Image from 'next/image';

interface SignInFormInputs {
  email: string;
  password: string;
}

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  if (!isLoaded) {
    return null;
  }

  const onSubmit = async (data: SignInFormInputs) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (err: any) {
      console.error('error', err.errors[0].message);
      setError(err.errors[0].message);
    }
  };

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className={cn('flex flex-col gap-6')}>
          <Card className='overflow-hidden'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              <div className='relative hidden bg-muted md:block'>
                <Image
                  src={loginImage}
                  alt='Image'
                  className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
                />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8'>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>Welcome back</h1>
                    <p className='text-balance text-muted-foreground'>
                      Login to your Acme Inc account
                    </p>
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='m@example.com'
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                      <Alert variant='destructive'>
                        <AlertDescription>
                          {errors.email.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center'>
                      <Label htmlFor='password'>Password</Label>
                      <a
                        href='#'
                        className='ml-auto text-sm underline-offset-2 hover:underline'>
                        Forgot your password?
                      </a>
                    </div>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        {...register('password', {
                          required: 'Password is required',
                        })}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-2 top-1/2 -translate-y-1/2'>
                        {showPassword ? (
                          <EyeOff className='h-4 w-4 text-gray-500' />
                        ) : (
                          <Eye className='h-4 w-4 text-gray-500' />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <Alert variant='destructive'>
                        <AlertDescription>
                          {errors.password.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div id='clerk-captcha' />
                  {error && (
                    <Alert variant='destructive'>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type='submit' className='w-full'>
                    <LogIn />
                    Login
                  </Button>

                  <div className='text-center text-sm'>
                    Don&apos;t have an account?{' '}
                    <Link
                      href='/signup'
                      className='font-medium text-primary hover:underline underline underline-offset-4'>
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
            By clicking continue, you agree to our{' '}
            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
