import { signIn } from "next-auth/react";
import Link from "next/link";
import SignInButton from "../components/SignInButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect('/dashboard');
  }
  return <main>
    <h1>Welcome to Taiknon</h1>
    <h2>Your personal scheduling and task manager app!</h2>

    <Link href="/signup">
      <button>Create a new account</button>
    </Link>
    <Link href="/login">Or log in if you already have one</Link>
  </main>;
}
