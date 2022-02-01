function weather() {
  document.querySelector('.busca').addEventListener('submit', e =>  {
    e.preventDefault();

    const input = e.target.querySelector('#searchInput').value;
    if (input !== '') {
      weatherSearch(input);

    } else {
      showWarning('Você precisa digitar uma localização...');
      document.querySelector('.resultado').style.display = 'none';
    }
  })

  async function weatherSearch(input) {
    clearInfo();
    showWarning('Carregando...');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=740f4fa3f614fb96dfe5acda6bbf524d&units=metric&lang=pt_br`;

    const results = await fetch(url);
    const json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: Math.round(json.main.temp),
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });

    } else {
      clearInfo();
      showWarning(`A localização digitada: "${input}". Não foi localizada...`);
    }
  }

  function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
  }

  function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
  }

  function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
  }
}
weather();