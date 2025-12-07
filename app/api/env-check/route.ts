```typescript
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Force Node.js runtime to read process.env

export async function GET() {
  const allKeys = Object.keys(process.env);
  const coolKeys = allKeys.filter(k => k.startsWith('COOL') || k.startsWith('NEXT_SMS'));
  
  return NextResponse.json({
    message: 'Environment Check',
    env_keys_count: allKeys.length,
    sms_keys_found: coolKeys, // Renamed for clarity, checking both COOL and NEXT_SMS
    all_keys_sample: allKeys.slice(0, 10),
    node_env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}
```
