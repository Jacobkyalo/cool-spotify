"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, loading, logoutUser } = useAuth();

  return (
    <header className="py-6 flex itemsc- justify-between">
      <Link href="/">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
          CoolSpotify
        </h1>
      </Link>

      {user && (
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col">
            <h5 className="font-bold text-sm">{user?.name}</h5>
            <p className="text-neutral-500 text-xs">{user?.email}</p>
          </div>

          <button
            onClick={logoutUser}
            className="rounded-lg bg-red-600 text-white py-2 px-4"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </header>
  );
}
