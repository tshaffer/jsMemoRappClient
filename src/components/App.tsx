import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import {
  loadTags
} from '../controllers/tags';

import { createHashHistory } from 'history';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface AppProps {
  onShowActivities: () => any;
  onLoadTags: () => any;
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

    const hashHistory = createHashHistory();
    hashHistory.push('/home');
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
    // onShowActivities: loadSummaryActivities,
    onLoadTags: loadTags,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
