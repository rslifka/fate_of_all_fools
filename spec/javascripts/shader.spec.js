describe('shader.js', function() {

  const shader = require('shader.js');
  const shaderParams = ['Arctic Dreamscape','Y','Cool winter camo!'];

  describe('initialization', function() {
    it('should create a Shader', function() {
      const ad = new shader.Shader(...shaderParams);
      expect(ad instanceof shader.Shader).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const ad = new shader.Shader(...shaderParams);
      expect(ad.name).toBe('Arctic Dreamscape');
      expect(ad.keep).toBe(shader.Keep.YES);
      expect(ad.comments).toBe('Cool winter camo!');
    });
  });

});
