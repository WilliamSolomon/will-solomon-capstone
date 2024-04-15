// // import "./AlertBoard.scss";
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // import DeleteAlertModal from "../DeleteAlertModal/DeleteAlertModal";

// // import deleteIcon from '../../assets/icons/delete_outline-24px.svg';


// // const AlertBoard = () => {
// //     const [alerts, setAlerts] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [selectedAlert, setSelectedAlert] = useState(null); // State to store the selected alert ID
// //     const userId = '2'; // Temp user_id
// //     // const userId = sessionStorage.getItem('user_id'); // Retrieve user_id from sessionStorage

// //     useEffect(() => {
// //         const fetchAlerts = async () => {
// //             try {
// //                 const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
// //                 setAlerts(response.data);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error('Error fetching alerts:', error);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchAlerts();
// //     }, [userId]);

// //     console.log('Alerts:', alerts);

// //     const handleDeleteAlert = (alertId) => {
// //         setSelectedAlert(alertId); // Set the selected alert ID
// //         console.log(`Delete alert with ID ${alertId}`);
// //     };

// //     const formatCreatedAt = (timestamp) => {
// //         const date = new Date(timestamp);
// //         const options = { weekday: 'long', month: 'long', day: 'numeric' };
// //         return date.toLocaleDateString('en-US', options);
// //     };

// //     if (loading) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="alerts__container">
// //             <h2 className="alerts__title">Upcoming Weather</h2>
// //             <ul>
// //                 {alerts.map(alert => (
// //                     <div className="alert-card" key={alert.id}>
// //                         <div className="alert-card__day">{alert.category}</div>
// //                         <div className="alert-card__condition">{alert.condition}</div>
// //                         <div className="alert-card__date">{formatCreatedAt(alert.created_at)}</div>
// //                         <button onClick={() => handleDeleteAlert(alert.id)}>
// //                             <img src={deleteIcon} alt="Delete" />
// //                         </button>
// //                     </div>
// //                 ))}
// //             </ul>
// //             <DeleteAlertModal
// //                 isOpen={selectedAlert !== null}
// //                 onClose={() => setSelectedAlert(null)}
// //                 alertId={selectedAlert}
// //             />
// //         </div>
// //     );
// // };

// // export default AlertBoard;

// // AlertBoard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
// import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';

// const AlertBoard = () => {
//     const [alerts, setAlerts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedAlert, setSelectedAlert] = useState(null); // State to store the selected alert ID
//     const userId = '2'; // Temp user_id

//     useEffect(() => {
//         const fetchAlerts = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//                 setAlerts(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching alerts:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAlerts();
//     }, []);

//     useEffect(() => {
//         const deleteAlert = async () => {
//             if (selectedAlert) {
//                 try {
//                     await axios.delete(`http://localhost:8080/api/alerts/${selectedAlert}`);
//                     console.log(`Alert with ID ${selectedAlert} deleted successfully`);
//                     // After deletion, refetch alerts
//                     const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//                     setAlerts(response.data);
//                 } catch (error) {
//                     console.error('Error deleting alert:', error);
//                 } finally {
//                     setSelectedAlert(null); // Reset selectedAlert state
//                 }
//             }
//         };

//         deleteAlert();
//     }, [selectedAlert, userId]); // 

//     const handleDeleteAlert = (alertId) => {
//         setSelectedAlert(alertId); // Set the selected alert ID
//     };

//     const handleConfirmDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8080/api/alerts/${selectedAlert}`);
//             console.log(`Alert with ID ${selectedAlert} deleted successfully`);
//             // After deletion, refetch alerts
//             const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//             setAlerts(response.data);
//         } catch (error) {
//             console.error('Error deleting alert:', error);
//         } finally {
//             setSelectedAlert(null); // Reset selectedAlert state
//         }
//     };

//     const formatCreatedAt = (timestamp) => {
//         const date = new Date(timestamp);
//         const options = { weekday: 'long', month: 'long', day: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="alerts__container">
//             <h2 className="alerts__title">Upcoming Weather</h2>
//             <ul>
//                 {alerts.map(alert => (
//                     <div className="alert-card" key={alert.id}>
//                         <div className="alert-card__day">{alert.category}</div>
//                         <div className="alert-card__condition">{alert.condition}</div>
//                         <div className="alert-card__date">{formatCreatedAt(alert.created_at)}</div>
//                         <button onClick={() => handleDeleteAlert(alert.id)}>
//                             <img src={deleteIcon} alt="Delete" />
//                         </button>
//                     </div>
//                 ))}
//             </ul>
//             {/* Render the DeleteAlertModal component only when selectedAlert is not null */}
//             {selectedAlert && (
//                 <DeleteAlertModal
//                     isOpen={true}
//                     onClose={() => setSelectedAlert(null)}
//                     alertId={selectedAlert}
//                 />
//             )}
//         </div>
//     );
// };

// export default AlertBoard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
// import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';

