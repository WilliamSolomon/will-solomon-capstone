import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import axios from 'axios';
import "./AlertBoard.scss"

import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';

const AlertBoard = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [triggerRefresh, setTriggerRefresh] = useState(false); // State to trigger refresh

    const [user, setUser] = useState(null);
    const [userId,setUserId] = useState(null)
    const [failedAuth, setFailedAuth] = useState(false);
    const [token, setToken] = useState(null)

    useEffect(() => {
        // getItem from sessionStorage token
        const storageToken = localStorage.getItem('token');
        setToken(storageToken);


        // If theres not a token then setFailedAuth to true and return 
        if (!storageToken) {
            setFailedAuth(true)
        }
        // Otherwise we will check to see if the current user is authorized to be on this dashboard

        const authorizeUser = async () => {
            try {
                // Make a get request to "http://localhost:8080/api/users/current"
                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: {
                        Authorization: `Bearer ${storageToken}`
                    }
                })
                setUser(response.data)

                const decodedToken = jwtDecode(storageToken);
                setUserId(decodedToken.id);
                
            } catch (error) {
                console.log(error);
                setFailedAuth(true)
            }
        }
        authorizeUser()
    }, []);

    useEffect(() => {

        if (!token) {
            console.log("No token, exiting");
            return; // Exit early if token is null
        }

        console.log("Token present", token);


        console.log("UserId Before", userId);
        if(userId) {

            if (userId) {
                const fetchAlerts = async () => {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
                        setAlerts(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.error('Error fetching alerts:', error);
                        setLoading(false);
                    }
                };
    
                fetchAlerts();
                updateTrigger()
            }
        }
    

    }, [token, userId])

    if (failedAuth) {
        return (
            <main className="alerts__logout">
                <h3>You must be logged in to see this page.</h3>
                <p>
                    <Link to="/login">Log in</Link>
                </p>
            </main>
        );
    }

    if (user === null) {
        return (
            <main className="dashboard">
                <p>User Null Loading...</p>
            </main>
        );
    }

    const handleDeleteAlert = (alertId) => {
        setSelectedAlert(alertId); // Set the selected alert ID
        setModalOpen(true); // Open the modal
    };

    const updateTrigger = () => {
        setTriggerRefresh(!triggerRefresh)
    }

    const formatCreatedAt = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="alerts">
            <h2 className="alerts__title">Weather Alerts</h2>
            <ul className="alerts__cards-container">
                {alerts.map(alert => (
                    <div className="alerts__card" key={alert.id}>
                        <div className="alerts__card-condition">{alert.condition}</div>
                        <div className="alerts__card-date">{formatCreatedAt(alert.specified_date)}</div>
                        <div className="alerts__card-delete" onClick={() => handleDeleteAlert(alert.id)}>
                            <img src={deleteIcon} alt="Delete" />
                        </div>
                    </div>
                ))}
                {/* Render the DeleteAlertModal component with isOpen controlled by isModalOpen state */}
                <DeleteAlertModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    alertId={selectedAlert}
                    updateTrigger={updateTrigger}
                />
            </ul>

        </div>
    );
};

export default AlertBoard;

