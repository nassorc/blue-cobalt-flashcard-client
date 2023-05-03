import clipImage from '../assets/bluecobalt-clip.jpg'
import authStyles from '../../auth.module.css'
export default function PageLogo() {
    return (
        <div className={`${authStyles['center']} ${authStyles['logo']}`}>
            <h1 style={{color: 'rgb(38,38,38)'}}>Blue</h1>
        <div className={`${authStyles['center']} ${authStyles['logo']} ${authStyles['logo-clip']}`}>
            <h1>Cobalt</h1>
        </div>
        </div>
    )
}