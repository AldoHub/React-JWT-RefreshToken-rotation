import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router';

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const userRef = useRef(); //for focus on the input
    const errRef = useRef(); //for error messages
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [sucessMsg, setSucessMsg] = useState('');

    //for first loading
    useEffect(() => {
        //set the focus on the input
        userRef.current.focus();
    },[] );
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);


    //TODO --- change the form to not handle state for the form data

    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log(user, pwd);
    
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                user,
                pwd
            })
        }).catch(err => {
            console.log(err);
            return null;
        });

        console.log("RESPONSE", response);
 
     
        if (response === null) {
            setErrMsg("Something went wrong...");

        }else{
            const userData = await response.json();
            console.log("RESPONSE", userData);
            if(response.status === 401){ 
                setErrMsg("Invalid username or password");
                return;
            }

            if(response.status === 200){
                setAuth(userData);
                //console.log(userData);
                navigate(from, { replace: true });
            }

        }

        

    }

    return (
        <section>

            {/* for error messages */}
            <p ref={errRef}>{errMsg}</p>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Username </label>
               
                <input
                    type="text"
                    id="user"
                    name="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    ref={userRef}
                    required
                />
                 
                <label htmlFor="user">Pasword </label>
                   
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                
                <button type="submit" disabled={user === '' || pwd === ''}>Login</button>
            </form>

            <p>You dont have an account? <Link to="/auth/register">Register</Link></p>
        </section>
    );
}

export default Login;