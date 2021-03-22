import React from 'react';
import UploadForm from '../components/upload/UploadIndex'
import NavbarIndex from '../components/nav-bar/IndexNavbar'
const UpLoadPage = () => {
    return (
        <React.Fragment>
            <NavbarIndex/>
            <UploadForm />
        </React.Fragment>
    );
}
export default UpLoadPage;