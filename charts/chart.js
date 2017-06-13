
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.graph = global.graph || {}))); //use object 'graph' to access the functions and other variables 
}(this, (function (exports) {

margin_create = function (a,b,c,d){//this function creates the margin with passed arguments to set_margin()
    this.top = a;
    this.bottom = b;
    this.left = c;
    this.right = d;

}

            var width  , height; //width and height of the canvas

var margin;
var set_margin = function(w,x,y,z)
            {
             var a=w , b=x , c=y , d=z;
             margin = new margin_create(a,b,c,d);//creating margin
            }

var set_canvas = function(w,h)//assign values passed to width and height parameters
{
    width = w;
    height = h;
}

var bubbleChart = function(data , xAxis , yAxis , r , text){
 /*
 this function plots a static bubble chart with a constant radius
 parameters,
 data : json data obtained from the ajax code in example function
 xAxis : the json key which corresponds to the value plotted in the xAxis
 yAxis : the json key which corresponds to the value plotted in the yAxis
 r :  the json key which corresponds to the radius of the bubbles plotted
 text :  the json key which corresponds to the text inside the bubbles plotted
 */           
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var k,keys,i;
            k = processData(data);//obtaing keys of the json object
            keys = k[0];
console.log("keys",keys);
var xParam , yParam , radius , name , i,j,k;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;
var date = [];

var svg = d3.select("body").select("svg")
.attr("width" , width)
.attr("height" , height);

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleTime().rangeRound([0 , gWidth]),//seeting range for x and y axes
   y = d3.scaleLinear().rangeRound([gHeight , 0]);
            
var t = d3.transition().duration(750);

var parseTime = d3.timeParse("%Y-%m-%d");//date format
var d = $.parseJSON(data);

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

d.forEach(function(d){//parsing json data
d[xParam] = parseTime(d[xParam]);
d[radius] = +d[radius];
d[yParam] = +d[yParam];
});

x.domain(d3.extent(d , function(d) { return d[xParam]; }));//setting domains for x and y axes
y.domain(d3.extent(d , function(d) {console.log("y",d[yParam])
     return d[yParam]; }));
// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(10)
}
// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        .ticks(10)
}
  // add the X gridlines
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
                           if(d[xParam]>x.domain()[0]) 
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
var json = $.parseJSON(data1);
var k = [];
var keys = [];
var i=0;
for(var key in json[0])
{
    keys.push(key);

}
console.log("keys",keys);
     k.push(keys);//k[0] will be the main key
     return k;

}
}

var bubbleChartZoom = function(data , xAxis , yAxis , r , text){//tooltip not working
 /*
 this function plots a static bubble chart with a constant radius and zoomable
 parameters,
 data : json data obtained from the ajax code in example function
 xAxis : the json key which corresponds to the value plotted in the xAxis
 yAxis : the json key which corresponds to the value plotted in the yAxis
 r :  the json key which corresponds to the radius of the bubbles plotted
 text :  the json key which corresponds to the text inside the bubbles plotted
 */                
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var k,keys,i;
            k = processData(data);
            keys = k[0];
console.log("keys",keys);
var xParam , yParam , radius , name , i,j,k;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;
var date = [];

var tooltip = d3.select("body").append("div")	
    .attr("class", "hidden tooltip")				
    .style("opacity", 0);

var svg = d3.select("body").select("svg")
.attr("width" , width)
.attr("height" , height);

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleTime().rangeRound([0 , gWidth]),
   y = d3.scaleLinear().rangeRound([gHeight , 0]);
            
var t = d3.transition().duration(750);

var parseTime = d3.timeParse("%Y-%m-%d");//date format
var d = $.parseJSON(data);

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

x.domain(d3.extent(d , function(d) { return d[xParam]; }));
y.domain(d3.extent(d , function(d) {console.log("y",d[yParam])
     return d[yParam]; }));

console.log("y",d3.extent(d , function(d1) {
     return d1[yParam]; }));

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        .ticks(10)
}
  // add the X gridlines
  outer_g.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + gHeight + ")")
      .call(make_x_gridlines()
          .tickSize(-gHeight)
          .tickFormat("")
      )

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(10)
}
   // add the Y gridlines
  outer_g.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-gWidth)
          .tickFormat("")
      )

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
                           if(d[xParam]>x.domain()[0]) 
                                return "rgb(50 , 154 , 188)"; 
                            else
                        return "none";
                    })
                .attr("opacity","0.5").on("mouseover", function (d) {
          tooltip.classed('hidden', false)
            .attr('style', 'left:' + (d3.event.clientX + 20) + 'px; top:' + (d3.event.clientY - 20) + 'px')
            .html(function(d) {var str = radius +" : " +d[radius]+ "\n"+xParam+" : "+d[xParam]+"\n"+name+" : "+d[name]+"\n"+yParam+" : "+d[yParam];
                    return str; });
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
                           if(d[xParam]>xz.domain()[0]) 
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
                       // add the Y gridlines
  outer_g.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-gWidth)
          .tickFormat("")
      )
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
var json = $.parseJSON(data1);
var k = [];
var keys = [];
var i=0;
for(var key in json[0])
{
    keys.push(key);

}
console.log("keys",keys);
     k.push(keys);//k[0] will be the main key
     return k;

}
}

