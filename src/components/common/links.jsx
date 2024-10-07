export const baseUrl = "https://santechapi-backend.vercel.app";
export const links = [
  { name: "My Space", link: "apis", icon: "fas fa-grip text-xl" },
  { name: "Api Hub", link: "hubs", icon: "fas fa-igloo" },
  { name: "Idea Labs", link: "ideacenter", icon: "fas fa-lightbulb" },
  { name: "Profile", link: "profile", icon: "fas fa-address-card" },
];
export const secret = "sannisaprthisrilila";
export const main_links = [
  { name: "Home", link: "/home" },
  { name: "Api List", link: "/apilist" },
  { name: "Connect & cost", link: "/contact" },
  { name: "API tool", link: "https://santechapitool.vercel.app/" },
  {
    name: "Docs",
    link: "https://santech.gitbook.io/docs",
  },
];

export const random_profile_img =
  "https://source.unsplash.com/random/1000x800/?nature";
export const random_login_img =
  "https://source.unsplash.com/random/1000x800/?login";
export const random_register_img =
  "https://source.unsplash.com/random/1000x800/?signup";

export const apilist = [
  {
    name: "Ecommerce",
    short_desc: "An API for dummy ecommerce details",
    link: "https://santechapi.vercel.app/ecommerce",
    img: "https://source.unsplash.com/random/1000x600/?ecommerce",
  },
  {
    name: "Weather",
    short_desc: "An API for retrieving weather information",
    link: "https://santechapi.vercel.app/weather",
    img: "https://source.unsplash.com/random/1000x600/?weather",
  },
  {
    name: "Random User",
    short_desc:
      "An API to get information about a random fake user, including gender, name, email, address, etc.",
    link: "https://santechapi.vercel.app/randomuser",
    img: "https://source.unsplash.com/random/1000x600/?user",
  },
  {
    name: "News",
    short_desc: "An API for fetching the latest news articles",
    link: "https://santechapi.vercel.app/news",
    img: "https://source.unsplash.com/random/1000x600/?news",
  },
  {
    name: "Sports Player",
    short_desc: "An API for fetching sports player details",
    link: "https://santechapi.vercel.app/sports/player/dhoni",
    img: "https://source.unsplash.com/random/1000x600/?sports_player",
  },
  {
    name: "Stocks",
    short_desc: "An API for stock market data",
    link: "https://santechapi.vercel.app/stocks/company/symbol/TCS",
    img: "https://source.unsplash.com/random/1000x600/?stockmarket",
  },
  {
    name: "Quotes",
    short_desc: "An API for famous quotes",
    link: "https://santechapi.vercel.app/quotes",
    img: "https://source.unsplash.com/random/1000x600/?quotes",
  },
  {
    name: "University",
    short_desc: "An API to get a list of universities in a specified country",
    link: "https://santechapi.vercel.app/university/country/india",
    img: "https://source.unsplash.com/random/1000x600/?university",
  },
  {
    name: "Music",
    short_desc: "An API for retrieving music details",
    link: "https://santechapi.vercel.app/music",
    img: "https://source.unsplash.com/random/1000x600/?music",
  },
  {
    name: "Jokes",
    short_desc: "An API for fetching jokes.",
    link: "https://santechapi.vercel.app/jokes",
    img: "https://source.unsplash.com/random/1000x600/?jokes",
  },
  {
    name: "Dictionary",
    short_desc:
      "An API for fetching English word meaning, definitions, audio, etc.",
    link: "https://santechapi.vercel.app/dictionary",
    img: "https://source.unsplash.com/random/1000x600/?dictionary",
  },
  {
    name: "Currency",
    short_desc: "An API for converting currency to different country rates.",
    link: "https://santechapi.vercel.app/currency/inr/usd/200",
    img: "https://source.unsplash.com/random/1000x600/?currency",
  },
];

