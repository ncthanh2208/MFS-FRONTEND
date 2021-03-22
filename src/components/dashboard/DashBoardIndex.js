import React from 'react';
import {Snavbar} from '../nav-bar/StyleNavBar';
import LogoutIndex from '../login/logout/LogoutIndex';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const DashBoard = () =>{
    let history = useHistory();
    const handleUserView=()=>{
        history.push("/");
    };
     const handleDashBoard=()=>{
        history.push("/admin");
    };
    return(
        <>
        <Snavbar className="container-fluid">
            <div className="row">
            <div className="col-6">
                <span className="logo-admin" onClick={handleDashBoard}>DASH BOARD</span>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
            <LogoutIndex/>
            <Button className="btn-userview" onClick={handleUserView}>User View</Button>
            </div>
            </div>
        </Snavbar>

  </>
    );
}

export default DashBoard;
