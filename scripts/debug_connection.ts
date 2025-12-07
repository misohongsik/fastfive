
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Connecting to database...');
    try {
        // 1. Check connection
        await prisma.$connect();
        console.log('✅ Connection Successful!');

        // 2. Check current database name
        const result = await prisma.$queryRaw`SELECT DATABASE() as dbName` as any[];
        const dbResult = result[0];
        console.log('📂 Current Database:', dbResult);

        // 3. List tables (MySQL specific)
        const tables = await prisma.$queryRaw`SHOW TABLES`;
        console.log('📋 Tables in DB:', tables);

        // 4. Check for TourRequest table explicitly
        // Since the table name format in result depends on db name, we iterate
        const tableList = (tables as any[]).map(t => Object.values(t)[0]);
        const hasTable = tableList.includes('TourRequest') || tableList.includes('tourrequest'); // case sensitivity check might be needed

        if (hasTable) {
            console.log('✅ table "TourRequest" found!');

            // 5. Try to Count
            const count = await prisma.tourRequest.count();
            console.log(`📊 Current Row Count: ${count}`);

            // 6. Try to Insert (and rollback if possible, or just delete)
            console.log('📝 Attempting dummy insert...');
            const dummy = await prisma.tourRequest.create({
                data: {
                    name: 'DEBUG_TEST',
                    companyName: 'DEBUG_CO',
                    phone: '000-0000-0000',
                    email: 'debug@test.com',
                    personCount: '1',
                    locationPreference: 'Gangnam',
                    tourDate: new Date(),
                    marketingConsent: false
                }
            });
            console.log('✅ Insert Successful! Created ID:', dummy.id);

            // Clean up
            await prisma.tourRequest.delete({ where: { id: dummy.id } });
            console.log('🧹 Cleaned up dummy record.');

        } else {
            console.error('❌ FATAL: "TourRequest" table NOT found in this database!');
            console.error('   Please run `npx prisma db push` to sync the schema.');
        }

    } catch (error) {
        console.error('❌ Database Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
