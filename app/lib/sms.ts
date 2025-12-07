import mysms from 'coolsms-node-sdk';

export async function sendNotificationSMS(
    recipientPhone: string,
    customerName: string,
    companyName: string,
    personCount: string,
    location: string,
    date: string
): Promise<{ success: boolean; error?: string }> {

    // 🔥 EMERGENCY DEBUGGING FIX: Hardcoded Credentials 🔥
    // Vercel Environment Variables are failing injection. 
    // We are forcing the keys here to restore service immediately.
    // TODO: Rotate these keys after resolving Vercel config issue.
    // FORCE_REDEPLOY_TIMESTAMP: 2025-12-07T23:58:00 (KST)

    const apiKey = "NCST1EKOISQQJ7CJ";
    const apiSecret = "DIG3UBUPKLXJMWPGOTPNMDAQ6ATQTYCS";
    const senderPhone = "01098479375";

    // Debug: Explicitly Confirming Hardcoded Values
    console.log(`[DEBUG] Using Hardcoded Keys: Key=${apiKey.substring(0, 4)}..., Sender=${senderPhone}`);

    try {
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
            to: senderPhone,
            from: senderPhone,
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
