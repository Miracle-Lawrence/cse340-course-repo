// Import any needed model functions
import { getAllCategories, getCategoryById } from "../models/categories.js";

import { getProjectsByCategoryId } from "../models/projects.js";

// Define any controller functions
const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = "Service Categories";

  res.render("categories", { title, categories });
};

// Category Details Page
const getCategoryDetails = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);

   res.render("category", {
     category,
     projects,
     title: `Category: ${category.name}`, 
   });
};

// Export any controller functions
export { showCategoriesPage, getCategoryDetails };
