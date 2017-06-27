
  /**
   * 
   * @chart.js
   * @fileoverview  A javascript library for various d3 chart tool functions.
   * @author Abraham John Paul
   */

/** @class graph */


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.graph = global.graph || {}))); /** use object 'graph' to access the functions and other variables*/ 
}(this, (function (exports) {


margin_create = function (a,b,c,d){/* this function creates the margin with passed arguments to set_margin()*/
    this.top = a;
    this.bottom = b;
    this.left = c;
    this.right = d;

}

            var width  , height; /**width and height of the canvas*/

var margin;


var set_margin = function(w,x,y,z)
/** 
 * @method set_margin
 * @memberof graph
 * @description this function sets the margin for the graph in the canvas.
 * @param {int} top : corresponds to the top margin
 * @param {int} bottom : corresponds to the bottom margin
 * @param {int} left : corresponds to the left margin
 * @param {int} text : corresponds to the right margin
 */
            {
             var a=w , b=x , c=y , d=z;
             margin = new margin_create(a,b,c,d);/**creating margin*/
            }

var set_canvas = function(w,h)
/** 
 * @method set_canvas
 * @memberof graph
 * @description this function sets the width and heigth of the canvas.
 * @param {int} width : corresponds to the width of the canvas
 * @param {int} height : corresponds to the height of the canvas
 */
{
    width = w;
    height = h;
}

/** 
 * @method bubbleChart
 * @memberof graph
 * @description this is the bubblechart function plots a static bubble chart with a constant radius bubble chart
 * @param {json} data : json data obtained from the ajax code in example function
 * @param {string} xAxis : the json key which corresponds to the value plotted in the xAxis
 * @param {string} yAxis : the json key which corresponds to the value plotted in the yAxis
 * @param {string} r :  the json key which corresponds to the radius of the bubbles plotted
 * @param {string} text :  the json key which corresponds to the text inside the bubbles plotted
 */
var bubbleChart = function(data , xAxis , yAxis , r , text){         
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var k,keys,i;
            k = processData(data);//obtaing keys of the json object
            keys = k[0];
console.log("keys",keys);
var xParam , yParam , radius , name , i,j,k;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;
var date = [];

var svg = d3.select("body").append("svg")
.attr("width" , width)
.attr("height" , height);

 

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleTime().rangeRound([0 , gWidth]),//seeting range for x and y axes
   y = d3.scaleLinear().rangeRound([gHeight , 0]);
            
var t = d3.transition().duration(750);

var parseTime = d3.timeParse("%Y-%m-%d");//date format
d= data;
for(var i = 0 ; i< keys.length ; i++)//matching function parameters to the json keys
   { 
    if(keys[i].search(xAxis) == 0)
    {
        xParam = keys[i];
        flagX=1;
    }

    if(keys[i].search(yAxis) == 0)
    {
        yParam = keys[i];
        flagY=1;
    }

    if(keys[i].search(r) == 0)
    {
        radius = keys[i];
        flagR=1;
    }
     if(keys[i].search(text) == 0)
    {
        name = keys[i];
        flagN=1;
    }
}
if(!flagX)
{
    alert("Wrong x parameter");
}

if(!flagY)
{
    alert("Wrong y parameter");
}

if(!flagR)
{
    alert("Wrong radius parameter");
}

if(!flagN)
{
    alert("Wrong name parameter");
}
/*
  parsing json data
 */
d.forEach(function(d){
d[xParam] = parseTime(d[xParam]);
d[radius] = +d[radius];
d[yParam] = +d[yParam];
});

x.domain(d3.extent(d , function(d) { return d[xParam]; }));//setting domains for x and y axes
y.domain(d3.extent(d , function(d) {console.log("y",d[yParam])
     return d[yParam]; }));

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        .ticks(10)
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(10)
}

  outer_g.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + gHeight + ")")
      .call(make_x_gridlines()
          .tickSize(-gHeight)
          .tickFormat("")
      )

  // add the Y gridlines
  outer_g.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-gWidth)
          .tickFormat("")
      )

var Xaxis = d3.axisBottom(x);//plotting x axis
            outer_g.append("text")
                .attr("font" , "10px sans serif")
                .attr("y" , (gHeight + 15 + margin.top))
                .attr("x" , (gWidth / 2))
                .attr("dy" , "0.71em")
                .attr("text-anchor" , "middle")
                .text(xParam);