// const AlertBoard = () => {
//     const [alerts, setAlerts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedAlert, setSelectedAlert] = useState(null); // State to store the selected alert ID
//     const [refreshAlerts, setRefreshAlerts] = useState(null);
//     const userId = '2'; // Temp user_id

//     useEffect(() => {
//         const fetchAlerts = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//                 setAlerts(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching alerts:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAlerts();
//     }, [refreshAlerts]);

//     const handleDeleteAlert = (alertId) => {
//         setSelectedAlert(alertId); // Set the selected alert ID
//         console.log("HandleDeleteAlert alertId", alertId);
//         console.log("HandleDeleteAlert alertId", selectedAlert);
//     };

//     const handleConfirmDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8080/api/alerts/${selectedAlert}`);
//             console.log(`Alert with ID ${selectedAlert} deleted successfully`);
//             // After deletion, refetch alerts
//             const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//             setAlerts(response.data);
//             console.log("selectedAlert before Refresh", selectedAlert);
//             setRefreshAlerts(selectedAlert)
//         } catch (error) {
//             console.error('Error deleting alert:', error);
//         } finally {
//             setSelectedAlert(null); // Reset selectedAlert state
//         }
//     };

//     console.log(refreshAlerts);

//     const formatCreatedAt = (timestamp) => {
//         const date = new Date(timestamp);
//         const options = { weekday: 'long', month: 'long', day: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="alerts__container">
//             <h2 className="alerts__title">Upcoming Weather</h2>
//             <ul>
//                 {alerts.map(alert => (
//                     <div className="alert-card" key={alert.id}>
//                         <div className="alert-card__day">{alert.category}</div>
//                         <div className="alert-card__condition">{alert.condition}</div>
//                         <div className="alert-card__date">{formatCreatedAt(alert.created_at)}</div>
//                         <button onClick={() => handleDeleteAlert(alert.id)}>
//                             <img src={deleteIcon} alt="Delete" />
//                         </button>
//                     </div>
//                 ))}
//             </ul>
//             {/* Render the DeleteAlertModal component only when selectedAlert is not null */}
//             {selectedAlert && (
//                 <DeleteAlertModal
//                     isOpen={true}
//                     onClose={() => setSelectedAlert(null)}
//                     onConfirm={handleConfirmDelete}
//                     alertId={selectedAlert}
//                 />
//             )}
//         </div>
//     );
// };

// export default AlertBoard;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
// import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';

// const AlertBoard = () => {
//     const [alerts, setAlerts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedAlert, setSelectedAlert] = useState(null); // State to store the selected alert ID
//     const [isModalOpen, setModalOpen] = useState(false); // State to manage modal open/close
//     const [triggerRefresh, setTriggerRefresh] = useState(null);
//     const userId = '2'; // Temp user_id

//     useEffect(() => {
//         const fetchAlerts = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//                 setAlerts(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching alerts:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAlerts();
//     }, [triggerRefresh]);

//     const handleDeleteAlert = (alertId) => {
//         setSelectedAlert(alertId); // Set the selected alert ID
//         setModalOpen(true); // Open the modal
//     };

//     const handleConfirmDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8080/api/alerts/${selectedAlert}`);
//             console.log(`Alert with ID ${selectedAlert} deleted successfully`);
//             // After deletion, refetch alerts
//             const response = await axios.get(`http://localhost:8080/api/alerts/user/${userId}`);
//             setAlerts(response.data);
//         } catch (error) {
//             console.error('Error deleting alert:', error);
//         } finally {
//             setTriggerRefresh(selectedAlert);
//             console.log("TriggerRefresh", selectedAlert);
//             setSelectedAlert(null); // Reset selectedAlert state
//             setModalOpen(false); // Close the modal
//         }
//     };

//     const formatCreatedAt = (timestamp) => {
//         const date = new Date(timestamp);
//         const options = { weekday: 'long', month: 'long', day: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="alerts__container">
//             <h2 className="alerts__title">Upcoming Weather</h2>
//             <ul>
//                 {alerts.map(alert => (
//                     <div className="alert-card" key={alert.id}>
//                         <div className="alert-card__day">{alert.category}</div>
//                         <div className="alert-card__condition">{alert.condition}</div>
//                         <div className="alert-card__date">{formatCreatedAt(alert.created_at)}</div>
//                         <button onClick={() => handleDeleteAlert(alert.id)}>
//                             <img src={deleteIcon} alt="Delete" />
//                         </button>
//                     </div>
//                 ))}
//             </ul>
//             {/* Render the DeleteAlertModal component with isOpen controlled by isModalOpen state */}
//             <DeleteAlertModal
//                 isOpen={isModalOpen}
//                 onClose={() => setModalOpen(false)}
//                 onConfirm={handleConfirmDelete}
//                 alertId={selectedAlert}
//             />
//         </div>
//     );
// };

// export default AlertBoard;

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

