"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ACTIVE_ROUTE = "py-2 px-4 text-white bg-gray-800 rounded";
const INACTIVE_ROUTE =
  "py-2 px-4 text-gray-500 hover:text-white hover:bg-gray-700 rounded";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span>{session?.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Sign in
    </button>
  );
}

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </Link>
          <Link href="/protected" className={pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Protected Route
          </Link>
          <Link href="/serverAction" className={pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Server Action
          </Link>
          <Link href="/apiFromClient" className={pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            API From Client
          </Link>
          <Link href="/apiFromServer" className={pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            API From Server
          </Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}