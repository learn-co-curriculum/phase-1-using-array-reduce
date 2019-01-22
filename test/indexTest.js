const expect = chai.expect;

describe('reducer', function() {
  describe('batteries', function() {
    it('should have a `totalBatteries` variable', function() {
      expect(totalBatteries).toExist();
    });

    it('should have a number as a result', function() {
      expect(totalBatteries).toBeA('number');
    });

    it('should have made the sum of all the assembled batteries', function() {
      expect(totalBatteries).toEqual(31);
    });
  });
});
