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

export {getAllServiceProjects}  