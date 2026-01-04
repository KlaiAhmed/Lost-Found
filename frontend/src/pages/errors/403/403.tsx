import styles from './403.module.css';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <>
            <main className={styles.pageWrap} role="main">
                <section className={styles.card} aria-labelledby="title-403">
                    <h1 className={styles.code} aria-hidden="true">403</h1>
                    <h2 id="title-403" className={styles.title}>Ooops! Access denied</h2>
                    <p className={styles.desc}>
                        The page you are trying to access is restricted. You do not have the necessary permissions to view this content. Please contact the site administrator if you believe this is an error.
                    </p>
                    <p></p>
                    <Link className={`${styles.btn} ${styles.btnPrimary}`} to='/' title="Return to homepage">Take me home</Link>
                </section>
            </main>
        </>
    );
};

export default Forbidden;
