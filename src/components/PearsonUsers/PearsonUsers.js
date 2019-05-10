import React, { Component } from 'react';
import DisplayUser from './DisplayUser';
import sampleData from "../../config/data.json";
import api from '../../utility/api';
import { removeUser, removeDuplicateUsers } from "../../utility/user-functions";
import ConfirmationBox from '../../utility/ConfirmationBox/ConfirmationBox';
import "./style.css";

export default class PearsonUsers extends Component {

    constructor() {
        super();
        this.state = {
            users: [...sampleData],
            isLoading: true,
            error: false,
            showConfirmationBox: false,
            currentId: null
        }
    }
    /**
     * This method is called to fetch data 
     */
    componentDidMount() {
        this.fetchApiData();
    }

    /**
     * Here api call is done within this method
     * - then the data is merged into previous data and duplicate isers are removed
     */
    fetchApiData = () => {
        api()
            .then(result => {
                const updatedUserList = removeDuplicateUsers(this.state.users, result.data || sampleData);
                const error = result.error || false
                this.setState({
                    users: [...updatedUserList],
                    isLoading: false,
                    error
                })
            })
            .catch(() => {
                this.setState({ error: true, isLoading: false });
            })
    }

    /**
     * This method is used to hide errorbox
     */
    disableErrorBox = (val) => this.setState({ error: false });

    /**
     * This method is called when any of the users is selected.
     */
    selectUserToRemove = (id) => {
        this.setState({ showConfirmationBox: true, currentId: id })
    }
    /**
     * This method defines if the selected user is to be removed or not, based on the confirmation 
     * okay / cancel button click.
     */
    removeUser = (val) => {
        if (val) {
            this.setState({ users: removeUser(this.state.users, this.state.currentId), currentId: null, showConfirmationBox: false })
        } else {
            this.setState({ currentId: null, showConfirmationBox: false })
        }
    }
    /**
     * This method is used to create the DisplayUser components based on the user data
     */
    createDisplayUsers = () => {
        return this.state.users.map(user => <DisplayUser key={user.id} onClick={this.selectUserToRemove} data={user} />)
    }
    
    render() {
        const { isLoading, error } = this.state;
        return (
            <div className="pearon-users">
                <h1 className="heading">Pearson User Management </h1>
                <div className="user-container">
                    {isLoading ? (
                        <div className="loader">
                            <img
                                height={80}
                                width={80}
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif"
                                alt="loading"
                            />
                        </div>
                    ) :
                        this.createDisplayUsers()
                    }
                </div>
                {error && <ConfirmationBox onClick={this.disableErrorBox} message={error.message || "Error in Loading!"} isAlert={true} />}
                {this.state.showConfirmationBox ? <ConfirmationBox onClick={this.removeUser} message="Are you sure you want to delete the user!" isAlert={false} /> : null}
            </div>
        );
    }
}
