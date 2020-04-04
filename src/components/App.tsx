import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import {
  loadTags
} from '../controllers/tags';

import { createHashHistory } from 'history';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validateUser } from '../controllers/user';
import { setUser } from '../models/user';
import { User } from '../types';

export interface AppProps {
  onLoadTags: () => any;
  onSetUser: (user: User) => any;
}

interface AppStateProps {
  userName: string;
  password: string;
}

class App extends React.Component<AppProps, AppStateProps> {

  constructor(props: any) {

    super(props);

    this.state = {
      userName: '',
      password: '',
    };

    console.log('pizza69');

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    this.handleLoadTags();
  }

  handleLoadTags() {
    this.props.onLoadTags();
  }

  handleSignIn(e: any) {

    console.log(this.state.userName);
    console.log(this.state.password);

    validateUser(this.state.userName, this.state.password)
      .then((user: User) => {
        console.log('validation successful: ', user);
        this.props.onSetUser(user);
        const hashHistory = createHashHistory();
        hashHistory.push('/home');
      }).catch((err: Error) => {
        alert('Login unsuccessful');
      });
  }

  handleUserNameChange(e: any) {
    this.setState({userName: e.target.value});
  }

  handlePasswordChange(e: any) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h2>MemoRapp</h2>
          <h3>Login</h3>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                required id="standard-required"
                label="User name"
                onChange={this.handleUserNameChange}
              />
            </div>
            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={this.handlePasswordChange}
              />
            </div>
          </form>
          <Button
            variant="contained"
            onClick={e => this.handleSignIn(e)}
          >
            Sign In
          </Button>
        </div>
      </HashRouter>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
