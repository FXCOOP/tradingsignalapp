// Quick script to check Render's current outbound IP
import https from 'https';

const url = 'https://api.ipify.org?format=json';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const ip = JSON.parse(data);
        console.log('\n🌐 Current Render Outbound IP:', ip.ip);
        console.log('\n📋 Send this IP to Trading CRM to whitelist:\n');
        console.log(`   ${ip.ip}\n`);
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
