'use strict';

describe('Service: filemanager', function () {

  // load the service's module
  beforeEach(module('mihApp'));

  // instantiate service
  var filemanager;
  beforeEach(inject(function (_filemanager_) {
    filemanager = _filemanager_;
  }));

  it('should do something', function () {
    expect(!!filemanager).toBe(true);
  });

});
