const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

exports.Weapon = class Weapon {

  constructor(name, rarity, slot, type, subtype, favourite, pveUseful, pvpUseful, raidUseful, comments) {
    this.name = name;
    this.rarity = rarity.toLowerCase();
    this.slot = slot;
    this.type = type;
    this.subtype = subtype;
    this.isFavourite = favourite.toLowerCase() === 'y';
    this.pveUseful = pveUseful.toLowerCase() === 'y';
    this.pvpUseful = pvpUseful.toLowerCase() === 'y';
    this.raidUseful = raidUseful.toLowerCase() === 'y';
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
    return !this.pveUseful && !this.pvpUseful;
  }

}

exports.Utility = Utility;