var Yaxis = d3.axisLeft(y);//plotting y axis
            outer_g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("font" , "10px sans serif")
                .attr("y", 5-(margin.left))
                .attr("x", 0 - (gHeight/2))
                .attr("dy", "0.71em")
                .attr("text-anchor", "middle")
                .text(yParam);

    var gX = outer_g.append("g")
    .attr("class","xaxis")
    .attr("transform", "translate(0," + gHeight + ")")
    .call(Xaxis);

var gY = outer_g.append("g")
     .call(Yaxis);

var inner_g=outer_g.append("g");
var gi = inner_g.selectAll("g");
var k = gi.data(d).enter().append("g");
var circle = k.append("circle")
                .attr("class", "circle")
                .attr("cx" , function(d){ 
                            
                    return x(d[xParam]); })
                .attr("cy" , function(d){ return y(d[yParam]); })
                .attr("r" ,40)//"rgb(50 , 154 , 188)"
                .attr("fill",function(d){ 
                           if(d[xParam]>=x.domain()[0]) 
                                return "rgb(50 , 154 , 188)"; 
                            else
                        return "none";
                    })
                .attr("opacity","0.5");
                 
                 k.append("text")//text inside circle
                 .attr("class", "text")
                .attr("x" , function(d){return x(d[xParam]);})
                .attr("y" , function(d){return y(d[yParam]);})
                .style("font-size", "0.7em")
                .attr("text-anchor" , "middle")
                .text(function(d) { return d[name]; });

                 k.append("title")
                .attr("class", "text")
                .attr("pointer-events","all")
                .html(function(d) {var str = radius +" : " +d[radius]+ "\n"+xParam+" : "+d[xParam]+"\n"+name+" : "+d[name]+"\n"+yParam+" : "+d[yParam];
                    return str; });
              
            gi.exit().remove();

            d3.selectAll("circle").on('mouseover', function() {//hover implementation
                d3.select(this).transition(t)
                .attr("opacity","0.7");
                });
            
                d3.selectAll("circle").on('mouseout', function() {//hover implementation
                d3.select(this).transition(t)
                .attr("opacity","0.5");
                });

function processData(data1) {

var json =data1[0];

var k = [];
var keys = [];
var i=0;
for(var key in json)
{
    keys.push(key);

}
console.log("keys",keys);
     k.push(keys);//k[0] will be the main key
     return k;

}
}

 /** 
 * @method bubbleChartZoom
 * @memberof graph
 * @description this function plots a static bubble chart with a constant radius and zoomable parameters,
 * @param {json} data : json data obtained from the ajax code in example function
 * @param {string} xAxis : the json key which corresponds to the value plotted in the xAxis
 * @param {string} yAxis : the json key which corresponds to the value plotted in the yAxis
 * @param {string} r :  the json key which corresponds to the radius of the bubbles plotted
 * @param {string} text :  the json key which corresponds to the text inside the bubbles plotted
 */   

var bubbleChartZoom = function(data , xAxis , yAxis , r , text){//tooltip not working
             
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var k,keys,i;
            k = processData(data);
            keys = k[0];
console.log("keys",keys);
var xParam , yParam , radius , name , i,j,k;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;
var date = [];

// var tooltip = d3.select("body").append("div")	
//     .attr("class", "hidden tooltip")				
//     .style("opacity", 0);

var svg = d3.select("body").append("svg")
.attr("width" , width)
.attr("height" , height);

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleTime().rangeRound([0 , gWidth]),
   y = d3.scaleLinear().rangeRound([gHeight , 0]);
            
var t = d3.transition().duration(750);

var parseTime = d3.timeParse("%Y-%m-%d");//date format
var d = data;

for(var i = 0 ; i< keys.length ; i++)
   { 
    if(keys[i].search(xAxis) == 0)
    {
        xParam = keys[i];
        flagX=1;
    }

    if(keys[i].search(yAxis) == 0)
    {
        yParam = keys[i];
        flagY=1;
    }

    if(keys[i].search(r) == 0)
    {
        radius = keys[i];
        flagR=1;
    }
     if(keys[i].search(text) == 0)
    {
        name = keys[i];
        flagN=1;
    }
}
if(!flagX)
{
    alert("Wrong x parameter");
}

if(!flagY)
{
    alert("Wrong y parameter");
}

if(!flagR)
{
    alert("Wrong radius parameter");
}

if(!flagN)
{
    alert("Wrong name parameter");
}

d.forEach(function(d){
d[xParam] = parseTime(d[xParam]);
d[radius] = +d[radius];
d[yParam] = +d[yParam];
});

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        .ticks(10)
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(10)
}

