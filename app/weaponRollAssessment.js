const weapon = require('weapon.js');

class WeaponRollAssessment {

  constructor(rollID, name, pveUseful, pvpUseful, comments) {
    this.rollID = rollID;
    this.name = name;
    this.pve = pveUseful.toLowerCase();
    this.pvp = pvpUseful.toLowerCase();
    this.comments = comments;
  }

  get pveUtility() {
    return weapon.Weapon.mapToStatus(this.pve);
  }

  get pvpUtility() {
    return weapon.Weapon.mapToStatus(this.pvp);
  }

  isJunk() {
    return this.pveUtility === weapon.Utility.NO && this.pvpUtility === weapon.Utility.NO;
  }

}

exports.WeaponRollAssessment = WeaponRollAssessment;
