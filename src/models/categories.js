import db from "./db.js";

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


export { getAllCategories, getCategoryById, getCategoriesByProjectId };
