"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid or correct email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const { user, loading, loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    // console.log(data);
    loginUser(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="flex justify-center mt-16 sm:mt-0 sm:items-center h-screen">
      <form
        className="w-full h-fit max-w-xl px-4 py-8 block bg-white shadow-xl rounded-xl border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-2 mb-8">
          <h3 className="font-bold text-3xl ">Login</h3>
          <p className="text-neutral-600 text-sm">Login to your account</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-neutral-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email address"
            className="placeholder:text-neutral-600 w-full border border-neutral-600 focus:border-2 rounded-lg p-3 focus:border-green-600 outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-neutral-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Password"
            className="placeholder:text-neutral-600 w-full border border-neutral-600 focus:border-2 rounded-lg p-3 focus:border-green-600 outline-none"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          aria-disabled={loading}
          disabled={loading}
          className="p-3 outline-none w-full rounded-lg bg-green-600 text-white"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-600">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
