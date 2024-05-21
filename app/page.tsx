"use client";

import Navbar from "@/components/navbar";
import SearchForm from "@/components/search-form";
import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  return (
    <div className="container">
      <Navbar />

      <main>
        <SearchForm />
      </main>
    </div>
  );
}
