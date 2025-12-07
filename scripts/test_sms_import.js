require('dotenv').config(); // Load .env manually for this script

console.log('--- Environment Check ---');
const key = process.env.COOLSMS_API_KEY;
const secret = process.env.COOLSMS_API_SECRET;
const sender = process.env.COOLSMS_SENDER_PHONE;

console.log('API_KEY exists?', !!key, key ? `(Starts with ${key.substring(0, 4)})` : '');
console.log('API_SECRET exists?', !!secret);
console.log('SENDER_PHONE exists?', !!sender);
console.log('-------------------------');

const mysms = require('coolsms-node-sdk').default;
console.log('SDK Imported Successfully');

if (key && secret) {
    try {
        const service = new mysms(key, secret);
        console.log('Service instantiated.');
    } catch (e) {
        console.error('Service instantiation failed:', e.message);
    }
} else {
    console.error('Cannot test SDK: Missing Keys');
}
