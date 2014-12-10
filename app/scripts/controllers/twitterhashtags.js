'use strict';

/**
 * @ngdoc function
 * @name mihApp.controller:TwitterhashtagsCtrl
 * @description
 * # TwitterhashtagsCtrl
 * Controller of the mihApp
 */
angular.module('mihApp')
  .controller('TwitterhashtagsCtrl', function ($scope,Fileloader) {
   Fileloader.getFile("data/twitterHashtags.tsv").then(function(data){

       var rows = d3.tsv.parse(data);
       var newRows = [];

       //resort data
       rows.forEach(function(d,i){
           var ht=d.hashtags.split(";");
           var city = d.tag==="milano" || d.tag==="geomilan" ? "milano" : "roma";
           var date = new Date(d.borntime).setHours(0,0,0,0);
           ht.forEach(function(e,j){
               if(e.toLowerCase()!=="milano" && e.toLowerCase()!=="milan" && e.toLowerCase()!=="roma" && e.toLowerCase()!=="rome")
               newRows.push({id: d.idsource,tag: e.toLowerCase(),city:city,date:date});
           })
       });


       var allData = crossfilter(newRows);
       var allDateFilt = allData.dimension(function(d){return d.date});
       var allCityFilt = allData.dimension(function(d){return d.city});
       var allTagFilt = allData.dimension(function(d){return d.tag});


       var miRows = _.uniq(newRows,true,function(d){return d.id}).filter(function(d){return d.city ==="milano"});
       var roRows = _.uniq(newRows,true,function(d){return d.id}).filter(function(d){return d.city ==="roma"});

       var midata = crossfilter(miRows);
       var rodata = crossfilter(roRows);

       var mid = midata.dimension(function(d){return d.date});
       var rod = rodata.dimension(function(d){return d.date});

       var migroup = mid.group();
       var rogroup = rod.group();

       var chartData = [{city:"milano",values:migroup.all()},{city:"roma",values:rogroup.all()}];

       var getHashtags = function() {

            var res = allTagFilt.group().reduce(
               function(p,v){
                   if(v.city==="milano") p.a++;
                   if(v.city==="roma") p.b++;
                   return p;
               },
               function(p,v){
                   if(v.city==="milano") p.a--;
                   if(v.city==="roma") p.b--;
                   return p;
               },
               function(){
                   return{
                       a : 0,
                       b : 0
                   }
               }).order(function(p){
                   return p.a+p.b;
               })
               .top(100)

           return res;

       }

       var chart = d3.select("#hashtags-viz");

       var stacked = mih.stackedBar()
           .width($("#hashtags-viz").innerWidth())
           .height(100)
           .stackColors(["#7CA49E", "#D35530"])
           .on("brushing", function(d){
               $scope.startDate = d[0];
               $scope.endDate = d[1];
               if(!$scope.$$phase) {
                   $scope.$apply()
               }
           })
           .on("brushed", function(d) {
              allDateFilt.filterRange(d);

               biforce(_.map(a, _.clone),["#7CA49E", "#D35530"]);
           });

       chart.datum(chartData).call(stacked)

       var a = getHashtags();
       biforce(_.map(a, _.clone),["#7CA49E", "#D35530"]);


   })
  });
