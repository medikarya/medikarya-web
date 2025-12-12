const https = require('https');

console.log('Fetching https://www.medikarya.in/ ...');

https.get('https://www.medikarya.in/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const html = data.toString();

        // Extract meta tags using a regex that captures the full tag
        const metaRegex = /<meta\s+(?:property|name)=["'](og:|twitter:)[^"']+["']\s+content=["'][^"']+["']\s*\/?>/g;
        const matches = html.match(metaRegex);

        if (matches) {
            console.log('\nSUCCESS! Found ' + matches.length + ' tags:');
            matches.forEach(m => console.log(m));
        } else {
            console.log('No OG/Twitter meta tags found.');
        }
    });
}).on('error', (e) => {
    console.error(e);
});
