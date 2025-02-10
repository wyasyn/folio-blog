import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Yasin Walum",
  description: "Login to your account.",
};

export default function page() {
  return (
    <div className="min-h-screen grid place-items-center">
      <LoginForm />
    </div>
  );
}
