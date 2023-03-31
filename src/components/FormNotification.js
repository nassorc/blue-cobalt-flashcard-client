import styles from '../pages/styles.module.css';

export default function FormNotification({msg}) {
    return (
        <div className={styles["formContainer-notification"]}>
            <p>{msg}</p>
        </div>
    )
}