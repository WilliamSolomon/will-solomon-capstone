# Project Title
WeatherCap App

## Overview

For my BrainStation software development capstone, I developed WeatherCap—an app designed for photography enthusiasts to receive alerts and track specific weather conditions

### Problem

Have you ever dreamt of capturing foggy shots of the Manhattan Bridge, reflections of the Empire State Building in rain puddles, or the perfect sunset against a partly cloudy sky? The challenge lies in remembering to watch out for ideal weather conditions amidst life's busyness or planning an outing only to find unfavorable weather conditions on the day. WeatherCap solves this dilemma by keeping you informed and prepared for spontaneous or planned photo outings.

### User Profile

- Hobby Photographers:
    - be alerts to specific weather conditions happeing in the next 7 days
    - be alerts to weather changes for a specific date

### Features

As a user, I want to be able to:
- select my location
- receive a weather forecast
- create an account to manage my alerts and alert settings

As a logged in user, I want to be able to:
- select weather conditions to monitor for
- receive alerts when not logged in 
- retain settings after the browser is closed
- delete/dismiss alerts

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries: 
    - react
    - react-dom
    - react-router-dom
    - axios
    - react-icons
    - react-places-autocomplete
    - jwt-decode
    - sass
- Server libraries:
    - express
    - knex
    - bcryptjs
    - jsonwebtoken
    - mysql2
    - node-fetch
    - cors
    - dotenv
    - node-cron
    - nodemon

### APIs

- OpenWeatherMap API: Provides current weather data and forecasts for various locations worldwide.
- Google Places API: Provides location search and latitude/longitude

### Sitemap

- Register
- Login
- Dashboard
    - Weather
    - Alerts
    - Settings

### Mockup
![](./src/assets/images/ProposalMockup.png)


### Data

Forcast: Staff accounts with authentication details
Alerts: Stored information for recognized VIPs
Settings: Stored information for alerts sent
Register: Stored information for registered employees for facial recognition
Users:

![](./src/assets/images/SQLdata.png)

### Endpoints

- **POST /api/users/register**

Register a new user.

Parameters:
- username (string): User's username
- email (string): User's email address
- password (string): User's password

Response:
{
"message": "User successfully registered"
}

- **POST /api/users/login**

Log in an existing user.

Parameters:

    email (string): User's email address
    password (string): User's password

Response:
{
  "token": "JWT_TOKEN"
}

- **POST /api/users/login**

Log in an existing user.

Parameters:
- email (string): User's email address
- password (string): User's password

Response:
{
  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lon": 10.99,
      "lat": 44.34
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200
  },
  "cod": "200",
  "message": 0.0582563,
  "cnt": 7,
  "list": [
    {
      "dt": 1661857200,
      "sunrise": 1661834187,
      "sunset": 1661882248,
      ...
    },
    ...
  ]
}
GET /api/users/:id/alerts
- Retrieve weather alerts for logged-in user.

Response:
[
  {        
    "id": 1,    
    "user_id": 1,    
    "category": "condition",        
    "weather": "Fog",        
    "date": "1661943600",
    "status": "active",
    "update": "none"
  },    
  {         
    "id": 2,    
    "user_id": 2,    
    "category": "date",
    "weather": "Cloudy",  
    "date": "1661943600",   
    "status": "active",        
    "update": "none"    
  }
]

- **DELETE /api/alerts/:id**

Remove a weather alert.

Parameters:

    id (number): ID of the weather to be removed

Response:
{
  "message": "Weather alert removed successfully"
}

- **GET /api/settings**

Retrieve all weather alert settings.

Response:
[
  {
    "id": 1,
    "user_id": 1,
    "location": [ "40.7128", "74.0060"],
    "category": "weather",
    "date": "2024-03-27",
    "condition": "fog",
    "timestamp": "2024-03-27T10:15:00Z"
  },
  {
    "id": 2,
    "user_id": 2,
    "vip_id": 2,
    "employee_id": null,
    "timestamp": "2024-03-28T15:30:00Z"
  }
]

- **GET /api/settings/:id**

Retrieve information about a specific alert setting.

Parameters:

    id (number): ID of the weather alert to retrieve

Response:
{
  "id": 1,
  "user_id": 1,
  "location": [ "40.7128", "74.0060"],
  "category": "weather",
  "date": "2024-03-27",
  "condition": "fog",
  "timestamp": "2024-03-27T10:15:00Z"
}

- **POST /api/settings/**

Store setting information for alerts specified by user.

Parameters:

    user_id (number): ID of the user adding the alert
    timestamp (datetime): Timestamp of when the alert was added

Response:
{
  "message": "Weather alert setting stored successfully"
}

- **DELETE /api/settings/:id**

Remove a specific weather alert setting.

Parameters:

    id (number): ID of the weather alert setting to be removed

Response:
{
  "message": "Weather alert setting removed successfully"
}


### Auth

JWT Authentication:
- JWT authentication will be implemented to secure API endpoints.
- Before adding authentication, all API requests will utilize a default user with ID 1 for testing purposes.
- Authentication will be added after the core features of the system have been initially implemented and tested.
- Upon successful login, the JWT token will be stored in the localStorage of the browser.
- The JWT token will be removed from localStorage when the user logs out.
- Different UI states will be implemented based on the user's authentication status to provide appropriate functionality and access control as depicted in the mockups.

## Roadmap

- Create client
  - Develop a React project with routes and boilerplate pages tailored for the VIP facial recognition system.

- Create server
  - Set up an Express project with routing and placeholder 200 responses to handle backend functionality.

- Create migrations
  - Implement database migrations to establish the necessary data structure for the VIP facial recognition system.

- Gather sample VIP facial data
  - Collect facial data of celebrities, influencers, reviewers, special guests, and employee staff.

- Create seeds with sample VIP facial data
  - Generate seeds containing sample VIP facial data to populate the database for testing and demonstration purposes.

- Deploy client and server projects
  - Deploy both the client and server projects to ensure all commits are reflected in the production environment.

- Feature: Real-time Facial Recognition
  - Implement facial recognition functionality to detect celebrities, influencers, and reviewers in real-time.

- Feature: VIP Alert System
  - Develop a system to notify staff via email or SMS when a VIP is identified.

- Feature: List of Celebrities Onsite
  - Create a page to display a list of celebrities onsite within the last 24 hours.
  - Implement backend logic to retrieve and display this information.

- Feature: Guest Management
  - Allow logged-in users to add special guests and employee staff to the system for facial recognition.
  - Implement frontend forms and backend endpoints to manage guest data.

- Feature: User Management
  - Develop user registration pages and forms to allow users to create accounts and manage access.
  - Implement backend endpoints for user authentication, registration, and access control.

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Integration with restaurant management systems for seamless service coordination.
- Analytics dashboard for tracking VIP interactions, employee performance, and service effectiveness.
- Mobile app version for on-the-go access by staff.
- Reservation system integration.
