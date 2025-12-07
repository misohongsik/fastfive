import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Force Node.js runtime to read process.env

export async function GET() {
    const allKeys = Object.keys(process.env);
    const coolKeys = allKeys.filter(k => k.startsWith('COOL'));

    return NextResponse.json({
        message: 'Environment Check',
        env_keys_count: allKeys.length,
        cool_keys_found: coolKeys,
        all_keys_sample: allKeys.slice(0, 10), // Show first 10 keys to verify we are reading env
        node_env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
}
