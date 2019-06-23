import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeBoardCollection } from '../../../actions/boardsActions';

import './style.css';

class Test extends Component {
    handleRemoveTask = (e) => {
        const { removeBoardCollection } = this.props;
        removeBoardCollection(this.props.id);
        e.preventDefault();
    }

    render() {
        const { id, name } = this.props;
        return (
            <Link to={`/${id}`} className='main-create__navlink'>
                <img
                    src="http://cdn3.iconfinder.com/data/icons/iconic-1/32/x_alt-128.png"
                    title='close'
                    alt="X"
                    className='main-create__close'
                    onClick={this.handleRemoveTask}
                />
                <h2
                    className='main-create__plans'
                >
                    {name}
                </h2>
            </Link>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.boardCollection
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    removeBoardCollection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Test);