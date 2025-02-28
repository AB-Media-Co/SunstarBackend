import express from 'express';
import { 
  createDeal, 
  getDeals, 
  getDealById, 
  updateDeal, 
  deleteDeal,
  getOfferCodesForHotel,
  getDiscountedRate
} from '../controllers/dealController.js';
import { sendOtp, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/', createDeal);
router.get('/', getDeals);
router.get('/:id', getDealById);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

router.post('/hotelOfferCodes', getOfferCodesForHotel);
router.post('/discountedRate', getDiscountedRate);



router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);

export default router;
