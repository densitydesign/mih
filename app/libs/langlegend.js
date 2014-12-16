(function(){

  var mih = window.mih || (window.mih = {});

  mih.langLegend = function(){

    var height = 600,
        width = 600,
        duration = 1000;


    function langLegend(selection){
      selection.each(function(data){

        var chart;
        var margin = {top: 30, right: 0, bottom: 10, left: 0},
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

       
        var colorLang = d3.scale.category20b();
        //var colorDomain = _.uniq(d3.values(data));

        colorLang.domain(data);

        
        /* legend */
        

        var legendScale = d3.scale.ordinal().rangeBands([0, chartWidth], 0, 0).domain(data);


        var legendRect= chart.selectAll(".legendRect").data(data);

        legendRect.transition().duration(duration)
          .attr("fill", function(d){return colorLang(d)})
          .attr("x", function(d){ return legendScale(d)});
        
        legendRect
          .enter()
          .append("rect")
          .attr("fill", function(d){return colorLang(d)})
          .attr("width", 10)
          .attr("height", 10)
          .attr("x", function(d){ return legendScale(d)})
          .attr("class", "legendRect")
          .attr("y", -10);

        legendRect.exit().remove()

        var legendTxt = chart.selectAll(".legendTxt").data(data);

        legendTxt.transition().duration(duration)
          .text(function(d){return d })
          .attr("x", function(d){ return (legendScale(d) + 20)});

        legendTxt
          .enter()
          .append("text")
          .text(function(d){return d })
          .attr("font-family", "'montserrat', 'Arial', sans-serif")
          .attr("font-weight","bold")
          .attr("font-size", "0.9em")
          .attr("class", "legendTxt")
          .attr("x", function(d){ return (legendScale(d) + 20)});

        legendTxt.exit().remove();

        

      }); //end selection
    } // end langLegend


  langLegend.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return langLegend;
  }

  langLegend.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return langLegend;
  }

  langLegend.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return langLegend;
  }

  return langLegend;

  }

})();