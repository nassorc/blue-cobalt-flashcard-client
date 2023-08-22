import { ReactNode, forwardRef } from "react";

interface PropsType { 
  icon?: string | ReactNode
  selected?: boolean
  onClick?: (...args: any[]) => void
  children?: ReactNode | string
}
const NavLink = forwardRef(function NavLink(props: PropsType, ref) {
  const { icon, selected, children, ...navProps } = props;
  return(
    <li 
      ref={ref}
      {...navProps}
      className="mx-3 text-black"
    >
      <span className={`${selected ? "text-[#11eabb]" : "white"}`}>
        { props.icon }
      </span>
      {props.children && props.children}
    </li>
  )
})
export default NavLink;