import './Login.scss';
import Input from "../../components/Input/Input";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
		// Now that the user is registered we need to log thewm in
		// Make a POST request to "http://localhost:8080/api/users/login"
		// This post takes email and password
		// use response.data.token to retrieve token
		// sessionStorage to setItem to our token with the name token
		// use react router dom to navigate to home page

		try {
			const response = await axios.post('http://localhost:8080/api/users/login', {
				email: event.target.email.value,
				password: event.target.password.value,
			})
			console.log(response.data);
			// Store token to session storage
			localStorage.setItem('token', response.data.token);
			navigate('/')
			
		} catch(error) { 
			setError("Something went wrong")
			
		}

    };

    return (
        <main className="login-page">
            <form className="login" onSubmit={handleSubmit}>
                <h1 className="login__title">Log in</h1>

                <Input type="text" name="email" label="Email" />
                <Input type="password" name="password" label="Password" />

                <button className="login__button">
                    Log in
                </button>

                {error && <div className="login__message">{error}</div>}
            </form>
            <p>
                Need an account? <Link to="/signup">Sign up</Link>
            </p>
        </main>
    );
}

export default Login;
