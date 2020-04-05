import * as React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import {
  loadTags
} from '../controllers/tags';

import { createHashHistory } from 'history';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { validateUser } from '../controllers/user';
import { setUser } from '../models/user';
import { User } from '../types';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     paper: {
//       width: '100%',
//       marginBottom: theme.spacing(2),
//     },
//     table: {
//       minWidth: 750,
//     },
//     tableColumnNarrowWidth: {
//       width: '32px',
//     },
//     tableColumnMediumWidth: {
//       width: '64px',
//     },
//     tableColumnWideWidth: {
//       width: '192px',
//     },
//     tableButtonColumnWidth: {
//       width: '48px',
//     },
//   }),
// );

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

interface LoginProps {
  onLoadTags: () => any;
  onSetUser: (user: User) => any;
}

const Login = (props: LoginProps) => {

  const [userNameState, setUserName] = useState('');
  const [passwordState, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const { onLoadTags, onSetUser } = props;

  console.log('pizza69');

  useEffect(() => {
    onLoadTags();
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = (e: any) => {

    console.log(userNameState);
    console.log(passwordState);

    validateUser(userNameState, passwordState)
      .then((user: User) => {
        console.log('validation successful: ', user);
        onSetUser(user);
        const hashHistory = createHashHistory();
        hashHistory.push('/home');
      }).catch((err: Error) => {
        alert('Login unsuccessful');
      });
  }

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Login</h3>
        <form noValidate autoComplete='off'>
          <div>
            <TextField
              required id='standard-required'
              label='User name'
              onChange={handleUserNameChange}
            />
          </div>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor='standard-adornment-password'>Password</InputLabel>
            <Input
              id='standard-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={passwordState}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div>
            <TextField
              id='standard-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              onChange={handlePasswordChange}
            />
          </div>
        </form>
        <Button
          variant='contained'
          onClick={e => handleSignIn(e)}
        >
          Sign In
          </Button>
      </div>
    </HashRouter>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
