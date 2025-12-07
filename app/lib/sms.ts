import mysms from 'coolsms-node-sdk';

export async function sendNotificationSMS(
    recipientPhone: string,

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
