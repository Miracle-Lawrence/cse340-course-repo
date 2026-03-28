import db from "./db.js";
import pool from "./db.js";

const getAllCategories = async () => {
  const query = `
        SELECT name
        FROM public.categories;
    `;

  const result = await db.query(query);

  return result.rows;
};

// Get single category by ID
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT 
      category_id,
      name
    FROM categories
    WHERE category_id = $1;
  `;

  const query_params = [categoryId];
  const result = await db.query(query, query_params);

  return result.rows[0]; // single category
};

// Get all categories for a given project
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT 
      c.category_id,
      c.name
    FROM categories c
    JOIN project_categories pc 
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1;
  `;

  const query_params = [projectId];
  const result = await db.query(query, query_params);

  return result.rows; // multiple categories
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

// ✅ Create Category
const createCategory = async (name) => {
  const sql = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING category_id;
  `;

  const result = await pool.query(sql, [name]);
  return result.rows[0].category_id;
};


// ✅ Update Category
const updateCategory = async (id, name) => {
  const sql = `
    UPDATE categories
    SET name = $2
    WHERE category_id = $1;
  `;

  await pool.query(sql, [id, name]);
};


export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  updateCategoryAssignments,
  createCategory,
  updateCategory,
};