x.domain(d3.extent(d , function(d) { return d[xParam]; }));
y.domain(d3.extent(d , function(d) {console.log("y",d[yParam])
     return d[yParam]; }));



  outer_g.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + gHeight + ")")
      .call(make_x_gridlines()
          .tickSize(-gHeight)
          .tickFormat("")
      )

  // add the Y gridlines
  outer_g.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-gWidth)
          .tickFormat("")
      )


console.log("y",d3.extent(d , function(d1) {
     return d1[yParam]; }));
var Xaxis = d3.axisBottom(x);
            outer_g.append("text")
                .attr("font" , "10px sans serif")
                .attr("y" , (gHeight + 15 + margin.top))
                .attr("x" , (gWidth / 2))
                .attr("dy" , "0.71em")
                .attr("text-anchor" , "middle")
                .text(xParam);

var Yaxis = d3.axisLeft(y);
            outer_g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("font" , "10px sans serif")
                .attr("y", 5-(margin.left))
                .attr("x", 0 - (gHeight/2))
                .attr("dy", "0.71em")
                .attr("text-anchor", "middle")
                .text(yParam);

    var gX = outer_g.append("g")
    .attr("class","xaxis")
    .attr("transform", "translate(0," + gHeight + ")")
    .call(Xaxis);

var gY = outer_g.append("g")
     .call(Yaxis);


    

var zoom = d3.zoom()
    .scaleExtent([1/8, 8])
    .translateExtent([[-gWidth, -Infinity], [2 * gWidth, Infinity]])
    .extent([[0, 0], [gWidth, gHeight]])
    .on("zoom", zoomed);

var inner_g=outer_g.append("g");
var gi = inner_g.selectAll("g");
var k = gi.data(d).enter().append("g");
var circle = k.append("circle")
                .attr("class", "circle")
                .attr("cx" , function(d){ 
                            
                    return x(d[xParam]); })
                .attr("cy" , function(d){ return y(d[yParam]); })
                .attr("r" ,40)//"rgb(50 , 154 , 188)"
                .attr("fill",function(d){ 
                           if(d[xParam]>=x.domain()[0]) 
                                return "rgb(50 , 154 , 188)"; 
                            else
                        return "none";
                    })
                .attr("opacity","0.5").on("mouseover", function (d) {
        //   tooltip.classed('hidden', false)
        //     .attr('style', 'left:' + (d3.event.clientX + 20) + 'px; top:' + (d3.event.clientY - 20) + 'px')
        //     .html(function(d) {var str = radius +" : " +d[radius]+ "\n"+xParam+" : "+d[xParam]+"\n"+name+" : "+d[name]+"\n"+yParam+" : "+d[yParam];
        //             return str; });
        })					
        .on("mouseout",function () {
          tooltip.classed('hidden', true);
        });
                 
                 k.append("text")//text inside circle
                 .attr("class", "text")
                .attr("x" , function(d){return x(d[xParam]);})
                .attr("y" , function(d){return y(d[yParam]);})
                .style("font-size", "0.7em")
                .attr("text-anchor" , "middle")
                .text(function(d) { return d[name]; });
            gi.exit().remove();

function zoomed() {
  var xz = d3.event.transform.rescaleX(x);
  gX.call(Xaxis.scale(xz));

        svg.selectAll(".circle").data(d)
        .attr("cx", function(d){ return xz(d[xParam]); })
        .attr("cy", function(d){ return y(d[yParam]); })
        .attr("fill",function(d){ 
                           if(d[xParam]>=xz.domain()[0]) 
                                return "rgb(50 , 154 , 188)"; 
                            else
                        return "none";
                    });

        svg.selectAll(".text")
        .attr("x", function(d){ return xz(d[xParam]); })
        .attr("y", function(d){ return y(d[yParam]); })
        .attr("fill",function(d){ 
                           if(d[xParam]<xz.domain()[0]) 
                        return "none";
                    });
}
            var zoomRect = svg.append("rect")
      .attr("class", "zoom")
      .attr("fill","none")
      .attr("pointer-events","all")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

