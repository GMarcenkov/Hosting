import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import ModalStyle from './EditModal.module.css'
const EditModal = ({edit,modalIsOpen,openModal,handleInput}) => {
    return (
        <div>
            {modalIsOpen ? (
                <div className={ModalStyle.modal_wrapper}>
                    <div className={ModalStyle.modal_container}>
                        <div className={ModalStyle.modal_close_button} onClick={() => openModal()}>
                            X
                        </div>
                        <div className={ModalStyle.modal_title}>
                            {edit.title}
                        </div>
                        <div>
                            {edit.rates.map((rate,index)=>(
                                <input
                                    onChange={(event)=>handleInput(event,index)}
                                    className={ModalStyle.modal_input}
                                    value={rate}
                                />
                            ))
                            }
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

EditModal.propTypes = {

};

export default EditModal;
