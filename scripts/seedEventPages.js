import mongoose from 'mongoose';
import dotenv from 'dotenv';
import EventPage from '../models/EventPage.js';

dotenv.config();

const seedEventPages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing event pages
    await EventPage.deleteMany({});
    console.log('🗑️  Cleared existing event pages');

    // Create 4 event pages
    const eventPages = [
      {
        pageType: 'event_and_conference',
        heroSection: {
          title: 'Host Exceptional Events with Hotel Sunstar Group',
          subtitle: 'Seamless Planning | Exquisite Cuisine | Unforgettable Moments',
          image: '/images/OtherPageImages/coorporateandevent.webp',
          ctaText: 'Book Your Event Now',
          ctaLink: '#contact'
        },
        heroDescription: {
          heading: 'Why Choose Sunstar for Your Events',
          description: 'Whether you are planning a corporate conference, wedding, milestone celebration, or an intimate gathering...'
        },
        ourEventsSection: {
          title: 'Our Events',
          cards: [
            {
              title: 'Personal Celebrations',
              description: 'Birthdays, baby showers, anniversaries, or private dinners, celebrate life\'s moments with intimate, personalized flair.',
              image: '/images/OtherPageImages/PersonalCeleb.webp',
              link: '/socialevents'
            },
            {
              title: 'Corporate Events',
              description: 'Conferences, seminars, business dinners, or gala nights — host every corporate event with elegance and impact.',
              image: '/images/OtherPageImages/CoorporateE.webp',
              link: '/coorporatevents'
            },
            {
              title: 'Weddings & Special Occasions',
              description: 'From elegant engagements to vibrant pre-wedding functions and dreamy receptions make every moment unforgettable.',
              image: '/images/OtherPageImages/SocialOcc.webp',
              link: '/weddingpreWedding'
            }
          ]
        },
        celebrationsSection: {
          title: 'Making Your Celebrations Seamless',
          description: 'We provide comprehensive event management services',
          features: [
            {
              title: 'Stunning Venues',
              description: 'Beautiful spaces designed for events',
              icon: '/images/othericons/stunningvenue.svg'
            },
            {
              title: 'Culinary Excellence',
              description: 'World-class catering services',
              icon: '/images/othericons/excellence.svg'
            },
            {
              title: 'Personalized Event & Services',
              description: 'Tailored solutions for your needs',
              icon: '/images/othericons/event.svg'
            },
            {
              title: 'Business & Corporate Event',
              description: 'Professional event management',
              icon: '/images/othericons/businesscard.svg'
            },
            {
              title: 'Exclusive Event Benefits',
              description: 'Premium services included',
              icon: '/images/othericons/exclusiveevent.svg'
            }
          ]
        },
        mainEventSection: {
          title: 'Event Details',
          subtitle: 'Comprehensive event management'
        },
        personalisedSection: {
          title: 'Personalised Celebration',
          description: 'Every event is unique and special',
          image: '/images/OtherPageImages/formImg1.webp'
        },
        introductionSection: {
          content: 'Our hotel offers a range of beautiful and unique event spaces, each of which can be customised to suit your needs and preferences.'
        },
        meta: {
          title: 'Events and Conferences - Host Exceptional Events with Hotel Sunstar Group',
          description: 'Plan your perfect event at Hotel Sunstar Group. From corporate conferences to weddings, we offer versatile venues and expert planning.',
          keywords: ['hotel events', 'corporate events', 'wedding venues', 'conference facilities']
        }
      },
      {
        pageType: 'corporate_events',
        heroSection: {
          title: 'Introducing Sunstar Hotels,',
          subtitle: 'the ideal destination for corporate events',
          image: '/images/OtherPageImages/CoorporateEvents.webp',
          ctaText: 'Book Now',
          ctaLink: '#contact'
        },
        heroDescription: {
          heading: 'Corporate Excellence',
          description: 'Cutting-edge meeting facilities for professional events'
        },
        innerHero: {
          heading: 'Corporate Events at Sunstar Hotels',
          description: 'Professional venues for business excellence',
          image: '/images/OtherPageImages/CoorporateEvents.webp'
        },
        overview: {
          heading: 'Why Choose Us for Corporate Events',
          description: 'Our state-of-the-art facilities and experienced team ensure your corporate events are executed flawlessly. From intimate boardroom meetings to large-scale conferences, we have the perfect space for your needs.'
        },
        celebrationTypes: {
          heading: 'Event Categories',
          description: 'We handle all types of corporate events with professionalism',
          items: [
            { title: 'Conferences', image: '/images/OtherPageImages/Conference.jpg' },
            { title: 'Training Sessions', image: '/images/OtherPageImages/Training.jpg' },
            { title: 'Gala Dinners', image: '/images/OtherPageImages/GalaDinner.jpg' },
            { title: 'Awards Ceremonies', image: '/images/OtherPageImages/AwardCeremony.webp' }
          ]
        },
        ourEventsSection: {
          title: 'Corporate Event Types',
          cards: [
            {
              title: 'Conferences',
              description: 'Large-scale conference facilities',
              image: '/images/OtherPageImages/Conference.jpg',
              link: '/coorporatevents'
            },
            {
              title: 'Training & Development',
              description: 'Professional training environments',
              image: '/images/OtherPageImages/Training.jpg',
              link: '/coorporatevents'
            },
            {
              title: 'Gala Dinners',
              description: 'Elegant corporate dining',
              image: '/images/OtherPageImages/GalaDinner.jpg',
              link: '/coorporatevents'
            },
            {
              title: 'Awards Ceremony',
              description: 'Recognition events',
              image: '/images/OtherPageImages/AwardCeremony.webp',
              link: '/coorporatevents'
            }
          ]
        },
        celebrationsSection: {
          title: 'Corporate Features',
          description: 'Professional event solutions',
          features: [
            {
              title: 'On Time',
              icon: '/images/othericons/Ontime.svg'
            },
            {
              title: 'System Driven',
              icon: '/images/othericons/systemdriven.svg'
            },
            {
              title: 'Conference Sitting',
              icon: '/images/othericons/ConferenceSitting.svg'
            },
            {
              title: 'Buffet',
              icon: '/images/othericons/buffet.svg'
            },
            {
              title: 'Projector & Mike',
              icon: '/images/othericons/projectormike.svg'
            },
            {
              title: 'Stationery',
              icon: '/images/othericons/stationary.svg'
            },
            {
              title: 'Stay',
              icon: '/images/othericons/stay.svg'
            },
            {
              title: 'Valet Parking',
              icon: '/images/othericons/valetParking.svg'
            }
          ]
        },
        mainEventSection: {
          title: 'MICE & Corporate Events',
          subtitle: 'Professional event management'
        },
        personalisedSection: {
          title: 'Corporate Solutions',
          description: 'Expert corporate event planning',
          image: '/images/OtherPageImages/formImg1.webp'
        },
        introductionSection: {
          content: 'Our cutting-edge meeting rooms and event spaces accommodate groups of all sizes with exceptional service.'
        },
        meta: {
          title: 'Corporate Events - Professional Venues at Hotel Sunstar Group',
          description: 'Host corporate events at Hotel Sunstar. From conferences to galas, we provide state-of-the-art facilities.',
          keywords: ['corporate events', 'business meetings', 'conferences', 'gala dinners']
        }
      },
      {
        pageType: 'social_events',
        heroSection: {
          title: 'Welcome to the personalised events at Sunstar Hotels!',
          subtitle: 'Celebrate Your Moments',
          image: '/images/OtherPageImages/socialeventhead.webp',
          ctaText: 'Plan Event',
          ctaLink: '#contact'
        },
        heroDescription: {
          heading: 'Social Celebrations',
          description: 'Perfect for birthdays, anniversaries, and special gatherings'
        },
        innerHero: {
          heading: 'Create Unforgettable Memories',
          description: 'Celebrate life\'s special moments with personalized social events',
          image: '/images/OtherPageImages/socialeventhead.webp'
        },
        overview: {
          heading: 'Your Perfect Celebration Awaits',
          description: 'From intimate gatherings to grand celebrations, our team specializes in creating unforgettable social events. Let us help you celebrate the moments that matter most.'
        },
        celebrationTypes: {
          heading: 'Types of Social Events',
          description: 'We bring your celebration dreams to life',
          items: [
            { title: 'Birthdays', image: '/images/OtherPageImages/Bdy.webp' },
            { title: 'Anniversaries', image: '/images/OtherPageImages/Aniv.webp' },
            { title: 'Family Gatherings', image: '/images/OtherPageImages/celeb.webp' },
            { title: 'Baby Showers', image: '/images/OtherPageImages/bbyshower.webp' }
          ]
        },
        ourEventsSection: {
          title: 'Social Event Types',
          cards: [
            {
              title: 'Birthday Celebrations',
              description: 'Make birthdays memorable',
              image: '/images/OtherPageImages/Bdy.webp',
              link: '/socialevents'
            },
            {
              title: 'Private Dinners',
              description: 'Intimate dining experiences',
              image: '/images/OtherPageImages/Aniv.webp',
              link: '/socialevents'
            },
            {
              title: 'Get Together',
              description: 'Casual social gatherings',
              image: '/images/OtherPageImages/celeb.webp',
              link: '/socialevents'
            },
            {
              title: 'Baby Shower',
              description: 'Celebrate new beginnings',
              image: '/images/OtherPageImages/bbyshower.webp',
              link: '/socialevents'
            }
          ]
        },
        celebrationsSection: {
          title: 'Social Features',
          description: 'Perfect for personal celebrations',
          features: [
            {
              title: 'On Time',
              icon: '/images/othericons/Ontime.svg'
            },
            {
              title: 'System Driven',
              icon: '/images/othericons/systemdriven.svg'
            },
            {
              title: 'Decoration',
              icon: '/images/othericons/stunningvenue.svg'
            },
            {
              title: 'Buffet',
              icon: '/images/othericons/buffet.svg'
            },
            {
              title: 'DJ & Music',
              icon: '/images/othericons/Dj.svg'
            },
            {
              title: 'Stay',
              icon: '/images/othericons/stay.svg'
            },
            {
              title: 'Parking',
              icon: '/images/othericons/valetParking.svg'
            }
          ]
        },
        mainEventSection: {
          title: 'Personalised Celebration',
          subtitle: 'Customised social events'
        },
        personalisedSection: {
          title: 'Social Events',
          description: 'Unforgettable personal celebrations',
          image: '/images/OtherPageImages/formImg2.webp'
        },
        introductionSection: {
          content: 'Our team specialises in creating unforgettable social events tailored to your preferences.'
        },
        meta: {
          title: 'Social Events - Celebrate Special Moments at Hotel Sunstar Group',
          description: 'Create unforgettable social events at Hotel Sunstar. From birthdays to celebrations.',
          keywords: ['social events', 'birthday parties', 'anniversaries', 'celebration venues']
        }
      },
      {
        pageType: 'wedding_events',
        heroSection: {
          title: 'Celebrate love at Sunstar Hotels',
          subtitle: 'weddings & pre-weddings made magical',
          image: '/images/OtherPageImages/weddinghead.webp',
          ctaText: 'Plan Wedding',
          ctaLink: '#contact'
        },
        heroDescription: {
          heading: 'Wedding Magic',
          description: 'Make your special day unforgettable'
        },
        innerHero: {
          heading: 'Your Fairytale Wedding',
          description: 'Experience magical wedding celebrations tailored to your dreams',
          image: '/images/OtherPageImages/weddinghead.webp'
        },
        overview: {
          heading: 'Making Dreams Come True',
          description: 'Every love story deserves a beautiful celebration. At Sunstar Hotels, we transform your wedding vision into reality with attention to every detail and a commitment to perfection.'
        },
        celebrationTypes: {
          heading: 'Wedding Celebrations',
          description: 'From pre-wedding to post-wedding ceremonies',
          items: [
            { title: 'Weddings & Receptions', image: '/images/OtherPageImages/Varmala.webp' },
            { title: 'Cocktail Parties', image: '/images/OtherPageImages/party.webp' },
            { title: 'Roka & Sagan', image: '/images/OtherPageImages/shadi.webp' },
            { title: 'Haldi & Mehndi', image: '/images/OtherPageImages/haldi.webp' }
          ]
        },
        ourEventsSection: {
          title: 'Wedding Event Types',
          cards: [
            {
              title: 'Wedding & Reception',
              description: 'Grand wedding celebrations',
              image: '/images/OtherPageImages/Varmala.webp',
              link: '/weddingpreWedding'
            },
            {
              title: 'Cocktail',
              description: 'Pre-wedding cocktail events',
              image: '/images/OtherPageImages/party.webp',
              link: '/weddingpreWedding'
            },
            {
              title: 'Roka & Sagan',
              description: 'Traditional ceremonies',
              image: '/images/OtherPageImages/shadi.webp',
              link: '/weddingpreWedding'
            },
            {
              title: 'Haldi & Mehndi',
              description: 'Pre-wedding festivities',
              image: '/images/OtherPageImages/haldi.webp',
              link: '/weddingpreWedding'
            }
          ]
        },
        celebrationsSection: {
          title: 'Wedding Features',
          description: 'Complete wedding solutions',
          features: [
            {
              title: 'On Time',
              icon: '/images/othericons/Ontime.svg'
            },
            {
              title: 'System Driven',
              icon: '/images/othericons/systemdriven.svg'
            },
            {
              title: 'Decoration',
              icon: '/images/othericons/stunningvenue.svg'
            },
            {
              title: 'Buffet',
              icon: '/images/othericons/buffet.svg'
            },
            {
              title: 'DJ & Music',
              icon: '/images/othericons/Dj.svg'
            },
            {
              title: 'Cocktail',
              icon: '/images/othericons/coctail.svg'
            },
            {
              title: 'Stay',
              icon: '/images/othericons/stay.svg'
            },
            {
              title: 'Parking',
              icon: '/images/othericons/valetParking.svg'
            }
          ]
        },
        mainEventSection: {
          title: 'Your Special Days',
          subtitle: 'Wedding celebrations'
        },
        personalisedSection: {
          title: 'Wedding Events',
          description: 'Magical wedding experiences',
          image: '/images/OtherPageImages/formImg3.webp'
        },
        introductionSection: {
          content: 'Make your wedding day truly special with our comprehensive wedding event management services.'
        },
        meta: {
          title: 'Wedding & Pre-Wedding Events - Create Magical Moments at Hotel Sunstar Group',
          description: 'Make your wedding extraordinary at Hotel Sunstar. Customized venues and services.',
          keywords: ['wedding venues', 'pre-wedding events', 'wedding reception', 'mehendi ceremony']
        }
      }
    ];

    // Insert event pages
    await EventPage.insertMany(eventPages);
    console.log('✅ Created 4 event pages');

    // List created pages
    const created = await EventPage.find({});
    console.log('\n📋 Event Pages Created:');
    created.forEach(page => {
      console.log(`   - ${page.pageType}`);
    });

    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedEventPages();
