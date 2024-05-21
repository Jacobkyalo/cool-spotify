import SignupForm from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account on Cool Spotify",
};

export default function Signup() {
  return (
    <main className="container">
      <SignupForm />
    </main>
  );
}
