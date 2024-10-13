export class Objective {
  constructor(obj) {
    this.id = obj.id;
    this.reportId = obj.reportId;
  }
}

export class DamageObjective extends Objective {
  constructor(obj) {
    super(obj);
    this.type = "damage";
    this.typeOfDamage = obj.typeOfDamage; // selection: moedwillig, slijtage, geweld, normaal gebruik, calamiteit, anders
    this.damageDate = obj.damageDate; // date
    this.newDamage = obj.newDamage; // boolean
    this.immediateActionRequired = obj.immediateActionRequired; // boolean
  }
}

export class MaintenanceObjective extends Objective {
  constructor(obj) {
    super(obj);
    this.type = "maintenance";
    this.typeOfMaintenance = obj.typeOfMaintenance; // selection: schilderwerk, houtrot, elektra, leidingwerk, beglazing
    this.immediateActionRequired = obj.immediateActionRequired; // boolean
    this.costs = obj.costs; // selection: 0-500, 500-1500, 1500+
  }
}

export class InstallationObjective extends Objective {
  constructor(obj) {
    super(obj);
    this.type = "installation";
    this.typeOfInstallation = obj.typeOfInstallation; // selection: koeling, verwarming, luchtverversing, elektra, beveiliging
    this.testProcedure = obj.testProcedure; // link
    this.approved = obj.approved; // boolean
    this.reportedMalfuctions = obj.reportedMalfuctions; // text
  }
}

export class ModificationObjective extends Objective {
  constructor(obj) {
    super(obj);
    this.type = "modification";
    this.executedBy = obj.executedBy; // selection: huurder, aannemer, onbekend
    this.action = obj.action; // selection: accepteren, laten keuren, laten verwijderen, laten aanpassen, en keuren
    this.reportedSituation = obj.reportedSituation; // link
  }
}

export function objectiveFactory(obj) {
  switch (obj.type) {
    case "damage":
      return new DamageObjective(obj);
    case "maintenance":
      return new MaintenanceObjective(obj);
    case "installation":
      return new InstallationObjective(obj);
    case "modification":
      return new ModificationObjective(obj);
    default:
      return new Objective(obj);
  }
}
