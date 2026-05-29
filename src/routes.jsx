import React, { Suspense } from "react";
import { Routes, Route } from "react-router";

const RequireAuth = React.lazy(() => import("./components/RequireAuth"));

const Register = React.lazy(() => import("./components/auth/Register"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Main = React.lazy(() => import("./components/Main"));
const Users = React.lazy(() => import("./components/users"));
const PersistLogin = React.lazy(() => import("./components/PersistLogin"));


const _Routes = () => {
    return (

        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            
            {/* PersistLogin is a component that persists the user login */}
            {/* RequireAuth is a component that checks if the user is logged in */}
           <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Main />} />   
                    <Route path="/users" element={<Users />} />
                </Route>
            </Route>

       
           

            </Routes>
        </Suspense>
    )
}

export default _Routes;