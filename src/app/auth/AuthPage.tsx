import Login from "@/app/auth/components/Login";
import SignUpForm from "@/app/auth/components/Signup";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // if((authState as any).userId && (authState as any).accessToken) {
    //   navigate('/');
    // }
  }, []);

  const form = location.pathname === "/login" ? <Login /> : <SignUpForm />;
  return (
    // <div className='max-w-lg mx-auto grid grid-cols-1 grid-rows-4 gap-y-4'>
    <div className="relative left-0 top-0 flex justify-center items-center overflow-hidden p-10">
      <div className="relative z-20 row-start-2 grid gap-4 p-12 bg-white/40 backdrop-blur-md shadow-lg rounded-md">
        {form}
      </div>
    </div>

    // <svg
    //   viewBox="0 0 200 200"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="absolute bottom-0 -translate-x-1/3 left-0 w-[1800px] h-[1800px]"
    // >
    //   <path
    //     fill="#A7F0BA"
    //     d="M44.2,-52.6C52.9,-45.4,52.6,-27.3,57.6,-8.7C62.6,9.9,72.9,28.9,67.5,39.5C62,50.1,40.9,52.1,22.5,56.5C4.1,60.9,-11.5,67.8,-25.4,64.9C-39.3,62,-51.5,49.4,-59.2,34.8C-66.9,20.2,-70.1,3.6,-65.1,-9.1C-60,-21.8,-46.6,-30.8,-34.4,-37.4C-22.2,-44,-11.1,-48.3,3.3,-52.2C17.7,-56.2,35.5,-59.8,44.2,-52.6Z"
    //     transform="translate(100 100)"
    //   />
    // </svg>
    // <div className="mx-auto mt-10 flex flex-col justify-center items-center text-center max-w-[90%] lg:flex-row lg:mt-20 lg:space-x-20 lg:text-start">
    //   <div className="mb-10 space-y-3">
    //     <h1 className="text-4xl font-bold h-max text-site-accent brightness-90">
    //       Placeholder
    //     </h1>
    //     <p className="text-xl">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
    //       blanditiis!
    //     </p>
    //   </div>
    //   <div className="row-start-2 grid gap-4">{form}</div>
    // </div>
  );
}

// <div className="absolute z-10 overflow-hidden inset-0">
//   <svg
//     viewBox="0 0 200 200"
//     xmlns="http://www.w3.org/2000/svg"
//     className="absolute bottom-0 right-1/2 w-[600px] h-[600px]"
//   >
//     <path
//       fill="#A7F0BA"
//       d="M44.2,-52.6C52.9,-45.4,52.6,-27.3,57.6,-8.7C62.6,9.9,72.9,28.9,67.5,39.5C62,50.1,40.9,52.1,22.5,56.5C4.1,60.9,-11.5,67.8,-25.4,64.9C-39.3,62,-51.5,49.4,-59.2,34.8C-66.9,20.2,-70.1,3.6,-65.1,-9.1C-60,-21.8,-46.6,-30.8,-34.4,-37.4C-22.2,-44,-11.1,-48.3,3.3,-52.2C17.7,-56.2,35.5,-59.8,44.2,-52.6Z"
//       transform="translate(100 100)"
//     />
//   </svg>

//   <svg
//     viewBox="0 0 200 200"
//     xmlns="http://www.w3.org/2000/svg"
//     className="absolute top-1/3 left-1/2 -translate-x-[50px] w-[800px] h-[800px] "
//   >
//     <path
//       fill="#FFD6E8"
//       d="M40.9,-16.9C48.5,10.2,47.1,36.5,35.7,43.6C24.2,50.6,2.7,38.3,-19.6,23C-41.8,7.8,-64.7,-10.4,-61.6,-31.3C-58.5,-52.2,-29.2,-75.8,-6.3,-73.8C16.6,-71.7,33.3,-44,40.9,-16.9Z"
//       transform="translate(100 100)"
//     />
//   </svg>
// </div>
