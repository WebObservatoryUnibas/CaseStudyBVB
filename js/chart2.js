
function drawScatterPlot(id) {
    // data
    var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatter/.json";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", linkurl, true);
    xmlhttp.send();

    function myFunction(arr) {
        var datz2 = arr;
        var width = 1300;
        var height = 750;
        var padding = 50;

        var color = d3.scale.linear()
            .range(['green','#EB0057'])
            .domain([0,20]);

        var svg = d3.select(id).
            append("svg")
            .attr("width", width)
            .attr("height", height);

        var mintime = new Date(0,0,0,3,0);
        var maxtime = new Date(0,0,0,24,0);
        var yScale = d3.time.scale()
            .domain([mintime,maxtime])
            .range([height-padding, padding]);
        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(yScale)
            .ticks(d3.time.hours,2)
            .tickFormat(d3.time.format("%H:%M"));
        svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate("+padding+",0)")
            .call(yAxis);

        var mindate = new Date(datz2[0].day);
        mindate.setDate(mindate.getDate()-1);
        var maxdate = new Date(datz2[datz2.length-1].day);
        var xScale = d3.time.scale()
            .domain([mindate,maxdate])
            .range([padding, width-padding*2]);
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(xScale)
            .ticks(d3.time.days)
            .tickFormat(d3.time.format("%a %d.%m"));
        svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0,"+(height-padding)+")")
            .call(xAxis)
            .selectAll("text")
            .attr("y",1)
            .attr("x",9)
            .attr("dy","1em")
            .attr("transform","rotate(30)")
            .style("text-anchor","start");

        svg.selectAll(id)
            .data(datz2)
            .enter()
            .append("circle")
            .attr("class", "circle")
            .attr("cx", function(d){
                return xScale(new Date(d.day))
            })
            .attr("cy", function(d){
                var help = d.time.split(":");
                return yScale(new Date(0,0,0,help[0],help[1]))
            })
            .attr("r", function(d){
                if (d.delay > 15){
                    return 30
                } else{
                    return d.delay*2;
                }
            })
            .attr("opacity",.3)
            .attr("fill", function(d){
                return color(d.delay*2)
            });

        var buttonTramTotal = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "total")
            .attr("type","button")
            .attr("value", "total")
            .attr("class","btn btn-default")
            .style("color","white")
            .style("background-color","black");
        var buttonTram3 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram3")
            .attr("type","button")
            .attr("value", "Tram3")
            .attr("class","btn btn-default")
            .style("color","white")
            .style("background-color","darkblue");
        var buttonTram6 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram6")
            .attr("type","button")
            .attr("value", "Tram6")
            .attr("class","btn btn-default")
            .style("color","white")
            .style("background-color","mediumblue");
        var buttonTram8 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram8")
            .attr("type","button")
            .attr("value", "Tram8")
            .attr("class","btn btn-default")
            .style("color","black")
            .style("background-color","hotpink");
        var buttonTram11 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram11")
            .attr("type","button")
            .attr("value", "Tram11")
            .attr("class","btn btn-default")
            .style("color","black")
            .style("background-color","red");
        var buttonTram14 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram14")
            .attr("type","button")
            .attr("value", "Tram14")
            .attr("class","btn btn-default")
            .style("color","black")
            .style("background-color","orange");
        var buttonTram15 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram15")
            .attr("type","button")
            .attr("value", "Tram15")
            .attr("class","btn btn-default")
            .style("color","black")
            .style("background-color","green");
        var buttonTram16 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram16")
            .attr("type","button")
            .attr("value", "Tram16")
            .attr("class","btn btn-default")
            .style("color","black")
            .style("background-color","olivedrab");
        var buttonTram17 = d3.select("#chooseBtn")
            .append("input")
            .attr("id", "Tram17")
            .attr("type","button")
            .attr("value", "Tram17")
            .attr("class","btn btn-default")
            .style("color","black")
            .style("background-color","lightblue");

        buttonTramTotal.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatter.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram3.on("click", function(){
            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram3/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram6.on("click", function(){
            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram6/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram8.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram8/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram11.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram11/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function (d) {
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function (d) {
                        var help = d.time.split(":");
                        return yScale(new Date(0, 0, 0, help[0], help[1]))
                    })
                    .attr("r", function (d) {
                        if (d.delay > 15) {
                            return 30
                        } else {
                            return d.delay * 2;
                        }
                    })
                    .attr("opacity", .3)
                    .attr("fill", function (d) {
                        return color(d.delay * 2)
                    });
            }



        });

        buttonTram14.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram14/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram15.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram15/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram16.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram16/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });

        buttonTram17.on("click", function(){

            var linkurl = "https://bachprojectmw.firebaseio.com/keen/cache/scatterTram17/.json";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    myFunction(myArr);
                }
            };
            xmlhttp.open("GET", linkurl, true);
            xmlhttp.send();

            function myFunction(arr) {
                var datz3 = arr;
                d3.selectAll('circle')
                    .remove();

                svg.selectAll(id)
                    .data(datz3)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d){
                        return xScale(new Date(d.day))
                    })
                    .attr("cy", function(d){
                        var help = d.time.split(":");
                        return yScale(new Date(0,0,0,help[0],help[1]))
                    })
                    .attr("r", function(d){
                        if (d.delay > 15){
                            return 30
                        } else{
                            return d.delay*2;
                        }
                    })
                    .attr("opacity",.3)
                    .attr("fill", function(d){
                        return color(d.delay*2)
                    });
            }
        });
    }
}





