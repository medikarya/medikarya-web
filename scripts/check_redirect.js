const https = require('https');

https.get('https://medikarya.in', (res) => {
    console.log('Status:', res.statusCode);
    if (res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        // Just in case there is body
    });
}).on('error', (e) => {
    console.error(e);
});
