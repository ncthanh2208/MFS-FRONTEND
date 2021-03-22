import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Http from '../../http/apiService';
const SignUpForm = () => {
  let history = useHistory();
  const [value, setValue] = useState({
    userName: '',
    email:'',
    passWord: '',
});
  const handleOnChage = (event) => {
    setValue({
        ...value,
        [event.target.name]: event.target.value,
    })
}
const handleSignUp = async () => {
  const resp = await Http.postSth('/users', value)
  if (resp.statusCode === 201) {
      alert('Successful');
      history.push("/");
  }

}

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
    const classes = useStyles();
    return(
        <>
     <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div>
          Sign up
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                onChange={handleOnChage}
                value={value.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleOnChage}
                value={value.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passWord"
                label="Password"
                id="passWord"
                autoComplete="password"
                onChange={handleOnChage}
                value={value.passWord}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
        </>
    );
}

export default SignUpForm ;