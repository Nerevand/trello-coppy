import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { activeBoardCollection, updateBoardCollection } from '../../../actions/boardsActions';

import trashIcon from '../../../assets/svg/remove.svg';

import './style.css';

class List extends Component {
    state = {
        miniList: this.props.item.subtasks
    }

    handleCreateSubtask = (e) => {
        if (e.key === 'Enter') {
            const inputs = document.activeElement;
            if (this._subtask.value.trim().length > 0) {
                const { item, data, active, activeBoardCollection, updateBoardCollection } = this.props;
                data.forEach(value => {
                    if (value.id === active.id) {
                        value.tasks.forEach(list => {
                            if (list.id === item.id) {
                                list.subtasks.push({
                                    id: (new Date()).valueOf(),
                                    done: false,
                                    name: this._subtask.value.trim()
                                })

                                this._subtask.value = '';

                                activeBoardCollection(value)

                                this.setState({
                                    miniList: list.subtasks
                                })
                            }
                        })
                    }
                })
                updateBoardCollection(data);
                inputs.style.outline = 'none';
            } else {
                inputs.style.outline = '2px solid red';
            }
        }
    }

    handleChangeStatus(id) {
        const { item, data, active, activeBoardCollection, updateBoardCollection } = this.props;
        data.forEach(value => {
            if (value.id === active.id) {
                value.tasks.forEach(list => {
                    if (list.id === item.id) {
                        list.subtasks.forEach(subtask => {
                            if (subtask.id === id) {
                                subtask.done = !subtask.done;
                            }
                        })
                    }
                    activeBoardCollection(list);
                    updateBoardCollection(data);
                    this.setState({
                        miniList: list.subtasks
                    })
                })
            }
        })
        updateBoardCollection(data);
    }

    handleRemoveSubtask = (id) => {
        const { item, data, active, activeBoardCollection, updateBoardCollection } = this.props;
        data.forEach(value => {
            if (value.id === active.id) {
                value.tasks.forEach(list => {
                    if (list.id === item.id) {
                        list.subtasks = list.subtasks.filter(subtask => subtask.id !== id)
                    }
                    activeBoardCollection(list);
                    updateBoardCollection(data);
                    this.setState({
                        miniList: list.subtasks
                    })
                })
            }
        })
        updateBoardCollection(data);
    }

    render() {
        const { item, remove } = this.props;
        const { miniList } = this.state;
        const heightBlock = (miniList.length * 21 + 150) + (miniList.length * 20) + 'px';
        return (
            <div
                style={{ height: heightBlock }}
                className='block-new__list'>
                <div
                    onClick={() => remove(item)}
                    className='block-remove__task'
                    title='close'>
                </div>

                <h2>
                    {item.name}
                </h2>

                <hr />

                <input
                    type='text'
                    placeholder='add a task'
                    className='input-add__task'
                    ref={node => this._subtask = node}
                    onKeyUp={this.handleCreateSubtask}
                />

                {
                    miniList.map(({ id, done, name }) => {
                        return (
                            <div
                                key={id}
                                className='subtask-block'
                                style={{ backgroundColor: done ? 'rgb(222, 202, 255)' : 'rgb(202, 255, 222)' }}
                            >
                                <div
                                    className='subtask-name'
                                    style={{ textDecoration: done ? 'line-through' : 'none' }}>
                                    {name}
                                </div>

                                <div className='subtasks-icons'>
                                    <div
                                        className='subtask-success'
                                        style={{ textDecoration: done ? 'line-through' : 'none' }}
                                        onClick={() => this.handleChangeStatus(id)}
                                    >
                                        ✓
                                    </div>
                                    <div className='subtask-remove'>
                                        <img
                                            onClick={() => this.handleRemoveSubtask(id)}
                                            src={trashIcon} alt='' />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);