function processData(data1) {
var json = data1[0];
var k = [];
var keys = [];
var i=0;
for(var key in json)
{
    keys.push(key);

}
console.log("keys",keys);
     k.push(keys);//k[0] will be the main key
     return k;

}
}

 /**
 * @method timeChart
 * @memberof graph 
 * @description this function plots a static bubble chart with a constant radius and zoomable parameters,
 * @param {json}data : json data obtained from the ajax code in example function
 * @param {string}xAxis : the json key which corresponds to the value plotted in the xAxis
 * @param {string}yAxis : the json key which corresponds to the value plotted in the yAxis
 * @param {string}r :  the json key which corresponds to the radius of the bubbles plotted
 * @param {string}text :  the json key which corresponds to the text inside the bubbles plotted
 */  

var timeChart = function(data , xAxis , yAxis , r , text){//tooltip not working
 /*
 this function plots a static bubble chart with a constant radius and zoomable
 parameters,
 data : json data obtained from the ajax code in example function
 xAxis : the json key which corresponds to the value plotted in the xAxis
 yAxis : the json key which corresponds to the value plotted in the yAxis
 r :  the json key which corresponds to the radius of the bubbles plotted
 text :  the json key which corresponds to the text inside the bubbles plotted
 */   console.log("hello");
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var k,keys,data_keys = [];
            k = processData(data);
            keys = k[0];
            data_keys = k[1];


var xParam , yParam , radius , name , i,j;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;
var date = [];
var start = 0, end = 5;
var div = d3.select("body").append("div")
            .attr("id","filter");
var svg = d3.select("body").append("svg")
.attr("width" , width)
.attr("height" , height);


// var div = d3.select("body").append("div")
//             .attr("id","filter");
// var filter = d3.select("#filter").append("p").attr("font-size",10).html("Index Filter : ");
// var dropDown = filter.append("select")
//                  .attr("name", "five-sectors");
// /*list of options for filtering the graph based on index in the json file*/
// var opt = ["start-end","0 - 5","5 - 10","10 - 15","15 - 20","20 - 25",
//            "25 - 30","30 - 35","35 - 40","40 - 45","45 - 50","50 - 55" ];

// var options = dropDown.selectAll("option")
//                       .data(opt)
//                       .enter()
//                       .append("option");

// options.text(function(d){return d;})
//        .attr("value" , function(d){var value = d.split(" ")
//            return value[0];});

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");

//selectiing type of scales and its ranges for x and y axes
var x = d3.scaleTime().rangeRound([0 , gWidth]),
    y = d3.scaleBand().rangeRound([gHeight , 0]).padding(0.1);
            
var t = d3.transition().duration(750);

var parseTime = d3.timeParse("%Y-%m-%d");//date format
var d =data;


for(var i = 0 ; i< data_keys.length ; i++)
   { 
       if(data_keys[i]=="date")
    {
        d[keys[1]].data[1][data_keys[i]] = parseTime(d[keys[1]].data[1][data_keys[i]]);
        console.log("date", d[keys[1]].data[1][data_keys[i]]);
    }

    if(data_keys[i].search(xAxis) == 0)
    {
        xParam = data_keys[i];
        flagX=1;
    }
    if(flagY == 0)
    k = Object.keys(d[keys[1]]);
    console.log(k);
    for(j=0;j<k.length;j++)
    {
    if(k[j].search(yAxis) == 0 && flagY==0)
    {
        yParam = k[j];
        flagY=1;
        console.log("success");
    }
    }
    if(data_keys[i].search(r) == 0)
    {
        radius = data_keys[i];
        flagR=1;
    }
     if(data_keys[i].search(text) == 0)
    {
        name = data_keys[i];
        flagN=1;
    }
}
if(!flagX)
{
    alert("Wrong x parameter");
}

if(!flagY)
{
    alert("Wrong y parameter");
}

if(!flagR)
{
    alert("Wrong radius parameter");
}

if(!flagN)
{
    alert("Wrong name parameter");
}

//  dropDown.on("change", function() {
//        start = parseInt(this.value);
//        end = start + 5;
//        plot(start,end);
//   });
console.log("len ",keys.length);
plot(0,keys.length);

function plot(start,end)
{
console.log(start,",",end);

for(i = start ; i< end ; i++)//limited to 5
for(j=0;j<(d[keys[i]].data).length;j++)
date.push(parseTime(d[keys[i]].data[j][xParam]));

x.domain(d3.extent(date));

var z;

y.domain(keys.slice(start,end));

console.log("date :",d3.extent(date));



// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(5)
}


var color = d3.scaleOrdinal()
  .domain(keys.slice(start,end))
  .range(["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"]);


outer_g.selectAll("g").remove();
var Xaxis = d3.axisBottom(x);
            outer_g.append("text")
                .attr("font" , "10px sans serif")
                .attr("y" , (gHeight + 15 + margin.top))
                .attr("x" , (gWidth / 2))
                .attr("dy" , "0.71em")
                .attr("text-anchor" , "middle")
                .text(xParam);

var Yaxis = d3.axisLeft(y);
            outer_g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("font" , "10px sans serif")
                .attr("y", 5-(margin.left))
                .attr("x", 0 - (gHeight/2))
                .attr("dy", "0.71em")
                .attr("text-anchor", "middle")
                .text(yParam);

    var gX = outer_g.append("g")
    .attr("class","xaxis")
    .attr("transform", "translate(0," + gHeight + ")")
    .call(Xaxis);
var gY = outer_g.append("g")
     .call(Yaxis);
var inner_g=outer_g.append("g");
var zoom = d3.zoom()
    .scaleExtent([1/8, 4])
    .translateExtent([[-gWidth, -Infinity], [2 * gWidth, Infinity]])
    .on("zoom", zoomed);

    var zoomRect = svg.append("rect")
      .attr("class", "zoom")
      .attr("fill","none")
      .attr("border","1px solid")
      .attr("pointer-events","all")
      .attr("width", gWidth)
      .attr("height", gHeight)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
zoomRect.call(zoom.transform, d3.zoomIdentity);
var gi = inner_g.selectAll("g");
for(i = start ; i< end ; i++)
{
   z=d[keys[i]];

var k = gi.data(z.data).enter().append("g");
var circle = k.append("circle")
                .attr("class", "circle")
                .attr("cx" , function(d){ 
                            
                    return x(parseTime(d[xParam])); })
                .attr("cy" , y(z[yParam])+(y.bandwidth())/2)
                .transition(t)
                .attr("r" , 10)
                .attr("fill",function(d){ 
                           if(parseTime(d[xParam])>=x.domain()[0]) 
                                return color(z[yParam]); 
                            else
                        return "none";
                    })
                .attr("opacity","0.5");
              
            gi.exit().remove();
 }
function zoomed() {
  var xz = d3.event.transform.rescaleX(x);
  gX.call(Xaxis.scale(xz));
inner_g.selectAll("g").remove();
 inner_g=outer_g.append("g");

var gi = inner_g.selectAll("g");
for(i = start ; i< end ; i++)
{
   z=d[keys[i]];

var k = gi.data(z.data).attr("class", "entity").enter().append("g");
var circle = k.append("circle")
                .attr("class", "circle")
                .attr("cx" , function(d){ 
                    
                    return xz(parseTime(d[xParam])); })
                .attr("cy" , y(z[yParam])+(y.bandwidth())/2)
                .transition(t)
                .attr("r" , 10)
                .attr("fill",function(d){ 
                           if(parseTime(d[xParam])>=xz.domain()[0]) 
                                return color(z[yParam]); 
                            else
                        return "none";
                    })
                .attr("opacity","0.5");

 }
   // add the Y gridlines
  outer_g.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-gWidth)
          .tickFormat("")
      )
}
}



