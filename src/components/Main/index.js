import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newBoard, boardCollection } from '../../actions/boardsActions';
import CreateTask from './CreateTask';
import Test from './Task';

import './style.css';

class Main extends Component {
    state = {
        creating: false,
        text: {
            default: 'Create a new board...',
            clicked: 'Creating a board'
        },
        valid: true
    }

    handleCreate = () => {
        this.setState({
            creating: true
        })
    }

    handleClickCancel = (e) => {
        this.setState({
            creating: false,
            valid: true
        })
        this._task.value = '';          //clear input after saving
        e.stopPropagation();
    }

    handleClickSave = (e) => {
        const { newBoard, boardCollection } = this.props;
        const { valid } = this.state;
        const value = this._task.value.trim();

        if (value.length > 1 && valid) {
            const obj = {
                id: (new Date()).valueOf(),
                name: this._task.value,
                tasks: []
            };

            this.setState({
                creating: false
            })
            this._task.value = '';          //clear input after saving

            newBoard(obj);
            boardCollection(obj);
            e.stopPropagation();
        } else {
            this.setState({
                valid: false
            })
        }
    }

    handleValidation = () => {
        const value = this._task.value.trim();
        let validation = false;

        if (value.length < 1) {
            validation = false;
        } else {
            validation = true;
        }

        this.setState({
            valid: validation
        })
    }

    render() {
        const { data } = this.props;
        const { creating, text, valid } = this.state;
        const value = creating ? text.clicked : text.default;
        const creatingDisplay = creating ? 'flex' : 'none';
        return (
            <div className='main'>
                <CreateTask
                    value={value}
                    creatingDisplay={creatingDisplay}
                    refs={node => this._task = node}
                    handleCreate={this.handleCreate}
                    handleClickCancel={this.handleClickCancel}
                    handleClickSave={this.handleClickSave}
                    valid={this.handleValidation}
                    error={valid}
                />
                <div className='main-wrapper'>
                    {
                        data.map(({ id, name }) => {
                            return (
                                <Test
                                    key={id}
                                    id={id}
                                    name={name}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.boardCollection
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    newBoard,
    boardCollection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main);