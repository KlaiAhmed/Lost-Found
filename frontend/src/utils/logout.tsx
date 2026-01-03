import axios from "axios";
import getCsrfToken from "./getCsrfTooken";

const logOut = async () => {
    const csrfToken = await getCsrfToken();
    axios.post('/api/logout', { withCredentials: true, headers:{ 'x-csrf-token': csrfToken } })
        .then( () => {
            console.log('User logged out');
        })
        .catch(error => {
            console.error('There was an error logging out!', error);
        });
}

export default logOut;