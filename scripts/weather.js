const weather = document.querySelector("#current-temp");
const image = document.querySelector("#weather-icon");
const caption = document.querySelector("figcaption");
const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.750709280821745&lon=6.638461628096233&units=metric&appid=6f01ef6e8c0efc3c775086f6fb50cde3";

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

            weather.textContent = data.main.temp;
            image.src = `https://openweathermap.org/img/wn/02n@2x.png`;
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


