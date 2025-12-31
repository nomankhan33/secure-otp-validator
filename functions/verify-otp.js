// functions/verify-otp.js

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { pin } = body;

        // Valid OTPs (Use Environment Variables if available, else defaults)
        const VALID_PINS = process.env.VALID_PINS ? process.env.VALID_PINS.split(',') : ['752', '709'];
        const SECRET_PIN = process.env.SECRET_PIN || '4657';

        if (!pin) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'PIN is required' })
            };
        }

        if (VALID_PINS.includes(pin)) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'OTP Verified', secretPin: SECRET_PIN })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: 'Invalid PIN' })
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Server Error' })
        };
    }
};