function processData(data1) {
var json = data1;
var k = [];
var keys = [];
var data_keys=[];
var i=0;
for(var key in json)
{
    keys.push(key);
}
for(var i in  json[keys[1]].data[0])
    data_keys.push(i);
     k.push(keys);//k[0] will be the main key
     k.push(data_keys);//k[1] will be the key for data object
     return k;

}
}


/** 
* @method heatMap
* @memberof graph
* @description this function plots a heat map using the above given parameters,
* @param {json} data : the json object obtained after passing the json file to ajax code in the example 
* @param {string} area : the json key which corresponds to the area of the cell in the heatmap
* @param {string} color : the json key which correspond to the color depth of the cell
* @param {string} name : the json key which corresponds to the cell name(i.e. text inside the cell)
*/

var heatMap = function(data,area,color,name){
var keys = [],i;
//console.log("data1",$.parseJSON(data));
keys = processData(data);

//data = $.parseJSON(data);

var colorParam , areaParam ,nameParam;
var flagA=0 , flagC=0 , flagN = 0;

for(i = 0 ; i< keys.length ; i++)//mapping parameters to keys form the json file 
{
    if(keys[i].search(area) == 0)
    {
        areaParam = keys[i];
        flagA=1;
    }
    if(keys[i].search(color) == 0)
    {
        colorParam = keys[i];
        flagC=1;
    }
    if(keys[i].search(name) == 0)
    {
        nameParam = keys[i];
        flagN=1;
    }
        }  

            if(!flagC)
            {
                alert("Wrong color parameter");
            }

            if(!flagA)
            {
                alert("Wrong area parameter");
            }

            if(!flagN)
            {
                alert("Wrong name parameter");
            } 
      width = width - margin.right - margin.left;
      height = height - margin.top - margin.bottom;
      
  var svg = d3.select("body")//creating the canvas with the specified width and height
            .append("svg");

            svg.attr("width",width);
            svg.attr("height",height);
            
            
    var format = d3.format(",d");//used to format the no.s(grouping to 1000's using ',')

    var color = d3.interpolateRgb("#FF0000","#010000");//creating color scale from "#FF0000" to "#010000"

    var treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([width, height])
        .round(true)
        .paddingInner(1);
    
    var tot_inv = 0; 

                console.log("data",data);
            var root = d3.hierarchy(data)//creating the root for the tree from the json data
            .eachBefore(function(d) {
                d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data[nameParam]; })
            .sum(function(d) {console.log(d[areaParam],d[colorParam],"name : ",d[nameParam]);
                return d[areaParam];})
            .sort(function(a, b) { return b[areaParam] - a[areaParam]; });

            
            
            
            treemap(root);//creating the tree from the json data
            
            console.log("treemap",treemap(root));

            var cell = svg.selectAll("g")//creating data cells
              .data(root.leaves())
              .enter().append("g")
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
            
            var rect = cell.append("rect")//creating rectangles to data cells
                .attr("id", function(d) {tot_inv += d.data[colorParam]; 
                    return d.data.id; })
                .attr("width", function(d) { console.log("x,y ",d.y1 - d.y0);
                    return d.x1 - d.x0; })
                .attr("height", function(d) { 
                    return d.y1 - d.y0; })
                .attr("fill", function(d) {
                     return color((d.data[colorParam]/tot_inv)*10); });
            cell.append("clipPath")
                .attr("id", function(d) { return "clip-" + d.data.id; })
              .append("use")
                .attr("xlink:href", function(d) { return "#" + d.data.id; });
            console.log("total in script ",tot_inv);
            cell.append("text")//data cell text description
                .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
              .selectAll("tspan")
                .data(function(d) { return d.data[nameParam].split(/(?=[A-Z][^A-Z])/g); })
              .enter().append("tspan")
                .attr("x",3)
                .attr("y", function(d, i) { return 20 + i * 10; })
                .attr("fill","white")
                .attr("text-anchor", "start")
                .attr("font-size" , "12px")
                .text(function(d) { return d; });
            
            cell.append("title")//tool tip inside data cell
                .text(function(d) { var str = "Market : " + d.data[nameParam] + "\nAmount : " + format(d.data[areaParam]) + "\nLast Transaction Date : " + d.data.Last_Transaction_Date + "\nInvestment Count : " + d.data[colorParam];
                    return str; });

function processData(data) {//function to obtain keys of json object
var json = data;
var keys = [];
for(var key in json["children"][0])
{
    keys.push(key);
    
}

     return keys;
}

}//end of heatmap

