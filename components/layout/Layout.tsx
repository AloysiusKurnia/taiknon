import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Header({ username }: { username: string; }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <Link href="/">Taiknon</Link>
      <div>Hello, {username}</div>
      <button
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >☰</button>
      {showMenu && (
        <nav>
          <ul>
            <li>
              <Link href="/completion">Completion</Link>
            </li>
            <li>
              <Link href="/journal">Journal</Link>
            </li>
            <li>Separator</li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={() => signOut({ callbackUrl: "/" })}>Log out</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

export default function Layout({ children, username }: LayoutProps) {
  return (
    <div>
      <Header username={username} />
      {children}
    </div>
  );
}