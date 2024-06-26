"use client";

import { signIn, signOut } from "next-auth/react";

export function GoogleSigninButton() {
  const handleClick = () => {
    signIn("google");
  };

  return <button onClick={handleClick}>Google Login</button>;
}

export function Logout() {
  const handleClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return <button onClick={handleClick}>Logout</button>;
}
