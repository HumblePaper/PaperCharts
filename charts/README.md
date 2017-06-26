## Welcome to Charts Library

chart.js is simple javascript library bulit using d3.js which lets you scatterplots, heatmaps, and network plots by passing the json data(in a predefined format) and the required chart parameters(like axes, color, margins etc).

## Getting Started

Let's get started using the  Chart library!

First, we need to include dependency files, which are,

'''

    <script src='lib/d3.min.js'></script>
    <script src="src/chart.js"></script>

''' 

To make any chart we need a canvas, which can be made usind the set_canvas and set_margin functions,  
invoke using the global object 'graph' in our chart library

'''

    graph.set_canvas(960,500); //args(width,height)
    graph.set_margin(20,60,120,60); //args(top,bottom,left,right)

'''

Now a sample dataset for each graph along with invokation of the respective graph functions will be shown below. 

### 1) Bubble Chart

'''

  data = [
  {
		"Market": "HR Tech",
		"Amount": "2095630",
		"Last_Transaction_Date": "2016-10-01",
		"Investment_Count": "2"
	},
	{
		"Market": "Online Hypermarket",
		"Amount": "109672354043",
		"Last_Transaction_Date": "2016-10-03",
		"Investment_Count": "121"
	},
	{
		"Market": "Coworking",
		"Amount": "539838101",
		"Last_Transaction_Date": "2016-10-28",
		"Investment_Count": "14"
	},
	{
		"Market": "Online Grocery",
		"Amount": "13085351803",
		"Last_Transaction_Date": "2016-11-05",
		"Investment_Count": "139"
	},
	{
		"Market": "K12 Learning",
		"Amount": "6705605708",
		"Last_Transaction_Date": "2016-11-21",
		"Investment_Count": "34"
	},
	{
		"Market": "Big Data Analysis",
		"Amount": "65395558",
		"Last_Transaction_Date": "2017-03-28",
		"Investment_Count": "15"
	},
	{
		"Market": "Financial Services",
		"Amount": "5388747156",
		"Last_Transaction_Date": "2017-03-29",
		"Investment_Count": "91"
	},
	{
		"Market": "On-demand Logistics",
		"Amount": "167133159",
		"Last_Transaction_Date": "2017-03-30",
		"Investment_Count": "75"
	},
	{
		"Market": "Online truck aggregation",
		"Amount": "50299670",
		"Last_Transaction_Date": "2017-03-30",
		"Investment_Count": "69"
	},
	{
		"Market": "Receipe Box",
		"Amount": "257891312",
		"Last_Transaction_Date": "2017-03-30",
		"Investment_Count": "43"
	}
    ];


    //arguments for bubble chart function(json_data,xaxis,yaxis,radius,text_inside_circle)
    graph.bubbleChart(data,"Last_Transaction_Date","Investment_Count","Amount","Market");

'''

This will create the following graph.

![bubble chart](images/bubbleChart.png)

Refer the example html file : index_bubbleChart.html for more details


### 2) Bubble Chart Zoom

'''

  data = [
  {
		"Market": "HR Tech",
		"Amount": "2095630",
		"Last_Transaction_Date": "2016-10-01",
		"Investment_Count": "2"
	},
	{
		"Market": "Online Hypermarket",
		"Amount": "109672354043",
		"Last_Transaction_Date": "2016-10-03",
		"Investment_Count": "121"
	},
	{
		"Market": "Coworking",
		"Amount": "539838101",
		"Last_Transaction_Date": "2016-10-28",
		"Investment_Count": "14"
	},
	{
		"Market": "Online Grocery",
		"Amount": "13085351803",
		"Last_Transaction_Date": "2016-11-05",
		"Investment_Count": "139"
	},
	{
		"Market": "K12 Learning",
		"Amount": "6705605708",
		"Last_Transaction_Date": "2016-11-21",
		"Investment_Count": "34"
	},
	{
		"Market": "Big Data Analysis",
		"Amount": "65395558",
		"Last_Transaction_Date": "2017-03-28",
		"Investment_Count": "15"
	},
	{
		"Market": "Financial Services",
		"Amount": "5388747156",
		"Last_Transaction_Date": "2017-03-29",
		"Investment_Count": "91"
	},
	{
		"Market": "On-demand Logistics",
		"Amount": "167133159",
		"Last_Transaction_Date": "2017-03-30",
		"Investment_Count": "75"
	},
	{
		"Market": "Online truck aggregation",
		"Amount": "50299670",
		"Last_Transaction_Date": "2017-03-30",
		"Investment_Count": "69"
	},
	{
		"Market": "Receipe Box",
		"Amount": "257891312",
		"Last_Transaction_Date": "2017-03-30",
		"Investment_Count": "43"
	}
    ];


    //arguments for bubbleChartZoom function(json_data,xaxis,yaxis,radius,text_inside_circle)
    graph.bubbleChartZoom(data,"Last_Transaction_Date","Investment_Count","Amount","Market");

'''

This will create the following graph.

![bubble chart zoom](images/bubbleChartZoom.png)

Refer the example html file : index_bubbleChartZoom.html for more details

