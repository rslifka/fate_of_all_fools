class ArmorRoll {

  constructor(rollID, name, basePerk, perk1, perk2, comments) {
    this.rollID = rollID;
    this.name = name;
    this.comments = '['+basePerk+' - '+perk1+'/'+perk2+'] ' + comments;
  }

}

exports.ArmorRoll = ArmorRoll;
