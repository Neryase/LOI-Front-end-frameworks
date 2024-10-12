export class Inspection {
  constructor(obj) {
    this.id = obj.taskId;
    this.address = obj.address;
    this.postalCode = obj.postalCode;
    this.city = obj.city;
  }
}
