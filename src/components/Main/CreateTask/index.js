import React, { Component } from 'react';

import './style.css';

export default class CreateTask extends Component {

    render() {
        const { value, creatingDisplay, error } = this.props;
        const { refs, handleCreate, handleClickCancel, handleClickSave, valid } = this.props;
        const errorMessage = !error ? '1' : '0';
        return (
            <div className='main-create' onClick={handleCreate}>
                <p>{value}</p>
                <img
                    style={{ display: creatingDisplay }}
                    className='main-createTask__close'
                    src="http://cdn3.iconfinder.com/data/icons/iconic-1/32/x_alt-128.png"
                    onClick={handleClickCancel}
                    title='close'
                    alt="X"
                />
                <div
                    style={{ display: creatingDisplay }}
                    className='main-create__area'
                >
                    <hr />
                    <p>What shall we call the board?</p>

                    <input
                        type='text'
                        className='main-create__input'
                        ref={refs}
                        onBlur={valid}
                        onChange={valid}
                    />

                    <div
                        style={{ opacity: errorMessage }}
                        className='main-error__message'>
                        Oops! Looks like you forgot the name!
                    </div>

                    <div className='main-create__btns'>
                        <button
                            onClick={handleClickCancel}
                            className="button button_hb button_hb-type2 demo-buttons__button">
                            <span className="button__label">Cancel</span>
                        </button>
                        <button
                            onClick={handleClickSave}
                            className="button button_hb button_hb-type2 demo-buttons__button">
                            <span className="button__label">Create</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
} 