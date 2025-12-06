import mysms from 'coolsms-node-sdk';

const apiKey = process.env.COOLSMS_API_KEY!;
const apiSecret = process.env.COOLSMS_API_SECRET!;
const senderPhone = process.env.COOLSMS_SENDER_PHONE || '01000000000';

// Fix: Direct usage if it's the module export, or checking typing.
// Ideally: const messageService = new mysms(apiKey, apiSecret) or similar.
// Since we are in TS, let's try 'require' to be safe with unknown module structure or straight import.
// For coolsms-node-sdk, it is often:
const messageService = mysms(apiKey, apiSecret);

export async function sendNotificationSMS(
    recipientPhone: string,
    customerName: string,
    companyName: string,
    personCount: string,
    location: string,
    date: string
) {
    try {
        const text = `[패스트파이브 투어신청]
신청자: ${customerName}
회사명: ${companyName}
연락처: ${recipientPhone}
인원: ${personCount}
지역: ${location}
희망일: ${date}

빠르게 연락주세요!`;

        // Only send if we have a valid sender phone (not default placeholder if user didn't set it)
        if (senderPhone === '01000000000') {
            console.warn('Skipping SMS: No valid COOLSMS_SENDER_PHONE provided.');
            return false;
        }

        const response = await messageService.sendOne({
            to: senderPhone, // Send TO the admin
            from: senderPhone, // Send FROM the admin (must be registered)
            text: text,
            autoType: true,
        });

        console.log('SMS sent successfully:', response);
        return true;
    } catch (error) {
        console.error('SMS sending failed:', error);
        // Do not throw, so the user flow isn't interrupted
        return false;
    }
}