var map = function(data1 , data2)
{
data1 = $.parseJSON(data1);
 data2 = $.parseJSON(data2);
width = width - margin.right - margin.left;
height = height - margin.top - margin.bottom;

// var projection = d3.geo.mercator().scale(10000).translate([-1300,100]);
// var path = d3.geo.path()
//     .projection(projection);
var color = d3.interpolateRgb("#FF0000","#010000");
var projection = d3.geoMercator();

      var path = d3.geoPath()
          .projection(projection)
          .pointRadius(2);

      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);

      var g = svg.append("g");

var boundary = centerZoom(data1);
drawSubUnits(data1);
drawOuterBoundary(data1, boundary);

function centerZoom(data){
        var o = topojson.mesh(data, data.objects.bbmpwards, function(a, b) { return a === b; });
        projection
            .scale(1)
            .translate([0, 0]);

        var b = path.bounds(o),
            s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        return o;
      }

      function drawOuterBoundary(data, boundary){
        g.append("path")
            .datum(boundary)
            .attr("d", path)
            .attr("class", "subunit-boundary")
            .attr("fill","none")
                    .attr("stroke","black")
                    .attr("stroke-linejoin","round");
      }
function drawSubUnits(data){
        g.selectAll(".subunit")
            .data(topojson.feature(data, data.objects.bbmpwards).features)
          .enter().append("path")
            .attr("class", "subunit")
            .attr("d", path)
            .attr("fill","none")
                    .attr("stroke","black");
      }
  tot_inv = 0;
