const Utility = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

class ArmorRoll {

  constructor(rollID, name, pve, pvp, mob, res, rec, int, dis, str, comments) {
    this.rollID = rollID;
    this.name = name;
    this.pve = pve.toLowerCase();
    this.pvp = pvp.toLowerCase();
    this.mob = parseInt(mob);
    this.res = parseInt(res);
    this.rec = parseInt(rec);
    this.int = parseInt(int);
    this.dis = parseInt(dis);
    this.str = parseInt(str);
    this.total = this.mob+this.rec+this.res+this.int+this.dis+this.str;
    this.comments = comments;
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