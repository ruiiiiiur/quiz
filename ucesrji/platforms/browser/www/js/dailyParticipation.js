//---------------------
//This function is called to get the values of daily participation rates for all users.
//---------------------

// define a global variable to hold the layer so that we can use it later on

var xhrFormData8;
var quizPoints8;

function startFormDataLoad8() {
    xhrFormData8 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/dailyParticipation_allUsers";
    xhrFormData8.open("GET", url, true);
    xhrFormData8.onreadystatechange = formDataResponse8;
    xhrFormData8.send();
}

function formDataResponse8() {
    if (xhrFormData8.readyState == 4) {
        // once the data is ready, process the data
        var formData8 = xhrFormData8.responseText;
        loadFormData8(formData8);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


// 'JSON' data included as above
//[{"array_to_json":[{"questions_answered":18}]}]
//[{"array_to_json":[{"questions_answered":1,"day":"30273"},{"questions_answered":2,"day":"30282"},{"questions_answered":3,"day":"30297"},{"questions_answered":8,"day":"30296"},{"questions_answered":5,"day":"30266"}]}]

function loadFormData8(formData8) {
    // convert the text received from the server to JSON
    var formJSON8 = JSON.parse(formData8);

   document.getElementById("all_users").innerHTML = "<b>Daily Participation Rates for All Users </b>" + "(Blue: questions have been answered; Yellow: answers were correct):";
    
    var   svg = d3.select(".dailyP_all_users").append("svg").attr("width", 800).attr("height", 450),
          margin  = {top: 20, right: 20, bottom: 30, left: 50},
          width   = +svg.attr("width")  - margin.left - margin.right,
          height  = +svg.attr("height") - margin.top  - margin.bottom,
          x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
          y       = d3.scaleLinear().rangeRound([height, 0]),
          g       = svg.append("g")
                       .attr("transform", `translate(${margin.left},${margin.top})`);

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/dailyParticipation_allUsers";

    d3.json(url).then(data => {
      datanew = data[0].array_to_json;
      console.log(datanew);
      x.domain(datanew.map(d => d.day));
      y.domain([0, d3.max(datanew, d => d.questions_answered)]);

      g.append("g")
          .attr("class", "axis axis-x")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));


      g.append("g")
          .attr("class", "axis axis-y")
          .call(d3.axisLeft(y).ticks(10).tickSize(8));

      //code adapted from https://github.com/liufly/Dual-scale-D3-Bar-Chart
      g.selectAll(".bar1")
        .data(datanew)
        .enter().append("rect")
          .attr("class", "bar1")
          .attr("x", d => x(d.day))
          .attr("y", d => y(d.questions_answered))
          .attr("width", x.bandwidth()/2)
          .attr("height", d => height - y(d.questions_answered));

      //code adapted from https://github.com/liufly/Dual-scale-D3-Bar-Chart
      g.selectAll(".bar2")
        .data(datanew)
        .enter().append("rect")
          .attr("class", "bar2")
          .attr("x", d => x(d.day)+ x.bandwidth()/2)
          .attr("y", d => y(d.questions_correct))
          .attr("width", x.bandwidth()/2)
          .attr("height", d => height - y(d.questions_correct));
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


//----------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------
//This function is called to get the values of daily participation rate for the current user.
//---------------------

// define a global variable to hold the layer so that we can use it later on

var xhrFormData9;
var quizPoints9;

function startFormDataLoad9() {
    xhrFormData9 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/dailyParticipation_oneUser/" + httpPortNumber;
    xhrFormData9.open("GET", url, true);
    xhrFormData9.onreadystatechange = formDataResponse9;
    xhrFormData9.send();
}

function formDataResponse9() {
    if (xhrFormData9.readyState == 4) {
        // once the data is ready, process the data
        var formData9 = xhrFormData9.responseText;
        loadFormData9(formData9);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


// 'JSON' data included as above
//[{"array_to_json":[{"questions_answered":19}]}]
//[{"array_to_json":[{"questions_answered":1,"day":"30273"},{"questions_answered":2,"day":"30292"},{"questions_answered":3,"day":"30297"},{"questions_answered":9,"day":"30296"},{"questions_answered":5,"day":"30266"}]}]

function loadFormData9(formData9) {
    // convert the text received from the server to JSON
    var formJSON9 = JSON.parse(formData9);

   document.getElementById("one_user").innerHTML = "<b>Your Daily Participation Rate </b>" + "(Blue: questions have been answered; Yellow: answers were correct):";
    
    var   svg = d3.select(".dailyP_one_user").append("svg").attr("width", 800).attr("height", 450),
          margin  = {top: 20, right: 20, bottom: 30, left: 50},
          width   = +svg.attr("width")  - margin.left - margin.right,
          height  = +svg.attr("height") - margin.top  - margin.bottom,
          x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
          y       = d3.scaleLinear().rangeRound([height, 0]),
          g       = svg.append("g")
                       .attr("transform", `translate(${margin.left},${margin.top})`);

    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/dailyParticipation_oneUser/" + httpPortNumber;

    d3.json(url).then(data => {
      datanew = data[0].array_to_json;
      console.log(datanew);
      x.domain(datanew.map(d => d.day));
      y.domain([0, d3.max(datanew, d => d.questions_answered)]);

      g.append("g")
          .attr("class", "axis axis-x")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));


      g.append("g")
          .attr("class", "axis axis-y")
          .call(d3.axisLeft(y).ticks(10).tickSize(9));

      //code adapted from https://github.com/liufly/Dual-scale-D3-Bar-Chart
      g.selectAll(".bar1")
        .data(datanew)
        .enter().append("rect")
          .attr("class", "bar1")
          .attr("x", d => x(d.day))
          .attr("y", d => y(d.questions_answered))
          .attr("width", x.bandwidth()/2)
          .attr("height", d => height - y(d.questions_answered));

      //code adapted from https://github.com/liufly/Dual-scale-D3-Bar-Chart
      g.selectAll(".bar2")
        .data(datanew)
        .enter().append("rect")
          .attr("class", "bar2")
          .attr("x", d => x(d.day)+ x.bandwidth()/2)
          .attr("y", d => y(d.questions_correct))
          .attr("width", x.bandwidth()/2)
          .attr("height", d => height - y(d.questions_correct));
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


