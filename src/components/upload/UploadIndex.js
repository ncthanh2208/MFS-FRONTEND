import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Http from '../../http/apiService';
const UpLoadForm = () => {
    let history = useHistory();
    const [description, setValue] = useState({
        category: '',
        comment: '',
    });
    const [dataFile, setDataFile] = useState();
    const handleOnChage = (event) => {
        setValue({
            ...description,
            [event.target.name]: event.target.value,
        })
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append("file", dataFile)
        const resp = await Http.postSth(`files/${localStorage.getItem('username')}`, formData)
        const url = '/files/'+ resp.data;
        const response = await Http.putSth(url,description);
       if(response.statusCode === 200){
           alert("Upload Successful!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            history.push("/")
       }
        
    }
    const handleUploadFile = (event) => {
        setDataFile(event.target.files[0]);
    }
    return (
        <React.Fragment>
            <input type="file" name="upload" className="upfile" onChange={handleUploadFile} />
            <TextField id="outlined-basic" label="Category" variant="outlined" onChange={handleOnChage} value={description.category} name="category" />
            <TextField id="outlined-basic" label="Comment" variant="outlined" onChange={handleOnChage} value={description.comment} name="comment" />
            <Button className="btn-signin" onClick={upload}>Upload</Button>
        </React.Fragment>
    );
}
export default UpLoadForm;