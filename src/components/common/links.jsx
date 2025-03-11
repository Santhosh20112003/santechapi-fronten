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
  { name: "API Client", link: "https://santechapitool.vercel.app/" },
  { name: "Docs", link: "https://santech.gitbook.io/docs" },
];

export const adminusers = [
  "shanmugamsanthosh22@gmail.com",
  "santhoshtechnologies22@gmail.com",
  "prathikshapc.cse2021@dce.edu.in",
  "varikuntaspandana.cse2021@dce.edu.in"
]

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
      &nbsp &nbsp const apiKey = '{YOUR API KEY}'; // Replace with your actual API key<br/>
      &nbsp &nbsp const url = 'https://santechapi.vercel.app/weather/location/'+location;<br/>
      <br/>
      &nbsp &nbsptry {<br/>
      &nbsp &nbsp &nbsp &nbsp const response = await fetch(url, {<br/>
      &nbsp &nbsp &nbsp &nbsp  headers: {<br/>
      &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp    'token': apiKey<br/>
      &nbsp &nbsp &nbsp &nbsp  }<br/>
      &nbsp &nbsp &nbsp &nbsp});<br/>
<br/>
    &nbsp &nbsp  if(!response.ok) {<br/>
    &nbsp &nbsp &nbsp &nbsp throw new Error('HTTP error! status:' + response.status);<br/>
  &nbsp &nbsp }<br/>
<br/>
      &nbsp &nbsp  const weatherData = await response.json();<br/>
       &nbsp &nbsp console.log(weatherData);<br/>
      &nbsp &nbsp } catch (err) {<br/>
&nbsp &nbsp &nbsp &nbsp  displayError(err.message);<br/>
&nbsp &nbsp }<br/>
    }<br/>`
  },
  {
    lang: "React (JavaScript)",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/react.svg",
    code: `import React, { useState, useEffect } from 'react'; <br /> <br />
