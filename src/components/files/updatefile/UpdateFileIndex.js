
import React, { useState, useEffect } from 'react';
import Http from '../../../http/apiService';
import { TextField, MenuItem, Select, InputLabel } from '@material-ui/core';

import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";


const UpdateFileIndex = () => {

    let history = useHistory();
    const [data, setData] = useState();
    const [infoFile, setInfoFile] = useState();

    const GetFile = async () => {
        const currentHref = window.location.href.split('/');
        const id = currentHref[currentHref.length - 1];
        const url = '/files/getfile/' + id;
        const resp = await Http.getSth(url)
        setData(resp.data);
    }   
    
    const handleChange = (event) => {
        setInfoFile({...infoFile, [event.target.name]: event.target.value, [event.target.name]: event.target.value});
    }

    const handleUpdateFile =async () => {
        const url = '/files/'+ data.id;
        const response = await Http.putSth(url,infoFile)

        alert("Successful!!!!!")
        const urlHistory = '/user/'+data.userName;
        history.push(urlHistory);
    }

    useEffect(() => {
        GetFile();
    }, []);
    return(
        <>
            <div>
                {data && <TextField  id="standard-basic" label="File Name" disabled defaultValue={data?.name} />}
            </div>
            <div>
                {data && <TextField  id="standard-basic" label="Category" onChange={handleChange} defaultValue={data?.category} name='category'/>}
            </div>
            <div>
                {data && <TextField  id="standard-basic" label="Comment" onChange={handleChange} defaultValue={data?.comment} name='comment'/>}
            </div>
            <Button onClick={handleUpdateFile} >Update</Button>
        </>
    )
}



export default UpdateFileIndex;