const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from current directory

// Valid OTPs (Stored on server, not exposed to client)
// Use Environment Variables for hosting, otherwise fallback to defaults
const VALID_PINS = process.env.VALID_PINS ? process.env.VALID_PINS.split(',') : ['752', '709'];
const SECRET_PIN = process.env.SECRET_PIN || '4657';

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { pin } = req.body;

    if (!pin) {
        return res.status(400).json({ success: false, message: 'PIN is required' });
    }

    if (VALID_PINS.includes(pin)) {
        res.json({ success: true, message: 'OTP Verified', secretPin: SECRET_PIN });
    } else {
        res.status(401).json({ success: false, message: 'Invalid PIN' });
    }
});

// Serve index.html for all other routes (for Team A/B paths)
// Serve index.html for all other routes (for Team A/B paths)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
