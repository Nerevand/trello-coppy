import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { boardCollection } from '../actions/boardsActions';

import Main from './Started';
import Task from './Task';

class App extends Component {
  componentDidMount() {
    const { boardCollection } = this.props;
    if (this.props.data.length === 0) {
      if (JSON.parse(localStorage.getItem('store'))) {
        const store = JSON.parse(localStorage.getItem('store')).boardCollection
        store.forEach(item => {
          boardCollection(item);
        });
      }
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/:id' component={Task} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.boardCollection
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  boardCollection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
