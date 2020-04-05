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

import { makeStyles } from '@material-ui/core/styles';

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
  const [showPassword, setShowPassword] = useState(true);

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
  };

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    handleSignIn(e);
  };

  return (
    <HashRouter>
      <div>
        <h2 className={clsx(classes.margin)}>MemoRapp</h2>
        <h3 className={clsx(classes.margin)}>Login</h3>
        <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
          <div>
            <TextField
              required id='standard-required'
              label='User name'
              className={clsx(classes.margin, classes.textField)}
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
            <Button
              type='submit'
              variant='contained'
              className={clsx(classes.margin)}
            >
              Sign In
          </Button>
          </div>
        </form>
      </div>
    </HashRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
