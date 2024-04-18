import "./Signup.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Input from "../../components/Input/Input";
import SearchBar from "../../components/SearchBar/SearchBar";
import { logDOM } from "@testing-library/react";

function Signup() {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate(); // Initialize useNavigate hook
	const [userCity, setUserCity] = useState("");
	const [userCoord, setUserCoord] = useState({ lat: '', lon: '' });

	const handleSubmit = async (event) => {
		event.preventDefault();

		const password = event.target.password.value;
		const confirmPassword = event.target.confirmPassword.value;

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post('http://localhost:8080/api/users/register', {
				email: event.target.email.value,
				password: password,
				first_name: event.target.first_name.value,
				last_name: event.target.last_name.value,
				city: userCity,
				lat: userCoord.lat,
				lon: userCoord.lon
			});

			if (response) {
				setSuccess(true);
				setError("");
				event.target.reset();
				// Navigate to login page after successful signup
				navigate("/login"); 
			}
		} catch (error) {
			setError("Something went wrong");
		}
	}

	const handleSearchChange = (searchData) => {
		setUserCity(searchData.label);
		const [lat, lon] = searchData.value.split(" ");
		setUserCoord({ lat, lon });
	}

	return (
		<main className="signup-page">
			<form className="signup" onSubmit={handleSubmit}>
				<h1 className="signup__title">Sign up</h1>

				<Input type="text" name="first_name" label="First name" />
				<Input type="text" name="last_name" label="Last name" />
				<Input type="text" name="email" label="Email" />
				<Input type="password" name="password" label="Password" />
				<Input type="password" name="confirmPassword" label="Confirm Password" />
				<label>Select Your Location</label>
				<SearchBar onSearchChange={handleSearchChange} />

				<button className="signup__button">Sign up</button>

				{success && <div className="signup__message">Signed up!</div>}
				{error && <div className="signup__message">{error}</div>}
			</form>
			<p>
				Have an account? <Link to="/login">Log in</Link>
			</p>
		</main>
	);
}

export default Signup;
