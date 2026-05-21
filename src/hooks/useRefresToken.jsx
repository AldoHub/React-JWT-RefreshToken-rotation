import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    //console.log('useRefreshToken', auth);

    const refresh = async () => {
        const response = await fetch('http://localhost:3000/refreshToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log("DATA", data);
        //replace the old accessToken with the new one
        setAuth(prev => {
            console.log(prev);
            console.log(data);
            return {...prev, accessToken: data.accessToken};
        });

        //return the new accessToken
        return data.accessToken;
    };
   
    return refresh;
};

export default useRefreshToken;