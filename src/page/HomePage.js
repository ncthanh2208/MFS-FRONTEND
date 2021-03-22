import React from 'react';
import NavbarIndex from '../components/nav-bar/IndexNavbar';
import FileIndex from '../components/files/FileIndex'
const HomePage = () => {
    return (
        <React.Fragment>
            <NavbarIndex/>
            <FileIndex/>
        </React.Fragment>
    );
}

export default HomePage;