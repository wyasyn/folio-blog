"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCurrentUser, loginUser } from "../_actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { MouseIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OTPInput, SlotProps } from "input-otp";
import { useId } from "react";

export default function LoginForm() {
  const id = useId();
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
    <div className="w-full max-w-[270px] mx-auto space-y-4">
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
            <OTPInput
              id={id}
              maxLength={6}
              value={pin}
              containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
              onChange={(value) => setPin(value)}
              render={({ slots }) => (
                <div className="flex gap-2">
                  {slots.map((slot, idx) => (
                    <Slot key={idx} {...slot} />
                  ))}
                </div>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-black"
            disabled={isLoading || pin.length !== 6 || !email}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <Link
            href="/recover-pin"
            className="block mt-6 text-sm text-gray-600"
          >
            Forgot your pin?
          </Link>
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

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow",
        { "z-10 border border-ring ring-[3px] ring-ring/20": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
