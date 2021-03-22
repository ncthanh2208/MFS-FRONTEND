import React from 'react';
import NavbarIndex from '../components/nav-bar/IndexNavbar';
import DashBoard from '../components/dashboard/DashBoardIndex'
import UpdateUserIndex from '../components/users/updateUser/UpdateUserIndex'
const UpdateUserPage = () => {
    return (
        <React.Fragment>
        {localStorage.getItem('role') === 'ROLE_ADMIN' ? (
                  <DashBoard/>
                   ): <NavbarIndex/>}  
        <UpdateUserIndex/>          
        </React.Fragment>
    );
}

export default UpdateUserPage;