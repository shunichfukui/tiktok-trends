// pages/api/tiktok-trends.js
import axios from 'axios';

export default async function handler(res) {
  const API_KEY = process.env.NEXT_PUBLIC_TIKTOK_API_KEY; // 環境変数からAPIキーを取得
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const params = {
    keywords: '雑学,豆知識',
    start_time: Math.floor(oneWeekAgo.getTime() / 1000), // UNIXタイムスタンプで一週間前を指定
    end_time: Math.floor(Date.now() / 1000), // 現在の時間
    count: 100, // 一度に100件取得
    sort_by: 'like_count', // いいね数でソート（"view_count"で視聴数に変更可能）
  };

  try {
    const response = await axios.get(
      'https://open-api.tiktok.com/video/query/',
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params,
      }
    );

    // 上位10件を取得
    const top10Videos = response.data.items.slice(0, 10);

    res.status(200).json(top10Videos);
  } catch (error) {
    console.error('Error fetching TikTok trends:', error);
    res.status(500).json({ error: 'Failed to fetch TikTok trends' });
  }
}
