(function(){

  var mih = window.mih || (window.mih = {});

  mih.smallmultiple = function(){

    var height = 120,
        width = 150,
        duration = 1000,
        dispatch = d3.dispatch("brushed", "brushing");


    function smallmultiple(selection){
      selection.each(function(data){

        var chart;
        var margin = {top: 15, right: 10, bottom: 40, left: 35},
            chartWidth = width - margin.left - margin.right,
            chartHeight = height - margin.top - margin.bottom;

       $(selection.node()).empty()

        var div = selection.selectAll(".chart")
                              .data(data, function(d){return d.key});
        

        div.enter().append("div").attr("class", "chart col-md-4").append("svg").append("g");

        width = $(selection.node()).find(".chart").width() - margin.left - margin.right; //to be done properly

        // if (selection.select('svg').empty()){
        //   chart = selection.append('svg')
        //   .attr('width', width)
        //   .attr('height', height)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // }
        // else
        // {
        //   chart = selection.select('svg')
        //   .attr('width', width)
        //   .attr('height', height)
        //     .select("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // }
        var circle = null;
        var caption = null;
        var curYear = null;
        var bisect = d3.bisector(function(d) {
                       return d.day;
                      }).left;
        var format = d3.time.format("%Y-%m-%d")
        var xScale = d3.time.scale().range([0, width]);
        var yScale = d3.scale.linear().range([height, 0]);
        var xValue = function(d) {
                return d.day;
            };
        var yValue = function(d) {
                return d.diff;
              };
        
        yAxis = d3.svg.axis().scale(yScale)
                            .orient("left")
                            .ticks(4)
                            .outerTickSize(0)
                            .tickSubdivide(1)
                            .tickSize(-width);

        var area = d3.svg.area().x(function(d) {
          return xScale(xValue(d));
        }).y0(height).y1(function(d) {
          return yScale(yValue(d));
        });
        var line = d3.svg.line().x(function(d) {
          return xScale(xValue(d));
        }).y(function(d) {
          return yScale(yValue(d));
        });

        var setupScales = function(data) {
          var extentX, maxY;
          maxY = d3.max(data, function(c) {
            return d3.max(c.values, function(d) {
              return yValue(d);
            });
          });
          maxY = maxY + (maxY * 1 / 4);
          yScale.domain([0, maxY]);
          extentX = d3.extent(data[0].values, function(d) {
            return xValue(d);
          });
          return xScale.domain(extentX);
        };

        setupScales(data);


        var svg = div.select("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom);

        var g = svg.select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        g.append("rect")
          .attr("class", "background")
          .style("pointer-events", "all")
          .attr("width", width + margin.right)
          .attr("height", height)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout);

        var lines = g.append("g");
        
        lines.append("path")
          .attr("class", "area")
          .style("pointer-events", "none")
          .attr("d", function(c) {
            return area(c.values);
              });

        lines.append("path")
          .attr("class", "line")
          .style("pointer-events", "none")
          .attr("d", function(c) {
            return line(c.values);
          });

        lines.append("text")
          .attr("class", "title")
          .attr("text-anchor", "middle")
          .attr("y", height).attr("dy", margin.bottom / 2 + 5)
          .attr("x", width / 2).text(function(c) {
            return c.key;
          });

        lines.append("text")
          .attr("class", "static_year")
          .attr("text-anchor", "start")
          .style("pointer-events", "none")
          .attr("dy", 13).attr("y", height)
          .attr("x", 0)
          .text(function(c) {
            return xValue(c.values[0]).getDate() + "/" + xValue(c.values[0]).getMonth();
          });

        lines.append("text")
          .attr("class", "static_year")
          .attr("text-anchor", "end")
          .style("pointer-events", "none")
          .attr("dy", 13).attr("y", height)
          .attr("x", width)
          .text(function(c) {
              return xValue(c.values[c.values.length - 1]).getDate() + "/" + (xValue(c.values[c.values.length - 1]).getMonth() + 1);
            });

        circle = lines.append("circle")
          .attr("r", 2.2)
          .attr("opacity", 0)
          .style("pointer-events", "none");

        caption = lines.append("text")
          .attr("class", "caption")
          .attr("text-anchor", "middle")
          .style("pointer-events", "none")
          .attr("dy", -8);

        curYear = lines.append("text")
          .attr("class", "year")
          .attr("text-anchor", "middle")
          .style("pointer-events", "none")
          .attr("dy", 13)
          .attr("y", height);
        
        //return g.append("g").attr("class", "y axis").call(yAxis);
        g.append("g").attr("class", "y axis").call(yAxis);

        function mouseover() {

          circle.attr("opacity", 1.0);
          selection.selectAll(".static_year").classed("hidden", true);
          
          return mousemove.call(this);
        };

        function mousemove() {
          var date, index, year;
          year = xScale.invert(d3.mouse(this)[0]);
          date = d3.time.day.round(year)
          index = 0;
          circle.attr("cx", xScale(date))
            .attr("cy", function(c) {
              index = bisect(c.values, date, 0, c.values.length - 1);

              return yScale(yValue(c.values[index]));
          });

          caption.attr("x", xScale(date))
            .attr("y", function(c) {
            return yScale(yValue(c.values[index]));
              })
            .text(function(c) {
              return yValue(c.values[index]);
            });
          
          //return curYear.attr("x", xScale(date)).text(date.getDate() + "/" + (date.getMonth() + ));
          return curYear.attr("x", xScale(date))
            .text(date.getDate() + "/" + (date.getMonth() + 1));

        };
        function mouseout() {
          selection.selectAll(".static_year").classed("hidden", false);
          circle.attr("opacity", 0);
          caption.text("");
          return curYear.text("");
        };

      }); //end selection
    } // end smallmultiple


  smallmultiple.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return smallmultiple;
  }

  smallmultiple.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return smallmultiple;
  }

  smallmultiple.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return smallmultiple;
  }


  d3.rebind(smallmultiple, dispatch, 'on');

  return smallmultiple;

  }

})();