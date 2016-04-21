
function showSchedule(selectedDate, nr, dir){

    function getWeekDay(date){
        var dateIndex = new Date(date);
        var index = dateIndex.getDay();
        if (index == 1){
            return "Monday";
        }
        if (index == 2){
            return "Tuesday";
        }
        if (index == 3){
            return "Wednesday";
        }
        if (index == 4){
            return "Thursday";
        }
        if (index == 5){
            return "Friday";
        }
        if (index == 6){
            return "Saturday";
        }
        if (index == 0){
            return "Sunday";
        }
    }

    d3.select("#boldDateText").text(function(){
        return getWeekDay(selectedDate) + ", " + selectedDate;
    });
    d3.select("#boldDirText").text(function(){
        return dir;
    });
    d3.select("#picLogo").attr("src","img/"+nr+"logo.png" );

    function getScheduleData(dir){
        if (dir == "Allschwil"){
            return data6_allschwil;
        }
        if (dir == "Riehen Grenze"){
            return data6_riehenGrenze;
        }
        if (dir == "Burgfelden Grenze"){
            return data3_burgfeldenGrenze;
        }
        if (dir == "Birsfelden Hard"){
            return data3_birsfeldenHard;
        }
        if (dir == "Neuweilerstrasse"){
            return data8_neuweilerstrasse;
        }
        if (dir == "Weil am Rhein"){
            return data8_weilAmRhein;
        }
        if (dir == "St.Louis Grenze"){
            return data11_stlouis;
        }
        if (dir == "Aesch"){
            return data11_aesch;
        }
        if (dir == "Pratteln"){
            return data14_pratteln;
        }
        if (dir == "Dreirosenbruecke"){
            return data14_dreirosenbruecke;
        }
        if (dir == "Bruderholz" && nr == "15"){
            return data15_bruderholz;
        }
        if (dir == "Bruderholz" && nr == "16"){
            return data16_bruderholz;
        }
        if (dir == "Schifflaende"){
            return data16_schifflaende;
        }
        if (dir == "Ettingen"){
            return data17_ettingen;
        }
        if (dir == "Wiesenplatz"){
            return data17_wiesenplatz;
        }
    }

    function matchDirections(dir){
        if (dir == "Allschwil"){
            return "Allschwil, Dorf";
        }
        if (dir == "Riehen Grenze"){
            return "Riehen Grenze";
        }
        if (dir == "Burgfelden Grenze"){
            return "Basel Burgfelden Grenze";
        }
        if (dir == "Birsfelden Hard"){
            return "Birsfelden, Hard";
        }
        if (dir == "Weil am Rhein"){
            return "Weil(Rhein) Bahnhof/Zentrum";
        }
        if (dir == "Neuweilerstrasse"){
            return "Basel Neuweilerstrasse";
        }
        if (dir == "St.Louis Grenze"){
            return "Basel St-Louis Grenze";
        }
        if (dir == "Aesch"){
            return "Aesch BL, Dorf";
        }
        if (dir == "Dreirosenbruecke"){
            return "Basel, Dreirosenbruecke";
        }
        if (dir == "Pratteln"){
            return "Pratteln, Tram";
        }
        if (dir == "Bruderholz"){
            return "Basel Bruderholz";
        }
        if (dir == "Schifflaende"){
            return "Basel, Schifflaende";
        }
        if (dir == "Ettingen"){
            return "Ettingen";
        }
        if (dir == "Wiesenplatz"){
            return "Basel Wiesenplatz";
        }

    }

    function getWeekDayIndex(date){
        var dateIndex = new Date(date);
        var index = dateIndex.getDay();
        if (index<6 && index>0){
            return 0;
        } else if (index == 6){
            return 1;
        } else {
            return 2;
        }

    }


    var linkurl = "https://bvb-data.firebaseio.com/views/Scatter"+nr+"/.json";
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
        var data_dayIndex = getWeekDayIndex(selectedDate);
        //console.log(data_dayIndex);
        var data_ScheduleData = getScheduleData(dir);
        //console.log(data_ScheduleData);
        var data_dir = matchDirections(dir);
        //console.log(data_dir);

        function calcCurrDay(data, date, dir){
            var dailyResults = [];
            for (var i=0;i<data.length;i++){
                if (data[i].day == date && data[i].dir == dir){
                    var help = data[i].time.split(":");
                    var objToAdd = {hour:help[0], mins:help[1], delay:data[i].delay};
                    dailyResults.push(objToAdd);
                }

            }
            return dailyResults;
        }

        var data_collData = calcCurrDay(datz2, selectedDate, data_dir);

        // table Mo-Fr
        if (data_dayIndex == 0){
            var tableMF = d3.select("#shedPlot");
            var tHeaderMF = tableMF.append("thead");
            var tBodyMF = tableMF.append("tbody");

            tHeaderMF.append("tr")
                .append("td")
                .attr("colspan", 11)
                .style("text-align", "center")
                .text("Montag - Freitag");


            for (var j= 4;j<28;j++){
                var hour = data_ScheduleData[0].hours[j.toString()];
                hour.unshift(j%24);
                tBodyMF.append("tr")
                    .selectAll("td")
                    .data(hour)
                    .enter()
                    .append("td")
                    .attr("class", function(d){
                        var resultDelay = null;
                        for (var i=0;i<data_collData.length; i++){
                            if (data_collData[i].mins == d && data_collData[i].hour == (j%24)){
                                resultDelay =  "delayed"+data_collData[i].delay + " delclass";
                            }
                        }
                        return resultDelay;
                    })
                    .attr("data-del", function(d){
                        var delRes = null;
                        for (var i=0;i<data_collData.length; i++){
                            if (data_collData[i].mins == d && data_collData[i].hour == (j%24)){
                                delRes =  data_collData[i].delay
                            }
                        }
                        return delRes + " min delay";
                    })
                    .text(function(d){
                        return d !== -1 ? d : "";
                    });
                hour.shift();
            }
        }

        // table Saturday
        if (data_dayIndex == 1){
            var tableS = d3.select("#shedPlot");
            var tHeaderS = tableS.append("thead");
            var tBodyS = tableS.append("tbody");
            tHeaderS.append("tr")
                .append("td")
                .attr("colspan", 11)
                .style("text-align", "center")
                .text("Samstag");

            for (var k= 4;k<28;k++){
                var hourS = data_ScheduleData[1].hours[k.toString()];
                hourS.unshift(k%24);
                tBodyS.append("tr")
                    .selectAll("td")
                    .data(hourS)
                    .enter()
                    .append("td")
                    .attr("class", function(d){
                        var resultDelay = null;
                        for (var i=0;i<data_collData.length; i++){
                            if (data_collData[i].mins == d && data_collData[i].hour == (k%24)){
                                console.log("got1");
                                resultDelay =  "delayed"+data_collData[i].delay;
                            }
                        }
                        return resultDelay;
                    })
                    .text(function(d){
                        return d !== -1 ? d:"";
                    });
                hourS.shift();
            }
        }


        //table Sun
        if (data_dayIndex == 2){
            var tableSun = d3.select("#shedPlot");
            var tHeaderSun = tableSun.append("thead");
            var tBodySun = tableSun.append("tbody");
            tHeaderSun.append("tr")
                .append("td")
                .attr("colspan", 11)
                .style("text-align", "center")
                .text("Sonntag");


            for (var l= 4;l<28;l++){
                var hourSun = data_ScheduleData[2].hours[l.toString()];
                hourSun.unshift(l%24);
                tBodySun.append("tr")
                    .selectAll("td")
                    .data(hourSun)
                    .enter()
                    .append("td")
                    .attr("class", function(d){
                        var resultDelay = null;
                        for (var i=0;i<data_collData.length; i++){
                            if (data_collData[i].mins == d && data_collData[i].hour == (l%24)){
                                console.log("got1");
                                resultDelay =  "delayed"+data_collData[i].delay;
                            }
                        }
                        return resultDelay;
                    })
                    .text(function(d){
                        return d !== -1 ? d:"";
                    });
                hourSun.shift();
            }
        }
    }
}