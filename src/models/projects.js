import db from './db.js'

const getAllServiceProjects = async() => {
    const query = `
        SELECT p.Date, p.title, o.name
        FROM public.ServiceProjects p
        JOIN public.organization o ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM ServiceProjects
        WHERE organization_id = $1
        ORDER BY date;
      `;

  const query_params = [organizationId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM ServiceProjects p
    JOIN organization o 
      ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;

  const query_params = [number_of_projects];

  const result = await db.query(query, query_params);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM ServiceProjects p
    JOIN organization o 
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const query_params = [id];

  const result = await db.query(query, query_params);

  return result.rows[0]; // return single project
};

// Get all projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id
    FROM ServiceProjects p
    JOIN project_categories pc 
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date;
  `;

  const query_params = [categoryId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const createProject = async (
  title,
  description,
  location,
  date,
  organizationId,
) => {
  const query = `
      INSERT INTO ServiceProjects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

  const query_params = [title, description, location, date, organizationId];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error("Failed to create project");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Created new project with ID:", result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};

export {
  getAllServiceProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByCategoryId,
  createProject,
};  