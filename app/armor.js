const Keep = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

class Armor {

  constructor(name, rarity, slot, assessment, comments) {
    this.name = name;
    this.rarity = rarity.toLowerCase();
    this.slot = slot.toLowerCase();
    this.keep = (assessment === 'Always Junk') ? (Keep.NO) : (Keep.UNKNOWN);
    this.comments = comments;
  }

  get keepStatus() {
    switch(this.keep) {
      case('y'): return Keep.YES;
      case('n'): return Keep.NO;
      default: return Keep.UNKNOWN;
    }
  }

}

exports.Armor = Armor;
exports.Keep = Keep;
