import apiManager from "./apiModule";

const uiController = () => {
    const title = document.querySelector('.title-section');
    const form = document.getElementById('loc-form');
    const error = document.getElementById('error');
    const inputs = document.querySelectorAll('input');
    const locationName = document.createElement('h1');
    const locationDescription = document.createElement('p');
    const currentTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    const minTemp = document.createElement('p');
    const temperatureDiv = document.querySelector('.current-weather .temperature');
    const forecast = document.querySelector('.upcoming-weather .forecast');
    const precipitation = document.createElement('p');
    const humidity = document.createElement('p');
    
    const changeTempUnit = (temp) => {
      const tempInCelsius = Math.round((temp - 32) * 5/9);
      return tempInCelsius;
    }

    const extractDays = (day) => {
      const parsedDate  = Date.parse(day);
      const dateInstance = new Date(parsedDate);
      const dateNum = dateInstance.getDay();

      switch(dateNum) {
        case 0:
          return 'Sun';
        case 1:
          return 'Mon';
        case 2:
          return 'Tue';
        case 3:
          return 'Wed';
        case 4:
          return 'Thu';
        case 5:
          return 'Fri';
        case 6:
          return 'Sat';
        default:
          return '';  
      }
    }

    const extractImage = (conditions) => {
      console.log(conditions);

      if (conditions === 'Partially cloudy') {
        return 'partly_cloudy_day';
      } else if (conditions === 'Overcast') {
        return 'foggy';
      } else if (conditions === 'Rain, Partially cloudy') {
        return 'weather_mix';
      } else if (conditions === 'Rain, Overcast') {
        return 'rainy';
      } else if (conditions === 'Rain') {
        return 'rainy_heavy';
      } else if (conditions === 'Snow') {
        return 'snowing';
      } else if (conditions === 'Clear') {
        return 'clear_day';
      }
    }

    const renderDays = (days) => {
      forecast.innerHTML = '';

      days.forEach((day, index) => {
          if (index === 0) {
            return;
          } else if (index < 8) {
          console.log(index, day);
          // console.log(day.datetime);

          const weatherIcon = document.createElement('span');
          weatherIcon.classList.add('material-symbols-outlined');

          const dayDiv = document.createElement('div');
          const forecastTemp = document.createElement('p');
          const forecastTempInCelsius = changeTempUnit(day.temp);

          // const dayName = document.createElement('p');
          const extractedDay = extractDays(day.datetime);
          const extractedImage = extractImage(day.conditions);
          weatherIcon.textContent = extractedImage;
          forecastTemp.textContent = `${extractedDay}: ${forecastTempInCelsius}°C`;

          dayDiv.appendChild(forecastTemp);
          dayDiv.appendChild(weatherIcon);
          forecast.appendChild(dayDiv);
        }
      });
    }

    const render = (data) => {
      // console.log('data', data);
  
      locationName.id = 'location-name';
      locationName.textContent = data.location;
  
      locationDescription.id = 'location-description'
      locationDescription.textContent = `Description: ${data.description}`;

      title.appendChild(locationName);
      title.appendChild(locationDescription);
  
      temperatureDiv.innerHTML = '';
  
      currentTemp.id = 'location-temperature';
      const currentTempInCel = changeTempUnit(data.currentTemp);
      currentTemp.textContent = `Current Temp: ${currentTempInCel}°C`;
  
      maxTemp.id = 'max-temp';
      const maxTempInCel = changeTempUnit(data.maxTemp);
      maxTemp.textContent = `Max Temp: ${maxTempInCel}°C`;
  
      minTemp.id = 'min-temp';
      const minTempInCel = changeTempUnit(data.minTemp);
      minTemp.textContent = `Min Temp: ${minTempInCel}°C`;
  
      precipitation.textContent = `Precipitation: ${data.percipitation}%`;
      humidity.textContent = `Humidity ${data.humidity}%`;

      
      temperatureDiv.appendChild(currentTemp);
      temperatureDiv.appendChild(maxTemp);
      temperatureDiv.appendChild(minTemp);
      temperatureDiv.appendChild(precipitation);
      temperatureDiv.appendChild(humidity);
  
      // renders 7 days forecast
      renderDays(data.days);
  };
  

    const errorValidation = (inputName) => {
        if (inputName.value.length === 0) {
          console.log(`${inputName} is empty`);
          
          if (inputName.name === 'cName') {
            error.textContent = 'Please enter a valid city name';
            inputName.style.border = '1px solid';
            inputName.style.borderColor = 'red';
          }
        } else {
          if (inputName.name === 'cName') {
            error.textContent = '';
            inputName.style.borderColor = 'grey';
          }
        }
      }

      const addLocationListener = () => {
          form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const cityName = formData.get('cName');
            // form.reset();
            console.log(cityName);
            inputs.forEach(input => errorValidation(input));
            if (cityName) {
              console.log(`city name entered successfully ${cityName}`);
              apiManager().fetchWeather(cityName)
              .then(response => {
                render(response); 
            });
              
            } else {
              console.log('Please enter a city name');
            }
        });
      }

    const preview = () => {
      apiManager().fetchWeather('london')
      .then(response => {
        render(response);
      });
    }

    const init = () => {
        preview();
        addLocationListener();
    }

    return {
        init,
    }   
};

export default uiController;