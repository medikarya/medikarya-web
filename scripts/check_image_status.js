const https = require('https');

https.get('https://medikarya.in/og-image.png', (res) => {
    console.log('Image URL Status:', res.statusCode);
    if (res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
    }
}).on('error', (e) => {
    console.error(e);
});