export const fontendlang = [
  {
    lang: "Vanilla JavaScript",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/javascript.svg",
    code: `async function fetchWeather(location) {<br/>
      const apiKey = '{YOUR API KEY}'; // Replace with your actual API key<br/>
      const url = 'https://santechapi.vercel.app/weather/location/'+location;<br/>
      <br/>
      try {<br/>
      const response = await fetch(url, {<br/>
        headers: {<br/>
          'token': apiKey<br/>
        }<br/>
      });<br/>
<br/>
      if(!response.ok) {<br/>
    throw new Error('HTTP error! status:' + response.status);<br/>
  }<br/>
<br/>
        const weatherData = await response.json();<br/>
        console.log(weatherData);<br/>
      } catch (err) {<br/>
  displayError(err.message);<br/>
}<br/>
    }<br/>`
  },
  {
    lang: "React (JavaScript)",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/react.svg",
    code: `import React, { useState, useEffect } from 'react'; <br />
function App() { <br />
  const [weatherData, setWeatherData] = useState(null);<br />
  const [error, setError] = useState(null);<br />

  useEffect(() => {<br />
    const fetchWeather = async () => {<br />
      try {<br />
        const response = await fetch('https://santechapi.vercel.app/weather/location/chennai', {<br />
          headers: {<br />
            'token': '{YOUR API KEY}'<br />
          }<br />
        });<br />

        if (!response.ok) {<br />
          throw new Error('HTTP error! status:' + response.status);<br />
        }<br />

        const data = await response.json();<br />
        setWeatherData(data);<br />
      } catch (err) {<br />
        setError(err.message);<br />
      }<br />
    };<br />
<br />
    fetchWeather();<br />
  }, []);<br />
<br />
  if (error) {<br />
    return <div>Error: {error}</div>;<br />
  }<br />

  if (!weatherData) {<br />
    return <div>Loading weather data...</div>;<br />
  }<br />
<br />
  return (<br />
    <div><br />
      <h1>Weather in {weatherData.location.name}</h1><br />
      <p>Temperature: {weatherData.current.temp_c}°C</p><br />
      <p>Condition: {weatherData.current.condition.text}</p><br />
      {/* Add more weather details here as needed */}<br />
    </div><br />
  );<br />
}<br />
<br />
export default App;<br />`
  },
  {
    lang: "Angular (TypeScript)",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/angular.svg",
    code: `import { Component } from '@angular/core';<br /> 
import { HttpClient } from '@angular/common/http';<br />
<br />
@Component({<br />
  selector: 'app-weather',<br />
  templateUrl: './weather.component.html',<br />
  styleUrls: ['./weather.component.css']<br />
})<br />
export class WeatherComponent {<br />
  weatherData: any;<br />
  error: string | null = null;<br />
<br />
  constructor(private http: HttpClient) { }<br />
<br />
  ngOnInit() {<br />
    this.getWeatherData('chennai');<br />
  }<br />
<br />
  getWeatherData(location: string) {<br />
    this.http.get('https://santechapi.vercel.app/weather/location/' + location, {<br />
      headers: { 'token': '{YOUR API KEY}' } // Replace with your actual API key<br />
    }).subscribe(<br />
      (data: any) => {<br />
        this.weatherData = data;<br />
      },<br />
      (error: any) => {<br />
        this.error = error.message;<br />
      }<br />
    );<br />
  }<br />
}<br />`
  },
  {
    lang: "Postman Tool",
    img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.png",
    code: `curl -X GET \\
  "https://santechapi.vercel.app/weather/location/chennai" \\
  <br/> -H "token: {YOUR API KEY}"`
  }
];

