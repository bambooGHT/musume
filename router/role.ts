import { Router } from "express";
import role from "../server/role";

const roles = Router();
roles.get('/rolelist/:id', role.rolelist);
roles.get('/rolespine', role.rolespine);
roles.get('/voice/:id', role.vioce);

export default roles;