import {Link} from 'react-router-dom';
export default function DropdownItemLink(props) {
	const {to, leftIcon, onClick, children} = props
	return(
		<Link onClick={onClick} className='cursor-pointer' to={to}>
			<div className='m-2 px-4 py-4 flex items-center [&>*]:mr-4 hover:bg-slate-100 rounded-lg'>
					<span>{leftIcon}</span>			
					{children}
			</div>
		</Link>
	)
}