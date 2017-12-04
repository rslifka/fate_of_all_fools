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
    this.comments = comments;
  }

  isJunk() {
    return !this.pveUseful && !this.pvpUseful;
  }

}
