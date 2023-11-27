'use client';

import { signIn } from "next-auth/react";

type SignInButtonProps = {
  children: React.ReactNode;
  callbackUrl?: string;
  className?: string;
  username: string;
  password: string;
};
export default function SignInButton({
  children = 'Sign in',
  callbackUrl,
  username,
  password,
  className = '',
}: SignInButtonProps) {
  return <button
    onClick={() => signIn('credentials', { callbackUrl, username, password })}
    className={className}
  >
    {children}
  </button>;
}