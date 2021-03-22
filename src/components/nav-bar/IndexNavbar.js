import React from 'react';
import {Snavbar} from './StyleNavBar';
import LoginIndex from '../login/LoginIndex';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
const NavbarIndex = () => {
    let history = useHistory();
    const handleAdminView=()=>{
        history.push("/admin");
    };
    const BackHome=()=>{
        history.push("/");
    };
    return (
        <Snavbar className="container-fluid">
            <div className="row">
            <div className="col-6">
                <span className="logo" onClick={BackHome}>MFS</span>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
               <LoginIndex/>
               {localStorage.getItem('role') === 'ROLE_ADMIN' ? (
                   <Button className='btn-adminview' onClick={handleAdminView}>Admin View</Button>
                   ): null}
            </div>
            </div>           
        </Snavbar>
    )
}

export default NavbarIndex;
