const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

class WeaponRollAssessment {

  constructor(rollID, name, pveUseful, pvpUseful, comments) {
    this.rollID = rollID;
    this.name = name;
    this.pve = pveUseful.toLowerCase();
    this.pvp = pvpUseful.toLowerCase();
    this.comments = comments;
  }

  get pveUtility() {
    return WeaponRollAssessment.mapToStatus(this.pve);
  }

  get pvpUtility() {
    return WeaponRollAssessment.mapToStatus(this.pvp);
  }

  static mapToStatus(property) {
    switch(property) {
      case('y'): return Utility.YES;
      case('n'): return Utility.NO;
      default: return Utility.UNKNOWN;
    }
  }

}

exports.WeaponRollAssessment = WeaponRollAssessment;
exports.Utility = Utility;