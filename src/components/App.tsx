import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import {
  loadTags
} from '../controllers/tags';

// import { createHashHistory } from 'history';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface AppProps {
  onShowActivities: () => any;
  onLoadTags: () => any;
}

class App extends React.Component<AppProps> {

  constructor(props: any) {

    super(props);

    (this as any).userName = React.createRef();
    // (this as any).password = React.createRef();

    console.log('pizza69');

    // this.handleShowActivities = this.handleShowActivities.bind(this);
  }

  componentDidMount() {
    this.handleLoadTags();
  }

  handleLoadTags() {
    this.props.onLoadTags();
  }

  // handleShowActivities() {
  //   // console.log('handleShowActivities');
  //   // this.props.onShowActivities();
  //   const hashHistory = createHashHistory();
  //   hashHistory.push('/activities');
  // }

  flibbet(e: any) {
    console.log(e);
    console.log('userName');
    console.log((this as any).userName);
    console.log((this as any).userName.current);
    console.log('password');
    console.log((this as any).password.current);
  }

  // <TextField ref={(this as any).userName} required id="standard-required" label="User name" />
  // <TextField inputRef={(this as any).userName} required id="standard-required" label="User name" />

  render() {
    return (
      <HashRouter>
        <div>
          <h2>MemoRapp</h2>
          <h3>Login</h3>
          <form noValidate autoComplete="off">
            <div>
            <TextField ref={(this as any).userName} required id="standard-required" label="User name" />
            </div>
            <div>
              <TextField
                inputRef={(this as any).password}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </form>
          <Button
            variant="contained"
            onClick={e => this.flibbet(e)}
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
