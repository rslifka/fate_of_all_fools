const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

class WeaponRollAssessment {

  constructor(rollID, name, pveUseful, pvpUseful) {
    this.rollID = rollID;
    this.name = name;
    this.pve = pveUseful.toLowerCase();
    this.pvp = pvpUseful.toLowerCase();
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