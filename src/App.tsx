import { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "./shared/context/AuthContext";
import { Route, Routes } from "react-router-dom";

// route components
import { LoginPage, RegisterPage } from "./app/auth";
import {
	AddDeckPage,
	EditDeckPage,
	PracticeDeckPage,
	ManageDeckPage,
	ExploreDeckPage,
} from "./deck";
import { ProfilePage, ManageClassPage } from "./user";

// private route handler
import PrivateRoutes from "./components/PrivateRoutes";
// import Header from "./shared/components/Header/Header";
import Header from "./components/header/Header";
import "./App.css";
import { LandingPage } from "./app/landing";
import AuthPage from "./app/auth/AuthPage";
import A from "./components/a/A";
import MockReplicate from "./shared/services/replicate";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const replicate = new MockReplicate("auth")

function Sketch() {
  const sketchRef = useRef<HTMLCanvasElement | undefined>()
  const [drawing, setDrawing] = useState(false);
  const [prevPoint, setPrevPoint] = useState<number[] | null>(null)
  const [replicated, setReplicated] = useState<string | null>(null);
  return(
    <>
    <div 
      className="mx-auto max-w-[800px] flex justify-center"
    >
      <div className="">
        <div className="flex">
          <Input placeholder="describe image"/>
          <Button onClick={() => {
            if(!sketchRef.current) return
            // console.log(sketchRef.current.toDataURL())
            const {output} = replicate.run('model1', {
              image: 'image'
            })
            setReplicated(output)
          }}>replicate</Button>
          <Button>draw</Button>
        </div>
        <div className="bg-white">
        <canvas
          className="aspect-squar"
          ref={sketchRef}
          onMouseMove={(e) => {
            if (e.target.tagName === "CANVAS" && drawing) {
              const rect = e.target.getBoundingClientRect()
              const ctx: CanvasRenderingContext2D = e.target.getContext("2d")

              let x = e.clientX - rect.left;
              let y = e.clientY - rect.top;
              ctx.beginPath()
              if(prevPoint === null) {
                setPrevPoint([x, y])
              }
              ctx.moveTo(prevPoint[0], prevPoint[1]);
              ctx.lineTo(x, y);
              ctx.fill();
              ctx.stroke()

              setPrevPoint([x, y])

              // ctx.fillStyle = "black"
              // ctx.fillRect(x, y, 10, 10);
            }
          }}
          onMouseDown={(e) => {
            setDrawing(true)
          }}
          onMouseUp={(e) => {
            setDrawing(false)
            setPrevPoint(null)
          }}
          onMouseLeave={(e) => {
            setDrawing(false)
          }}
          className="shadow-lg border border-gray-200"
          width="400px"
          height="400px"
        >
        </canvas>
        </div>

      </div>
    </div>
    <div className="w-1/2 aspect-square">
      {replicated && <img className="w-full min-h-full block object-cover" src={replicated}/>}
    </div>
    </>
  )
}

function App() {
	const authContext = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const userId = window.localStorage.getItem("userId");
		const token = window.localStorage.getItem("token");
		if (userId && token) {
			authContext.setAuth({ userId, token });
		}
		setIsLoading(!isLoading);
	}, []);
	return (
		<section className="min-h-screen bg-website-background">
			<Header />
			{isLoading ? null : (
				<Routes>
					{/* PRIVATE ROUTES */}
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<ManageDeckPage />} />
						<Route path="/add" element={<AddDeckPage />} />
						<Route path="/practice/:id" element={<PracticeDeckPage />} />
						<Route path="/edit/:deckId" element={<EditDeckPage />} />
						<Route path="/explore" element={<ExploreDeckPage />} />
						{/* <Route path="/profile" element={<ProfilePage />} /> */}
						<Route path="/manage" element={<ManageClassPage />} />
					</Route>
					{/* PUBLIC ROUTES */}

          <Route path="/landing-page" element={<LandingPage />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/register" element={<AuthPage />} />
					<Route path="/a" element={<Sketch/>} />
				</Routes>
			)}
		</section>
	);
}

export default App;
