import request from "supertest";
import {app} from "../../app"

describe(" User Sign in", () => {

    it('should failed when an email that does not exist is supplied',  () => {
        const res =  request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "12345677"
        })
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('post')
    });

    it('should failed when an incorrect password is supplied',  () => {
        const res =  request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "12345677"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .expect('post')

        const response =  request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "1"
        })
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('post')

        const Response =  request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "12345678"
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .expect('post')
    });

});