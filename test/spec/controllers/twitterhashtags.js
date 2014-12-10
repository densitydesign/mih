'use strict';

describe('Controller: TwitterhashtagsCtrl', function () {

  // load the controller's module
  beforeEach(module('mihApp'));

  var TwitterhashtagsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TwitterhashtagsCtrl = $controller('TwitterhashtagsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
