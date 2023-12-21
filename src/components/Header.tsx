import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUserManagement } from "@/lib/useUserManagement";
import Container from "@/components/Container";

type LinkType = {
  name: string
  path: string
  protected: boolean
  action?: string
}

const links: Array<LinkType> = [
  {
    name: "My Flashcards",
    path: "/",
    protected: true,
  },
  {
    name: "Create",
    path: "/create",
    protected: true,
  },
  {
    name: "Profile",
    path: "/profile",
    protected: true,
  },
  {
    name: "Login",
    path: "/login",
    protected: false,
  },
  {
    name: "Register",
    path: "/register",
    protected: false,
  },,
  {
    name: "Logout",
    path: "/logout",
    protected: true,
    action: "logout"
  },
]

function NavLink(props: {name: string, path: string, onClick?: (...args: any) => any}) {
  const {pathname} = useLocation();
  return (
    <li className={cn("font-bold", pathname === props.path && "text-red-500")}>
      <Link to={props.path} onClick={props?.onClick}>{props.name}</Link>
    </li>
  )
}

export default function Header() {

  const { isAuthenticated, logout } = useUserManagement();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const getAction = (action?: string) => {
    if (action === "logout") {
      return async (e: any) => {
        e.preventDefault();
        await logout();
        navigate("/login");
      } 
    }
    return () => {}
  }

  return (
    <header className="min-h-[80px] flex items-center">
      <Container className="container max-w-5xl flex justify-between">
        <div className="flex items-center gap-0">
          <div className="w-[38px]">
            <img src="./quick.png" className="w-full max-h-max" />
          </div>
          <div className="mr-3 text-2xl font-bold text-[rgb(40,40,40)] inline-block">
            BlueCobalt
          </div>
        </div>
        <nav className="flex">
          <ul className="m-0 flex [&>*]:shrink-0 items-center gap-6">
            {
              links.filter(link => link.protected ===  authenticated).map(link => {
                return <NavLink key={link.name} name={link?.name} path={link?.path} onClick={getAction(link?.action)} />
              })
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
} 
