class ArmorRoll {

  constructor(rollID, name, mob, res, rec, int, dis, str, comments) {
    this.rollID = rollID;
    this.name = name;
    this.mob = parseInt(mob);
    this.res = parseInt(res);
    this.rec = parseInt(rec);
    this.int = parseInt(int);
    this.dis = parseInt(dis);
    this.str = parseInt(str);
    this.total = this.mob+this.rec+this.res+this.int+this.dis+this.str;
    this.comments = comments;
  }

}

exports.ArmorRoll = ArmorRoll;
