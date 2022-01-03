import { app } from "../../app"
import request from "supertest"
describe("Create User Controller", () => {

    it("Should be able to create a new User", async () => {
        const dataUser = {
            name: "Complete name",
            email: "email@email.com.br",
            pass: "pass!@1"
        };
        const response = await request(app)
            .post("/user")
            .send(dataUser)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toEqual(dataUser.name);
        expect(response.body.email).toEqual(dataUser.email);
        expect(response.body.pass).toBeUndefined();//password is removed on USERVIEW.render
    })

    it("Should not be able to create a new User, user already exists", async () => {
        const dataUser = {
            name: "Name exists",
            email: "emailexists@email.com.br",
            pass: "passexists!@1"
        };
        await request(app).post("/user").send(dataUser); //should be ok
        const response = await request(app)
            .post("/user")
            .send(dataUser)
        expect(response.status).toBe(400);
        //password is removed on USERVIEW.render
    })
})