import "./AlertBoard.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import deleteIcon from '../../assets/icons/delete_outline-24px.svg';

const AlertBoard = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = '2'; // Temp user_id
    // const userId = sessionStorage.getItem('user_id'); // Retrieve user_id from sessionStorage

    useEffect(() => {
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
    }, [userId]);

    console.log('Alerts:', alerts);

    const handleDeleteAlert = (alertId) => {
        // Open modal for confirmation or perform delete operation directly
        console.log(`Delete alert with ID ${alertId}`);
    };

    const formatCreatedAt = (timestamp) => {
        const date = new Date(timestamp);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="alerts__container">
            <h2 className="alerts__title">Alert Board</h2>
            <ul>
                {alerts.map(alert => (
                    <div className="alert-card" key={alert.id}>
                        <div className="alert-card__day">{alert.category}</div>
                        <div className="alert-card__condition">{alert.condition}</div>
                        <div className="alert-card__date">{formatCreatedAt(alert.created_at)}</div>
                        <button onClick={() => handleDeleteAlert(alert.id)}>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default AlertBoard;