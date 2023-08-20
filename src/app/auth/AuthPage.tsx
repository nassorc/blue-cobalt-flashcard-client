import Login from "@/components/auth/Login"
import SignUpForm from "@/components/auth/Signup";

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    // if((authState as any).userId && (authState as any).accessToken) {
    //   navigate('/');
    // }
  }, []);

  const form = (location.pathname === '/login') ? <Login /> : <SignUpForm />
  return(
    // <div className='max-w-lg mx-auto grid grid-cols-1 grid-rows-4 gap-y-4'>
    <div className='mx-auto mt-10 flex flex-col justify-center items-center text-center max-w-[90%] lg:flex-row lg:mt-20 lg:space-x-20 lg:text-start'>
      <div className='mb-10 space-y-3'>
        <h1 className='text-4xl font-bold h-max text-site-accent brightness-90'>Placeholder</h1>
        <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, blanditiis!</p>
      </div>
      <div className='row-start-2 grid gap-4'>
        {form}
      </div>
    </div>
  )
}