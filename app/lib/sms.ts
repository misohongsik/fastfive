import mysms from 'coolsms-node-sdk';

export async function sendNotificationSMS(
    recipientPhone: string,
    customerName: string,
    companyName: string,
    personCount: string,
    location: string,
    date: string
) {
    // Lazy load env vars and service to prevent module-level crashes
    const apiKey = process.env.COOLSMS_API_KEY;
    const apiSecret = process.env.COOLSMS_API_SECRET;
    const senderPhone = process.env.COOLSMS_SENDER_PHONE;

    if (!apiKey || !apiSecret || !senderPhone) {
        console.warn('Skipping SMS: Missing COOLSMS environment variables.');
        return false;
    }

    try {
        // Initialize service here, only when needed and safe
        const messageService = new mysms(apiKey, apiSecret);

        const text = `[패스트파이브 투어신청]
신청자: ${customerName}
회사명: ${companyName}
연락처: ${recipientPhone}
인원: ${personCount}
지역: ${location}
희망일: ${date}

빠르게 연락주세요!`;

        const response = await messageService.sendOne({
            to: senderPhone, // Send TO the admin
            from: senderPhone, // Send FROM the admin (must be registered)
            text: text,
            autoTypeDetect: true,
        });

        console.log('SMS sent successfully:', response);
        return true;
    } catch (error) {
        console.error('SMS sending failed:', error);
        // Do not throw, so the user flow isn't interrupted
        return false;
    }
}
