import style from './personalInfo.module.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../utils/authContext'
import { useForm } from 'react-hook-form';
import { updatedDataSchema } from '../../scheams/authFormsSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import getCsrfToken from '../../utils/getCsrfTooken';
import Icon from '../../utils/getIcon';
import cleanPayload from '../../utils/cleanPayload';

const PersonalInfo = () => {
    const {user} = useContext(AuthContext)

    const [EditMode, setEditMode] = useState(false)
    const [ updateError, setUpdateError] = useState<string | null>(null);

    const creationDate = new Date(user.createdAt)

    const formattedDateString = creationDate.toLocaleDateString('en-GB', {day: '2-digit',month: '2-digit',year: 'numeric'});

    const { 
        register, 
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(updatedDataSchema),
        defaultValues: {
            username: user.username,
            email: user.email,
            currentPassword: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: any) => {
        try {
            const token = await getCsrfToken();
            const payload = cleanPayload(data);
            await axios.put(`${import.meta.env.VITE_API_URL}/api/user/${user.id}`, payload, {     withCredentials: true,     headers: { 'x-csrf-token': token } });
            setUpdateError(null);
            setEditMode(false);
            window.location.reload();
        } catch (error: any) {
            console.error('Update error:', error);
            const errorMessage = error.response?.data?.message || 'Update failed';
            setUpdateError(errorMessage);
        }
    };

    return (
        <>
            {EditMode ?
                <form className={`${style.profileInfo} ${style.editMode}`} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h2>Edit Personal Info</h2>
                        <p>Update your personal information and password</p>
                    </div>

                    <div className={style.infoItem}>
                        <label htmlFor="username">User Name: </label>
                        <input id="username" {...register('username')} />        
                    </div>
                    {errors.username && (
                        <div className={style.errorContainer}>
                            <Icon name="warning" className={style.warningIcon} />
                            <p className={style.errorMessage}>{errors.username.message}</p>
                        </div>
                    )}

                    <div className={style.infoItem}>
                        <label htmlFor="email">Email: </label>
                        <input id="email" {...register('email')}  />
                    </div>
                    {errors.email && (
                        <div className={style.errorContainer}>
                            <Icon name="warning" className={style.warningIcon} />
                            <p className={style.errorMessage}>{errors.email.message}</p>
                        </div>
                    )}

                    <div className={style.infoItem}>
                        <label htmlFor="currentPassword">Current Password: </label>
                        <input id="currentPassword" type="password" {...register('currentPassword')} />
                    </div>
                    {errors.currentPassword && (
                        <div className={style.errorContainer}>
                            <Icon name="warning" className={style.warningIcon} />
                            <p className={style.errorMessage}>{errors.currentPassword.message}</p>
                        </div>
                    )}

                    <div className={style.infoItem}>
                        <label htmlFor="password">New Password: </label>
                        <input id="password" type="password" {...register('password')} />
                    </div>
                    {errors.password && (
                        <div className={style.errorContainer}>
                            <Icon name="warning" className={style.warningIcon} />
                            <p className={style.errorMessage}>{errors.password.message}</p>
                        </div>
                    )}

                    <div className={style.infoItem}>
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input id="confirmPassword" type="password" {...register('confirmPassword')} />
                    </div>
                    {errors.confirmPassword && (
                        <div className={style.errorContainer}>
                            <Icon name="warning" className={style.warningIcon} />
                            <p className={style.errorMessage}>{errors.confirmPassword.message}</p>
                        </div>
                    )}

                    <div className={style.infoItem}>
                        <label htmlFor="">Account creation Date: </label>
                        <span>{formattedDateString}</span>
                    </div>

                    <div className={style.actionButtons}>
                        <button className={style.actionButton} onClick={() => {reset(); setEditMode(false)}}>Cancel</button>
                        <button className={style.actionButton} type='submit' >Save Changes</button>
                    </div>
                </form>
                :
                <div className={style.profileInfo}>
                    <div>
                        <h2>Personal Info</h2>
                        <p>Update your personal information and password</p>
                    </div>
                    <div className={style.infoItem}>
                        <label>User Name: </label>
                        <span>{user.username}</span>        
                    </div>

                    <div className={style.infoItem}>
                        <label>Email: </label>
                        <span>{user.email}</span>
                    </div>

                    <div className={style.infoItem}>
                        <label>Password: </label>
                        <span>********</span>
                    </div>

                    <div className={style.infoItem}>
                        <label>Account creation Date: </label>
                        <span>{formattedDateString}</span>
                    </div>
                    {updateError && (
                        <div className={style.errorContainer}>
                            <Icon name="warning" className={style.warningIcon} />
                            <p className={style.errorMessage}>{updateError}</p>
                        </div>
                    )}

                    <div className={style.actionButtons}>
                        <button className={style.actionButton} onClick={() => setEditMode(true)}>Update Info</button>
                    </div>
                </div>
            }
        </>
    )
}

export default PersonalInfo