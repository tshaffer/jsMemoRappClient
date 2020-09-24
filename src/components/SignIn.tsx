// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

import { isNil, isString } from 'lodash';

import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  loadTags
} from '../controllers/tags';

import { createHashHistory } from 'history';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { validateUser } from '../controllers/user';
import { setUser } from '../models/user';
import { User } from '../types';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        MemoRappAtronics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
  margin: {
    marginLeft: '0px',
  },
  padding: {
    paddingLeft: '14px',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

}));

interface LoginProps {
  onLoadTags: () => any;
  onSetUser: (user: User) => any;
}

const SignIn = (props: LoginProps) => {

  const classes = useStyles();

  const [_isInitialized, setIsInitialized] = useState(false);
  // const [_userNameState, setUserName] = useState('ted');
  // const [_passwordState, setPassword] = useState('letTedIn');
  const [_userNameState, setUserName] = useState('');
  const [_passwordState, setPassword] = useState('');
  const [_showPassword, setShowPassword] = useState(true);
  const [_rememberMe, setRememberMe] = useState(false);

  const { onLoadTags, onSetUser } = props;

  if (!_isInitialized) {
    if (isString(localStorage.rememberMe)) {
      const rememberMe: boolean = localStorage.rememberMe === 'true';
      setRememberMe(rememberMe);
      if (!rememberMe) {
        setUserName('');
        setPassword('');
      } else {
        setUserName(localStorage.userName);
        setPassword(localStorage.password);
      }
    }
    setIsInitialized(true);
  }

  console.log('pizza69');

  // if (localStorage.checkbox) {
  //   console.log('localStorage.checkbox === true');
  //   if (localStorage.checkbox !== '') {
  //     console.log('localStorage.checkbox !== ""');
  //   }
  //   else {
  //     console.log('localStorage.checkbox === ""');
  //   }
  // } else {
  //   console.log('localStorage.checkbox === false');
  // }

  useEffect(() => {
    console.log('useEffect');
    onLoadTags();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!_showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
    if (_rememberMe) {
      localStorage.userName = e.target.value;
    }
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (_rememberMe) {
      localStorage.password = e.target.value;
    }
  };

  const handleRememberMeChecked = (event: any) => {
    console.log('Remember me: ' + event.target.checked);
    setRememberMe(event.target.checked);
    localStorage.rememberMe = event.target.checked ? 'true' : 'false';
    localStorage.userName = event.target.checked ? _userNameState : '';
    localStorage.password = event.target.checked ? _passwordState : '';
  };

  const handleSignIn = (e: any) => {

    console.log(_userNameState);
    console.log(_passwordState);

    validateUser(_userNameState, _passwordState)
      .then((user: User) => {
        console.log('validation successful: ', user);
        localStorage.rememberMe = _rememberMe ? 'true' : 'false';
        localStorage.userName = _rememberMe ? _userNameState : '';
        localStorage.password = _rememberMe ? _passwordState : '';
        onSetUser(user);
        const hashHistory = createHashHistory();
        hashHistory.push('/home');
      }).catch((err: Error) => {
        alert('Login unsuccessful');
      });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    handleSignIn(e);
  };

  console.log('render');

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          MemoRapp Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            value={_userNameState}
            id='userName'
            label='User Name'
            name='userName'
            autoComplete='userName'
            autoFocus
            onChange={handleUserNameChange}
          />
          <FormControl className={'MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl'}>
            <InputLabel htmlFor='standard-adornment-password' className={classes.padding}>Password *</InputLabel>
            <OutlinedInput
              id='standard-adornment-password'
              type={_showPassword ? 'text' : 'password'}
              value={_passwordState}
              onChange={handlePasswordChange}
              required
              fullWidth
              name='password'
              autoComplete='current-password'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {_showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={_rememberMe}
                value='remember'
                color='primary'
                onChange={handleRememberMeChecked}
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onLoadTags: loadTags,
    onValidateUser: validateUser,
    onSetUser: setUser,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
