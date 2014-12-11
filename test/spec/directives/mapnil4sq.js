'use strict';

describe('Directive: mapnil4sq', function () {

  // load the directive's module
  beforeEach(module('mihApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mapnil4sq></mapnil4sq>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mapnil4sq directive');
  }));
});