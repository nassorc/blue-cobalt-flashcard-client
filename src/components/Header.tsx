import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUserManagement } from "@/lib/useUserManagement";
import Container from "@/components/Container";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

type LinkType = {
  name: string;
  path: string;
  protected: boolean;
  action?: string;
};

const links: Array<LinkType> = [
  {
    name: "My Flashcards",
    path: "/",
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
  },
  ,
  {
    name: "Logout",
    path: "/logout",
    protected: true,
    action: "logout",
  },
];

function NavLink(props: {
  name: string;
  path: string;
  onClick?: (...args: any) => any;
}) {
  const { pathname } = useLocation();
  return (
    <li
      className={cn(
        "font-light text-[15px] text-slate-800 cursor-pointer px-3 py-[2px] rounded-sm",
        pathname === props.path && "bg-black text-white font-normal",
        pathname !== props.path && "hover:bg-black/10",
      )}
    >
      <Link to={props.path} onClick={props?.onClick}>
        {props.name}
      </Link>
    </li>
  );
}

function UnauthenticatedNav() {
  return (
    <nav className="flex items-center">
      <Link to="/login">
        <Button variant="ghost" className="font-normal">
          Sign in
        </Button>
      </Link>
      <Link
        to="/register"
        className="font-normal text-[15px] cursor-pointer px-3 py-[2px] rounded-sm bg-black text-cyan-200"
      >
        {/* className="font-normal text-[15px] cursor-pointer px-3 py-[2px] rounded-sm bg-black text-cyan-200" */}
        Try for free
      </Link>
    </nav>
  );
}

function MobileNavAuthenticated({
  links,
  authenticated,
  actionHandler,
}: {
  links: LinkType[];
  authenticated: boolean;
  actionHandler: (...args: any) => any;
}) {
  const [showLinks, setShowLinks] = useState(false);
  let linkElms: ReactElement | null = null;

  if (showLinks) {
    linkElms = (
      <ul className="flex gap-3">
        {links
          .filter((link) => link.protected === authenticated)
          .map((link, idx) => {
            return (
              <li key={idx}>
                <NavLink
                  key={link.name}
                  name={link?.name}
                  path={link?.path}
                  onClick={actionHandler(link.action)}
                />
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <nav className="flex items-center">
      {linkElms}
      <Button variant="ghost" onClick={() => setShowLinks(!showLinks)}>
        <Icons.menu />
      </Button>
    </nav>
  );
}

function DesktopNav({
  links,
  authenticated,
  actionHandler: action,
}: {
  links: LinkType[];
  authenticated: boolean;
  actionHandler: (...args: any) => any;
}) {
  return (
    <nav className="flex">
      <ul className="m-0 flex [&>*]:shrink-0 items-center gap-3">
        {links
          .filter((link) => link.protected === authenticated)
          .map((link) => {
            return (
              <NavLink
                key={link.name}
                name={link?.name}
                path={link?.path}
                onClick={action(link.action)}
              />
            );
          })}
      </ul>
    </nav>
  );
}

export default function Header() {
  const { isAuthenticated, logout } = useUserManagement();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const [scrolled, setScrolled] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [showBurger, setShowBurger] = useState(true);
  const [pageSize, setPageSize] = useState(0);
  const baseURL = window.location.origin;

  let nav: ReactElement;

  const getAction = (action?: string) => {
    if (action === "logout") {
      return async (e: any) => {
        e.preventDefault();
        await logout();
        navigate("/login");
      };
    }
    return () => {};
  };

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setShowHeader(false);
      if (document.documentElement.scrollTop < 5) {
        setScrolled(false);
      }
      setScrolled(true);
      setScrollTop((prev) => {
        if (prev > document.documentElement.scrollTop) {
          setShowHeader(true);
        }
        return document.documentElement.scrollTop;
      });
    });
  }, []);

  useEffect(() => {
    setPageSize(document.documentElement.clientWidth);
    const handleResize = () => {
      setPageSize(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (pageSize < 800) {
    nav = <UnauthenticatedNav />;
  } else {
    nav = (
      <DesktopNav
        links={links}
        authenticated={authenticated}
        actionHandler={getAction}
      />
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed w-full top-0 min-h-[72px] bg-transparent flex items-center z-[99] ease duration-300 shadow-sm",
          scrolled ? "bg-white/40 backdrop-blur-md" : "bg-white/0",
          showHeader ? "flex" : "hidden",
        )}
      >
        <Container className="container max-w-5xl flex justify-between">
          <a
            href={authenticated ? "/" : "/home"}
            className="flex items-center gap-1"
          >
            <div className="relative w-[34px]">
              <img src={`${baseURL}/quick.png`} className="w-full max-h-max" />
            </div>
            <div className="font-normal md:inline-block mr-3 md:text-2xl tracking-wide text-[rgb(40,40,40)]">
              BlueCobalt
            </div>
          </a>

          {nav}
        </Container>
      </header>
      <div className="pb-28"></div>
    </>
  );
}
