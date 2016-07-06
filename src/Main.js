
/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import {teal600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ChatApp from './ChatApp';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal600,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <ChatApp />
      </MuiThemeProvider>
    );
  }
}

export default Main;
