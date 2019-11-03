//------- Individual Sample Metadata Info and Gauge Chart
function buildMetadata(sample){
    
  // //Gives the route for the sample selected
  var url_metadata=`/metadata/${sample}`;
  
  //------- Metadata Info
  d3.json(url_metadata).then(function(data){
      console.log(data.WFREQ);
      //console.log("Metadata ", url_metadata);

      // Select the panel with id of `#sample-metadata` to include info
      var sample_metadata=d3.select("#sample-metadata");
      
      // `.html("") to clear any existing metadata
      sample_metadata.html("")

      // `Object.entries` to add each key and value pair to the panel
      Object.entries(data).forEach(function([k,v]){
          var row = sample_metadata.append("p");
          row.text(`${k}:${v}`);
      });
  });

  //---------GAUGE Chart
  d3.json(url_metadata).then(function(data){
    var wwfreq=data.WFREQ;
    console.log(data.WFREQ);

    var GaugeData =[{
      domain: { x: [0,1], y:[0,1]},
      value:wwfreq,
      title: {text: "Sample weekly washing frequency"},
      type: "indicator",
      mode:"gauge",
      gauge: {axis: {range: [null, 9]},
      steps:[
        {range: [0,1], color: "darkred"},
        {range: [1,2], color:"red"},
        {range: [2,3],color:"orange"},
        {range: [3,4],color:"yellow"},
        {range:[4,5],color:"lightgreen"},
        {range:[5,6],color:"green"},
        {range:[6,7],color:"darkgreen"},
        {range:[7,8],color:"blue"},
        {range:[8,9],color:"darkblue"}
      ]}
      
    }];
    
    Plotly.newPlot("gauge",GaugeData)
  });
}

// ------ PIE & BUBBLE CHARTS
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url_samples= `/samples/${sample}`;
  console.log(sample);
  
  //---------PIE CHART
  d3.json(url_samples).then(function(data){
    // @TODO: Build a Pie Chart
    var labels = data.otu_ids.slice(0,10);
    var hovertext = data.otu_labels.slice(0,10);
    var values = data.sample_values.slice(0,10);

    var data = [{
      values: values,
      labels: labels,
      hovertext: hovertext,
      type:"pie"
    }];
    Plotly.newPlot("pie",data);
  });
  
  //---------BUBBLE CHART
  d3.json(url_samples).then(function(data){
    var x_values = data.otu_ids;
    var y_values = data.sample_values;
    var bubble_size = data.sample_values;
    var color = data.otu_ids;
    var text_values = data.otu_labels;

    var data =[{
      x: x_values,
      y: y_values,
      mode:"markers",
      marker: {color: color, size: bubble_size},
      text: text_values,

    }];
    Plotly.newPlot("bubble",data)
  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();