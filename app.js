const formCountry = document.getElementById('formCountry');
const formCity = document.getElementById('formCity');
const form = document.getElementById('form');
const containerWeather = document.getElementById('root');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let city = formCity.value;
    let country = formCountry.value;
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    if (country === '' || city === '') {
        containerWeather.innerHTML = `
        <div class="container-weather">
            <p class="not-found">city not found</p>
        </div>  
        `
        warning.textContent = 'both fields are required';
        
    } else {

        form.classList.add('animacion');
        containerWeather.classList.add('animacion2');
        warning.textContent = '';

        fetch(url)
        .then( res => res.json())
        .then(res => {
            if (res.cod === '404') {
                containerWeather.innerHTML = `
                    <div class="container-weather">
                        <p class="not-found">City not found</p>
                    </div>  
                    `
            } else {
                console.log(res)
                containerWeather.innerHTML = `
                <div class="container-weather">
                    <h2 class="m-0 city">${res.name} ${res.sys.country}</h2>
                    <img src="https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" alt="icon">
                    <p class="c">${kelvinToCentigrade(res.main.temp)}</p> 
                    <p class="time">${res.weather[0].description}</p>
                </div>  
                 `
            }
        })
    }

    formCity.value = '';
    // formCountry.value = '';
})

const  kelvinToCentigrade =(temp) => {
    return parseInt(temp - 273.15) + '°C';
}

