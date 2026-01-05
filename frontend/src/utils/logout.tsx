import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./authContext";

const logOut = async () => {
    const { setUser } = useContext(AuthContext);
    await axios.post(import.meta.env.VITE_API_URL + '/api/auth/signout', {} , { withCredentials: true })
        .then( () => {
            console.log('User logged out');
            window.location.href = '/';
            setUser(null);
        })
        .catch(error => {
            console.error('There was an error logging out!', error);
        });
}

export default logOut;