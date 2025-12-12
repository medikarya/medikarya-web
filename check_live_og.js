const https = require('https');

https.get('https://medikarya.in', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        const ogTags = data.match(/<meta property="og:[^>]+>/g) || [];
        console.log('OG Tags found:', ogTags.length);
        ogTags.forEach(tag => console.log(tag));

        // Check for og:image specific
        if (!data.includes('og:image')) {
            console.log('WARNING: No og:image tag found!');
        }
    });
}).on('error', (e) => {
    console.error(e);
});
