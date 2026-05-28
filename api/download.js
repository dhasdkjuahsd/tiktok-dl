export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "الرابط مفقود" });

  try {
    const response = await fetch(`https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/rich_response/index?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com',
        'x-rapidapi-key': 'YOUR_API_KEY_HERE'f1732e1c0fmsh0fe5a74cc5bb450p140784jsn8f25537eb8db'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "خطأ في الاتصال بالـ API" });
  }
}
