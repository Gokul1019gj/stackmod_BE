import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  let token;

  test("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    });
    expect(res.statusCode).toBe(201);
  });

  test("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    token = res.body.data.accessToken;
    expect(token).toBeDefined();
  });

  test("should reject invalid login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
  });
});
