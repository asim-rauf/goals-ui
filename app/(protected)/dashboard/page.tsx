'use client';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
  const { signOut } = useClerk();
  return (
    <Button
      size={'lg'}
      variant={'destructive'}
      onClick={() => signOut({ redirectUrl: '/signin' })}>
      Sign Out
    </Button>
  );
};

export default Page;
