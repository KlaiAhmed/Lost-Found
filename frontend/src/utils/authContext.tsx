import { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasChecked = useRef(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      if (hasChecked.current) return;
      hasChecked.current = true;
      try {
        const csrfToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrf_token='))
          ?.split('=')[1];
        
        console.log("CSRF Token:", csrfToken);

        const res = await axios.get(import.meta.env.VITE_API_URL + '/api/auth/me', {
          withCredentials: true,
          headers: { 'x-csrf-token': csrfToken },
        });

        console.log("Auth response data:", res.data);

        setUser(res.data.user);
        console.log("Authenticated user:", res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<{ user: any; setUser: any; loading: boolean }>({user: null,setUser: () => {},loading: true});
