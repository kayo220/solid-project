import { Request, Response } from 'express'
import UserView from '../../views/UserView';
import { CreateUserUseCase } from './CreateUserUseCase'
export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            const createdUser = await this.createUserUseCase.execute({ name, email, password });
            return response.status(201).json(UserView.render(createdUser));
        } catch (err) {
            return response.status(400).json({ message: err.message || 'Unexpected Error' })
        }
    }
}