export const backendlang = [
  {
    lang: "Express JS",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/javascript.svg",
    code: `const express = require('express'); <br />
const axios = require('axios'); <br />

const app = express(); <br />
const port = 3000; <br />

app.get('/weather/:location', async (req, res) => {
  <br />
  const location = req.params.location; <br />
  const api_key = '{YOUR API KEY}'; // Replace with your actual API key<br/>

  try {
    <br />
    const response = await axios.get('https://santechapi.vercel.app/weather/location/' + location, {< br />
      headers: { 'token': api_key } < br />
    }); <br />

res.json(response.data); <br />
  } catch (error) {
  <br />
  res.status(500).json({ error: error.message }); <br />
} <br />
}); <br />

app.listen(port, () => {
  <br />
  console.log('Server listening at http://localhost:' + port); <br />
}); <br />`
  },
  {
    lang: "PHP",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/php.svg",
    code: `<? php < br />
<br />
$api_key = '{YOUR API KEY}'; // Replace with your actual API key<br/>
$location = 'chennai';<br/>
<br/>
$url = "https://santechapi.vercel.app/weather/location/".$location;<br/>
<br/>
$ch = curl_init($url); <br />
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); <br />
curl_setopt($ch, CURLOPT_HTTPHEADER, array(<br />
    'token: '.$api_key < br />
));<br/>
<br/>
$response = curl_exec($ch); <br />
curl_close($ch);<br/>
<br/>
if ($response !== false) {
  <br />
  $data = json_decode($response, true); <br />
  echo "Weather in ".$data['location']['name']. ":"; <br />
  echo "Temperature: ".$data['current']['temp_c']. "°C"; <br />
  echo "Condition: ".$data['current']['condition']['text']; <br />
} else {
  <br />
  echo "Error fetching weather data."; <br />
}<br/>
<br/>
  ?> <br />`
  },
  {
    lang: "Python",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/python.svg",
    code: `import requests<br />

api_key = '{YOUR API KEY}'  # Replace with your actual API key < br />
  location = 'chennai' < br />

    url = f'https://santechapi.vercel.app/weather/location/{location}' < br />

      headers = { 'token': api_key } <br />

response = requests.get(url, headers = headers) < br />

if response.status_code == 200: <br />
data = response.json() < br />
  print(f"Weather in {data['location']['name']}:") < br />
  print(f"Temperature: {data['current']['temp_c']}°C") < br />
  print(f"Condition: {data['current']['condition']['text']}") < br />
else: <br />
print(f"Error: {response.text}") < br /> `
  },
  {
    lang: "Java",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/java.svg",
    code: `import retrofit2.Call; <br />
import retrofit2.Retrofit; <br />
import retrofit2.converter.gson.GsonConverterFactory; <br />
import retrofit2.http.GET; <br />
import retrofit2.http.Header; <br />
import retrofit2.http.Path; <br />

public class WeatherClient {<br />

  private static final String BASE_URL = "https://santechapi.vercel.app/"; <br />
  private static final String API_KEY = "{YOUR API KEY}"; // Replace with your actual API key<br/>

  private WeatherApi weatherApi; <br />

  public WeatherClient() {
  <br />
    Retrofit retrofit = new Retrofit.Builder() < br />
        .baseUrl(BASE_URL) < br />
        .addConverterFactory(GsonConverterFactory.create()) < br />
        .build(); <br />
  weatherApi = retrofit.create(WeatherApi.class); <br />
} <br />

  public Call < WeatherData > getWeather(String location) {
  <br />
  return weatherApi.getWeatherData(location); <br />
} <br />

public interface WeatherApi { <br/>
@GET("weather/location/{location}") <br />
Call < WeatherData > getWeatherData(@Path("location") String location, <br />
                                     @Header("token") String token); <br />
  }<br />

public static class WeatherData {<br />
    // ... (Your weather data class structure as per the API response)<br/>
  }<br />
}<br />

WeatherClient client = new WeatherClient(); <br />
Call < WeatherData > call = client.getWeather("chennai"); <br />

call.enqueue(new Callback < WeatherData > () {< br />
  @Override < br />
  public void onResponse(Call < WeatherData > call, Response < WeatherData > response) {< br />
    if (response.isSuccessful()) {
  <br />
      WeatherData weather = response.body(); <br />
  System.out.println("Weather in " + weather.location.name + ": " + weather.current.temp_c + "°C"); <br />
} else {
  <br />
  System.err.println("Error: " + response.errorBody()); <br />
} <br />
  }<br />

@Override<br />
  public void onFailure(Call < WeatherData > call, Throwable t) {
  <br />
  System.err.println("Error: " + t.getMessage()); <br />
} <br />
}); <br />`
  },
];

export const profilepic = () => {
  return "https://xsgames.co/randomusers/avatar.php?g=pixel";
};

export const API_KEY = "AIzaSyAjCbmzp8uBeYSL8MKJBr8a2oypJFTXcSQ";

