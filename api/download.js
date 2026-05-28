export default async function handler(req, res) {
  const { url } = req.query;
  const apiResponse = await fetch(`https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/rich_response/index?url=${encodeURIComponent(url)}`, {
    headers: {
      'x-rapidapi-key': 'f1732e1c0fmsh0fe5a74cc5bb450p140784jsn8f25537eb8db',
      'x-rapidapi-host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
    }
  });
  const data = await apiResponse.json();
  res.status(200).json(data);
}