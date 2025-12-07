import { PrismaClient } from '@prisma/client';

// [DEBUG] DATABASE_URL 검증 로직
// 비밀번호는 가리고(masking) 형식만 체크해서 로그에 남깁니다.
const url = process.env.DATABASE_URL;
if (!url) {
    console.error('❌ FATAL: DATABASE_URL 이 아예 없습니다! (undefined)');
} else {
    const maskedUrl = url.replace(/:([^@]+)@/, ':****@');
    console.log('----------------------------------------------------');
    console.log(`🧐 DATABASE_URL 진단 점검:`);
    console.log(`Value: ${maskedUrl}`);
    console.log(` - 길이: ${url.length}글자`);
    console.log(` - 따옴표(")로 시작하나? ${url.startsWith('"') ? 'YES! (범인 검거)' : 'No'}`);
    console.log(` - 따옴표(")로 끝나나? ${url.endsWith('"') ? 'YES! (범인 검거)' : 'No'}`);
    console.log(` - 공백(띄어쓰기)이 있나? ${/\s/.test(url) ? 'YES! (범인 검거)' : 'No'}`);
    console.log(` - <PASSWORD> 글자가 남아있나? ${url.includes('<PASSWORD>') ? 'YES! (수정 필요)' : 'No'}`);
    console.log('----------------------------------------------------');
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
