//---------------------
// Functions below are called to load top 5 scorers in the quiz.
//---------------------

// define a global variable to hold the layer so that we can use it later on

var xhrFormData4;
var quizPoints4;

function startFormDataLoad4() {
    xhrFormData4 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getTopFive";
    xhrFormData4.open("GET", url, true);
    xhrFormData4.onreadystatechange = formDataResponse4;
    xhrFormData4.send();
}

function formDataResponse4() {
    if (xhrFormData4.readyState == 4) {
        // once the data is ready, process the data
        var formData4 = xhrFormData4.responseText;
        loadFormData4(formData4);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


// 'JSON' data included as above
//[{"array_to_json":[{"rank":1,"port_id":"30273"},{"rank":2,"port_id":"30282"},{"rank":3,"port_id":"30297"},{"rank":4,"port_id":"30296"},{"rank":5,"port_id":"30266"}]}]

function loadFormData4(formData4) {
    // convert the text received from the server to JSON
    
    var formJSON4 = JSON.parse(formData4);

    // Codes below are adapted from https://www.tutorialsteacher.com/d3js/scales-in-d3.

    // define local variables for D3 graphs 
    var   svg = d3.select(".fivetop").append("svg").attr("width", 340).attr("height", 180),
          margin  = {top: 20, right: 20, bottom: 30, left: 50},
          width   = +svg.attr("width")  - margin.left - margin.right,
          height  = +svg.attr("height") - margin.top  - margin.bottom,
          x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
          y       = d3.scaleLinear().rangeRound([height, 0]),
          g       = svg.append("g")
                       .attr("transform", `translate(${margin.left},${margin.top})`);

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getTopFive";

    d3.json(url).then(data => {
      datanew = data[0].array_to_json;
      console.log(datanew);
      x.domain(datanew.map(d => d.port_id));
      y.domain([0, d3.max(datanew, d => d.rank)]);

      g.append("g")
          .attr("class", "axis axis-x")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));


      g.append("g")
          .attr("class", "axis axis-y")
          .call(d3.axisLeft(y).ticks(5).tickSize(8));

      g.selectAll(".bar")
        .data(datanew)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d.port_id))
          .attr("y", d => y(d.rank))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.rank));
    })
    .catch(err => {
      svg.append("text")         
            .attr("y", 20)
            .attr("text-anchor", "left")  
            .style("font-size", "20px") 
            .style("font-weight", "bold")  
            .text(`Couldn't open the data file: "${err}".`);
    });



}


