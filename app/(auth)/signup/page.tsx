/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BadgeCheck, Eye, EyeOff, UserPlus } from 'lucide-react';
import loginImage from '@/images/login-right.jpg';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      setError('');
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== 'complete') {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10'>
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
              <form
                onSubmit={!pendingVerification ? submit : onPressVerify}
                className='p-6 md:p-8'>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>
                      {pendingVerification
                        ? 'Verify Your Email'
                        : 'Create an Account'}
                    </h1>
                    <p className='text-balance text-muted-foreground'>
                      {pendingVerification
                        ? 'Enter the code sent to your email to verify your account'
                        : 'Sign up for an Acme Inc account'}
                    </p>
                  </div>
                  {!pendingVerification ? (
                    <>
                      <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder='m@example.com'
                          required
                        />
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <div className='relative'>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='grid gap-2'>
                        <Label htmlFor='code'>Verification Code</Label>
                        <Input
                          id='code'
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder='Enter verification code'
                          required
                        />
                      </div>
                    </>
                  )}
                  <div id='clerk-captcha' />
                  {error && (
                    <Alert variant='destructive'>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type='submit' className='w-full'>
                    {pendingVerification ? <BadgeCheck /> : <UserPlus />}
                    {pendingVerification ? 'Verify Email' : 'Sign Up'}
                  </Button>
                  {!pendingVerification && (
                    <div className='text-center text-sm'>
                      Already have an account?{' '}
                      <Link
                        href='/signin'
                        className='font-medium text-primary hover:underline underline underline-offset-4'>
                        Sign in
                      </Link>
                    </div>
                  )}
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