data2.forEach(function(d){
      tot_inv+=d.investments;
  }) 
  console.log("out",tot_inv);          
// var svg = d3.select("body").append("svg")
//     .attr("viewBox", "0 0 "+width+" "+height)
// 	 .attr("preserveAspectRatio", "xMidYMid meet");

// var cantons = topojson.feature(data1, data1.objects.bbmpwards);
			
              //  console.log(cantons.features);
var count = 0 ;
// var group = svg.selectAll("g")
// 				.data(cantons.features)
// 				.enter()
// 				.append("g");

// var areas=group.append("path")
// 					.attr("d", path)
// 					.attr("class", "area")
//                     .attr("fill","red")
//                     .attr("stroke","blue");
				 
                        svg.selectAll(".pin")
						  .data(data2)
						  .enter().append("circle", ".pin")
						  .attr("r", 5)
                          .attr("fill",function(d){
                              console.log(d.name)
                                  console.log((d.investments/tot_inv)*100);
                                  return color((d.investments/tot_inv)*100);})
						  .attr("transform", function(d) {
    						  return "translate(" + projection([
							  d.location.longitude,
							  d.location.latitude
							]) + ")";
						  })
						  .append("title")
                          .text(function(d) {
					return ("Name : "+d.name+"\nInvestments : "+d.investments);
							});

}//end of map function

/** 
* @method networkGraph
* @memberof graph
* @description this function plots a network of nodes of startups and their investors
* @param {json} data : the json object obtained after passing the json file to ajax code in the example 
* @param {string} startup_name_key : the json key which corresponds to the name of the startup node
* @param {string} startup_investor_key : the json key which corresponds to the investors of the startup node
* @param {string} startup_id_key : the json key which corresponds to the unique id of the startup node
* @param {string} investor_name_key : the json key which corresponds to the name of the investor node
* @param {string} investor_investments_key : the json key which corresponds to the investments of the investor node
* @param {string} investor_id_key : the json key which corresponds to the unique id of the investor node
*/


