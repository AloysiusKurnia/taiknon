'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function LoginClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string | null>(null);
  const router = useRouter();
  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      username, password,
      redirect: false,
    });

    if (response?.ok) {
      router.push('/dashboard');
    } else {
      setErrors(response?.error ?? 'Unknown error');
    }
  };
  return <main>
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      {errors ?? <p>{errors}</p>}
      <label>Username<input type="text" onChange={ev => setUsername(ev.target.value)} /></label>
      <label>Password<input type="password" onChange={ev => setPassword(ev.target.value)} /></label>
      <button type="submit">Log in</button>
    </form>
  </main >;
};