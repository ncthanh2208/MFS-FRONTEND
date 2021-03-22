import React, { useState, useEffect } from 'react';
import Http from '../../../http/apiService';
import { TextField, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const UpdateUserIndex = () => {
    const classes = useStyles();
    let history = useHistory();
    const [data, setData] = useState();
    const GetUserInfo = async () => {
        const currentHref = window.location.href.split('/');
        const name = currentHref[currentHref.length - 1];
        const url = '/users/' + name;
        const resp = await Http.getSth(url)
        setData(resp.data);
    }

    useEffect(() => {
        GetUserInfo();
    }, []);
    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value, [event.target.name]: event.target.value});
    }

    const handleUpdateUser =async() => {
        const url = '/users/'+ data.id;
        const resp = await Http.putSth(url,data);
        alert("Succesfulllll!!!!!!!!!!!!!!!!!!!!!")
        history.push('/admin')
    }

    return (
        <div>
            <div>
                {data && <TextField className="inputText" id="standard-basic" label="User Name" defaultValue={`${data.userName}`} disabled />}
            </div>
            <div>
            {data && <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">ROLE</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data?.role}
                    onChange={handleChange}
                    displayEmpty
                    name="role"
                    >
                    <MenuItem value="ROLE_USER">ROLE_USER</MenuItem>
                    <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
                </Select>
            </FormControl>}
            </div>
            <div>
            {data && <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">LEVEL</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data?.level}
                    onChange={handleChange}
                    displayEmpty
                    name="level"
                    >
                    <MenuItem value="Bronze">Bronze</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                    <MenuItem value="Gold">Gold</MenuItem>
                </Select>
            </FormControl>}
            </div>
            <div>
                {data && <TextField className="inputText" id="standard-basic" label="User Name" defaultValue={`${data.email}`} disabled />}
            </div>
            <Button onClick={handleUpdateUser}>Update</Button>
        </div>
    );
}

export default UpdateUserIndex;