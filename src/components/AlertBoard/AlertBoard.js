import React, { useState, useEffect } from 'react';
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

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

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
    }, [triggerRefresh]); // Depend on triggerRefresh to trigger re-fetching of alerts

    const handleDeleteAlert = (alertId) => {
        setSelectedAlert(alertId); // Set the selected alert ID
        setModalOpen(true); // Open the modal
    };

    const updateTrigger = ()=> {
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
            </ul>
            {/* Render the DeleteAlertModal component with isOpen controlled by isModalOpen state */}
            <DeleteAlertModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                alertId={selectedAlert}
                updateTrigger={updateTrigger}
            />
        </div>
    );
};

export default AlertBoard;

