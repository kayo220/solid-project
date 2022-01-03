import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";

const routes = Router()
routes.post('/user', (request, response) => {
    return createUserController.handle(request, response);
});
export { routes }