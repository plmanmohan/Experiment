import React from 'react';
import "./style.css";
import PropTypes from "prop-types";

/**
 * This is a functional component
 * @param: data, onClick
 * - creates the user based on the user data provided.
 */
const DisplayUser = (props) => {
    return createUserProfile(props.data, props.onClick);
}

/**
 * This method is used to return the user component setting its properties
 */
const createUserProfile = (item, onClick) => {
    return (
        <div className="container">
            <img className="avatar-img" src={item.avatar} alt={`${item.first_name} ${item.last_name} avatar`} />
            <h1 className="userName">{`${item.first_name} ${item.last_name}`}</h1>
            <p className="delete" onClick={() => onClick(item.id)}>Delete</p>
        </div>
    )
}

export default DisplayUser;

DisplayUser.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
}