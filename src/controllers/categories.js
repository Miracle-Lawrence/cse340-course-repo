// Import any needed model functions
import { getAllCategories, getCategoryById, getCategoriesByProjectId, updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";

import { getProjectsByCategoryId, getProjectDetails } from "../models/projects.js";

import { body, validationResult } from "express-validator";

// ✅ VALIDATION
const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 })
    .withMessage("Max 100 characters")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters"),
];



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

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = "Assign Categories to Project";

  res.render("assign-categories", {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories,
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  // Step 1: Get selected categories
  let selectedCategoryIds = req.body.categoryIds || [];

  // Step 2: Normalize: always an array
  if (!Array.isArray(selectedCategoryIds)) {
    selectedCategoryIds = [selectedCategoryIds];
  }

  // Step 3: Filter out any empty strings or invalid values
  selectedCategoryIds = selectedCategoryIds
    .map((id) => parseInt(id))
    .filter((id) => !isNaN(id));

  try {
    // Step 4: Update assignments safely
    await updateCategoryAssignments(projectId, selectedCategoryIds);

    req.flash("success", "Categories updated successfully.");
    res.redirect(`/project/${projectId}`);
  } catch (err) {
    console.error("Error updating categories:", err);
    req.flash("error", "Failed to update categories.");
    res.redirect(`/assign-categories/${projectId}`);
  }
};
// ===============================
// SHOW NEW CATEGORY FORM
// ===============================
const showNewCategoryForm = (req, res) => {
  res.render("new-category", { title: "Add New Category" });
};


// ===============================
// PROCESS NEW CATEGORY
// ===============================
const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach(err => req.flash("error", err.msg));
    return res.redirect("/new-category");
  }

  const { name } = req.body;

  try {
    const id = await createCategory(name);
    req.flash("success", "Category created successfully!");
    res.redirect(`/category/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Error creating category");
    res.redirect("/new-category");
  }
};


// ===============================
// SHOW EDIT CATEGORY FORM
// ===============================
const showEditCategoryForm = async (req, res) => {
  const id = req.params.id;

  const category = await getCategoryById(id);

  res.render("edit-category", {
    title: "Edit Category",
    category
  });
};


// ===============================
// PROCESS EDIT CATEGORY
// ===============================
const processEditCategoryForm = async (req, res) => {
  const id = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(err => req.flash("error", err.msg));
    return res.redirect(`/edit-category/${id}`);
  }

  const { name } = req.body;

  try {
    await updateCategory(id, name);
    req.flash("success", "Category updated successfully!");
    res.redirect(`/category/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Error updating category");
    res.redirect(`/edit-category/${id}`);
  }
};



// Export any controller functions
export {
  showCategoriesPage,
  getCategoryDetails,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation
};
