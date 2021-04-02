import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Fade, Backdrop } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { StyleSignIn } from './StyleSignIn'
import Http from '../../../http/apiService';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const SignInButton = () => {
    const classes = useStyles();
    let history = useHistory();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({
        username: '',
        password: '',
    });
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSignin = async () => {
        const resp = await Http.postSth('/authenticate', value)
        if (resp.statusCode === 200) {
            localStorage.setItem('token', 'Bearer' + " " + resp.data.token)
            localStorage.setItem('username', value.username)
            localStorage.setItem('role', resp.data.role)
            localStorage.setItem('level', resp.data.level)         
            if (localStorage.getItem('role') === 'ROLE_USER') {
                history.push('/');  
            } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
                history.push('/admin');
            }
        }

    }
    const handleOnChage = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value,
        })
    }
    const body = (
        <StyleSignIn className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <span>Sign In</span>
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={handleOnChage} value={value.username} name="username" />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" onChange={handleOnChage} value={value.password} name="password" />
                <Button className="btn-signin" onClick={handleSignin}>Sign in</Button>
            </form>
        </StyleSignIn>
    );
    return (
        <React.Fragment>
            <Button className="btn-signin" onClick={handleOpen}>Sign in</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Modal
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {body}
                </Modal>
            </Modal>
        </React.Fragment>
    );
}

export default SignInButton;