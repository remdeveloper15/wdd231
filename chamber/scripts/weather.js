const temp = document.querySelector("#temp");
temp.style.fontWeight = "bold";
const state = document.querySelector("#state");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const hum = document.querySelector("#hum");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset")
const image = document.querySelector("#weather-icon");
const caption = document.querySelector("#fig");
const url = "https://api.openweathermap.org/data/2.5/weather?lat=-2.2268097624921386&lon=-80.86124186137998&units=metric&appid=6f01ef6e8c0efc3c775086f6fb50cde3";

const f1 = document.querySelector("#f1");
const f2 = document.querySelector("#f2");
const f3 = document.querySelector("#f3");
const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=-2.2268097624921386&lon=-80.86124186137998&units=metric&appid=6f01ef6e8c0efc3c775086f6fb50cde3";

async function apiForecast() {
    try {
        const response = await fetch(urlForecast);

        if (response.ok) {
            const data = await response.json();

            // Primeras 3 posiciones (próximas 3h, 6h y 9h)
            const next = data.list.slice(0, 3);

            // Accedemos al forecast individual
            const fNext3  = `Today: ${next[0].main.temp.toFixed(1)} °C`;
            const fNext6  = `Tomorrow: ${next[1].main.temp.toFixed(1)} °C`;
            const fNext9  = `In two days: ${next[2].main.temp.toFixed(1)} °C`;

            // Mostrar en los spans
            f1.textContent = fNext3;
            f2.textContent = fNext6;
            f3.textContent = fNext9;

        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Error en apiForecast", error);
    }
}

apiForecast();


function convertirUnixAHora(unix) {
    const fecha = new Date(unix * 1000); // convertir a milisegundos
    const horas = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
}


async function apiFecth() {
    try {
        // Make a request 
        const response = await fetch(url);
        //Verify if the response was ok
        if (response.ok) {
            //Convert the response un JSON
            const data = await response.json();
            //Display data in the console 
            console.log(data);

            temp.textContent = data.main.temp;
            high.textContent = `High: ${data.main.temp_max}`;
            low.textContent = `Low: ${data.main.temp_min}`;
            hum.textContent = `Humidity: ${data.main.humidity}`;
            sunrise.textContent = `Sunrise: ${convertirUnixAHora(data.sys.sunrise)}`;
            sunset.textContent = `Sunset: ${convertirUnixAHora(data.sys.sunset)}`;
            
            image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            caption.textContent = data.weather[0].description;
            
        //If response is not ok, error.
        } else {
            throw new Error(await response.text())
        }
    } catch (error) {
        //Managing of any try error 
        console.error("Error en apiFetch", error)
    }
}

apiFecth();
