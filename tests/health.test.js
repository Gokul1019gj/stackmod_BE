import request from "supertest";
import app from "../src/app.js";

describe("App Health Check", () => {
  it("should return 404 for invalid routes", async () => {
    const res = await request(app).get("/api/invalid");
    expect(res.statusCode).toBe(404);
  });
});
