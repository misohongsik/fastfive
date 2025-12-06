'use server';

import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { redirect } from 'next/navigation';

const TourSchema = z.object({
    name: z.string().min(2, '이름을 입력해주세요.'),
    companyName: z.string().min(1, '회사명을 입력해주세요.'),
    phone: z.string().min(10, '올바른 연락처를 입력해주세요.'),
    email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
    personCount: z.string().min(1, '인원수를 입력해주세요.'),
    locationPreference: z.string().min(1, '희망 지역을 입력해주세요.'),
    tourDate: z.string().refine((date) => new Date(date) > new Date(), {
        message: '유효한 날짜를 선택해주세요.',
    }),
    privacyConsent: z.boolean().refine((val) => val === true, {
        message: '개인정보 수집 및 이용에 동의해야 합니다.',
    }),
    marketingConsent: z.boolean(),
});

export async function submitTourRequest(prevState: any, formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        companyName: formData.get('companyName') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        personCount: formData.get('personCount') as string,
        locationPreference: formData.get('locationPreference') as string,
        tourDate: formData.get('tourDate') as string,
        privacyConsent: formData.get('privacyConsent') === 'on',
        marketingConsent: formData.get('marketingConsent') === 'on',
    };

    const validatedFields = TourSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '입력 내용을 확인해주세요.',
        };
    }

    try {
        const { privacyConsent, ...dbData } = validatedFields.data;

        await prisma.tourRequest.create({
            data: {
                ...dbData,
                tourDate: new Date(dbData.tourDate),
            },
        });

        return { success: true, message: '투어 신청이 완료되었습니다!' };
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        };
    }
}
