import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefresToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        };


        //if no access token
        !auth?.accessToken ? verifyToken() : setIsLoading(false);
    }, []);


    useEffect(() => {
        console.log('isLoading', isLoading);
        console.log('token', auth?.accessToken);

    }, [isLoading]);



    return (
        <>
            {isLoading ? <h1>Loading...</h1> : <Outlet />}
        </>
    )



};

export default PersistLogin;