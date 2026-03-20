// Import model functions
import {
  getProjectDetails,
  getUpcomingProjects,
} from "../models/projects.js";

import { getCategoriesByProjectId } from "../models/categories.js";

// 🔥 Constant for number of projects
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// ===============================
// Show Upcoming Projects Page
// ===============================
const showProjectsPage = async (req, res) => {
  // Use upcoming projects instead of all projects
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

  const title = "Upcoming Service Projects";

  res.render("projects", { title, projects });
};

// ===============================
// Show Single Project Details Page
// ===============================
const showProjectDetailsPage = async (req, res) => {
  // Extract ID from URL
  const projectId = req.params.id;

  // Get project from database
  const project = await getProjectDetails(projectId);

  // Get categories for this project
  const categories = await getCategoriesByProjectId(projectId);

  // Render project details page
  res.render("project", { 
    title: project.title, 
    project,
    categories
  });
};

// Export controller functions
export { showProjectsPage, showProjectDetailsPage };
