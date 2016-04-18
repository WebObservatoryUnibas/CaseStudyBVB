/**
 * Created by Mario on 29.05.2015.
 */
/**
 * Created by Mario on 29.05.2015.
 */
//var width = parseInt(d3.select("#clockContainer").style("width"))/3;
//var height = parseInt(d3.select("#clockContainer").style("width"))/3;
var width = 320;
var height = 320;
var clockRadius = (width-40)/2;
var margin = 20;

var hourHandLength = 3*clockRadius/5;
var secondHandLength = clockRadius-60;
var minuteHandLength = clockRadius-16;

var secondHandBalance = (clockRadius/7)*3;
var minuteHandBalance = (clockRadius/7)*1.5;
var hourHandBalance = (clockRadius/7)*1.5;

var secondTickStart = clockRadius;
var secondTickLength = -(clockRadius/10);
var hourTickStart = clockRadius;
var hourTickLength = -(clockRadius/3.33);

var hourScale = d3.scale.linear()
    .range([0,330])
    .domain([0,11]);

var minuteScale = d3.scale.linear()
    .range([0,354])
    .domain([0,59]);

var secondScale = d3.scale.linear()
    .range([0,354])
    .domain([0,59]);

var handData = [
    {
        type:"hour",
        value:0,
        length: -hourHandLength,
        scale: hourScale,
        balance: hourHandBalance,
        special: false
    },
    {
        type:"minute",
        value:0,
        length: -minuteHandLength,
        scale: minuteScale,
        balance: minuteHandBalance,
        special: false
    },
    {
        type:"second",
        value:0,
        length: -secondHandLength,
        scale: secondScale,
        balance: secondHandBalance,
        special: true
    }
];

function drawClock(){
    updateData();
    var svg = d3.select("#stationClock").append("svg")
        .attr("id", "clockChart")
        .attr("viewBox", "0 0 "+width+" "+height)
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("width", width)
        .attr("height", height);

    var face = svg.append("g")
        .attr("id", "face")
        .attr("transform", "translate(" + (clockRadius + margin) + "," +(clockRadius + margin) + ")");

    face.selectAll(".second-tick")
        .data(d3.range(0,60))
        .enter()
        .append("line")
        .attr("class", "second-tick")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", secondTickStart + secondTickLength)
        .attr("y2", secondTickStart)
        .attr("transform", function(d){
            return "rotate(" + secondScale(d) + ")";
        });

    face.selectAll(".hour-tick")
        .data(d3.range(0,12))
        .enter()
        .append("line")
        .attr("class", "hour-tick")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", hourTickStart + hourTickLength)
        .attr("y2", hourTickStart)
        .attr("transform", function(d){
            return "rotate(" + hourScale(d) + ")";
        });



    var hands = face.append("g")
        .attr("id","clock-hands");

    var cir = face.append("g")
        .attr("id", "secondHand-Circle");

    cir.selectAll("circle")
        .data(handData)
        .enter()
        .append("circle")
        .attr("class", function(d){
            return d.type + "-circle";
        })
        .attr("cx", 0)
        .attr("cy", function(d){
            return d.length;
        })
        .attr("r", clockRadius/7)
        .attr("transform", function(d){
            return "rotate(" + d.scale(d.value) + ")";
        });

    hands.selectAll("line")
        .data(handData)
        .enter()
        .append("line")
        .attr("class", function(d){
            return d.type + "-hand";
        })
        .attr("x1", 0)
        .attr("y1", function(d){
            return d.balance ? d.balance : 0;
        })
        .attr("x2", 0)
        .attr("y2", function(d){
            return d.length;
        })
        .attr("transform", function(d){
            return "rotate(" + d.scale(d.value) + ")";
        });

    resize();
}

function resize() {
    var width = parseInt(d3.select("#clockContainer").style("width")) / 2;
    var height = parseInt(d3.select("#clockContainer").style("width")) / 2;

    d3.select("#clockChart")
        .attr("width", width)
        .attr("height", width);

}

d3.select(window).on("resize", resize);

function moveHands(){
    d3.select("#clock-hands")
        .selectAll("line")
        .data(handData)
        .transition()
        .attr("transform", function(d){
            return "rotate(" + d.scale(d.value) + ")";
        });
    d3.select("#secondHand-Circle")
        .selectAll("circle")
        .data(handData)
        .transition()
        .attr("transform", function(d){
            return "rotate(" + d.scale(d.value) + ")";
        });
}

function updateData(){
    var t = new Date();
    handData[0].value = (t.getHours() % 12) + t.getMinutes()/60;
    handData[1].value = t.getMinutes();
    handData[2].value = t.getSeconds();
}



drawClock();

setInterval(function(){
    updateData();
    moveHands();
}, 1000);