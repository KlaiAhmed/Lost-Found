import style from './login.module.css';
import Icon from '../../utils/getIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from '../../utils/authFormsSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';


const LoginPage = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        }
    });

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
        axios.post(import.meta.env.VITE_API_URL + '/api/auth/signin', data, {withCredentials: true})
            .then(response => {
                console.log('Login successful:', response.data);
                setLoginError(null);
                navigate('/', { replace: true });
            })
            .catch(error => {
                console.error('Login error:', error);
                setLoginError(error.response?.data?.message || 'Login failed');
            });
    };

    const btnDisabled = Object.keys(errors).length > 0;

    return (
        <>
            <div className={style.loginContainer}>
                <section className={style.textBox}>
                    <Link to="/"><Icon name="backArrow" className={style.backArrow} /></Link>
                    <h1>Welcome Back!</h1>
                    <p className={style.p}>Turn Lost into Found, a community that helps, connects securely, and rewards honesty</p>
                    <ul className={style.featuresList}>
                        <li><Icon name="fancySearch" className={style.icon} /> Report lost items and help others find theirs</li>
                        <li><Icon name="handshake" className={style.icon} /> Connect with a trustworthy community</li>
                        <li><Icon name="trophy" className={style.icon} /> Earn rewards for your honesty and assistance</li>
                    </ul>
                </section>
                <section className={style.loginBox}>
                    <h2>Sign In</h2>
                    <p className={style.p}>Enter your credentials to access your account</p>
                    <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className={style.inputGroup}>
                            <input type="text" id="email" {...register('email')}  placeholder='' />
                            <label htmlFor="email">Email</label>
                        </div>
                        {errors.email && (
                            <div className={style.errorContainer}>
                                <Icon name="warning" className={style.warningIcon} />
                                <p className={style.errorMessage}>{errors.email.message}</p>
                            </div>
                        )}

                        <div className={style.inputGroup}>
                            <input type={showPassword ? "text" : "password"} id="password" {...register('password')} autoComplete='off'  placeholder='' />
                            <label htmlFor="password">Password</label>
                            <span onClick={() => setShowPassword(!showPassword)} className={style.passwordToggle} >
                                {showPassword ? 
                                <Icon name="eyeOff" className={style.eyeIcon} />
                                : 
                                <Icon name="eye" className={style.eyeIcon} />
                                }
                            </span>
                        </div>
                        {errors.password && (
                            <div className={style.errorContainer}>
                                <Icon name="warning" className={style.warningIcon} />
                                <p className={style.errorMessage}>{errors.password.message}</p>
                            </div>
                        )}

                        <div className={style.rememberMe}>
                            <input type="checkbox" id="rememberMe" {...register('rememberMe')} />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        {loginError && (
                            <div className={`${style.errorContainer} ${style.loginError}`}>
                                <Icon name="warning" className={style.warningIcon} />
                                <p className={style.errorMessage}>{loginError}</p>
                            </div>
                        )}
                        <button type="submit" disabled={btnDisabled}>Login</button>
                    </form>
                    <span className={style.signUp}>Don't have an account? <Link to="/signup" className={style.signUpLink}>Sign Up</Link></span>
                </section>
            </div>
        </>
    );

};

export default LoginPage;