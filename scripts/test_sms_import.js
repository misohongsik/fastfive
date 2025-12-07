const mysms = require('coolsms-node-sdk').default;
// Or try: const mysms = require('coolsms-node-sdk');

console.log('Imported:', mysms);

try {
    const service = new mysms('key', 'secret');
    console.log('Instance created:', service);
    console.log('Has sendOne?', typeof service.sendOne);
} catch (e) {
    console.error('Instantiation failed:', e.message);
}
