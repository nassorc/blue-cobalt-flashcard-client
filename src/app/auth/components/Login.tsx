import { useNavigate, Link } from "react-router-dom";
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
import { useUserManagement } from "@/lib/useUserManagement";
import { Icons } from "@/components/Icons";
import AuthActionButton from "./AuthActionButton";

const signinSchema = z.object({
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
type SigninType = z.infer<typeof signinSchema>;

export default function SignInForm() {
  const { login, error, loading } = useUserManagement();

  const form = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function onSignin(values: SigninType) {
    // const credentials = await signInUser(authDispatch, AUTH_ACTIONS, values);
    const authenticated = await login(values);

    if (authenticated) {
      navigate("/");
    }
  }
  return (
    <div>
      <div className="flex flex-col text-center my-12 gap-2">
        <h1 className="text-[2.7rem] font-medium">Sign in to BlueCobalt</h1>
        <p className="text-zinc-600">
          Login or register to start building flashcards.
        </p>
      </div>
      <Form {...form}>
        {error && <p>{error}</p>}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSignin)(e);
          }}
        >
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
                    className="py-6"
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
                    className="py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthActionButton>Log In</AuthActionButton>
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
            <span>Sign in with Github (coming soon)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
