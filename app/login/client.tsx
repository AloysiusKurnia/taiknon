'use client';

import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function LoginClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const justRegistered = useParams().registered === 'true';

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    if (sending) {
      return;
    }
    setSending(true);
    const response = await signIn('credentials', {
      username, password,
      redirect: false,
    });

    if (response?.ok) {
      router.push('/dashboard');
    } else {
      setErrors(response?.error ?? 'Unknown error');
      setSending(false);
    }
  };
  return <main>
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      {justRegistered && <p>Successfully registered. Please log in.</p>}
      {errors ?? <p>{errors}</p>}
      <label>Username<input type="text" onChange={ev => setUsername(ev.target.value)} /></label>
      <label>Password<input type="password" onChange={ev => setPassword(ev.target.value)} /></label>
      <button type="submit" disabled={sending}>Log in</button>
    </form>
  </main >;
};