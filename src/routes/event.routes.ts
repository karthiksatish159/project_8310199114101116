import { Router } from "express";
import { Fetch } from "../controller/fetch.controller";
const router=Router();
router.get('/events',Fetch.prototype.fetchEvents);
export=router;