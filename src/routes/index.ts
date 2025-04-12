import express, { Request, Response } from "express";
import user from "./mockUserRoutes";
import mockAnimalData from "./mockAnimalRoutes";
import marketPlaceData from "./marketPlaceroutes";
import feed from "./mockFeedRoute";
import auth from "./authRoute"

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: user,
  },
  {
    path: "/animal",
    route: mockAnimalData,
  },
  {
    path: "/marketplace",
    route: marketPlaceData,
  },
  {
    path : "/feed",
    route : feed
  },
  {
    path : "/auth",
    route : auth
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
