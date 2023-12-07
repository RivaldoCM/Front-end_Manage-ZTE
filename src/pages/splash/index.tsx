import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function SplashScreen(){
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async() => {
            const token = localStorage.getItem('Authorization');

            if (token) {
                const jwtDecoded = jwtDecode(token);
                navigate('/');
            }

            navigate('login');
        }
    }, []);
}