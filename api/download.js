module.exports = async function handler(req, res) {
  try {
    const url = req.query.url || (req.body && req.body.url);
    if (!url) {
      return res.status(400).json({ error: 'Missing url' });
    }

    // ضع المفتاح مباشرة هنا للتجربة فقط
    const apiKey = 'f1732e1c0fmsh0fe5a74cc5bb450p140784jsn8f25537eb8db';
    const apiHost = 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com';

    const apiUrl = `https://${apiHost}/rich_response/index?url=${encodeURIComponent(url)}`;

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    // هنا تكمن المشكلة: إذا لم ينجح الاتصال، الموقع يرسل نصاً وليس JSON
    const textData = await apiResponse.text();
    
    try {
        const jsonData = JSON.parse(textData);
        return res.status(apiResponse.ok ? 200 : apiResponse.status).json(jsonData);
    } catch (e) {
        // إذا فشل التحويل لـ JSON، اطبع النص لنعرف الخطأ الحقيقي
        return res.status(502).json({ error: 'API response is not valid JSON', raw: textData });
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};