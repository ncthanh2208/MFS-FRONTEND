import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavbarIndex from '../../nav-bar/IndexNavbar';
import Http from '../../../http/apiService';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import './StyleFile.css';


const FileView = () => {
    let history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState([]);

    const [dataComment, setDataComment] = useState([]);
    const GetFile = async () => {
        const url = '/files/getfile/' + id;
        const resp = await Http.getSth(url)
        setData(resp.data);
    }
    const getComment = async () => {
        const url = '/comments/' + id;
        const resp = await Http.getSth(url);
        setDataComment(resp.data);
    }
    useEffect(() => {
        GetFile();
        getComment();
    }, []);

    const upComment = async () => {
        if(localStorage.getItem('username')===null){
            alert('You need to login to comment')

        }else{
        const url = '/comments/' + localStorage.getItem('username') + '/' + id;
        await Http.postSth(url, value);
        window.location.reload();}
    }

    const [value, setValue] = useState({
        content: '',
    });

    const handleOnChage = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <React.Fragment>
            <NavbarIndex />
            <div className="file-box">
                <p>File Name: {data.name}</p>
                <p>User: {data.userName}</p>
                <p>Comment: {data.comment}</p>

                {dataComment && dataComment.map((element) => {
                    return (
                        <>
                            <div className="comment-box">
                            <span className="style-user">{element.userName}:</span>
                            <span className="style-comment">{element.content}</span>
                            </div>
                        </>
                    )
                }
                )
                }
                <TextField id="outlined-basic" label="Comment" variant="outlined" onChange={handleOnChage} value={value.content} name="content" />

                <Button onClick={upComment}>Comment</Button>
            </div>
        </React.Fragment>
    )
}

export default FileView;