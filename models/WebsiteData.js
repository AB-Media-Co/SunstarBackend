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

const LocationSchema = new Schema(
  {
    name: {
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
    },
    image: {
      type: String
    }
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




const OfferingSectionSchema = new Schema({
  heading: { type: String, required: true, trim: true },
  offers: [
    {
      title: { type: String },
      description: { type: String },
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
});



const WhySunstarSchema = new Schema({
  WhySunstarValue: ValueSectionSchema,
});



const GridItemSchema = new Schema({
  images: [
    {
      type: String,
      required: true
    }
  ],
  content: [{
    type: {
      type: String,
      required: true,
      enum: ['div', 'image']
    },
    content: {
      type: String
    },
    bg: {
      type: String
    },
    src: {
      type: String
    }
  }]
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
  image:{ type: String}

});


const CoorporateBookingescriptionSection = new Schema({
  title: { type: String },
  description: { type: String },
  image:{ type: String}

});


const CoorporateBookingSchmea = new Schema({
  CoorporateBookingHeadContent: CoorporateBookingHeroSection,
  CoorporateBookingDescription: CoorporateBookingescriptionSection,
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


const WebsiteDataSchema = new Schema(
  {
    amenities: [AmenitySchema],
    locations: [LocationSchema],
    grid: GridItemSchema,
    shineSection: ShineSectionSchema,
    heroSection: HeroSectionSchema,
    homePageDescription: HomePageDescriptionsSchema,
    whatWeOffers: OfferingSectionSchema,
    WhySunstar: WhySunstarSchema,
    Testimonials: TestimonialSchema,
    CoorporateBooking:CoorporateBookingSchmea,
    faqs: [FaqSchema],
  }
);

export default mongoose.model('WebsiteData', WebsiteDataSchema);
