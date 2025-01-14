import { useState, useEffect } from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkIsMobile = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        };
    
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
    
        return () => {
        window.removeEventListener("resize", checkIsMobile);
        };
    }, []);
    
    return isMobile;
    }
    