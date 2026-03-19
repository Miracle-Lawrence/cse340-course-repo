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

export { getAllServiceProjects, getProjectsByOrganizationId};  