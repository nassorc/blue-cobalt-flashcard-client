import Login from "@/app/auth/components/Login";
import SignUpForm from "@/app/auth/components/Signup";

import { ReactElement, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const baseURL = window.location.origin;

  useEffect(() => {
    // if((authState as any).userId && (authState as any).accessToken) {
    //   navigate('/');
    // }
  }, []);

  let alt: ReactElement | null = null;

  if (pathname === "/login") {
    alt = (
      <p className="">
        Don't have an account?{" "}
        <Link to="/register" className="underline">
          create account
        </Link>
      </p>
    );
  } else if (pathname === "/register") {
    alt = (
      <p className="">
        Already a user?{" "}
        <Link to="/login" className="underline">
          login
        </Link>
      </p>
    );
  }

  const form = location.pathname === "/login" ? <Login /> : <SignUpForm />;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-[100] flex flex-col justify-between items-center py-12">
      <Link to="/home">
        <div className="w-16 cursor-pointer">
          <img
            src={`${baseURL}/quick-lg.png`}
            className="w-full max-h-full block object-contain"
          />
        </div>
      </Link>
      <div className="mb-28">{form}</div>
      <div className="">{alt}</div>
    </div>
  );
}
