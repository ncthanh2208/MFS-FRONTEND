import React, { useState, useEffect } from 'react';
import NavbarIndex from '../components/nav-bar/IndexNavbar';
import UpdateFileIndex from '../components/files/updatefile/UpdateFileIndex'
const FileUpdatePage = () => {
    return(
        <>
        <NavbarIndex/>
        <UpdateFileIndex/>
        </>
    )
}



export default FileUpdatePage;