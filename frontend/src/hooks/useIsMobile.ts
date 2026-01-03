import { useState, useEffect } from "react";


const useIsMobile = (breakPoint=768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakPoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakPoint);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [breakPoint]);

    return isMobile;
};

export default useIsMobile;