import { Inspection } from "../models/inspection.model";
import { Service } from "./service";

export class InspectionService extends Service {
  constructor() {
    super(
      "http://my-json-server.typicode.com/Neryase/LOI-Front-end-frameworks/inspections",
      Inspection,
    );
  }
}
