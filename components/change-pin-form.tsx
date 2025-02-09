"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changePin } from "@/lib/pin";

export function ChangePinForm() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPin !== confirmPin) {
      setError("New PINs do not match");
      return;
    }

    try {
      // Assuming you have the userId available, replace 1 with the actual userId
      await changePin(1, currentPin, newPin);
      router.push("/admin/about/change-pin/success");
    } catch {
      setError("Failed to change PIN. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="currentPin"
          className="block text-sm font-medium text-gray-700"
        >
          Current PIN
        </label>
        <Input
          type="password"
          id="currentPin"
          value={currentPin}
          onChange={(e) => setCurrentPin(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="newPin"
          className="block text-sm font-medium text-gray-700"
        >
          New PIN
        </label>
        <Input
          type="password"
          id="newPin"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="confirmPin"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm New PIN
        </label>
        <Input
          type="password"
          id="confirmPin"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        Change PIN
      </Button>
    </form>
  );
}
