import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controller.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { changeCurrentPaassword } from "../controllers/user.controller.js";
import { changeUsername } from "../controllers/user.controller.js";
import { updateAccountDetails } from "../controllers/user.controller.js";
import { updateUserAvatar } from "../controllers/user.controller.js";
import { updateUserCoverImage } from "../controllers/user.controller.js";
import { getUserByUsername } from "../controllers/user.controller.js";
import { getWatchHistory } from "../controllers/user.controller.js";

 
const router = Router()
 
router.route("/register").post(
    upload.fields(
        [
           {
   name: "avatar",
   maxCount: 1
           },
           {
           name: "coverImage",
           maxCount: 1
           }
        ]
    ),
    registerUser
)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post((verifyJWT),  logoutUser)
router.route("/refresh-token").post( refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPaassword)
router.route("change-username").get(verifyJWT, changeUsername)
router.route("/update-accout").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, updateUserAvatar)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserByUsername)
router.route("watch-history").get(verifyJWT, getWatchHistory)
export default router