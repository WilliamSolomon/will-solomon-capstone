import React, { useState, useEffect } from 'react';
import axios from 'axios';

import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';

const AlertBoard = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAlert, setSelectedAlert] = useState(null); // State to store the selected alert ID
    const [isModalOpen, setModalOpen] = useState(false); // State to manage modal open/close
    const [triggerRefresh, setTriggerRefresh] = useState(false); // State to trigger refresh
    const userId = '2'; // Temp user_id

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

    // const handleConfirmDelete = async () => {
    //     try {
    //         await axios.delete(`http://localhost:8080/api/alerts/${selectedAlert}`);
    //         console.log(`Alert with ID ${selectedAlert} deleted successfully`);
    //         // After deletion, refetch alerts
    //         // const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
    //         // setAlerts(response.data);
    //         // window.location.href="/";
    //         setTriggerRefresh(!triggerRefresh)
    //         console.log('Hell no');
    //     } catch (error) {
    //         console.error('Error deleting alert:', error);
    //     } finally {
    //         console.log("Made it almost to end")
    //         setSelectedAlert(null); // Reset selectedAlert state
    //         setModalOpen(false); // Close the modal
    //      // Update triggerRefresh to trigger re-render
    //         console.log("Made it to end")
    //     }
    // };

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
            <h2 className="alerts__title">Upcoming Weather</h2>
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
            {/* Render the DeleteAlertModal component with isOpen controlled by isModalOpen state */}
            <DeleteAlertModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                // onConfirm={handleConfirmDelete}
                alertId={selectedAlert}
                updateTrigger={updateTrigger}
            />
        </div>
    );
};

export default AlertBoard;

