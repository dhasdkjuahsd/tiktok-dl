module.exports = async function handler(req, res) {
  try {
    const url = req.query.url || (req.body && req.body.url);
    if (!url) {
      return res.status(400).json({ error: 'Missing url query parameter' });
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST || 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com';
    if (!apiKey) {
      return res.status(500).json({ error: 'RAPIDAPI_KEY environment variable is not set' });
    }

    const apiUrl = `https://${apiHost}/rich_response/index?url=${encodeURIComponent(url)}`;

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    const data = await apiResponse.json();
    return res.status(apiResponse.ok ? 200 : apiResponse.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};
