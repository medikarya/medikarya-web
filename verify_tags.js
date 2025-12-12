const https = require('https');

console.log('Fetching https://www.medikarya.in/ ...');

https.get('https://www.medikarya.in/', (res) => {
    console.log('Status Code:', res.statusCode);

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        // Look for all meta tags
        const metaTags = data.match(/<meta[^>]+>/g) || [];

        console.log('\n--- FOUND OPEN GRAPH TAGS ---');
        const ogTags = metaTags.filter(tag => tag.includes('property="og:'));
        if (ogTags.length === 0) {
            console.log('NO OG TAGS FOUND!');
        } else {
            ogTags.forEach(tag => console.log(tag));
        }

        console.log('\n--- FOUND TWITTER TAGS ---');
        const twitterTags = metaTags.filter(tag => tag.includes('name="twitter:'));
        twitterTags.forEach(tag => console.log(tag));

    });
}).on('error', (e) => {
    console.error('Error:', e);
});
