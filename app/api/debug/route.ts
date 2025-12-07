import { NextResponse } from 'next/server';

export async function GET() {
    const url = process.env.DATABASE_URL || 'undefined';

    // 비밀번호 마스킹 (보안)
    // mysql://user:password@host... 형식을 가정
    const maskedUrl = url.replace(/(:[^:@]+@)/, ':****@');

    return NextResponse.json({
        status: 'Diagnostic Check',
        timestamp: new Date().toISOString(),
        env_check: {
            DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
            DATABASE_URL_LENGTH: url.length,
            DATABASE_URL_MASKED: maskedUrl,
            STARTS_WITH_QUOTE: url.startsWith('"') || url.startsWith("'"),
            ENDS_WITH_QUOTE: url.endsWith('"') || url.endsWith("'"),
            CONTAINS_WHITESPACE: /\s/.test(url),
            CONTAINS_TEST_DB: url.includes('/test'),
            CONTAINS_FASTFIVE_DB: url.includes('/fastfive'),
        },
        node_env: process.env.NODE_ENV,
    });
}
