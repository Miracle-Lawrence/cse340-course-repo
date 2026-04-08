
import { addVolunteer, removeVolunteer } from "../models/volunteer.js";

export const addVolunteerController = async (req, res) => {
  const user_id = req.session.user.user_id;
  const project_id = req.params.id; 
  await addVolunteer(user_id, project_id);

  req.flash("success", "You are now a volunteer!");
  res.redirect(`/project/${project_id}`);
};

export const removeVolunteerController = async (req, res) => {
  const user_id = req.session.user.user_id;
  const project_id = req.params.id; // ✅ FIX HERE

  await removeVolunteer(user_id, project_id);

  req.flash("success", "Removed from project.");
  res.redirect(`/project/${project_id}`);
};