var timeChart = function(data , xAxis , yAxis , r , text){//tooltip not working
 /*
 this function plots a static bubble chart with a constant radius and zoomable
 parameters,
 data : json data obtained from the ajax code in example function
 xAxis : the json key which corresponds to the value plotted in the xAxis
 yAxis : the json key which corresponds to the value plotted in the yAxis
 r :  the json key which corresponds to the radius of the bubbles plotted
 text :  the json key which corresponds to the text inside the bubbles plotted
 */   
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


var div = d3.select("body").append("div")
            .attr("id","filter");
var filter = d3.select("#filter").append("p").attr("font-size",10).html("Index Filter : ");
var dropDown = filter.append("select")
                 .attr("name", "five-sectors");
/*list of options for filtering the graph based on index in the json file*/
var opt = ["start-end","0 - 5","5 - 10","10 - 15","15 - 20","20 - 25",
           "25 - 30","30 - 35","35 - 40","40 - 45","45 - 50","50 - 55" ];

var options = dropDown.selectAll("option")
                      .data(opt)
                      .enter()
                      .append("option");

options.text(function(d){return d;})
       .attr("value" , function(d){var value = d.split(" ")
           return value[0];});

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");

//selectiing type of scales and its ranges for x and y axes
var x = d3.scaleTime().rangeRound([0 , gWidth]),
    y = d3.scaleBand().rangeRound([gHeight , 0]).padding(0.1);
            
var t = d3.transition().duration(750);

var parseTime = d3.timeParse("%Y-%m-%d");//date format
var d = $.parseJSON(data);


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

 dropDown.on("change", function() {
       start = parseInt(this.value);
       end = start + 5;
       plot(start,end);
  });

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
                           if(parseTime(d[xParam])>x.domain()[0]) 
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
                           if(parseTime(d[xParam])>xz.domain()[0]) 
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
var json = $.parseJSON(data1);
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

var heatMap = function(data,area,color,name){
    /*
    this function plots a heat map using the above given parameters,
    data : the json object obtained after passing the json file to ajax code in the example
    area : the json key which corresponds to the area of the cell in the heatmap
    color : the json key which correspond to the color depth of the cell
    name : the json key which corresponds to the cell name(i.e. text inside the cell)
    */
var keys = [],i;
console.log("data1",$.parseJSON(data));
keys = processData(data);

data = $.parseJSON(data);

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
var json = $.parseJSON(data);
var keys = [];
for(var key in json["children"][0])
{
    keys.push(key);
    
}

     return keys;
}

}//end of heatmap



exports.set_margin = set_margin;
exports.set_canvas = set_canvas;
exports.width = width;
exports.height = height;
exports.bubbleChartZoom = bubbleChartZoom;
exports.bubbleChart = bubbleChart;
exports.heatMap = heatMap; 
exports.timeChart = timeChart;

Object.defineProperty(exports, '__esModule', { value: true });
})));

