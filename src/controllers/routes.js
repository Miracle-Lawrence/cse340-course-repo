import express from "express";

import { showHomePage } from "./index.js";
import { showOrganizationsPage, showOrganizationDetailsPage } from "./organizations.js";
import { showProjectsPage, showProjectDetailsPage } from "./projects.js";
import { showCategoriesPage, getCategoryDetails } from "./categories.js";
import { testErrorPage } from "./errors.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/categories", showCategoriesPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
// Category details
router.get('/category/:id', getCategoryDetails);
// Redirect bare /category or /category/ to the main categories page


// error-handling routes
router.get("/test-error", testErrorPage);

export default router;
