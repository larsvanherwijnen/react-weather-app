import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const api = {
    key: "d4a2867ffbc264f4e4b58f624c1dfb0d",
    base: "http://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
}

const currentTime = () => {
    let today = new Date(),
        time = today.getHours() + ':' + today.getMinutes();

    return `${time}`

}



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.state = {value:''}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        console.log(this.state.value)
    }

    fetchAPI = event => {
        if(event.key === 'Enter'){
            fetch(`${api.base}weather?q=${(this.state.value !== "") ? ( this.state.value) : ('amsterdam')}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        this.setState({
                            main: result.main,
                            city: result.name,
                            country: result.sys.country,
                            temp: result.main.temp,
                            weather: result.weather[0].main
                        });

                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    renderSwitch(weather) {
        switch(weather) {
            case 'Rain':
                return 'card card-rain';
            case 'Drizzle':
                return 'card card-rain';
            case 'Clouds':
                return 'card card-clouds';
            case 'Snow':
                return 'card card-snow';
            case 'Clear':
                return 'card card-default';
            case 'Fog':
                return 'card card-fog'
            default:
                return 'card card-unknown';
        }
    }



    render() {
        const data = this.state;
        return (
            <>
                <div className="container-fluid px-1 px-md-4 py-5 mx-auto">
                    <div className="row d-flex justify-content-center px-3">
                        <input type="email" className="form-control card-input" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Locatie bijv. Madrid"
                               name="location"
                               value={this.state.value}
                               onChange={this.handleChange}
                               onKeyPress={this.fetchAPI}

                        />
                    </div>
                    {(typeof data.main != "undefined") ? (
                        <div>
                            <div className="row d-flex justify-content-center px-3">
                                <div className={this.renderSwitch(data.weather)}>
                                    <h2 className="ml-auto mr-4 mt-3 mb-0">{data.city}</h2>
                                    <p className="ml-auto mr-4 mb-0 med-font">{data.weather}</p>
                                    <h1 className="ml-auto mr-4 large-font">{Math.round(data.temp)}°c</h1>
                                    <p className="time-font mb-0 ml-4 mt-auto">{currentTime()}
                                        <span className="sm-font">{currentTime() >= 12 ? 'pm' : 'am'}</span></p>
                                    <p className="ml-4 mb-4">{dateBuilder(new Date())}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="row d-flex justify-content-center px-3">
                                <div className={this.renderSwitch(data.weather)}>
                                    <h2 className="ml-auto mr-4 mt-3 mb-0">Geen locatie</h2>
                                    <p className="ml-auto mr-4 mb-0 med-font">-----</p>
                                    <h1 className="ml-auto mr-4 large-font">--°c</h1>
                                    <p className="time-font mb-0 ml-4 mt-auto">{currentTime()}<span className="sm-font">{currentTime() >= 12 ? 'am' : 'pm'}</span></p>
                                    <p className="ml-4 mb-4">{dateBuilder(new Date())}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}


export default App;
