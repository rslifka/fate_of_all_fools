class ArmorRollAssessment {

  constructor(rollID, name, keep, comments) {
    this.rollID = rollID;
    this.name = name;
    this.keep = keep.toLowerCase();
    this.comments = comments;
  }

}

const Keep = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

exports.ArmorRollAssessment = ArmorRollAssessment;
exports.Keep = Keep;
