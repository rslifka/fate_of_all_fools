const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

exports.Weapon = class Weapon {

  constructor(name, rarity, type, favourite, pveUseful, pvpUseful, raidUseful, comments) {
    this.name = name;
    this.rarity = rarity.toLowerCase();
    this.type = type;
    this.fave = favourite.toLowerCase();
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

  get favouriteUtility() {
    return Weapon.mapToStatus(this.fave);
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
    return this.favouriteUtility === Utility.NO && this.pveUtility === Utility.NO && this.pvpUtility === Utility.NO && this.raidUtility === Utility.NO;
  }

}

exports.Utility = Utility;
