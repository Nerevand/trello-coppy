import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { activeBoardCollection, updateBoardCollection } from '../../actions/boardsActions';
import List from './List';

import './style.css';

class Content extends Component {
    state = {
        clicked: false,
        data: this.props.active.tasks
    }

    handleGetData = () => {
        let { id, data, activeBoardCollection } = this.props;
        let arr = data.filter(item => Number(item.id) === Number(id))
        if (arr[0]) {
            activeBoardCollection(arr[0]);
        }
    }

    handleCloseList = () => {
        this.setState({
            clicked: false
        })
    }

    handleAddList = () => {
        this.setState({
            clicked: true
        })
    }

    handleCreateList = (e) => {
        if (e.key === 'Enter') {
            const ipnutBlock = document.getElementById('input-addNew__task');

            if (this._name.value.trim().length > 0) {
                const { data, active, updateBoardCollection, activeBoardCollection } = this.props;

                data.forEach(item => {
                    if (item.id === active.id) {
                        item.tasks.push({
                            id: (new Date()).valueOf(),
                            name: this._name.value.trim(),
                            subtasks: []
                        })

                        activeBoardCollection(item);

                        this.setState({
                            data: item.tasks
                        })

                        this._name.value = '';
                    }
                });
                updateBoardCollection(data);
                ipnutBlock.style.outline = 'none';
            } else {
                ipnutBlock.style.outline = '2px solid red';
            }
        }
    }

    handleRemove = (obj) => {
        const { data, active, activeBoardCollection, updateBoardCollection } = this.props;

        data.forEach(value => {
            if (value.id === active.id) {
                let newData = active.tasks.filter(item => item.id !== obj.id);
                value.tasks = newData;

                activeBoardCollection(value);

                this.setState({
                    data: value.tasks
                })
            }
        })

        updateBoardCollection(data);

    }

    render() {
        let { clicked, data } = this.state;
        let { name, tasks } = this.props.active;
        const createDisplay = !clicked ? 'flex' : 'none';
        const listDisplay = clicked ? 'flex' : 'none';
        this.handleGetData();
        data = tasks;
        return (
            <Fragment>
                <div className='active-block'>
                    <div
                        className='active-name'>
                        {name}
                    </div>

                    <div className='block-create__list'>
                        <div
                            onClick={this.handleAddList}
                            style={{ display: createDisplay }}
                            className='add-list'
                        >
                            Add a list
                        </div>
                        <div className='block-add__list' style={{ display: listDisplay }}>
                            <div
                                onClick={this.handleCloseList}
                                className='block-add__close'
                                title='close'>
                            </div>
                            <input
                                type='text'
                                placeholder='add a list'
                                id='input-addNew__task'
                                className='input-add__listName'
                                ref={node => this._name = node}
                                onKeyUp={this.handleCreateList}
                                onBlur={this.handleCloseList}
                            />
                        </div>
                    </div>

                    <div className='subtask-list'>
                        {data ? data.map(item => {
                            return (
                                <List
                                    key={item.id}
                                    item={item}
                                    remove={this.handleRemove}
                                />
                            )
                        })
                            : ''
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.boardCollection,
        active: state.activeBoard
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    activeBoardCollection,
    updateBoardCollection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content);