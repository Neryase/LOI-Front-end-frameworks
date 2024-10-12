import { Task } from "../models/task.model";
import { Service } from "./service";

export class TaskService extends Service {
  constructor() {
    super(
      "http://my-json-server.typicode.com/Neryase/LOI-Front-end-frameworks/tasks",
      Task,
    );
  }

  async getAllTasksForInspection(inspectionId) {
    const res = await this.getAll();
    return res.filter((r) => r.inspectionId === inspectionId);
  }
}
