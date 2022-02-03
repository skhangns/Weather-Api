$("#search-button").on("click",function(){
    var searchValue = $("#search-value").val();
    console.log(searchValue);
    $("#search-value").empty()
     searchWeather(searchValue)
    addhistory(searchValue)
   
}); 
$(".searchhistory").on("click", "li", function(){
  searchWeather($(this).text())
})
function addhistory(text){
  var historyItem = $("<li>").addClass("list-group-item").text(text)
  $(".searchhistory").append(historyItem)
  $("#today").empty();
}
function searchWeather(searchValue){
  
$.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=33c16f35db7793ff40e8bbc19978696f&units=imperial",
    }).then(data=>{
        console.log(data)
        $("#search-value").empty()
      // clear any old content
      
      // create html content for current weather
      var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      var card = $("<div>").addClass("card");
      var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
      var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
      var cardBody = $("<div>").addClass("card-body");
      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      // merge and add to page
      title.append(img);
      cardBody.append(title, temp, humid, wind);
      card.append(cardBody);
      $("#today").append(card);
      // call follow-up api endpoints
     
    }
  );
}
function searchWeather(searchValue){
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=33c16f35db7793ff40e8bbc19978696f&units=imperial",
        }).then(data=>{
            console.log(data)
    
          // clear any old content
          $("#today").empty();
          // create html content for current weather
          var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
          var card = $("<div>").addClass("card");
          var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
          var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
          var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
          
          var cardBody = $("<div>").addClass("card-body");
          var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
          // merge and add to page
          title.append(img);
          cardBody.append(title, temp, humid, wind);
          card.append(cardBody);
          $("#today").append(card);
          // call follow-up api endpoints
         searchForecast(data.coord.lat,data.coord.lon)
         searchUvi(data.coord.lat, data.coord.lon)
        }
      );
    }
    
    function searchForecast(Lat,Lon){
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+Lat+"&lon="+Lon+"&appid=33c16f35db7793ff40e8bbc19978696f&units=imperial",
            }).then(data=>{
                console.log(data)
              $("#forecast").empty()
          for(var i= 1;i<data.daily.length-2; i++){
            var temp = $("<p>").addClass("customstyle").text("temp: "+ data.daily[i].temp.day)
            var uvi = $("<p>").addClass("customstyle").text("uvi "+ data.current.uvi)
            var dateString = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
            var humidity = $("<p>").addClass("customstyle").text("humidity"+ data.daily[i].humidity)
            var windSpeed = $("<p>").addClass("").text("windspeed "+data.daily[i].wind_speed)
        
            var card = $("<div>").addClass("card cardstyle").append(dateString,temp,uvi,humidity,windSpeed)
            
        
            
            $("#forecast").addClass("customstyle").append(card)
        }
             
            }
          );
        }
