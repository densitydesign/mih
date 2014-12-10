'use strict';

describe('Controller: TwitterlangCtrl', function () {

  // load the controller's module
  beforeEach(module('mihApp'));

  var TwitterlangCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TwitterlangCtrl = $controller('TwitterlangCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
