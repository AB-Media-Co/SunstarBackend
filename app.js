import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const hotels = [
  { name: 'Hotel Sunstar Residency', id: '14494', authId: '164638176786a1a258-c6ea-11ec-9' },
  { name: 'Hotel Sunstar Grand', id: '14492', authId: '431032638481c78c0e-cd20-11ec-9' },
  { name: 'Hotel Sunstar Heights', id: '15282', authId: '520246986786a91364-c6ea-11ec-9' },
  { name: 'Hotel Sunstar Heritage', id: '14493', authId: '107320434586afe643-c6ea-11ec-9' },
  { name: 'Hotel Sunshine', id: '14495', authId: '77963264823686bfcb-d038-11ec-9' },
  { name: 'The Suncourt Hotel Yatri', id: '14496', authId: '43431464258699abee-c6ea-11ec-9' },
];

app.post('/api/:hotelName', async (req, res) => {
  const { hotelName } = req.params;
  const hotel = hotels.find(h => h.name === hotelName);

  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }

  const apiUrl = 'https://live.ipms247.com/pmsinterface/pms_connectivity.php';
  const payload = {
    RES_Request: {
      Request_Type: req.body.requestType, // Dynamic request type
      Authentication: {
        HotelCode: hotel.id,
        AuthCode: hotel.authId,
      },
      ...req.body.data, // Additional data for the request
    },
  };

  try {
    const { data } = await axios.post(apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed', details: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
