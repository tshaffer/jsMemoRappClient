import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import {
  loadTags
} from '../controllers/tags';

// import { createHashHistory } from 'history';

// import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export interface AppProps {
  onShowActivities: () => any;
  onLoadTags: () => any;
}

class App extends React.Component<AppProps> {

  constructor(props: any) {

    super(props);

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

  render() {



    return (
      <HashRouter>
        <div>
          <h2>MemoRapp</h2>
          <h3>Login</h3>
          <form noValidate autoComplete="off">
            <div>
              <TextField required id="standard-required" label="User name" />
            </div>
            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </form>
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
