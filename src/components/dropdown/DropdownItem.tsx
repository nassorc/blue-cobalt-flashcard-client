interface PropsType {
  leftIcon?: string | React.ReactNode
  rightIcon?: string | React.ReactNode
  children?: React.ReactNode
  onClick?: (...args: any[]) => void
}

export default function DropdownItem(props: PropsType) {
  const { leftIcon, rightIcon, children, ...drowndownProps} = props;
  return(
    <div {...drowndownProps} className="px-3 py-3 w-full flex items-center hover:bg-slate-100 cursor-pointer transition-all ease rounded-lg">
      <span className="mr-2">
        {leftIcon}
      </span>
      <span className="font-md pointer-events-none">{children}</span>
      <span className="ml-auto">{rightIcon}</span>
    </div>
  )
}