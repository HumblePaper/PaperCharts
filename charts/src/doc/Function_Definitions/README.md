<a name="graph"></a>

## graph
**Kind**: global class  

* [graph](#graph)
    * [.set_margin(top, bottom, left, text)](#graph.set_margin)
    * [.set_canvas(width, height)](#graph.set_canvas)
    * [.bubbleChart(data, xAxis, yAxis, r, text)](#graph.bubbleChart)
    * [.bubbleChartZoom(data, xAxis, yAxis, r, text)](#graph.bubbleChartZoom)
    * [.timeChart(data, xAxis, yAxis, r, text)](#graph.timeChart)
    * [.heatMap(data, area, color, name)](#graph.heatMap)
    * [.networkGraph(data, startup_name_key, startup_investor_key, startup_id_key, investor_name_key, investor_investments_key, investor_id_key)](#graph.networkGraph)

<a name="graph.set_margin"></a>

### graph.set_margin(top, bottom, left, text)
this function sets the margin for the graph in the canvas.

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| top | <code>int</code> | : corresponds to the top margin |
| bottom | <code>int</code> | : corresponds to the bottom margin |
| left | <code>int</code> | : corresponds to the left margin |
| text | <code>int</code> | : corresponds to the right margin |

<a name="graph.set_canvas"></a>

### graph.set_canvas(width, height)
this function sets the width and heigth of the canvas.

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>int</code> | : corresponds to the width of the canvas |
| height | <code>int</code> | : corresponds to the height of the canvas |

<a name="graph.bubbleChart"></a>

### graph.bubbleChart(data, xAxis, yAxis, r, text)
this is the bubblechart function plots a static bubble chart with a constant radius bubble chart

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>json</code> | : json data obtained from the ajax code in example function |
| xAxis | <code>string</code> | : the json key which corresponds to the value plotted in the xAxis |
| yAxis | <code>string</code> | : the json key which corresponds to the value plotted in the yAxis |
| r | <code>string</code> | :  the json key which corresponds to the radius of the bubbles plotted |
| text | <code>string</code> | :  the json key which corresponds to the text inside the bubbles plotted |

<a name="graph.bubbleChartZoom"></a>

### graph.bubbleChartZoom(data, xAxis, yAxis, r, text)
this function plots a static bubble chart with a constant radius and zoomable parameters,

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>json</code> | : json data obtained from the ajax code in example function |
| xAxis | <code>string</code> | : the json key which corresponds to the value plotted in the xAxis |
| yAxis | <code>string</code> | : the json key which corresponds to the value plotted in the yAxis |
| r | <code>string</code> | :  the json key which corresponds to the radius of the bubbles plotted |
| text | <code>string</code> | :  the json key which corresponds to the text inside the bubbles plotted |

<a name="graph.timeChart"></a>

### graph.timeChart(data, xAxis, yAxis, r, text)
this function plots a static bubble chart with a constant radius and zoomable parameters,

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>json</code> | : json data obtained from the ajax code in example function |
| xAxis | <code>string</code> | : the json key which corresponds to the value plotted in the xAxis |
| yAxis | <code>string</code> | : the json key which corresponds to the value plotted in the yAxis |
| r | <code>string</code> | :  the json key which corresponds to the radius of the bubbles plotted |
| text | <code>string</code> | :  the json key which corresponds to the text inside the bubbles plotted |

<a name="graph.heatMap"></a>

### graph.heatMap(data, area, color, name)
this function plots a heat map using the above given parameters,

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>json</code> | : the json object obtained after passing the json file to ajax code in the example |
| area | <code>string</code> | : the json key which corresponds to the area of the cell in the heatmap |
| color | <code>string</code> | : the json key which correspond to the color depth of the cell |
| name | <code>string</code> | : the json key which corresponds to the cell name(i.e. text inside the cell) |

<a name="graph.networkGraph"></a>

### graph.networkGraph(data, startup_name_key, startup_investor_key, startup_id_key, investor_name_key, investor_investments_key, investor_id_key)
this function plots a network of nodes of startups and their investors

**Kind**: static method of [<code>graph</code>](#graph)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>json</code> | : the json object obtained after passing the json file to ajax code in the example |
| startup_name_key | <code>string</code> | : the json key which corresponds to the name of the startup node |
| startup_investor_key | <code>string</code> | : the json key which corresponds to the investors of the startup node |
| startup_id_key | <code>string</code> | : the json key which corresponds to the unique id of the startup node |
| investor_name_key | <code>string</code> | : the json key which corresponds to the name of the investor node |
| investor_investments_key | <code>string</code> | : the json key which corresponds to the investments of the investor node |
| investor_id_key | <code>string</code> | : the json key which corresponds to the unique id of the investor node |