### 3) Timeline Chart

'''

  data = {  
   "Home Salon":{  
      "amount":68819229,
      "data":[  

      ],
      "name":"Home Salon"
   },
   "Skill development":{  
      "amount":2095630,
      "data":[  
         {  
            "brand_logo":null,
            "brand":"TapChief",
            "entity":"Pilani Experts Technology Labs Private Limited",
            "amount":997815,
            "photo":"",
            "date":"2016-10-01",
            "investor_name":"Radhakrishna Nalabothu"
         },
         {  
            "brand_logo":null,
            "brand":"TapChief",
            "entity":"Pilani Experts Technology Labs Private Limited",
            "amount":997815,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/01b1ecf7-6bed-4f28-8899-8ef363d5fb7b/aprameya_radhakrishna.resize_150x150.jpg",
            "date":"2016-10-01",
            "investor_name":"Aprameya Radhakrishna"
         }
      ],
      "name":"Skill development"
   },
   "Online Hypermarket":{  
      "amount":109672354043,
      "data":[  

      ],
      "name":"Online Hypermarket"
   },
   "Personal Assistant":{  
      "amount":287698360,
      "data":[  
         {  
            "brand_logo":null,
            "brand":"Vymo",
            "entity":"Vymo Solutions Private Limited",
            "amount":672000,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/f49c5d76-d950-478e-9ebb-1ef39f8c180b/sequoialogo.crop_179x179_8,13.resize_150x150.jpg",
            "date":"2016-12-10",
            "investor_name":"Sequoia Capital"
         },
         {  
            "brand_logo":null,
            "brand":"Vymo",
            "entity":"Vymo Solutions Private Limited",
            "amount":286962360,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/f49c5d76-d950-478e-9ebb-1ef39f8c180b/sequoialogo.crop_179x179_8,13.resize_150x150.jpg",
            "date":"2016-12-10",
            "investor_name":"Sequoia Capital"
         }
      ],
      "name":"Personal Assistant"
   },
   "Exam Prep":{  
      "amount":8445724628,
      "data":[  
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":121100,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/8d236eae-476d-4177-b4e3-bfc2c9433aaf/ScreenShot20170410at65049PM.crop_132x85_0,4.preview.png",
            "date":"2015-12-19",
            "investor_name":"Blume Ventures"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":242200,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/5ccdc243-47e5-457c-afeb-408eab16b5dd/Phanindra.resize_150x150.jpg",
            "date":"2015-12-19",
            "investor_name":"Phanindra Sama"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":242200,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/01b1ecf7-6bed-4f28-8899-8ef363d5fb7b/aprameya_radhakrishna.resize_150x150.jpg",
            "date":"2015-12-19",
            "investor_name":"Aprameya Radhakrishna"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":3875200,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/8d236eae-476d-4177-b4e3-bfc2c9433aaf/ScreenShot20170410at65049PM.crop_132x85_0,4.preview.png",
            "date":"2015-12-19",
            "investor_name":"Blume Ventures"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":1259440,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/5ccdc243-47e5-457c-afeb-408eab16b5dd/Phanindra.resize_150x150.jpg",
            "date":"2015-12-19",
            "investor_name":"Phanindra Sama"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":750820,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/01b1ecf7-6bed-4f28-8899-8ef363d5fb7b/aprameya_radhakrishna.resize_150x150.jpg",
            "date":"2015-12-19",
            "investor_name":"Aprameya Radhakrishna"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":242200,
            "photo":"",
            "date":"2016-01-28",
            "investor_name":"Activate Technology Partners"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":242200,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/5e7eab9b-3293-4248-8f37-53d1c84ede7f/ScreenShot20170410at124718PM.crop_109x109_0,15.preview.png",
            "date":"2016-01-28",
            "investor_name":"Rajan Anandan"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":96880,
            "photo":"https://s3-us-west-2.amazonaws.com/termsheet-uploadcare-assets/trackervc/4a44a511-d1c6-4f01-9fe0-9a66249b97a8/VikasMalpani.resize_150x150.jpg",
            "date":"2016-01-28",
            "investor_name":"Vikas Malpani"
         },
         {  
            "brand_logo":"",
            "brand":"Unacademy",
            "entity":"Sorting Hat Technologies Private Limited",
            "amount":346026,
            "photo":"",
            "date":"2017-05-15",
            "investor_name":"Sandhya Subramanyam"
         }
      ],
      "name":"Exam Prep"
   }
   };



    //arguments for timeChart function(json_data,xaxis,yaxis,radius,text_inside_circle)
    graph.timeChart(data,"date","name","amount","brand");

'''

This will create the following graph.

![timeline chart](images/timeChart.png)

Refer the example html file : index_bubble_chart.html for more details

### 4) Heat Map

