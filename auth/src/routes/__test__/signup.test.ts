import request from "supertest";
import {app} from "../../app"

describe(" User Signup", () => {

    it('should create a new user',  () => {
        const res =  request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "12345677"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .expect('post')
    });
    
    it('should signin a user',  () => {
        const res =  request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "12345677"
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .expect('post')
    });

    it('should return a 400 with an invalid email',  () => {
        const res =  request(app)
        .post('/api/users/signup')
        .send({
            email: "test@tt.com",
            password: "12345677"
        })
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('post')
    });

    it('should return 400 with an invalid password',  () => {
        const res =  request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "1"
        })
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('post')
    });

    it('should return a 400 with missing email and password', () => {
        const res = request(app)
        .post('/api/users/signup')
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('post')
    });

    
    it('should disallow duplicate emails', () => {
        const res = request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "12345678"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .expect('post')

        const response = request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "12345678"
        })
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('post')
    });

});