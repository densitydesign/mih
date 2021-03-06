(function(){

  var mih = window.mih || (window.mih = {});

  mih.stackedBar = function(){

    var height = 600,
        width = 600,
        stackColors = ["#0EA789", "#0EA789"],
        brushDate,
        duration = 1000,
        dispatch = d3.dispatch("brushed", "brushing");


    function stackedBar(selection){
      selection.each(function(data){

        var chart;
        var margin = {top: 10, right: 0, bottom: 30, left: 0},
            chartWidth = width - margin.left - margin.right,
            chartHeight = height - margin.top - margin.bottom;

        if (selection.select('svg').empty()){
          chart = selection.append('svg')
          .attr('width', width)
          .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }
        else
        {
          chart = selection.select('svg')
          .attr('width', width)
          .attr('height', height)
            .select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        var x = d3.time.scale()
            .range([0, chartWidth]);

        var y = d3.scale.linear()
            .range([chartHeight, 0]);

        var colorDomain = data.map(function(d){return d.key});

        var color = d3.scale.ordinal().range(stackColors).domain(colorDomain)

        var area = d3.svg.area()
            .x(function(d) { return x(d.key); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); });

        var stack = d3.layout.stack()
            .values(function(d) { return d.values; })
            .x(function x(d) {return d.key})
            .y(function y(d) {return d.value})

        var layers = stack(data)

        var yStackMax = d3.max(layers, function(layer) {return d3.max(layer.values, function(d) { return d.y0 + d.y; }); });
        var xMax = d3.max(layers, function(layer) {return d3.max(layer.values, function(d) { return d.key; }); });
        var xMin = d3.min(layers, function(layer) {return d3.min(layer.values, function(d) { return d.key; }); });

        x.domain([xMin,xMax])
        y.domain([0,yStackMax])

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("right")
            .ticks(5)
            .tickSize(width)
            .tickFormat(function(d,i){
              var prefix = d3.formatPrefix(d)
              if(i == 0){
                return
              }
              else{
                var symbol;
                if(prefix.symbol == "G"){
                  symbol = "billion"
                }else if(prefix.symbol == "M"){
                  symbol = "million"
                }else if(prefix.symbol == "k"){
                  symbol = "thousand"
                }else{
                  symbol = ""
                }
                return prefix.scale(d) + " " + symbol
              }
              
              })
            //.tickFormat(d3.format("s"))

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")

        var stacked = chart.selectAll(".area")
                      .data(layers, function(d){return d.key})

        stacked
          .transition()
          .duration(duration)
          .attr("d", function(d) { return area(d.values); })

        stacked
          .enter()
          .append("path")
          .attr("class", "area")
          .attr("d", function(d) { return area(d.values); })
          .attr("fill", function(d) { return color(d.key); });
        
        /* legend */
        
        /*
        var legendScale = d3.scale.ordinal().rangeBands([0, chartWidth/3], 0, 0).domain(colorDomain)

        var legends = chart.selectAll(".timeline-legend").data(colorDomain)

        var legend = legends.enter()
          .append("g")
          .attr("class", "timeline-legend")
          .attr("transform", function(d){ return "translate(" + legendScale(d) + "," + (height - 20) + ")"});

        legend
          .append("rect")
          .attr("fill", function(d){return color(d)})
          .attr("width", 10)
          .attr("height", 10)
          .attr("x", 0)
          .attr("y", -10)

        legend
          .append("text")
          .text(function(d){return d == "imp" ? "IMPORTS" : "EXPORTS"})
          .attr("font-family", "'montserrat', 'Arial', sans-serif")
          .attr("font-weight","bold")
          .attr("font-size", "0.8em")
          .attr("x", 20)

        */

        /* axis */

        var gy = chart.select("g.y.axis")
            gx = chart.select("g.x.axis");

        if(chart.select("g.x.axis").empty() || chart.select("g.y.axis").empty()){

          gx = chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis);

          gy = chart.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .call(customAxis);
              
          gy.selectAll("g").filter(function(d) { return d; })
              .classed("minor", true);
        }else{

          gx.transition().duration(duration)
            .call(xAxis)

          gy.transition().duration(duration)
            .call(yAxis)
            .call(customAxis);

          gy.selectAll("g").filter(function(d) { return d; })
              .classed("minor", true);
          
        }

        function customAxis(g) {
          g.selectAll("text")
            .attr("x", 4)
            .attr("dy", -4)
            .attr("font-size", "0.85em");
          }

        /* Brush */
      
        var brush = d3.svg.brush()
          .x(x)
          //.extent([startBrush, endBrush])
          .on("brush", function(){
            if(brush.empty()){
            brush.clear()
            dispatch.brushing(x.domain())

            }
            else{
              dispatch.brushing(brush.extent())
            }
          })
          .on("brushend", brushended);

        function brushended() {
          if (!d3.event.sourceEvent) return; // only transition after input
          var extent0 = brush.extent(),
              extent1 = extent0.map(d3.time.day);

          d3.select(this).transition()
              .call(brush.extent(extent1))
              .call(brush.event);
          
          if(brush.empty()){
            brush.extent(x.domain())
            dispatch.brushed(x.domain())
            dispatch.brushing(x.domain())
          }
          else{
            dispatch.brushed(brush.extent())
            dispatch.brushing(brush.extent())
          }
        }
        //selection.selectAll("g.brush").remove();
        var gBrush = chart.select(".brush");

        if(gBrush.empty()){
          gBrush = chart.append("g")
              .attr("class", "brush")
              .call(brush)
              .call(brush.event);

          gBrush.selectAll("rect")
              .attr("height", chartHeight);
        }else{
          gBrush
            .call(brush)
            .call(brush.event);
        }


      }); //end selection
    } // end stackedBar


  stackedBar.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return stackedBar;
  }

  stackedBar.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return stackedBar;
  }

  stackedBar.stackColors = function(x){
    if (!arguments.length) return stackColors;
    stackColors = x;
    return stackedBar;
  }

  stackedBar.brushDate = function(x){
    if (!arguments.length) return brushDate;
    brushDate = x;
    return stackedBar;
  }

  stackedBar.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return stackedBar;
  }


  d3.rebind(stackedBar, dispatch, 'on');

  return stackedBar;

  }

})();