export class Task {
  constructor(obj) {
    this.inspectionId = obj.inspectionId;
    this.type = obj.type;
    this.location = obj.location;
    this.reportedBy = obj.reportedBy;
    this.date = obj.date;
    this.description = obj.description;
  }
}
