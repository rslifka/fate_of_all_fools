const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

exports.Weapon = class Weapon {

  constructor(name, rarity, type, pveUseful, pvpUseful, raidUseful, comments) {
    this.name = name;
    this.rarity = rarity.toLowerCase();
    this.type = type;
    this.pve = pveUseful.toLowerCase();
    this.pvp = pvpUseful.toLowerCase();
    this.raid = raidUseful.toLowerCase();
    this.comments = comments;
  }

  static mapToStatus(property) {
    switch(property) {
      case('y'): return Utility.YES;
      case('n'): return Utility.NO;
      default: return Utility.UNKNOWN;
    }
  }

  get pveUtility() {
    return Weapon.mapToStatus(this.pve);
  }

  get pvpUtility() {
    return Weapon.mapToStatus(this.pvp);
  }

  get raidUtility() {
    return Weapon.mapToStatus(this.raid);
  }

  isJunk() {
    return this.pveUtility === Utility.NO && this.pvpUtility === Utility.NO && this.raidUtility === Utility.NO;
  }

}

exports.Utility = Utility;
