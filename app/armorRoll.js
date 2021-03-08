const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

class ArmorRoll {

  constructor(rollID, name, element, pve, pvp, overlay, total, mob, res, rec, dis, int, str) {
    this.rollID = rollID;
    this.name = name;
    this.element = element.toLowerCase();
    this.overlay = overlay;
    this.pve = pve.toLowerCase();
    this.pvp = pvp.toLowerCase();
    this.mob = parseInt(mob);
    this.res = parseInt(res);
    this.rec = parseInt(rec);
    this.int = parseInt(int);
    this.dis = parseInt(dis);
    this.str = parseInt(str);
    this.total = parseInt(total);
  }

  get pveUtility() {
    return ArmorRoll.mapToStatus(this.pve);
  }

  get pvpUtility() {
    return ArmorRoll.mapToStatus(this.pvp);
  }

  static mapToStatus(property) {
    switch(property) {
      case('y'): return Utility.YES;
      case('n'): return Utility.NO;
      default: return Utility.UNKNOWN;
    }
  }

}

exports.ArmorRoll = ArmorRoll;
exports.Utility = Utility;