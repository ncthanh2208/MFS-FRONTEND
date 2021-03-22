import React, { useState, useEffect } from 'react';
import Http from '../../http/apiService';
import { StyleFileIndex } from '../files/StyleFileIndex'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import NavbarIndex from '../nav-bar/IndexNavbar'
import Pagination from '@material-ui/lab/Pagination';

const UserIndex = () => {
    let history = useHistory();
    const [data, setData] = useState([]);
    const [name, setName] = useState();
    const [count, setCount] = useState();
    const GetFile = async () => {
        const currentHref = window.location.href.split('/');
        const name = currentHref[currentHref.length - 1];
        const url = 'files/file/' + name + '?page=1';
        const resp = await Http.getSth(url)
        let page = Math.floor(resp.data.count / 6);
        if (resp.data.count % 6 !== 0) {
            page = page + 1;
        }
        setCount(page);
        setData(resp.data.fileModel);
        setName(name);
    }

    const downLoad = async (id) => {
        const url = 'http://localhost:9191/files/download/' + id;
        window.open(url, "_blank");
    }

    const deleteFile = async (id) => {

        const url = '/files/' + id;
        const resp = await Http.deleteSth(url);
        window.location.reload();
    }

    const updateFile = (id) => {
        const url = '/update/file/' + id;
        history.push(url);
    }

    const viewFile = (id) => {
        history.push(`/file/${id}`);
    }

    useEffect(() => {
        GetFile();
    }, []);
    const handleOnchage = async (event, newPage) => {
        const resp = await Http.getSth(`/files/file/${name}=${newPage}`);
        if (resp.data) {
            setData(resp.data.fileModel);
        }
    }
    function FormRow() {
        return (
            <React.Fragment>
                {data.map((element) => {
                    return (
                        <Grid item xs={4}>
                            <Paper className="box">
                                <p>File Name: {element.name}</p>
                                <p>User: {element.userName}</p>
                                <p>Comment: {element.comment}</p>
                                <Button className="btn-download" onClick={() => downLoad(element.id)}>DownLoad</Button>
                                <Button className="btn-download" onClick={() => viewFile(element.id)}>View File</Button>
                                {localStorage.getItem('username') === name ? (
                                    <>
                                    <Button className="btn-download" onClick={() => deleteFile(element.id)}>Delete</Button>
                                    <Button className="btn-download" onClick={() => updateFile(element.id)}>Update</Button>
                                    </>
                                ) : null}
                            </Paper>
                        </Grid>
                    )
                }
                )
                }
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <NavbarIndex />
            <StyleFileIndex className="container-fluid" >
                <div className="file-view">
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={2}>
                            <FormRow />
                        </Grid>
                    </Grid>
                    <div className="row d-flex justify-content-center mt-5">
                        <Pagination count={count} onChange={handleOnchage} />
                    </div>
                </div>
            </StyleFileIndex>
        </React.Fragment>
    )
}

export default UserIndex;