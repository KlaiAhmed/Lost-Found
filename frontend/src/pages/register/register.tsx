import style from './register.module.css';
import Icon from '../../utils/getIcon';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerFormSchema } from '../../scheams/authFormsSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: any) => {        
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/api/auth/signup', data, { withCredentials: true });
            setRegisterError(null);
            window.location.href = '/';
        } catch (error: any) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed';
            setRegisterError(errorMessage);
        }
    };

    const btnDisabled = Object.keys(errors).length > 0;

    return (
        <>
            <div className={style.registerContainer}>
                <section className={style.textBox}>
                    <Link to="/"><Icon name="backArrow" className={style.backArrow} /></Link>
                    <h1>Discover Lost & Found</h1>
                    <p className={style.p}>Turn Lost into Found, a community that helps, connects securely, and rewards honesty</p>
                    <ul className={style.featuresList}>
                        <li><Icon name="fancySearch" className={style.icon} /> Report lost items and help others find theirs</li>
                        <li><Icon name="handshake" className={style.icon} /> Connect with a trustworthy community</li>
                        <li><Icon name="trophy" className={style.icon} /> Earn rewards for your honesty and assistance</li>
                    </ul>
                </section>
                <section className={style.registerBox}>
                    <h2>Sign Up</h2>
                    <p className={style.p}>Enter your credentials to create your account</p>
                    <form className={style.registerForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className={style.inputGroup}>
                            <input type="text" id="username" {...register('username')}  placeholder='' />
                            <label htmlFor="username">Username</label>
                        </div>
                        {errors.username && (
                            <div className={style.errorContainer}>
                                <Icon name="warning" className={style.warningIcon} />
                                <p className={style.errorMessage}>{errors.username.message}</p>
                            </div>
                        )}
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

                        <div className={style.inputGroup}>
                            <input type={showPassword ? "text" : "password"} id="confirmPassword" {...register('confirmPassword')} autoComplete='off'  placeholder='' />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <span onClick={() => setShowPassword(!showPassword)} className={style.passwordToggle} >
                                {showPassword ? 
                                <Icon name="eyeOff" className={style.eyeIcon} />
                                : 
                                <Icon name="eye" className={style.eyeIcon} />
                                }
                            </span>
                        </div>
                        {errors.confirmPassword && (
                            <div className={style.errorContainer}>
                                <Icon name="warning" className={style.warningIcon} />
                                <p className={style.errorMessage}>{errors.confirmPassword.message}</p>
                            </div>
                        )}
                        {registerError && (
                            <div className={`${style.errorContainer} ${style.registerError}`}>
                                <Icon name="warning" className={style.warningIcon} />
                                <p className={style.errorMessage}>{registerError}</p>
                            </div>
                        )}
                        <button type="submit" disabled={btnDisabled}>Register</button>
                    </form>
                    <span className={style.signUp}>Already have an account? <Link to="/signin" className={style.signUpLink}>Sign In</Link></span>
                </section>
            </div>
        </>
    );

};

export default RegisterPage;