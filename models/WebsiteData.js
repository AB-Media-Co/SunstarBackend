// models/WebsiteData.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const AmenitySchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
  }
);



const FeatureSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
  }
);

const ShineSectionSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    features: [FeatureSchema],

  }
);

const PartnerLogoSchema = new Schema({
  src: { type: String, required: true, trim: true }, // image URL
  alt: { type: String, trim: true },                  // optional accessible label
  link: { type: String, trim: true },                 // optional click-through link
});


const HeroSectionSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    }
    // image: {
    //   type: String
    // }
  }
);
const HomePageDescriptionsSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    }
  }
)



const HomePartnersSchema = new Schema({
  heading: { type: String, trim: true },             // e.g., "Our Partners"
  subheading: { type: String, trim: true },          // optional subtitle
  logos: [PartnerLogoSchema],                         // array of logos
  layout: { type: String, enum: ['grid', 'carousel'], default: 'grid' } // optional layout hint
});



const ShineItemSchema = new Schema({
  image: { type: String, required: true, trim: true },
  heading: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

// (2) Parent section schema
const WhatMakesUsShineSchema = new Schema({
  heading: { type: String, required: true, trim: true },      // main heading
  description: { type: String, required: true, trim: true },  // main description
  items: {
    type: [ShineItemSchema],
    validate: [
      (arr) => Array.isArray(arr) && arr.length === 3,
      'Exactly 3 items are required in WhatMakesUsShine.items',
    ],
  },
});




const OfferingSectionSchema = new Schema({
  heading: { type: String, required: true, trim: true },
  offers: [
    {
      title: { type: String },
      description: { type: String },
      link: { type: String },
      image: { type: String }
    }
  ]
});



const ValueDataSchema = new Schema({
  title: { type: String },
  description: { type: String },

});

const ValueSectionSchema = new Schema({
  heading: { type: String, required: true, trim: true },
  valueData: [ValueDataSchema],
  heroSectionDescription: { type: String }
});

const WhySunstarSchema = new Schema({
  WhySunstarValue: ValueSectionSchema,
});



const GridItemSchema = new Schema({
  images: [
    { type: String, required: true }
  ],
  content: [
    {
      type: {
        type: String,
        required: true,
        enum: ["div", "image"],
      },
      content: { type: String },
      bg: { type: String },
      src: { type: String },
    },
  ],
});

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
});

const TestimonialSchema = new Schema({
  clientHeading: {
    type: String,
    required: true,
    trim: true,
  },
  clients: [ClientSchema],
});



const CoorporateBookingHeroSection = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String }

});


const CoorporateBookingescriptionSection = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String }

});


const BusinessPlatformSection = new Schema({
  title: { type: String },
  description: { type: String }
});


const BenefitsSection = new Schema({
  title: { type: String },
  description: { type: String },
});



const CoorporateBookingSchmea = new Schema({
  CoorporateBookingHeadContent: CoorporateBookingHeroSection,
  CoorporateBookingDescription: CoorporateBookingescriptionSection,
  BusinessPlatformSection: [BusinessPlatformSection],
  BenefitsSection: [BenefitsSection]
});



const FaqSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

const ContactUsDetailSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
  },
  OtherEnquieirs: {
    reservations: { type: String, required: true, trim: true },
    corporateSales: { type: String, required: true, trim: true },
    traveAgentSales: { type: String, required: true, trim: true },
    marketing: { type: String, required: true, trim: true },
    careers: { type: String, required: true, trim: true },
    hotelDevelopment: { type: String, required: true, trim: true },
  }
});


const WebsiteDataSchema = new Schema(
  {
    amenities: [AmenitySchema],
    grid: {
      default: GridItemSchema,        // fallback
      travelAgent: GridItemSchema,    // optional
      career: GridItemSchema          // optional
    },
    shineSection: ShineSectionSchema,
    heroSection: HeroSectionSchema,
    homePageDescription: HomePageDescriptionsSchema,
    whatWeOffers: OfferingSectionSchema,
    WhySunstar: WhySunstarSchema,
    Testimonials: TestimonialSchema,
    CoorporateBooking: CoorporateBookingSchmea,
    ContactUsDetail: ContactUsDetailSchema,
    faqs: [FaqSchema],
    HomePartners: HomePartnersSchema,
    whatMakesUsShine: WhatMakesUsShineSchema,

  }
);

export default mongoose.model('WebsiteData', WebsiteDataSchema);
