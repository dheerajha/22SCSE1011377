# Affordmed Full Stack Assignment

## Project Structure

- `logging-middleware/`: Centralized logging middleware used by both frontend and backend.
- `backend-test/`: URL Shortener microservice built using Express.js and MongoDB.
- `frontend-test/`: React.js application for interacting with the URL shortener API.

## Prerequisites

- Node.js (v16 or above)
- MongoDB (local or MongoDB Atlas)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/affordmed-assignment.git
cd affordmed-assignment
2. Setup Logging Middleware
bash
Copy
Edit
cd logging-middleware
npm install
Create a .env file in the logging-middleware/ folder with the following content:
```
ini
Copy
Edit
EMAIL=your_email
NAME=your_name
ROLL_NO=your_roll_no
ACCESS_CODE=your_access_code
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
To test the logging independently:

bash
Copy
Edit
node test.js
3. Setup Backend (URL Shortener)
bash
Copy
Edit
cd ../backend-test
npm install
Create a .env file in the backend-test/ folder with:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=8000
EMAIL=your_email
NAME=your_name
ROLL_NO=your_roll_no
ACCESS_CODE=your_access_code
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
Then run the server:

bash
Copy
Edit
node index.js
Visit: http://localhost:8000

4. Setup Frontend
bash
Copy
Edit
cd ../frontend-test
npm install
npm run dev
Frontend will run on: http://localhost:5173

API Usage
Create Short URL
POST http://localhost:8000/shorturls

Body:

json
Copy
Edit
{
  "url": "https://example.com/page",
  "validity": 10,
  "shortcode": "dj1234"
}
Access Short URL
GET http://localhost:8000/shorturls/dj1234

Logging
The logging system is centralized using logging-middleware. It authenticates once and attaches an authorization token to every log request sent from both backend and frontend.

Notes
Make sure all .env files are correctly set up.

MongoDB must be running or connected via MongoDB Atlas.

Logs and errors will be sent to the provided external logging service.

Author
Name: Dheeraj 

Roll No: 22xxxxxxxx

Email: dheerajxxxxxxxxxxxxxxxxxxxxx.com
