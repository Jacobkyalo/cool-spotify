"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

const signupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid or correct email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type SignupSchema = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const { loading, signupUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-xl px-4 py-8 block bg-white shadow-xl rounded-xl border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-2 mb-8">
          <h3 className="font-bold text-3xl ">Sign Up</h3>
          <p className="text-neutral-600 text-sm">Create an account</p>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-neutral-700 mb-2">
            Username
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Username"
            className="placeholder:text-neutral-600 w-full border border-neutral-600 focus:border-2 rounded-lg p-3 focus:border-green-600 outline-none"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
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
          className="p-3 w-full outline-none rounded-lg bg-green-600 text-white"
        >
          {loading ? "Please wait..." : "Signup"}
        </button>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
