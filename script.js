// apikey details 
const apikey = "4ed9ae89638a1e0aa080739ce1abe76c";

const url = (city)=>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

//Call  the api through user input

async function getWeatherByLocation(city){
    const resp = await fetch(url(city))
    const respData = await resp.json();
    console.log(respData);
    if(resp.status == 200){
        addWeatherToPage(respData);
    }
    else{
        document.getElementById('temp').innerHTML = `city not found`;
        document.getElementById('city').innerHTML =  null;
        document.getElementById('image').innerHTML = null;
        document.getElementById('description').innerHTML = null;
        document.getElementById('humidity').innerHTML = null;
        document.getElementById('visibility').innerHTML = null;
        document.getElementById('pressure').innerHTML = null;
        document.getElementById('wind').innerHTML = null;
    }
}

// information to be displayed in UI

function addWeatherToPage(data){
    document.getElementById('city').innerHTML = `${data.name} ${data.sys.country ? ', ' + data.sys.country : ''}`;
    document.getElementById('temp').innerHTML = `  ${data.main.temp}°C`;
    document.getElementById('image').innerHTML = 
    `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`
    document.getElementById('description').innerHTML = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById('visibility').innerHTML = `Visibility: ${data.visibility/1000} mi`;
    document.getElementById('pressure').innerHTML = `Pressure: ${data.main.pressure} mb`;
    document.getElementById('wind').innerHTML = `Wind speed: ${data.wind.speed} mph`;
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?" + ${data.name} + "')`;

}

//Calculate date and time 

const getDate=function() {
	const date = new Date();
    
    currentTime = date.getHours();

	let wish = '';

	if(currentTime >= 0 && currentTime <= 12) {
		wish = 'Good Morning!';
	} else if(currentTime >= 12 && currentTime <= 16) {
		wish = 'Good Afternoon!';
	} else {
		wish = 'Good Evening!';
	}
    document.getElementById('greet').innerHTML = wish;
	document.getElementById('date').innerHTML = date.toDateString();
	
};

// search by city name
document.getElementById('form')
.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const city = search.value;

    if(city){
        getWeatherByLocation(city);
    }
})

//default value of city
getWeatherByLocation('New Delhi');

// for date and time
getDate();



