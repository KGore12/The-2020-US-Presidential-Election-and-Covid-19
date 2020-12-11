// Creating map object
var myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 8,
    zoomControl:false
  });

//Disablig the zoom on mouse scroll
myMap.scrollWheelZoom.disable();

// Setting the view to US 
myMap.setView([37.8,-95], 5);

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Load in geojson data
var geoData = "data/result.geojson";
var geojson;

// Setting color of the state based on election results
function getColor(d,r) {

    if (d) {
         return '#3275a8'
    } else {
        return '#a83432'
    }
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.Democrat),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
// Drawing a Pie-Chart 
function chart(d) {
    var feature = d.feature;
    var trumpdata = feature.properties.votes20_Donald_Trump;
    var bidendata = feature.properties.votes20_Joe_Biden;
    var statename = feature.properties.state;
    console.log(trumpdata);
    console.log(bidendata)
    console.log(statename)
    var margin = {left:20,right:15,top:40,bottom:40};
    var div = d3.select('.paint');
    var svg = div.select("svg");
    width =  svg.attr("width");
    height = svg.attr("height");
    radius = Math.min(width,height)/2;
    var color = d3.scaleOrdinal(["#a83432", "#3275a8"]);
    var data = [{"val": trumpdata, "type": "Trump","state":statename},{"val": bidendata, "type": "Biden","state":statename}];
    console.log(data);
    var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { 
            return d.val; 
        });

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
      
    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.value); });

 
    var text = arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .text(function(d) {
             return d.data.val; 
        });

    var title =svg.append("text")
        .attr("x", 60)             
        .attr("y", 15)
        .attr("class", "title")
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .attr("d",text)
        .text(function(d,i) {
          return "Election Results"; 
        });
    return div.node();
    
}   

// Grab data with d3
d3.json(geoData, function(data) {  
    console.log(data);
// add GeoJSON layer to the map once the file is loaded
    geojson = L.geoJson(data, {
        style : style, 
        onEachFeature: onEachFeature
    }).addTo(myMap).bindPopup(chart);
});

function zoomToFeature(e) {
    //console.log(e.target);
    myMap.fitBounds(e.target.getBounds());
    demographicChart(e);
    covidData(e);
}

// Highleight feature = MOUSEOVER
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    
};
function resetView()
{
  myMap.setView([37.8,-95],5);
  updateLegend();
}
// Reset highlight = MOUSE LEFT
function resetHighlight(e) {
    geojson.resetStyle(e.target); 
    
};

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
        popupclose: resetView
    });
}

// Drawing the demographic pie-chart based on election results
function demographicChart(data)
{
    //console.log(data);
    var feature = data.target.feature;
    var asian = feature.properties.asian_pop;
    var black = feature.properties.black_pop;
    var hispanic = feature.properties.hispanic_pop;
    var native = feature.properties.native_pop;
    var white = feature.properties.white_pop;
    var pacific = feature.properties.pacific_pop;
    console.log(pacific);
    var data = [{"val":asian,"type":"Asian"},{"val":black,"type":"Black"},{"val":hispanic,"type":"Hispanic"},{"val":native,"type":"NativeAmericans"},
    {"val":white,"type":"White"},{"val":pacific,"type":"Pacific"}];
    var legendRectSize = 20;
    var legendSpacing = 4;
    var div = d3.select('.demographic');
    var svg = div.select("svg");
    width =  svg.attr("width");
    height = svg.attr("height");
    radius = Math.min(width,height)/2;

    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#DAF7A6','#FFC300','#EC411D','#F5CDC4','#C4F5E6','#1b1c19']);

    // Generate the pie
    var pie = d3.pie()
    .sort(null)
    .value(function(d) { 
        return d.val; 
    });
    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
      
    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.value); });

    // var text = arc.append("text")
    //     .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
    //     .attr("dy", "0.35em")
    //     .text(function(d) {
    //          return d.data.val; 
    
    //     });

    var legend = d3.select(".demographic").append("svg")
      .attr("class", "legend")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("id","l1")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {
              return color(d.type);;
    });

    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return `${d.type} - ${d.val}`; });
}

// Removing legends 
function updateLegend()
{
  d3.selectAll("#l1").remove();
  d3.selectAll(".legend").remove();
  
}
// ChartJs
function covidData(data)
{  
var ctx = document.getElementById("myChart").getContext('2d');
//console.log(ctx);
var feature = data.target.feature;
var d1 = feature.properties.cases_per_100k;
var d2 = feature.properties.deaths_per_100k;
console.log(d1);
console.log(d2);

var barChartData = {
    labels: [feature.properties.state],
    datasets: [{
      type: 'bar',
      label: 'Cases Per 100K',
      yAxisID: "y-axis-0",
      backgroundColor: "rgba(217,83,79,0.75)",
      data: [feature.properties.cases_per_100k]
    }, {
      type: 'bar',
      axisYIndex: 1,
      label: 'Deaths Per 100K',
      yAxisID: "y-axis-1",
      backgroundColor: "rgba(92,184,92,0.75)",
      data: [feature.properties.deaths_per_100k]
    }]
  };
  
var ch = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      events:["click"],
      title: {
        display: true,
        text: "Covid Cases and Deaths per 100k for each State",
        defaultFontSize:12
      },
      tooltips: {
        mode: 'label',
        enabled:true
      },
      responsive: false,
      scales: {
        xAxes: [{
          stacked: false
          
        }],
        yAxes: [{
          stacked: false,
          position: "left",
          id: "y-axis-0",
          ticks :{min:0,max:6500}
        }, {
          stacked: false,
          position: "right",
          id: "y-axis-1",
          ticks:{min :0,max :200}
        }]
      }
    }
  });
}