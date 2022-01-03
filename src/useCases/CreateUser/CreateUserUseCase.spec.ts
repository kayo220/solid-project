import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { MailtrapMailProvider } from "../../providers/Implementations/MailtrapMailProvider";
import { InAppUsersRepository } from "../../repositories/Implementations/InAppUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";



describe("Create user", () => {
    let usersRepository: IUsersRepository;
    let mailProvider: IMailProvider;
    let createUserUseCase: CreateUserUseCase;
    beforeAll(() => {
        usersRepository = new InAppUsersRepository();
        mailProvider = new MailtrapMailProvider();
        createUserUseCase = new CreateUserUseCase(usersRepository, mailProvider);
    })
    it("should be able to create a new user", async () => {

        const userData: User = {
            name: "testname",
            email: "test@test.com.br",
            password: "teste@pass"
        };
        const user = await createUserUseCase.execute(userData);
        expect(user).toHaveProperty("id");
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
        expect(user.password).toBe(userData.password);

    });

    it("should not be able to create a new user, user already exists", async () => {
        const userData: User = {
            name: "Test Existing Name",
            email: "testexisting@test.com.br",
            password: "test@pass"
        };
        await createUserUseCase.execute(userData);//should save
        await expect(createUserUseCase.execute(userData))
            .rejects
            .toEqual(new Error('User already exists'));
    });
})