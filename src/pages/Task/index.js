import React, { Component, Fragment } from 'react';

import Header from '../../components/Header'
import Content from '../../components/Task'

export default class Task extends Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <Fragment>
                <Header />
                <Content id={id} />
            </Fragment>
        );
    }
}