import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Users = () => {
   const [users, setUsers] = useState([]);
   const { auth } = useAuth();

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
            'credentials': 'include',
            'Authorization': `Bearer ${auth.accessToken}`
        }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);
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