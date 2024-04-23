import axios from 'axios';

const authenticateUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get('http://localhost:8080/api/users/current', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to authenticate user');
    }
};

export default authenticateUser;