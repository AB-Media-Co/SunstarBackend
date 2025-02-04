// controllers/instagramController.js
import { IgApiClient } from 'instagram-private-api';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATE_FILE = path.resolve(__dirname, 'ig_state.json');

const ig = new IgApiClient();

async function loginToInstagram() {
  // Use environment variables if available. For debugging, you can log the username.
  const username = process.env.IG_USERNAME || 'hotel_sunstar_group';
  const password = process.env.IG_PASSWORD || 'insta@sunstar#2024';

  console.log('Attempting login for user:', username); // Debug only (avoid logging passwords)

  // Generate a device based on the username
  ig.state.generateDevice(username);

  // Use persisted session state if available to reduce login frequency
  if (fs.existsSync(STATE_FILE)) {
    try {
      const savedState = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      await ig.state.deserialize(savedState);
      console.log('Loaded persisted IG session state.');
    } catch (err) {
      console.error('Failed to load persisted state. Proceeding with login.', err);
      await doLogin(username, password);
    }
  } else {
    await doLogin(username, password);
  }
}

async function doLogin(username, password) {
  try {
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(username, password);
    await ig.simulate.postLoginFlow();

    // Persist the session state for future use
    const state = await ig.state.serialize();
    fs.writeFileSync(STATE_FILE, JSON.stringify(state));
    console.log('IG session state persisted.');

    return loggedInUser;
  } catch (error) {
    if (error.name === 'IgLoginBadPasswordError') {
      console.error(
        'Instagram rejected the login credentials. Please verify that the username and password are correct and that there are no extra spaces or characters.'
      );
      // Additional suggestion: Try logging in manually (via the official app or website)
      // to see if Instagram triggers a challenge.
    } else {
      console.error('Error during login:', error);
    }
    throw error;
  }
}

export async function getInstagramPosts(req, res) {
  try {
    await loginToInstagram();

    // Search for the user by username
    const user = await ig.user.searchExact('hotel_sunstar_group');
    const userFeed = ig.feed.user(user.pk);

    const posts = [];
    let count = 0;
    let items;

    do {
      items = await userFeed.items();
      for (const post of items) {
        if (count < 5) {
          posts.push({
            imageUrl: post.image_versions2?.candidates[0]?.url || '',
            caption: post.caption ? post.caption.text : 'No caption',
            link: `https://www.instagram.com/p/${post.code}/`,
            timestamp: post.taken_at,
          });
          count++;
        }
      }
    } while (userFeed.isMoreAvailable() && count < 5);

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

export async function proxyImage(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('No URL provided');
  }
  try {
    // Fetch the image data from the remote URL using axios
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    // Set the appropriate content type
    res.set('Content-Type', response.headers['content-type']);
    // Set a CORS header so that the browser can use the image
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).send('Error fetching image');
  }
}
