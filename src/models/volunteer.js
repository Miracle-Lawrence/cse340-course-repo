// models/volunteer.js
import db from "./db.js";

export const addVolunteer = async (user_id, project_id) => {
  const query = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;
  await db.query(query, [user_id, project_id]);
};

export const removeVolunteer = async (user_id, project_id) => {
  const query = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
  `;
  await db.query(query, [user_id, project_id]);
};

export const getUserVolunteerProjects = async (user_id) => {
  const query = `
    SELECT sp.*
    FROM ServiceProjects sp
    JOIN volunteers v ON sp.project_id = v.project_id
    WHERE v.user_id = $1
    ORDER BY sp.date
  `;
  const result = await db.query(query, [user_id]);
  return result.rows;
};

export const isUserVolunteer = async (user_id, project_id) => {
  const query = `
    SELECT 1 FROM volunteers
    WHERE user_id = $1 AND project_id = $2
  `;
  const result = await db.query(query, [user_id, project_id]);
  return result.rows.length > 0;
};
