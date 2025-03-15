navigator.geolocation.getCurrentPosition((pos)=>{
    const {latitude,longitude}=pos.coords;
    //console.log("lat: " +latitude + " long: "+longitude)
    
    const URL_WEATHER =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code,rain,snowfall,wind_speed_10m,relative_humidity_2m,cloud_cover,apparent_temperature&forecast_days=1`;
    getTemperature(URL_WEATHER);

    const URL_LOCATION = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    getArea(URL_LOCATION);
})

async function getTemperature(URL) {
    let response = await fetch(URL);
    const importData = await response.json();

    let cuurentTemp = importData.current.temperature_2m;
    let feelsLike = importData.current.apparent_temperature;
    let prep = importData.current.precipitation;
    let humidity = importData.current.relative_humidity_2m;
    let wind = importData.current.wind_speed_10m;
    let cloudCover = importData.current.cloud_cover;

    document.querySelector('#currentTemp').textContent=`${Math.round(cuurentTemp)}°`;
    document.querySelector('#feelsLike').textContent=`${Math.round(feelsLike)}°C`;
    document.querySelector('#precip').textContent=`${prep} mm`;
    document.querySelector('#humidity').textContent=`${humidity}%`;
    document.querySelector('#wind').textContent=`${wind} kph`;
    document.querySelector('#cloud').textContent=`${cloudCover}%`;
    
    displayPhoto(feelsLike,prep);
}

//const URL_LOCATION_TEMP = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=20.180657740304934&lon=85.94021264932897`;

async function getArea(URL) {
    let response = await fetch(URL);
    const importData = await response.json();
    //console.log(importData)

    let area = importData.address.county;
    let district= importData.address.state_district;

    document.querySelector('#location').textContent=`${area}, ${district}`;
}



function updateTime() {
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit'};
    const dayOptions = { weekday: 'long' };

    let timeValue= now.toLocaleTimeString('en-US', timeOptions);
    let dayValue= now.toLocaleDateString('en-US', dayOptions);
    document.getElementById('time').innerText = `${timeValue} ${dayValue}`;
}

setInterval(updateTime, 1000);

function displayPhoto(temp,prep){
    let backImg = document.querySelector('.weather-box');
    
    let date=new Date();
    let hour=date.getHours();

    if (hour >= 5 && hour <10) {
        if(prep > 5) backImg.style.backgroundImage = "url('img/day_rainy.jpg')";
        else {
            if(temp>= 18) backImg.style.backgroundImage = "url('img/morning_normal.jpg')";
            else backImg.style.backgroundImage = "url('img/winter_morning.jpg')";
        }
    }
    else if(hour >= 10 && hour <15) {
        if(prep>=5) backImg.style.backgroundImage = "url('img/day_rainy.jpg')";
        else{
            if(temp>= 37) backImg.style.backgroundImage = "url('img/day_hot_summer.jpg')";
            else if(temp>= 16) backImg.style.backgroundImage = "url('img/day_normal.jpg')";
            else backImg.style.backgroundImage = "url('img/day_winter.jpg')";
        }
    }
    else if(hour >= 15 && hour <18) {
        if(prep>=5) backImg.style.backgroundImage = "url('img/af_rainy.jpg')";
        else {
            if(temp>= 20) backImg.style.backgroundImage = "url('img/af_normal.jpg')";
            else backImg.style.backgroundImage = "url('img/af_winter.jpg')";
        }
    }
    else  {
        if(prep>=5) backImg.style.backgroundImage = "url('img/ni8_rainy.jpg')";
        else {
            if(temp >= 16) backImg.style.backgroundImage = "url('img/ni8_normal.jpg')";
            else backImg.style.backgroundImage = "url('img/ni8_winter.jpg')";
        }
    }
}