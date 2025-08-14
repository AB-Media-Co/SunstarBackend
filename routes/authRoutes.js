// src/routes/agentRoutes.js
import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  loginAgent, approveAgent, listAgents, verifyAgentOtp,
  deleteAgent
} from "../controllers/agentController.js";
import { getAgentByEmail, ROLES_ENUM } from "../models/Agent.js";

const router = Router();

// login -> sends OTP
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").isLength({ min: 7 }).withMessage("Phone required"),
    body("name").isLength({ min: 2 }).withMessage("Name required"),
    body("role").isIn(ROLES_ENUM).withMessage(`role must be one of: ${ROLES_ENUM.join(", ")}`)
  ],
  loginAgent
);

// verify OTP
router.post(
  "/verify-otp",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("otp").isLength({ min: 6, max: 6 }).withMessage("6-digit OTP required")
  ],
  verifyAgentOtp
);

router.get("/by-email", [ query("email").isEmail().withMessage("Valid email required") ], getAgentByEmail);
router.post("/:id/approve", approveAgent);
router.get("/", listAgents);


router.delete(
  "/:id",
  [ param("id").isString().withMessage("Valid id required") ],
  deleteAgent
);


export default router;