'''

data = { 
  "Market" : "Sector",
  "children" : [
  {
    "Market": "Used Goods Marketplace",
    "Amount": 423225136,
    "Last_Transaction_Date": "2016-07-23",
    "Investment_Count": 14
  },
  {
    "Market": "Marketplace",
    "Amount": 21517113711,
    "Last_Transaction_Date": "2016-07-23",
    "Investment_Count": 98
  },
  {
    "Market": "Healthcare Tech",
    "Amount": 3526161580,
    "Last_Transaction_Date": "2016-09-16",
    "Investment_Count": 127
  },
  {
    "Market": "HR Tech",
    "Amount": 2095630,
    "Last_Transaction_Date": "2016-10-01",
    "Investment_Count": 2
  },
  {
    "Market": "Skill development",
    "Amount": 2095630,
    "Last_Transaction_Date": "2016-10-01",
    "Investment_Count": 2
  },
  {
    "Market": "Online Hypermarket",
    "Amount": 109672354043,
    "Last_Transaction_Date": "2016-10-03",
    "Investment_Count": 121
  },
  {
    "Market": "Coworking",
    "Amount": 539838101,
    "Last_Transaction_Date": "2016-10-28",
    "Investment_Count": 14
  },
  {
    "Market": "Online Grocery",
    "Amount": 13085351803,
    "Last_Transaction_Date": "2016-11-05",
    "Investment_Count": 139
  },
  {
    "Market": "K12 Learning",
    "Amount": 6705605708,
    "Last_Transaction_Date": "2016-11-21",
    "Investment_Count": 34
  },
  {
    "Market": "Hyperlocal",
    "Amount": 2598330932,
    "Last_Transaction_Date": "2016-11-30",
    "Investment_Count": 36
  },
  {
    "Market": "Sales Tech",
    "Amount": 287698360,
    "Last_Transaction_Date": "2016-12-10",
    "Investment_Count": 2
  },
  {
    "Market": "Hotel Aggregation",
    "Amount": 11750375703,
    "Last_Transaction_Date": "2016-12-15",
    "Investment_Count": 52
  }
  ]
  }; 


    //arguments for heat map function(json_data,area,color_depth,name)
    graph.heatMap(data,"Amount","Investment_Count","Market");

'''

This will create the following graph.

![heat map](images/heatMap.png)

Refer the example html file : index_heatmap.html for more details


### 5) Network Graph

'''

data = [
 {
    "name": "Tracxn Technologies Private Limited",
    "investors": [
      {
        "investments": 3,
        "id": 5646,
        "name": "SAIF Partners"
      },
      {
        "investments": 1,
        "id": 5650,
        "name": "Kolluri Living Trust"
      },
      {
        "investments": 1,
        "id": 5616,
        "name": "anand && venky LLC"
      },
      {
        "investments": 1,
        "id": 5651,
        "name": "BeeNext"
      },
      {
        "investments": 1,
        "id": 5653,
        "name": "DST Global"
      },
      {
        "investments": 1,
        "id": 5652,
        "name": "VH Capital"
      },
      {
        "investments": 1,
        "id": 5654,
        "name": "NRJN Family Trust"
      },
      {
        "investments": 1,
        "id": 5655,
        "name": "3One4 Capital"
      },
      {
        "investments": 2,
        "id": 5656,
        "name": "WCG International"
      },
      {
        "investments": 1,
        "id": 5657,
        "name": "Seabright II"
      },
      {
        "investments": 1,
        "id": 5658,
        "name": "Trustees, Amitabh and Shilpa Singhal Living Trust"
      },
      {
        "investments": 1,
        "id": 4691,
        "name": "Accel Partners"
      },
      {
        "investments": 1,
        "id": 5542,
        "name": "Sequoia Capital"
      }
    ],
    "id": 93
  },
  {
    "name": "Svatantra Online Services Private Limited",
    "investors": [
      {
        "investments": 3,
        "id": 5659,
        "name": "Infocyber"
      },
      {
        "investments": 4,
        "id": 5660,
        "name": "Birla Group"
      },
      {
        "investments": 3,
        "id": 5661,
        "name": "TGS Investment & Trade"
      },
      {
        "investments": 3,
        "id": 5662,
        "name": "IGH Holdings"
      },
      {
        "investments": 1,
        "id": 5663,
        "name": "Umang Commercial"
      }
    ],
    "id": 106
  },
  {
    "name": "Moneymitra It Solutions Private Limited",
    "investors": [
      {
        "investments": 4,
        "id": 5667,
        "name": "Loxo Holdings"
      }
    ],
    "id": 112
  },
  {
    "name": "Chumbak Design Private Limited",
    "investors": [
      {
        "investments": 6,
        "id": 5665,
        "name": "SeedFund"
      },
      {
        "investments": 5,
        "id": 5665,
        "name": "SeedFund"
      },
      {
        "investments": 4,
        "id": 5666,
        "name": "Matrix Partners"
      }
    ],
    "id": 113
  }
  ];


    //(data , startup_name_key , startup_investor_key , startup_id_key , investor_id_key , investor_name_key , investor_investments_key)
    graph.networkGraph(data,"name","investors","id","id","name","investments");

'''

This will create the following graph.

![network graph](images/networkGraph.png)

Refer the example html file : index_network.html for more details

####Links
[JSON Data Formats](docs/JSON.md)
[Chart Function Definitions](docs/function_definitions.md)