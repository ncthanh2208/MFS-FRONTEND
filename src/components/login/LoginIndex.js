import React, { useEffect, useState } from 'react';
import SignInButton from './signin/ModalSignIn';
import { Button } from '@material-ui/core';
import { StyleLoginButton } from './StyleLogin';
import { Link, useHistory } from "react-router-dom";
import LogoutIndex from '../login/logout/LogoutIndex';

const LoginIndex = () => {
    let history = useHistory();
    const [login, setLogin] = useState(false);
    const checkLogin = localStorage.getItem('username');
    useEffect(() => {
        if (checkLogin) {
            setLogin(true)
        }else{
            setLogin(false)
        }
    }, [checkLogin]);

    const HandClick = () => {
        history.push("/register");
    }
    return (
        <>
            {login ? <LogoutIndex/> : <StyleLoginButton>
                <SignInButton />
                <Button className="btn-signup" onClick={HandClick}>Sign up</Button>
            </StyleLoginButton>}
        </>
    );
}

export default LoginIndex;