
const mysms = require('coolsms-node-sdk').default;
require('dotenv').config();

console.log('--- TestSprite Manual Verification: SMS Module ---');

// 1. Environment Variable Check
console.log('[Step 1] Checking Environment Variables...');
const apiKey = process.env.NEXT_SMS_API_KEY || process.env.COOLSMS_API_KEY;
const apiSecret = process.env.NEXT_SMS_API_SECRET || process.env.COOLSMS_API_SECRET;
const senderPhone = process.env.NEXT_SMS_SENDER_PHONE || process.env.COOLSMS_SENDER_PHONE;

if (!apiKey || !apiSecret || !senderPhone) {
    console.error('❌ FAIL: Missing Environment Variables');
    if (!apiKey) console.error('   - API Key missing');
    if (!apiSecret) console.error('   - API Secret missing');
    if (!senderPhone) console.error('   - Sender Phone missing');
    process.exit(1);
} else {
    console.log('✅ PASS: All required environment variables present');
    console.log(`   - API Key: ${apiKey.substring(0, 4)}...`);
    console.log(`   - Sender: ${senderPhone}`);
}

// 2. SDK Initialization
console.log('\n[Step 2] Initializing CoolSMS SDK...');
try {
    const messageService = new mysms(apiKey, apiSecret);
    console.log('✅ PASS: SDK Initialized');

    // 3. Dry-Run Execution (or actual send if user confirmed)
    // Since we are ensuring it works, we will just check if we CAN construct the request.
    // We won't actually spam SMS unless necessary, but the previous error was "Missing Vars", so initialization is the key test.
    // However, to be sure, let's try to send a message to the SENDER itself (safe test).

    console.log('\n[Step 3] Executing Real SMS Send Test (Self-Send)...');
    const text = '[TestSprite Verification] System functionality check - OK';

    messageService.sendOne({
        to: senderPhone,
        from: senderPhone,
        text: text,
        autoTypeDetect: true,
    }).then(res => {
        console.log('✅ PASS: SMS Sent Successfully');
        console.log('   - Response:', res);
        console.log('\n--- VERIFICATION COMPLETE: SUCCESS ---');
        process.exit(0);
    }).catch(err => {
        console.error('❌ FAIL: SMS Send Failed');
        console.error('   - Error:', err);
        process.exit(1);
    });

} catch (error) {
    console.error('❌ FAIL: Critical Error during initialization');
    console.error(error);
    process.exit(1);
}
