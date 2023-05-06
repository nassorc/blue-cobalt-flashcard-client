import {Link} from 'react-router-dom';
export default function NavLink(props) {
	const {to, children} = props
	return(
		<li className='h-full px-2 flex justify-center items-center hover:bg-slate-100'>
			<Link className=' w-full h-full flex justify-center items-center' to={to}>
				{children}
			</Link>
		</li>
	)
}