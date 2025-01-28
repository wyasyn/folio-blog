"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getCurrentUser, loginUser } from "../_actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { MouseIcon } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const user = await getCurrentUser();

      if (user) {
        setShow(false);
        router.push("/admin");
      }
    }
    fetchData();
  }, [router]);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await loginUser(email, pin);
      setMessage(result.message);
      if (result.success && result.user) {
        router.push("/admin");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Link
        href="/"
        className="mb-14 block  hover:text-primary transition-all duration-300 group"
      >
        <MouseIcon className="w-16 h-16 mx-auto group-hover:animate-bounce" />
      </Link>
      {show ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2 mx-auto flex flex-col items-center">
            <Label htmlFor="pin">6-Digit PIN</Label>
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={(value) => setPin(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            type="submit"
            className="w-full text-black"
            disabled={isLoading || pin.length !== 6 || !email}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      ) : null}
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
