import React from "react";
import Weather from "./Weather";
import Input from "./Input";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  // constructor(props) {
  //   super(props);

  //   ((this.state = {
  //     location: "Lisbon",
  //     isLoading: false,
  //     displayLocation: "",
  //     weather: {},
  //   }),
  //     (this.fetchWeather = this.fetchWeather.bind(this)));
  // }

  // async fetchWeather() {
  fetchWeather = async () => {
    if (this.state.location.length < 2) return this.setState({ weather: {} });
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`,
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
      this.setState({ isLoading: false });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e) => this.setState({ location: e.target.value });

  // useEffect []
  componentDidMount() {
    // this.fetchWeather();
    this.setState({ location: localStorage.getItem("location") || "" });
  }

  // useEffect [location]

  componentDidUpdate(prevProps, PrevState) {
    if (this.state.location !== PrevState.location) {
      this.fetchWeather();
    }

    localStorage.setItem("location", this.state.location);
  }

  render() {
    console.log(this.state.weather);
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <Input
            location={this.state.location}
            onChangeLocation={this.setLocation}
          />

          {/* <button onClick={this.fetchWeather}>Search</button> */}
        </div>

        {this.state.isLoading && <p className="loader">Loding...</p>}

        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
