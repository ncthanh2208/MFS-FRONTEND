import React from 'react';
import { Button } from '@material-ui/core';
import {StyleLogoutButton} from '../logout/StyleLogout';
import { Link, useHistory } from "react-router-dom";



const LogoutIndex = ()=>{
    let history = useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('token'); 
        localStorage.removeItem('role'); 
        localStorage.removeItem('level'); 
        history.push("/");
    };
    const handleAdminView=()=>{
        history.push("/admin");
    };
    const UserHome=()=>{      
        history.push(`/user/${localStorage.getItem('username')}`);
        window.location.reload();
    }

    return(
        <StyleLogoutButton>
            <span className="userName" onClick={UserHome}>Hello, {localStorage.getItem('username')}</span>
         <Button className="btn-logout" onClick={handleLogout}>Log Out</Button>
        </StyleLogoutButton>
    )
}

export default LogoutIndex;