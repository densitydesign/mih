'use strict';

describe('Controller: FoursquareCtrl', function () {

  // load the controller's module
  beforeEach(module('mihApp'));

  var FoursquareCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FoursquareCtrl = $controller('FoursquareCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
