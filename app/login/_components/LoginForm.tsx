"use client";

import { User } from "@/types/auth";
import { useState } from "react";
import { loginUser, logoutUser } from "../_actions/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(email, pin);
    setMessage(result.message);
    if (result.success && result.user) {
      setUser(result.user);
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    setMessage(result.message);
    if (result.success) {
      setUser(null);
    }
  };

  return (
    <div>
      {!user ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
