describe('fateFilters.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.init');
  });

  afterEach(function() {
    $('.fate-filters').remove();
  });

  describe('in response to fate.init', function() {
    it('should install the filter markup', function() {
      expect($('body')).toContainElement('.fate-filters');
      expect($('.fate-filters')).toContainElement($('.fate-filter.fate-filter-pve.fglyph-pve'));
      expect($('.fate-filters')).toContainElement($('.fate-filter.fate-filter-pvp.fglyph-pvp'));
      expect($('.fate-filters')).toContainElement($('.fate-filter.fate-filter-raid.fglyph-skull'));
      expect($('.fate-filters')).toContainElement($('.fate-filter.fate-filter-fave.fglyph-fave'));
    });
  })

  describe('mouse interaction and filtering', function() {

    beforeEach(function() {
      loadFixtures(
        'filtering/kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html'
      );
    });

    describe('when clicking on the pve filter', function() {

      beforeEach(function() {
        $('.fate-filter-pve').click();
      });

      it('should highlight the filter as active', function() {
        expect('.fate-filter.fate-filter-pve.fglyph-pve').toHaveClass('fate-filter-active');
      });

      it('should darken all non-pve weapons', function() {
        expect($('[data-fate-weapon-pve]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name]').not('[data-fate-weapon-pve]')).toHaveClass('fate-search-hidden');
      });

      describe('when clicking on the pve filter a second time', function() {

        beforeEach(function() {
          $('.fate-filter-pve').click();
        });

        it('should highlight the filter as inactive', function() {
          expect('.fate-filter.fate-filter-pve.fglyph-pve').not.toHaveClass('fate-filter-active');
        });

        it('should show all weapons', function() {
          expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
        });

      });

    });

    describe('when clicking on the pvp filter', function() {

      beforeEach(function() {
        $('.fate-filter-pvp').click();
      });

      it('should highlight the filter as active', function() {
        expect('.fate-filter.fate-filter-pvp.fglyph-pvp').toHaveClass('fate-filter-active');
      });

      it('should darken all non-pvp weapons', function() {
        expect($('[data-fate-weapon-pvp]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name]').not('[data-fate-weapon-pvp]')).toHaveClass('fate-search-hidden');
      });

      describe('when clicking on the pvp filter a second time', function() {

        beforeEach(function() {
          $('.fate-filter-pvp').click();
        });

        it('should highlight the filter as inactive', function() {
          expect('.fate-filter.fate-filter-pvp.fglyph-pvp').not.toHaveClass('fate-filter-active');
        });

        it('should show all weapons', function() {
          expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
        });

      });

    });


  });
});
