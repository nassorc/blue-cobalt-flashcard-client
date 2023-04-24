import styles from '../assets/styles.module.css';
import { FormAlert } from '../../components/styles/Form.styled';

export default function FormNotification({msg, bg, borderColor, color, children}) {
    return (
        <FormAlert bg={bg} borderColor={borderColor} color={color}>
            <span>{msg}</span>
            {children}
        </FormAlert>
    )
}