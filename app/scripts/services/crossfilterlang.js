'use strict';

/**
 * @ngdoc service
 * @name mihApp.crossfilterlang
 * @description
 * # crossfilterlang
 * Factory in the mihApp.
 */
angular.module('mihApp')
  .factory('crossfilterlang', function () {
    var cf = crossfilter([]),
    all = cf.groupAll(),
    day = cf.dimension(function(d) { return new Date(d.borntime); }),
    days = day.group(d3.time.day),//.reduce(reduceAdd, reduceRemove, reduceInitial),
    author = cf.dimension(function(d) { return d.author}),
    authors = author.group(),//.reduce(reduceAdd, reduceRemove, reduceInitial).order(order),
    id_nil = cf.dimension(function(d) { return 'id_' + d.id_nil}),
    id_nils = id_nil.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(order),
    lang = cf.dimension(function(d){return d.lang}),
    langs = lang.group();

    function reduceAdd(p, v) {
      ++p.count;
      if(!p.langs[v.lang]){
        p.langs[v.lang] = 1;
      }else{
        ++p.langs[v.lang]
      }
      
      return p;
    }

    function reduceRemove(p, v) {
      --p.count;
      --p.langs[v.lang]
      return p;
    }

    function reduceInitial() {
      return {count:0, langs: {}};
    }

    function order(p) {
      return p.count;
    }

    //decide which dimension/group to expose
    var exports = {};

    exports.add = function(data){ cf.add(data); }; // add new items, as array
    exports.clear = function(){ cf.remove(); };// reset crossfilter
    exports.size = function() { return cf.size(); }; // crossfilter size total
    exports.all = function() { return all};
    exports.day = function() { return day};
    exports.days = function() { return days};
    exports.author = function() { return author};
    exports.authors = function() { return authors};
    exports.id_nil = function() { return id_nil};
    exports.id_nils = function() { return id_nils};
    exports.lang = function() { return lang};
    exports.langs = function() { return langs};
    // exports.imp = function() { return all.reduceSum(function(d) { return d.imp; }).value()};
    // exports.exp  = function() { return all.reduceSum(function(d) { return d.exp; }).value()};
    // exports.total  = function() { return all.reduceSum(function(d) { return d.total; }).value()};

    return exports;
  });
