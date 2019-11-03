function buildGauge(sample){
  
    var metadata = `/metadata/${sample}`;
    
    d3.json(metadata).then(function(sample){
      console.log(sample.WFREQ);
      
      var gauge=d3.select("#gauge");
      
      var WWfrequency = sample.WFREQ;
      console.log(WWfrequency);
      var GaugeData = [
       {
         domain: { x:[0,1], y:[0,1]},
         value:+WWfrequency,
         title: {text: "Weekly Washing Frequency"},
         type:"indicator",
         mode:"gauge+number",
         steps:[
           {range: [0,1], color: "red"},
           {range: [1-2], color:"lightred"},
           {range: [2,3],color:"yellow"},
           {range: [3,4],color:"lightyellow"},
           {range:[4,5],color:"lightgreen"},
           {range:[5,6],color:"green"},
           {range:[6,7],color:"darkgreen"},
           {range:[7,8],color:"lightblue"},
           {range:[8,9],color:"blue"}
         ],
        }
  
     ];
     var layout = {width:600, height: 500, margin: {t:0,b:0}};
     Plotly.newPlot(gd, GaugeData,layout);
    });
        
    }
  buildGauge();