import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WebsiteData from './models/WebsiteData.js';

dotenv.config();

// Dummy Data based on user's uploaded image
const dummyOffer = {
    heading: "What We Offer",
    offers: [
        {
            title: "Why Sunstar?",
            description: "Discover who we are, what we believe in, and the purpose that drives our journey.",
            link: "/why-sunstar",
            image: "https://res.cloudinary.com/dmyzudtut/image/upload/v1733053600/whybloom_sw9s4r.svg", // Placeholder or use the uploaded image if hosted
            buttonText: "Know More"
        },
        {
            title: "Tour & Travel",
            description: "Explore breathtaking destinations, curated experiences, and memorable stays with us.",
            link: "/tour-travel",
            image: "https://res.cloudinary.com/dmyzudtut/image/upload/v1733053600/travel_p5f6d5.svg",
            buttonText: "Explore"
        },
        {
            title: "Event & Conference",
            description: "Plan business meets, celebrations, and gatherings with seamless support & venues.",
            link: "/events",
            image: "https://res.cloudinary.com/dmyzudtut/image/upload/v1733053600/conf_e6s5g4.svg",
            buttonText: "Plan Now"
        }
    ]
};

const pages = ['home', 'whySunstar', 'corporate', 'travelAgent', 'comeShineWithUs'];

const populateData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let websiteData = await WebsiteData.findOne();
        if (!websiteData) {
            websiteData = new WebsiteData();
        }

        if (!websiteData.whatWeOffers) {
            websiteData.whatWeOffers = {};
        }

        pages.forEach(page => {
            websiteData.whatWeOffers[page] = dummyOffer;
            console.log(`Updated data for page: ${page}`);
        });

        await websiteData.save();
        console.log('All pages updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating data:', error);
        process.exit(1);
    }
};

populateData();
