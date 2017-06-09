
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



var bubbleChart = function(fileName , xAxis , yAxis , r , text){//function to plot bubble chart using data from a csv file

$(document).ready(function() {//ajax code to match axis,radius and name params to the function values
    $.ajax({
        type: "GET",
        url: fileName,
        dataType: "text",
        success: function(data) {

            
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var keys=[];
            keys = processData(data);


var xParam , yParam , radius , name , i,count = 0;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;


try
{
var svg = d3.select("body").select("svg")
.attr("width" , width)
.attr("height" , height);
var outer_g = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().rangeRound([0 , gWidth]),
    y = d3.scaleLinear().rangeRound([gHeight , 0]);//setting the x and y ranges for the axes
            
var t = d3.transition().duration(750);//create a transition variable for 750ms

var parseTime = d3.timeParse("%Y-%m-%d");//date format for parsing data from file

d3.csv(fileName , function(d){ //parsing data
            keys = Object.keys(d);

                   for(i = 0 ; i< keys.length ; i++)
                    {
                    if(!isNaN(d[keys[i]]))   
                        d[keys[i]] = +d[keys[i]];
    
                    //if(moment(d[keys[i]],"YYYY-MM-DD",true).isValid())
                     if(keys[i]=="Last_Transaction_Date")
                        {
                            d[keys[i]] = parseTime(d[keys[i]]);

                    }

    if(keys[i].search(xAxis) == 0)//setting params(axes,radius and text)
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

            return d;} , function(error , data){  

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

                if (error) throw error;

x.domain(d3.extent(data , function(d) { return d[xParam]; }));
y.domain(d3.extent(data , function(d) { return d[yParam]; }));//setting x and y axes domains


var Xaxis = outer_g.append("g").attr("class" , "xaxis")//plotting x axis 
                .attr("transform" , "translate(0," + gHeight + ")")
                .call(d3.axisBottom(x));
            outer_g.append("text")
                .attr("font" , "10px sans serif")
                .attr("y" , (gHeight + 15 + margin.top))
                .attr("x" , (gWidth / 2))
                .attr("dy" , "0.71em")
                .attr("text-anchor" , "middle")
                .text(xParam);

var Yaxis = outer_g.append("g").attr("class","yaxis")//plotting y axes
                .call(d3.axisLeft(y));
            outer_g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("font" , "10px sans serif")
                .attr("y", 5-(margin.left))
                .attr("x", 0 - (gHeight/2)+50)
                .attr("dy", "0.71em")
                .attr("text-anchor", "middle")
                .text(yParam);

var inner_g=outer_g.append("g");

var gi = inner_g.selectAll("g");

var k = gi.data(data).enter().append("g");

var circle = k.append("circle")//plotting circles
                .attr("cx" , function(d){ return x(d[xParam]); })
                .attr("cy" , function(d){ return y(d[yParam]); })
                .transition(t)
                .attr("r" , function(d) { 
                     if  (d[radius]>15696876273)
                         return (d[radius]/2000000000);  
                     else if (d[radius]>10464584182)
                        return (d[radius]/300000000);
                    else if(d[radius]>5232292091)
                        return (d[radius]/150000000); 
                    else if(d[radius]>2616146045.5)
                        return (d[radius]/100000000); 
                    else if(d[radius]>1308073022)
                        return (d[radius]/50000000);
                    else if (d[radius]>(654036511))
                        return (d[radius]/30000000);
                    else if (d[radius]>(327018255))
                        return (d[radius]/7000000);
                    else 
                        return (d[radius]/6000000);
                     })
                .attr("fill","rgb(50 , 154 , 188)")
                .attr("opacity","0.5");

                d3.selectAll("circle").on('mouseover', function() {//hover implementation
                d3.select(this).transition(t)
                .attr("opacity","0.7");
                });
            
                d3.selectAll("circle").on('mouseout', function() {//hover implementation
                d3.select(this).transition(t)
                .attr("opacity","0.5");
                });

               k.append("text")//text inside circle
                .attr("x" , function(d){return x(d[xParam]);})
                .attr("y" , function(d){return y(d[yParam]);})
                .style("font-size", "0.7em")
                .attr("text-anchor" , "middle")
                //.style("fill","white")
                .text(function(d) { return d[name]; });
                k.append("title")//tool tip data
                .html(function(d) {var str = radius +" : " +d[radius]+ "\n"+xParam+" : "+d[xParam]+"\n"+name+" : "+d[name]+"\n"+yParam+" : "+d[yParam];
                    return str; });
                    
            gi.exit().remove();
            });
            }
            catch(error)
                {
                    console.log(error);
                }

        }
     });
});

function processData(allText) {
     console.log("file read succesfully");
     var allTextLines = allText.split(/\r\n|\n/);
     keys = allTextLines[0].split(',');
     console.log("after reading file",keys);
     return keys;
}
}

var timeChart = function(data , xAxis , yAxis , r , text){
            
            var gWidth = width - margin.left - margin.right; //width and height of the graph
            var gHeight = height - margin.top - margin.bottom;
            var k,keys,data_keys = [],i;
            k = processData(data);
            keys = k[0];
            data_keys = k[1];


var xParam , yParam , radius , name , i,j,k;
var flagX=0 , flagY=0 , flagR = 0, flagN = 0;
var date = [];

var svg = d3.select("body").select("svg")
.attr("width" , width)
.attr("height" , height);

var outer_g = svg.append("g").attr("class","outer_g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


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

for(i = 10 ; i< 15 ; i++)//limited to 5
for(j=0;j<(d[keys[i]].data).length;j++)
date.push(parseTime(d[keys[i]].data[j][xParam]));

x.domain(d3.extent(date));

var z;

i = 0;

y.domain(keys.slice(10,15));
start = keys[10];//start value of y domain
console.log("date :",d3.extent(date));

i = 0;

var color = d3.scaleOrdinal()
  .domain(keys.slice(10,15))
  .range(["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"]);

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

var gi = inner_g.selectAll("g");
for(i = 10 ; i< 15 ; i++)
{
   z=d[keys[i]];

console.log("data :",z[yParam],yParam);
var k = gi.data(z.data).enter().append("g");
var circle = k.append("circle")
                .attr("class", "circle")
                .attr("cx" , function(d){ 
                    return x(parseTime(d[xParam])); })
                .attr("cy" , y(z[yParam])+(y.bandwidth())/2)
                .transition(t)
                .attr("r" , 5)
                .attr("fill",color(z[yParam]))
                .attr("opacity","0.5");

                k.append("title")
                .html(function(d) {var str = name +" : "+d[name] +"\n"+radius +" : " +d[radius]+ "\n"+xParam+" : "+d[xParam]+"\ninvestor_name"+" : "+d["investor_name"] ;
                    return str; });
              
            gi.exit().remove();

 }

 d3.selectAll("circle").on('mouseover', function() {
                d3.select(this).transition(t)
                .attr("opacity","0.7");
                });
            
                d3.selectAll("circle").on('mouseout', function() {
                d3.select(this).transition(t)
                .attr("opacity","0.5");
                });


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

var heatMap = function(data,area,color,name){//function to plot heat map using data from a json
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
      
  var svg = d3.select("body")//creating the canvas
            .append("svg");

            svg.attr("width",width);
            svg.attr("height",height);
            
            
    var format = d3.format(",d");//used to format the no.s(grouping to 1000's using ',')

    var color = d3.interpolateRgb("#FF0000","#010000");//creating color scale

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
                     console.log("total",tot_inv);
                    return d.data.id; })
                .attr("width", function(d) { console.log("x,y ",d.y1 - d.y0);
                    return d.x1 - d.x0; })
                .attr("height", function(d) { 
                    return d.y1 - d.y0; })
                .attr("fill", function(d) { console.log((d.data.id,d.data[colorParam]/tot_inv)*10,tot_inv,d.data[colorParam]);
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

function processData(data) {
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
exports.bubbleChart = bubbleChart;
exports.heatMap = heatMap; 
exports.timeChart = timeChart;

Object.defineProperty(exports, '__esModule', { value: true });
})));

