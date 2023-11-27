import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginClient from "./client";

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect('/dashboard');
  } else {
    return <LoginClient />;
  }
};