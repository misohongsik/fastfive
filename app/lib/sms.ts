import mysms from 'coolsms-node-sdk';

export async function sendNotificationSMS(
    recipientPhone: string,
    customerName: string,
    companyName: string,
    personCount: string,
    location: string,
    date: string
): Promise<{ success: boolean; error?: string }> {
    // Priority: NEXT_SMS -> COOLSMS (Fallback)
    const apiKey = process.env.NEXT_SMS_API_KEY || process.env.COOLSMS_API_KEY;
    const apiSecret = process.env.NEXT_SMS_API_SECRET || process.env.COOLSMS_API_SECRET;
    const senderPhone = process.env.NEXT_SMS_SENDER_PHONE || process.env.COOLSMS_SENDER_PHONE;

    const missingVars: string[] = [];
    if (!apiKey) missingVars.push('NEXT_SMS_API_KEY');
    if (!apiSecret) missingVars.push('NEXT_SMS_API_SECRET');
    if (!senderPhone) missingVars.push('NEXT_SMS_SENDER_PHONE');

    if (missingVars.length > 0) {
        // Debug: What keys ARE available?
        const availableKeys = Object.keys(process.env).filter(k => k.includes('SMS') || k.startsWith('COOL'));
        console.warn(`Skipping SMS: Missing vars: ${missingVars.join(', ')}`);
        return {
            success: false,
            error: `Environment variables missing: ${missingVars.join(', ')}. Details: Found keys [${availableKeys.join(', ')}]`
        };
    }

    try {
        const messageService = new mysms(apiKey as string, apiSecret as string);

        const text = `[패스트파이브 투어신청]
신청자: ${customerName}
회사명: ${companyName}
연락처: ${recipientPhone}
인원: ${personCount}
지역: ${location}
희망일: ${date}

빠르게 연락주세요!`;

        const response = await messageService.sendOne({
            to: senderPhone as string,
            from: senderPhone as string,
            text: text,
            autoTypeDetect: true,
        });

        console.log('SMS sent successfully:', response);
        return { success: true };

    } catch (error: any) {
        console.error('SMS sending failed:', error);
        // Extract meaningful error message
        const errorMsg = error.message || JSON.stringify(error);
        return { success: false, error: `SMS Send Failed: ${errorMsg}` };
    }
}
