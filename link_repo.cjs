const https = require('https');

const data = JSON.stringify({
  repo: 'https://github.com/fuxiaosao-dotcom/hotel-website',
  repo_branch: 'main',
  provider: 'github',
  deploy_key_id: '6a21474c84d5a60c6707683f',
  build_settings: {
    dir: 'dist',
    cmd: 'npm run build'
  }
});

const req = https.request({
  hostname: 'api.netlify.com',
  path: '/api/v1/sites/b4e426f8-b243-4f37-8d95-6d6339e69a52',
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer ' + process.env.NETLIFY_AUTH_TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const d = JSON.parse(body);
      console.log('Provider:', d.build_settings?.provider);
      console.log('Repo URL:', d.build_settings?.repo_url);
      console.log('Repo field:', d.repo);
      // Show all available top-level fields that might contain repo info
      if (d.repo_url) console.log('Top-level repo_url:', d.repo_url);
      if (d.provider) console.log('Top-level provider:', d.provider);
    } catch(e) {
      console.log('Raw:', body.substring(0, 300));
    }
  });
});
req.write(data);
req.end();
