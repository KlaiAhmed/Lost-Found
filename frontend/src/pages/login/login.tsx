import style from './login.module.css';
import Icon from '../../utils/getIcon';
import { Link } from 'react-router-dom';


const LoginPage = () => {

    return (
        <>
            <div className={style.loginContainer}>
                <section className={style.textBox}>
                    <Link to="/"><Icon name="backArrow" className={style.backArrow} /></Link>
                    <h1>Welcome Back!</h1>
                    <p>Turn Lost into Found, a community that helps, connects securely, and rewards honesty</p>
                    <ul className={style.featuresList}>
                        <li><Icon name="fancySearch" className={style.icon} /> Report lost items and help others find theirs</li>
                        <li><Icon name="handshake" className={style.icon} /> Connect with a trustworthy community</li>
                        <li><Icon name="trophy" className={style.icon} /> Earn rewards for your honesty and assistance</li>
                    </ul>
                </section>
                <section className={style.loginBox}>
                    <h2>Sign In</h2>
                    <p>Enter your credentials to access your account</p>
                    <form className={style.loginForm}>
                        <div className={style.inputGroup}>
                            <input type="text" id="email" name="email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={style.inputGroup}>
                            <input type="password" id="password" name="password" autoComplete='off' required />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button type="submit" disabled>Login</button>
                    </form>
                    <span className={style.signUp}>Don't have an account? <Link to="/signup" className={style.signUpLink}>Sign Up</Link></span>
                </section>
            </div>
        </>
    );

};

export default LoginPage;