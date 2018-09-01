const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

exports.Weapon = class Weapon {

  constructor(name, rarity, type, assessment, comments) {
    this.name = name;
    this.rarity = rarity.toLowerCase();
    this.type = type;
    switch(assessment) {
      case 'Always Junk':
        this.pve = Utility.NO;
        this.pvp = Utility.NO;
        break;
      case 'Check Roll':
        this.pve = Utility.UNKNOWN;
        this.pvp = Utility.UNKNON;
        break;
    }
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

  isJunk() {
    return this.pveUtility === Utility.NO && this.pvpUtility === Utility.NO;
  }

}

exports.Utility = Utility;
