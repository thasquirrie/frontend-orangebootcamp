import { Outlet, Navigate } from "react-router-dom"

function AuthRequired() {

    const retrievedKey = localStorage.getItem('accessToken')
    let isLoggedIn = false
    retrievedKey ? isLoggedIn = true : isLoggedIn = false

    if (!isLoggedIn) {
        return (
            <Navigate 
                to="/SignUp" 
                replace
            />)
    }
    return <Outlet />
}

export default AuthRequired;