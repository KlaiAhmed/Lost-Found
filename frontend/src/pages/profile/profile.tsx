import style from './profile.module.css'
import PersonalInfo from '../../components/personalInfo/personalInfo';

const ProfilePage = () => {


    return (
        <>
            <div className={style.profileContainer}>
                <PersonalInfo />
            </div>
        </>
    )
}

export default ProfilePage