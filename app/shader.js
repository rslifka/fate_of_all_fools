const Keep = {
  NO: 'n',
  YES: 'y',
  UNKNOWN: '?'
}

class Shader {

  constructor(name, keep, comments) {
    this.name = name;
    this.keep = keep.toLowerCase();
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

exports.Shader = Shader;
exports.Keep = Keep;