function App() { <br />
&nbsp &nbsp  const [weatherData, setWeatherData] = useState(null);<br />
&nbsp &nbsp  const [error, setError] = useState(null);<br />
<br />
&nbsp &nbsp  useEffect(() => {<br />
&nbsp &nbsp &nbsp &nbsp    const fetchWeather = async () => {<br />
&nbsp &nbsp &nbsp &nbsp    try {<br />
&nbsp &nbsp &nbsp &nbsp    const response = await fetch('https://santechapi.vercel.app/weather/location/chennai', {<br />
&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp headers: {<br />
&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 'token': '{YOUR API KEY}'<br />
      &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp }<br />
&nbsp &nbsp &nbsp &nbsp    });<br />
<br />
&nbsp &nbsp  if (!response.ok) {<br />
&nbsp &nbsp &nbsp &nbsp  throw new Error('HTTP error! status:' + response.status);<br />
&nbsp &nbsp  }<br />
<br />
&nbsp &nbsp &nbsp &nbsp const data = await response.json();<br />
&nbsp &nbsp &nbsp &nbsp setWeatherData(data);<br />
&nbsp &nbsp &nbsp &nbsp } catch (err) {<br />
&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp setError(err.message);<br />
&nbsp &nbsp &nbsp &nbsp }<br />
&nbsp &nbsp  };<br />
<br />
&nbsp &nbsp      fetchWeather();<br />
&nbsp &nbsp    }, []);<br />
<br />
  if (error) {<br />
&nbsp &nbsp      return <span>Error: {error}</span>;<br />
  }<br />

  if (!weatherData) {<br />
&nbsp &nbsp      return <span>Loading weather data...</span>;<br />
  }<br />
<br />
  return (<br />
    <span><br />
      <h1>Weather in {weatherData.location.name}</h1><br />
      <p>Temperature: {weatherData.current.temp_c}°C</p><br />
      <p>Condition: {weatherData.current.condition.text}</p><br />
      {/* Add more weather details here as needed */}<br />
    </span><br />
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
&nbsp &nbsp    selector: 'app-weather',<br />
&nbsp &nbsp    templateUrl: './weather.component.html',<br />
&nbsp &nbsp    styleUrls: ['./weather.component.css']<br />
})<br />
<br />
export class WeatherComponent {<br />
&nbsp &nbsp    weatherData: any;<br />
&nbsp &nbsp  error: string | null = null;<br />
<br />
&nbsp &nbsp    constructor(private http: HttpClient) { }<br />
<br />
&nbsp &nbsp    ngOnInit() {<br />
&nbsp &nbsp &nbsp &nbsp  this.getWeatherData('chennai');<br />
&nbsp &nbsp    }<br />
<br />
&nbsp &nbsp    getWeatherData(location: string) {<br />
&nbsp &nbsp  &nbsp &nbsp      this.http.get('https://santechapi.vercel.app/weather/location/' + location, {<br />
&nbsp &nbsp  &nbsp &nbsp        headers: { 'token': '{YOUR API KEY}' } // Replace with your actual API key<br />
&nbsp &nbsp  &nbsp &nbsp      }).subscribe(<br />
&nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp        (data: any) => {<br />
&nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp          this.weatherData = data;<br />
&nbsp &nbsp  &nbsp &nbsp        },<br />
&nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp        (error: any) => {<br />
&nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp          this.error = error.message;<br />
&nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp        }<br />
&nbsp &nbsp  &nbsp &nbsp      );<br />
&nbsp &nbsp    }<br />
}<br />`
  },
  {
    lang: "Postman Tool",
    img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/postman-icon.png",
    code: `curl -X GET \\
  "https://santechapi.vercel.app/weather/location/chennai" \\
  <br/>&nbsp &nbsp  -H "token: {YOUR API KEY}"`
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
<br />
app.get('/weather/:location', async (req, res) => {
  <br />
&nbsp &nbsp const location = req.params.location; <br />
&nbsp &nbsp  const api_key = '{YOUR API KEY}'; // Replace with your actual API key<br/>

&nbsp &nbsp  try {
    <br />
&nbsp &nbsp    const response = await axios.get('https://santechapi.vercel.app/weather/location/' + location, { <br />
&nbsp &nbsp      headers: { 'token': api_key } <br />
    }); <br />

&nbsp &nbsp res.json(response.data); <br />
&nbsp &nbsp } catch (error) {
  <br />
 &nbsp &nbsp res.status(500).json({ error: error.message }); <br />
&nbsp &nbsp } <br />
}); <br />
<br/>
app.listen(port, () => {
  <br />
 &nbsp &nbsp console.log('Server listening at http://localhost:' + port); <br />
}); <br />`
  },
  {
    lang: "PHP",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/php.svg",
    code: `
$api_key = '{YOUR API KEY}'; // Replace with your actual API key <br/>
$location = 'chennai';<br/>
$url = "https://santechapi.vercel.app/weather/location/".$location;<br/>
$ch = curl_init($url); <br />
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); <br />
curl_setopt($ch, CURLOPT_HTTPHEADER, array(<br />
  &nbsp &nbsp  'token: '.$api_key <br />
));<br/>
<br/>
$response = curl_exec($ch); <br />
curl_close($ch);<br/>
<br/>
if ($response !== false) {
  <br />
 &nbsp &nbsp $data = json_decode($response, true); <br />
 &nbsp &nbsp echo "Weather in ".$data['location']['name']. ":"; <br />
 &nbsp &nbsp echo "Temperature: ".$data['current']['temp_c']. "°C"; <br />
 &nbsp &nbsp echo "Condition: ".$data['current']['condition']['text']; <br />
} else {
  <br />
 &nbsp &nbsp echo "Error fetching weather data."; <br />
}<br/>
<br/>`
  },
  {
    lang: "Python",
    img: "https://res.cloudinary.com/hilnmyskv/image/upload/v1724919194/ui-library/icons/python.svg",
    code: `import requests<br />

api_key = '{YOUR API KEY}'  # Replace with your actual API key <br />
  location = 'chennai' <br />

    url = f'https://santechapi.vercel.app/weather/location/{location}' <br />

      headers = { 'token': api_key } <br />

response = requests.get(url, headers = headers) <br />

if response.status_code == 200: <br />
&nbsp &nbsp  data = response.json() <br />
&nbsp &nbsp  print(f"Weather in {data['location']['name']}:") <br />
&nbsp &nbsp  print(f"Temperature: {data['current']['temp_c']}°C") <br />
&nbsp &nbsp  print(f"Condition: {data['current']['condition']['text']}") <br />
else: <br />
&nbsp &nbsp print(f"Error: {response.text}") <br /> `
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
<br />
public class WeatherClient {<br />

&nbsp &nbsp  private static final String BASE_URL = "https://santechapi.vercel.app/"; <br />
&nbsp &nbsp  private static final String API_KEY = "{YOUR API KEY}"; // Replace with your actual API key<br/>
<br />
&nbsp &nbsp  private WeatherApi weatherApi; <br />
<br />
&nbsp &nbsp  public WeatherClient() {
  <br />
&nbsp &nbsp &nbsp &nbsp    Retrofit retrofit = new Retrofit.Builder() <br />
&nbsp &nbsp &nbsp &nbsp    .baseUrl(BASE_URL) <br />
&nbsp &nbsp &nbsp &nbsp    .addConverterFactory(GsonConverterFactory.create()) <br />
&nbsp &nbsp &nbsp &nbsp    .build(); <br />
&nbsp &nbsp &nbsp &nbsp  weatherApi = retrofit.create(WeatherApi.class); <br />
&nbsp &nbsp } <br />

&nbsp &nbsp  public Call < WeatherData > getWeather(String location) {
  <br />
 &nbsp &nbsp &nbsp &nbsp return weatherApi.getWeatherData(location); <br />
&nbsp &nbsp } <br />

&nbsp &nbsp public interface WeatherApi { <br/>
&nbsp &nbsp &nbsp &nbsp @GET("weather/location/{location}") <br />
&nbsp &nbsp &nbsp &nbsp Call < WeatherData > getWeatherData(@Path("location") String location, <br />
&nbsp &nbsp &nbsp &nbsp @Header("token") String token); <br />
&nbsp &nbsp }<br />

&nbsp &nbsp public static class WeatherData {<br />
&nbsp &nbsp &nbsp &nbsp // ... (Your weather data class structure as per the API response)<br/>
&nbsp &nbsp }<br />
}<br />
<br />
WeatherClient client = new WeatherClient(); <br />
Call < WeatherData > call = client.getWeather("chennai"); <br />
<br />
call.enqueue(new Callback < WeatherData > () {<br />
&nbsp &nbsp @Override <br />
&nbsp &nbsp public void onResponse(Call < WeatherData > call, Response < WeatherData > response) {<br />
&nbsp &nbsp if (response.isSuccessful()) {
  <br />
&nbsp &nbsp &nbsp &nbsp WeatherData weather = response.body(); <br />
&nbsp &nbsp &nbsp &nbsp System.out.println("Weather in " + weather.location.name + ": " + weather.current.temp_c + "°C"); <br />
&nbsp &nbsp } else {
  <br />
&nbsp &nbsp &nbsp &nbsp System.err.println("Error: " + response.errorBody()); <br />
&nbsp &nbsp} <br />
  }<br />
<br />
@Override<br />
public void onFailure(Call < WeatherData > call, Throwable t) {
  <br />
&nbsp &nbsp System.err.println("Error: " + t.getMessage()); <br />
} <br />
}); <br />`
  },
];

export const profilepic = () => {
  return "https://xsgames.co/randomusers/avatar.php?g=pixel";
};

export const API_KEY = "AIzaSyAx_yZDi3hpfPZKWSckZqKbJgYBge-6veI";

