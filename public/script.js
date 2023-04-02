const form = document.getElementById('city-form');
const input = document.getElementById('city-input');
const container = document.getElementById('weather-container');

// Compile the Mustache template
const template = document.getElementById('weather-template').innerHTML;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const apiKey = 'ba96297d5a6ec8f1c2cd39ae67b2bc99';
  const city = input.value;

  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = {
        city: data.location.name,
        description: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        windSpeed: data.current.wind_speed,
        windDirection: data.current.wind_dir,
        icon: data.current.weather_icons[0],
      };

      // Render the Mustache template with the weather data
      const rendered = Mustache.render(template, weather);

      // Update the page with the rendered HTML
      container.innerHTML = rendered;
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = '<p>Error fetching weather data</p>';
    });
});
