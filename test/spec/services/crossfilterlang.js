'use strict';

describe('Service: crossfilterlang', function () {

  // load the service's module
  beforeEach(module('mihApp'));

  // instantiate service
  var crossfilterlang;
  beforeEach(inject(function (_crossfilterlang_) {
    crossfilterlang = _crossfilterlang_;
  }));

  it('should do something', function () {
    expect(!!crossfilterlang).toBe(true);
  });

});
