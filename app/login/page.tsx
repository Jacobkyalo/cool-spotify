import LoginForm from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account on Cool Spotify",
};

export default function Login() {
  return (
    <main className="container">
      <LoginForm />
    </main>
  );
}
