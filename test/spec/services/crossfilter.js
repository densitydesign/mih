'use strict';

describe('Service: Crossfilter', function () {

  // load the service's module
  beforeEach(module('mihApp'));

  // instantiate service
  var Crossfilter;
  beforeEach(inject(function (_Crossfilter_) {
    Crossfilter = _Crossfilter_;
  }));

  it('should do something', function () {
    expect(!!Crossfilter).toBe(true);
  });

});
