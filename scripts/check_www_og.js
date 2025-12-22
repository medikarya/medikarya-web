const https = require('https');

https.get('https://www.medikarya.in/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        const ogTags = data.match(/<meta property="og:[^>]+>/g) || [];
        console.log('OG Tags found:', ogTags.length);
        ogTags.forEach(tag => console.log(tag));

        const twitterTags = data.match(/<meta name="twitter:[^>]+>/g) || [];
        twitterTags.forEach(tag => console.log(tag));
    });
}).on('error', (e) => {
    console.error(e);
});
