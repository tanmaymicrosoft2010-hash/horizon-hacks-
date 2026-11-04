"use client";

import { useRouter } from "next/navigation";
import { WebShotButton } from "./WebShotButton";

export default function HomeSignInButton({ authed }) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push(authed ? "/dashboard" : "/login");
  };

  return (
    <WebShotButton
      size="lg"
      color="#e11d2e"
      onClick={handleSignIn}
      aria-label={authed ? "Go to Dashboard" : "Sign in to Horizon"}
    >
      {authed ? "Dashboard" : "Sign in"}
    </WebShotButton>
  );
}
