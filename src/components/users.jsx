import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefresToken';

const Users = () => {
   const [users, setUsers] = useState([]);
   const {auth, setAuth} = useAuth();
   const refresh = useRefreshToken();
   
   //get the Users
   useEffect(() => {
    let mounted = true;
    // console.log(auth);
    
    const controller = new AbortController();
    const { signal } = controller;
    
    
    fetch('http://localhost:3000/employees', {
        signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
        },
        credentials: 'include'
        })
        .then(res => res.json())
        .then(async data => {

            if(data.message){
                //set the new token

                let token = await refresh();
                console.log(token);

                //make a new request with the new token
                fetch('http://localhost:3000/employees', {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(data => {
                    if (mounted) {
                        setUsers(data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });


            }

            if (mounted) {
                setUsers(data);
            }
        })
        .catch(err => {
            console.log(err);
           
        });
 

        return () => {
            mounted = false;
            controller.abort();
        };

   }, [])

    return (
        <section>
            <h1>Users</h1>
            {users?.length ? users.map((user, index) => (   
                <div key={index}>
                    <h2>{user.firstname}</h2>
                    <p>{user.lastname}</p>
                    <hr />
                </div>
            )): <p>No users</p>}
        </section>
    );
}

export default Users;