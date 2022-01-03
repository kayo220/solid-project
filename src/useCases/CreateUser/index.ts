import { MailtrapMailProvider } from "../../providers/Implementations/MailtrapMailProvider";
import { InAppUsersRepository } from "../../repositories/Implementations/InAppUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const inAppUsersRepository = new InAppUsersRepository();

const createUserUseCase = new CreateUserUseCase(inAppUsersRepository, mailtrapMailProvider);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController }