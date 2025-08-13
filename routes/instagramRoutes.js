import express from 'express';
import { fetchInstagramPosts } from '../controllers/instagramController.js'
const router = express.Router();
import axios from 'axios'
router.get('/posts', fetchInstagramPosts);

router.get('/posts/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'X-IG-App-ID': '936619743392459',
        },
      }
    );

    const mediaEdges =
      response.data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

    const posts = mediaEdges.slice(0, 10).map(edge => {
      const node = edge.node;
      return {
        id: node.id,
        media_url: node.display_url,
        permalink: `https://www.instagram.com/p/${node.shortcode}/`,
        caption: node.edge_media_to_caption.edges[0]?.node?.text || '',
        media_type: node.is_video ? 'VIDEO' : 'IMAGE',
      };
    });

    res.json(posts);
  } catch (error) {
    console.error('Instagram scraping failed:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram posts. Instagram may have blocked your IP or changed structure.' });
  }
});



export default router;
