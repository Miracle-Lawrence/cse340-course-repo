import express from "express";

import { showHomePage } from "./index.js";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
    organizationValidation,
  processNewOrganizationForm,
  showEditOrganizationForm,
    processEditOrganizationForm
} from "./organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation
} from "./projects.js";

import {
  showCategoriesPage,
  getCategoryDetails,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation
} from "./categories.js";

import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
  requireRole,
  showRegisteredUsersPage
} from "./users.js";

import {
  addVolunteerController,
  removeVolunteerController,
} from "../controllers/volunteer.js";

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
// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post(
  "/new-organization", requireRole('admin'),
  organizationValidation, processNewOrganizationForm,
);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  processEditOrganizationForm,
);

// Route for new project page
router.get("/new-project", requireRole("admin"), showNewProjectForm);

// Route to handle new project form submission
router.post(
  "/new-project",
  requireRole("admin"),
  projectValidation,
  processNewProjectForm,
);

// Routes to handle the assign categories to project form
router.get(
  "/assign-categories/:projectId",
  requireRole("admin"),
  showAssignCategoriesForm,
);
router.post(
  "/assign-categories/:projectId",
  requireRole("admin"),
  processAssignCategoriesForm,
);

// Route to display the edit project form
router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);


// Route to handle the edit project form submission
router.post(
  "/edit-project/:id",
  requireRole("admin"),
  projectValidation,
  processEditProjectForm,
);

// CREATE
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  processNewCategoryForm,
);

// EDIT
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidation,
  processEditCategoryForm,
);

// User registration routes
router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// User Dashboard 
router.get('/dashboard', requireLogin, showDashboard);

//Reistered-Users Page 
router.get('/registered-users', requireRole("admin"), showRegisteredUsersPage)

router.post(
  "/projects/:id/volunteer",
  requireLogin,
  addVolunteerController,
);

router.post(
  "/projects/:id/unvolunteer",
  requireLogin,
  removeVolunteerController,
);

// error-handling routes
router.get("/test-error", testErrorPage);

export default router;
