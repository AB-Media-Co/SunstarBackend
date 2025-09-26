import { Router } from "express";
import { getPolicy, upsertPolicy, getHistory } from "../controllers/policyController.js";

const router = Router();


router.get("/:type", getPolicy);


router.get("/:type/history", getHistory);

router.post("/:type", upsertPolicy);
router.put("/:type", upsertPolicy);

export default router;
