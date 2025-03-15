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

    document.querySelector('#currentTemp').textContent=`${Math.floor(cuurentTemp)}°`;
    document.querySelector('#feelsLike').textContent=`${Math.ceil(feelsLike)}°C`;
    document.querySelector('#precip').textContent=`${prep} mm`;
    document.querySelector('#humidity').textContent=`${humidity}%`;
    document.querySelector('#wind').textContent=`${wind} kph`;
    document.querySelector('#cloud').textContent=`${cloudCover}%`;
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
