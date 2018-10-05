const armor = require('armor.js');

class ArmorRollAssessment {

  constructor(rollID, name, keep, comments) {
    this.rollID = rollID;
    this.name = name;
    this.keep = keep.toLowerCase();
    this.comments = comments;
  }

}

exports.ArmorRollAssessment = ArmorRollAssessment;
