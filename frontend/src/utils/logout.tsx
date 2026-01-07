import axios from "axios";

type LogoutProps = {
    setUser: (user: any) => void;
};

const logOut = async ({ setUser }: LogoutProps) => {
    try {
        await axios.post(import.meta.env.VITE_API_URL + '/api/auth/signout', {} , { withCredentials: true })
        window.location.href = '/';
        setUser(null);
    } catch (error) {
        console.error('There was an error logging out!', error);
    }
};

export default logOut;