'use client';

import LabelInputPair from "@/components/LabelInputPair";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const router = useRouter();

  const handleRegister: FormEventHandler = async (e) => {
    e.preventDefault();
    if (sending || (password !== confirmPassword)) {
      return;
    }
    setSending(true);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      router.push('/login', { query: { registered: 'true' } });
    } else {
      setErrors(response.statusText);
      setSending(false);
    };
  };
  return <main>
    <form onSubmit={handleRegister}>
      <h1>Login</h1>
      {errors ?? <p>{errors}</p>}
      <LabelInputPair label="Username" onChange={setUsername} />
      <LabelInputPair label="Password" onChange={setPassword} type="password" />
      {(confirmPassword !== '') && (password !== confirmPassword) && <p>Passwords do not match</p>}
      <LabelInputPair label="Confirm Password" onChange={setConfirmPassword} type="password" />
      <button type="submit" disabled={sending}>Register</button>
    </form>
  </main >;
};