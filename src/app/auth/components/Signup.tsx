import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import FormShell from "./FormShell";
import { signUpUser } from "@/lib/context/auth";
import { Icons } from "@/components/Icons";
import AuthActionButton from "./AuthActionButton";

const signupSchema = z.object({
  username: z
    .string({
      required_error: "Please enter a username",
    })
    .min(3, {
      message: "username must be atleast 3 characters",
    }),
  email: z
    .string({
      required_error: "Please enter a valid email address",
    })
    .email({
      message: "Please enter an email address",
    }),
  password: z.string({
    required_error: "Please enter a password",
  }),
});
type SignupType = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const navigate = useNavigate();
  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function onSignUp(values: SignupType) {
    const raw = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    const res = await signUpUser(raw);
    const { message } = await res.json();
  }

  return (
    <div>
      <div className="flex flex-col text-center my-12 gap-2">
        <h1 className="text-[2.7rem] font-medium">Sign Up to BlueCobalt</h1>
        <p className="text-zinc-600">
          Login or register to start building flashcards.
        </p>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500">
          {successMessage}{" "}
          <Link to="/login" className="text-slate-800 cursor-pointer">
            Log in
          </Link>
        </p>
      )}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSignUp)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="username"
                    type="text"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="email"
                    type="email"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthActionButton>Create account</AuthActionButton>
          {/* <Button
            type="submit"
            className="w-full py-6 bg-black hover:bg-black/80 text-cyan-200"
          >
          </Button> */}
        </form>
      </Form>
      <div className="flex flex-col items-center justify-center">
        <p className="my-4">or</p>

        <div className="w-full">
          <Button
            className="w-full py-6 flex gap-2 cursor-not-allowed"
            disabled
          >
            <Icons.github />
            <span>Sign up with Github (coming soon)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
