import React from 'react';
import "./style.css";
import PropTypes from "prop-types";

/**
 * This is the functional component for confirmation box
 * @param: isAlert
 * -If isAlert is true, this will return alert box with okay button
 * -If isAlert is false, this will return confirm box with okay and cancel button
 */
const ConfirmationBox = (props) => {
    if (props.isAlert) {
        return Confirm('Error Message', props.message, props.onClick, props.isAlert, 'Ok', ""); 
    } else {
        return Confirm('Delete the User', props.message, props.onClick, props.isAlert, 'Yes', 'Cancel'); 
    }
    
}


/**
 * This creates and returns the component for confirmation box
 */

function Confirm(title, msg, closeTheBox, isAlert, yesText, noText) {
    return (
        <div id= "confirmBox" className='dialog-ovelay'>
            <div className='dialog'>
                <header>
                    <h3>{ title }</h3>
                    <h2 className='fa fa-close' onClick = {() => closeTheBox(false)}>x</h2>
                </header>
                <div className='dialog-msg'>
                    <p>{ msg }</p>
                </div>
                <footer>
                    <div className='controls'>
                        <button className='button button-danger doAction' onClick = {() => closeTheBox(true)}> {yesText}  </button>
                        {isAlert? null : <button className='button button-default cancelAction' onClick = {() => closeTheBox(false)}>  {noText}  </button>}
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ConfirmationBox 

ConfirmationBox.propTypes = {
    onClick: PropTypes.func,
    message: PropTypes.string,
    isAlert: PropTypes.bool
}