import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";

import Main from '../../components/Main';
import Header from '../../components/Header'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Route path="/" component={Main} />
            </Fragment>
        );
    }
}

export default App;
