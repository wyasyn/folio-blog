import { logoutUser } from "@/app/login/_actions/auth";
import { Loader2, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutBtn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const result = await logoutUser();

      if (result.success) {
        router.push("/login");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className="hover:text-foreground duration-300"
      onClick={handleLogout}
      disabled={isLoading}
      title="logout"
      aria-label="logout"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </button>
  );
}
