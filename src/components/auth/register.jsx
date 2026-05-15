import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef(); //for focus on the input
    const errRef = useRef(); //for error messages

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
   
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
   
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [sucessMsg, setSucessMsg] = useState('');
   
    //for first loading
    useEffect(() => {
        //set the focus on the input
        userRef.current.focus();
    },[] );
    
    //for user state
    useEffect(() => {
        const nameResult = USER_REGEX.test(user);
        console.log(nameResult);
        console.log(user);

        setValidName(nameResult);

    }, [user]);

    //for pwd state
    useEffect(() => {
        const pwdResult = PWD_REGEX.test(pwd);
        console.log(pwdResult);
        console.log(pwd);
        setValidPwd(pwdResult);

        const isPwdMatch = pwd === matchPwd;
        setValidMatch(isPwdMatch);

    }, [pwd, matchPwd]);

    //for error messages
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
    

        const response = await fetch('http://localhost:3000/register', {
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
        
        if (response === null) {
            setErrMsg("Something went wrong");
        }else{
            const userData = await response.json();
            console.log(userData);
            setSucessMsg("Registered!!");
        }


      
        }

    return (
        <section>
            {/* for error messages */}
            <p ref={errRef}>{errMsg}</p>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Username </label>
                {user !== '' &&
                    <span>{validName ? '✔' : '❌'}</span>
                }
                <input
                    required
                    type="text"
                    id="user"
                    name="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    ref={userRef}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                  {user !== '' &&
                     <p>{validName ? '' : 'Username must be 3-30 characters long and contain only letters, numbers, underscores, and dashes.'}</p>
                  }
                <label htmlFor="user">Pasword </label>
                    { pwd !== '' && 
                        <span>{validPwd ? '✔' : '❌'}</span>
                    }
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                  { pwd !== '' && 
                <p id="pwdnote">{validPwd ? '' : 'Password must be 8-24 characters long and contain only letters, numbers, and special characters.'}</p>
                  }
                <label htmlFor="match">Confirm Password</label>
                   {matchPwd !== '' && 
                        <span>{validMatch ? '✔' : '❌'}</span>
                    }
                  <input
                    type="password"
                    id="match"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="matchnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                  {matchPwd !== '' && 
                    <p id="matchnote">{validMatch ? '' : 'Passwords must match.'}</p>
                  }
                
                <button type="submit" disabled={!validName || !validPwd || !validMatch}>Register</button>
            </form>

            <p>Already registered? <Link to="/auth/login">Login</Link></p>


        </section>
    );

}


export default Register;


//https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp&index=33