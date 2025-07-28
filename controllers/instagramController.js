import { IgApiClient } from 'instagram-private-api';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_FILE = path.resolve(__dirname, 'ig_state.json');

const ig = new IgApiClient();

const fetchInstagramPosts = async (req, res) => {
  try {
    console.log("hello",req.body)
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(400).send('Instagram access token is not set.');
    }
    const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${accessToken}`);
    const posts = response.data.data.filter(post => post.media_type === 'IMAGE').slice(0, 6);
    if (posts.length > 0 && !posts[0].permalink) {
      return res.status(500).send('Permalink is not available in the response.');
    }
    res.json(posts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error.message);
    res.status(500).send('Error fetching Instagram posts');
  }
};


export { fetchInstagramPosts };