var networkGraph = function(data , startup_name_key , startup_investor_key , startup_id_key , investor_id_key , investor_name_key , investor_investments_key)
{   
    var keys;
    
    //data = $.parseJSON(data);//parse text data to json object
    keys = processData(data , startup_investor_key);//returns keys from two levels

    var startup_keys = keys[0];
    var investor_keys = keys[1];
    var flagSN = 0,flagSI= 0,flagSIn= 0,flagIN= 0,flagII= 0,flagIIn= 0;
    var i;

    for(i=0;i<startup_keys.length;i++)
    {
        if(startup_keys[i].search(startup_name_key) == 0)
        {
            flagSN = 1;
        }
        else if(startup_keys[i].search(startup_investor_key) == 0)
        {
            flagSIn = 1;
        }
        else if(startup_keys[i].search(startup_id_key) == 0)
        {
            flagSI = 1;
        }
    }

    for(i=0;i<investor_keys.length;i++)
    {
        if(investor_keys[i].search(investor_name_key) == 0)
        {
            flagIN = 1;
        }
        else if(investor_keys[i].search(investor_investments_key) == 0)
        {
            flagIIn = 1;
        }
        else if(investor_keys[i].search(investor_id_key) == 0)
        {
            flagII = 1;
        }
    }

    if(!flagSN)
    {
        alert("Wrong startup name key!!!");
    }
    if(!flagSIn)
    {
        alert("Wrong startup investor key!!!");
    }
    if(!flagSI)
    {
        alert("Wrong startup id key!!!");
    }
    if(!flagIN)
    {
        alert("Wrong investor name key!!!");
    }
    if(!flagII)
    {
        alert("Wrong investor id key!!!");
    }
    if(!flagIIn)
    {
        alert("Wrong investor investments key!!!");
    }

    width = width - margin.right - margin.left;
    height = height - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
                .attr("width" , width)
                .attr("height" , height);
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var investors = [] ;
    var network_data = {};
    network_data.nodes = [];
    network_data.links = [];
    var flag = 0;
    for(var i=0; i<data.length;i++)
    {
        for(var j=0; j<data[i][startup_investor_key].length;j++)
        {
                for(var k=0;k<investors.length;k++)
                    if(data[i][startup_investor_key][j][investor_id_key] == investors[k])
                        {
                            flag = 1;
                            break;
                        }
                if(flag == 0)
                {
                    var node_data = {};
                    investors.push(data[i][startup_investor_key][j][investor_id_key]);
                    node_data.id = data[i][startup_investor_key][j][investor_id_key];
                    node_data.name = data[i][startup_investor_key][j][investor_name_key];
                    node_data.investments = data[i][startup_investor_key][j][investor_investments_key];
                    node_data.type = "investor";
                    network_data.nodes.push(node_data);
                        var link_data = {};
                        link_data.source = data[i][startup_investor_key][j][investor_id_key];
                        link_data.target = data[i][startup_id_key];
                        network_data.links.push(link_data);
                }
        }
        var node_data = {};
        node_data.id = data[i][startup_id_key];
        node_data.name = data[i][startup_name_key];
        node_data.type = "startup";
        network_data.nodes.push(node_data);
    }

console.log("investors :" ,investors);

var nodes = network_data.nodes;
var links = network_data.links;

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(60).strength(1))
    .force("charge", d3.forceManyBody().strength(-15))//force param 
    .force("center", d3.forceCenter(width / 2, height / 2));

var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(network_data.links)
    .enter().append("line")
      .attr("stroke-width", "1");

  var node =svg.selectAll(".nodes")
    .data(network_data.nodes)
    .enter().append("g")
    .attr("class", "nodes");
    node.append("circle")
      .attr("r", function(d){
          if(d.type == "startup")
           return "15";
           else
           return "10";
      })
      .attr("fill", function(d) { if(d.type == "startup")
           return "#2d19a0";
           else
           return "#e408ae"; });
        //     .call(d3.drag()//to make force work
        //   .on("start", dragstarted)
        //   .on("drag", dragged)
        //   .on("end", dragended));

  node.append("title")
      .text(function(d) { if(d.type == "startup")
           return "id : "+d.id+"\nname : "+d.name+"\ntype : "+d.type;
           else
           return "id : "+d.id+"\nname : "+d.name+"\ntype : "+d.type+"\nno. of investments : "+d.investments; });

  node.append("text")
    .data(network_data.nodes)
      .attr("dx", 10)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .style("fill", "black");

  simulation
      .nodes(network_data.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(network_data.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    d3.selectAll("circle").attr("cx", function (d) {
        return d.x;
    })
        .attr("cy", function (d) {
        return d.y;
    });
    d3.selectAll("text").attr("x", function (d) {
        return d.x;
    })
        .attr("y", function (d) {
        return d.y;
    });

  }

// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }

// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }

// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }

function processData(json , investor_key) {
var k = [];
var keys = [];
var data_keys=[];
var i=0;
for(var key in json[0])
{
    keys.push(key);
}

for(var i in  json[0][investor_key][0])
    data_keys.push(i);
     k.push(keys);//k[0] will be the main key
     k.push(data_keys);//k[1] will be the key for investor array
     return k;

}

}//end of networkGraph



exports.map = map;
exports.set_margin = set_margin;
exports.set_canvas = set_canvas;
exports.width = width;
exports.height = height;
exports.bubbleChartZoom = bubbleChartZoom;
exports.bubbleChart = bubbleChart;
exports.heatMap = heatMap; 
exports.timeChart = timeChart;
exports.networkGraph = networkGraph;

Object.defineProperty(exports, '__esModule', { value: true });
})));

