import apiManager from "./apiModule";

const uiController = () => {
    const locName = document.getElementById('location-name');
    const locTemp = document.getElementById('location-temp');
    const form = document.getElementById('loc-form');
    const error = document.getElementById('error');
    const inputs = document.querySelectorAll('input');


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
      
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const cityName = formData.get('cName');
        // form.reset();
        console.log(cityName);
        inputs.forEach(input => errorValidation(input));
        if (cityName) {
          console.log(`city name entered successfully ${cityName}`);
          fetchWeather(cityName);
        } else {
          console.log('Please enter a city name');
        }
      });

    const init = () => {

    }

    return {
        init
    }   
}

export default uiController;