import React, { useState, useEffect } from 'react';
import Http from '../../http/apiService';
import { StyleFileIndex } from './StyleFileIndex'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import {TextField} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const FileIndex = (props) => {
    let history = useHistory();
    const [data, setData] = useState([]);
    const [count, setCount] = useState();
    const GetFile = async () => {
        const resp = await Http.getSth('/files?page=1')
        setData(resp.data.fileModel);
        let page =Math.floor(resp.data.count/6);
        if(resp.data.count%6 !== 0){
            page = page +1;
        } 
        setCount(page);

    }

    const downLoad = async (id) => {
        if (localStorage.getItem('username') === null) {
            alert('You need to log in to download files')
            history.push('/');
        } else {
            const url = 'http://localhost:9191/files/'+localStorage.getItem('username')+'/download/' + id;
            window.open(url, "_blank");
        }
    }

    const viewFile = (id) => {
        history.push(`/file/${id}`);
    }

    useEffect(() => {
        GetFile();
    }, []);

    //----------------------------------------------------------------
    const [value, setValue] = useState({
        uname: '',
    });
    const handleOnChage = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value,
                        
        })
    }
    const searchByName = (name) => {
        const url = '/user/' + name;
        history.push(`${url}`);
    }
    //----------------------------------------------------------------
    const [category, setCategory] = useState({
        category: '',
    });
    const handleOnChageCategory = (event) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value,
                        
        })
    }
    const searchByCategory = (category) => {
        const url = '/category/' + category;
        history.push(`${url}`);
    }

    //----------------------------------------------------------------

    const uploadFile =()=>{
        if(localStorage.getItem('username') === null){
            alert('You need to log in to upload files')
        }else{
            history.push('/upload')
        }
    }

    //----------------------------------------------------------------
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
                            </Paper>
                        </Grid>
                    )
                }
                )
                }
            </React.Fragment>
        );
    }

    const handleOnchage =  async(event, newPage) => {
        const resp = await Http.getSth(`/files?page=${newPage}`);
        if (resp.data) {
            setData(resp.data.fileModel );
        }
    }
    return (
        <StyleFileIndex >
            <div className="file-view container-fluid">
                <div>
                <Button variant="contained" className="btn-upload" onClick={uploadFile}>UpLoad File</Button>
                </div>
                <div className="container-fluid row search-box">
                    <div className="searchByName col-sm">
                        <TextField id="outlined-basic" label="Search By Name" variant="outlined" onChange={handleOnChage} value={value.uname} name="uname" />
                        <Button className="btn-search" onClick={() => searchByName(value.uname)} >Search</Button>
                    </div>

                    <div className="searchByCategory col-sm">
                        <TextField id="outlined-basic" label="Search By Category" variant="outlined" onChange={handleOnChageCategory} value={category.category} name="category" />
                        <Button className="btn-search" onClick={() => searchByCategory(category.category)} >Search</Button>
                    </div>
                    
                </div>
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
    )
}


export default FileIndex;