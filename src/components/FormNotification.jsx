import styles from '../assets/styles.module.css';
import { FormAlert } from './styles/Form.styled';

export default function FormNotification({msg, bg, borderColor, color}) {
    return (
        <FormAlert bg={bg} borderColor={borderColor} color={color}>
            <p>{msg}</p>
        </FormAlert>
    )
}