import { useContext } from 'react';
import { useAuth, signInUser, AUTH_ACTIONS } from '@/shared/context/auth';
import { useNavigate, Link } from 'react-router-dom';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import FormShell from './FormShell';
import { AuthDispatchContext } from '@/shared/context/auth/context';

const signinSchema = z.object({
  email: z
    .string({
      required_error: "Please enter a valid email address"
    })
    .email({
      message: "Please enter an email address"
    }),
  password: z.string({
    required_error: "Please enter a password"
  })
})
type SigninType = z.infer<typeof signinSchema>;

export default function SignInForm() {
  const [authState, authDispatch] = useAuth();
  console.log(authState)
  const form = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate();

  async function onSignin(values: SigninType) {
    try {
      const credentials = await signInUser(authDispatch, AUTH_ACTIONS, values);
      if (credentials) {
        navigate('/');
      }
    }
    catch(err: any) {
      console.log("CAUGHT at login, ", err);

    }
  }
  return (
  <FormShell>
      <h1 className='text-start text-xl'>
        Log in
      </h1>
      <Form {...form}>
        {authState.error && <p>{authState.error}</p>}
        <form 
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSignin)(e)
          }}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} className='py-6'/>
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
                  <Input placeholder="password" type="password" {...field} className='py-6' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full bg-website-accent hover:bg-website-accent hover:brightness-105 text-site-base py-6'>
            Log In
          </Button>
        </form>
        <hr className="mx-3"/>
        <p>Don't have an account yet? <Link to="/register"><span className='inline-block text-website-accent'>Sign up</span></Link></p>

      </Form>
    </FormShell>
  )
}