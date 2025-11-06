import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/models/index.js"; // for DB cleanup if needed

describe("Task API", () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true }); // resets DB for clean test
//   });

//   afterAll(async () => {
//     await sequelize.close();
//   });

  let createdTaskId;

  test("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Unit Test Task",
        description: "Testing with Jest",
        status: "pending",
        priority: "high",
        dueDate: "2025-12-01",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.title).toBe("Unit Test Task");

    createdTaskId = res.body.data.id;
  });

  test("should fetch all tasks", async () => {
    const res = await request(app).get("/api/tasks?page=1&limit=10");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("should fetch a single task by id", async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdTaskId);
  });

  test("should update a task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ title: "Updated Task Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Updated Task Title");
  });

  test("should delete a task", async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(204);
  });
});
