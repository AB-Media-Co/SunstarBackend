import { Router } from "express";
import {
    getOwnersStats,
    updateOwnersStats,
    trackOwnersStatus,
    resetOwnersStats
} from "../controllers/dealStatsController.js";

const router = Router();


router.get("/", getOwnersStats);
router.patch("/", updateOwnersStats);
router.post("/track", trackOwnersStatus);
router.post("/reset", resetOwnersStats); // optional


export default router;
