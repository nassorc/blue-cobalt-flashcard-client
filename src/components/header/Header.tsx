import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/shared/context/auth";
import { Icons } from "../Icons";
import NavLink from "./NavLink";
import ProfileImage from "../ProfileImage";
import { useUser } from "@/shared/context/user";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, 
  DropdownItem, 
  DropdownHeader 
} from "../dropdown";

function NavLink2({linkName, to, selected}: {linkName: string, to: string, selected: boolean}) {
  return(
    <li 
      className={cn("text-center cursor-pointer h-full", selected && "border-b-2 border-website-accent")}
      style={{
      flex: "1"
    }}><Link to={to}>{linkName}</Link></li>
  )
}

export default function Header() {
  const {user} = useUser();
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState<string | undefined>();

  const [authState, authDispatch] = useAuth();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLink(location.pathname)
  }, [location])

  useEffect(() => {
    function a(e) {
      if(!settingsDropdownRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("click", a)
    return () => {
      document.removeEventListener("click", a)
    }
  }, [])

  return (
    // <header className="fixed top-0 z-[99] w-full bg-base-600 bg-white h-20 border-b-4 border-base-200 text-white">
		<header className="sticky top-0 z-[99] mb-8 w-full h-header bg-white shadow-bottom shadow-sm shadow-slate-700/50 text-slate-700 transition-all">
      <div className="container mx-auto h-full flex items-center ">
				<Link
					to="/landing-page"
					className="flex justify-center items-center cursor-pointer"
				>
          <img src="./quick.png"/>
					<div className="mr-3 text-3xl font-bold text-[rgb(40,40,40)] inline-block">
						BlueCobalt
					</div>
				</Link>
          {(authState.userId && authState.token) && 
            <>
            <ul className="px-2 ml-auto min-w-[300px] flex justify-evenly space-x-2">
              <NavLink2 
                linkName="Flashcards"
                to="/"
                selected={selectedLink === "/"}
              />
              <NavLink2 
                linkName="Add"
                to="/add"
                selected={selectedLink === "/add"}
              />
              <NavLink2 
                linkName="Explore"
                to="/explore"
                selected={selectedLink === "/explore"}
              />
            </ul>
            <ProfileImage 
              ref={settingsDropdownRef}
              className="relative cursor-pointer hover:[&>*]:brightness-110 active:brightness-75 active:scale-95"
              profileImage={user?.profileImage}
              size="md"
              rounded="full"
              onClick={() => {
                // setMenu("settings");
                setShowSettings(!showSettings);
              }}
            >
              <DropdownMenu show={showSettings}>
                <a href="/profile">
                  <DropdownItem
                    leftIcon={<Icons.user />}
                  >
                    Profile
                  </DropdownItem>
                </a>
                <DropdownItem 
                  onClick={(e) => {
                  }}
                  leftIcon={<Icons.logout />}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </ProfileImage>
            {/* <NavLink 
              ref={settingsDropdownRef}
              selected={showSettings}
              icon={
                <div className="w-8 h-8 bg-[slateblue]"></div>
                // <ProfileImage 
                //   profileImage={user?.profileImage} 
                //   size="md" 
                //   rounded="full" 
                //   className="hover:brightness-125 active:brightness-75 active:scale-95"
                // />
              }
              onClick={() => {
                // setMenu("settings");
                setShowSettings(!showSettings);
              }}
            >
              <DropdownMenu show={showSettings}>
                <a href="/profile">
                  <DropdownItem
                    leftIcon={<Icons.user />}
                  >
                    Profile
                  </DropdownItem>
                </a>
                <DropdownItem 
                  onClick={(e) => {
                  }}
                  leftIcon={<Icons.logout />}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </NavLink>   */}
            </>
          }
      </div>

    </header>
  )
}
