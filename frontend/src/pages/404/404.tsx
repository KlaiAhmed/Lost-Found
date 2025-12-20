import styles from './404.module.css';
import Navbar from '../../components/navbar/main/navbar';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <Navbar/>
            <main className={styles.pageWrap} role="main">
                <section className={styles.card} aria-labelledby="title-404">
                    <h1 className={styles.code} aria-hidden="true">404</h1>
                    <h2 id="title-404" className={styles.title}>Ooops! Page not found</h2>
                    <p className={styles.desc}>
                        The page you are looking for may have been removed, had its name changed,
                        or is temporarily unavailable. Please check the link or return to the homepage.
                    </p>
                    <Link className={`${styles.btn} ${styles.btnPrimary}`} to='/' title="Return to homepage">Take me home</Link>
                </section>
            </main>
        </>
    );
};

export default NotFound;
