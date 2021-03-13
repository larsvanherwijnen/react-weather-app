import React from 'react';
import './App.css';
const api = {
    key: "d4a2867ffbc264f4e4b58f624c1dfb0d",
    base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
    return (
        <>
          <div className="app">
            <main>
                <div className="search-box">
                    <input type="text" className="search-bar" placeholder="Search your location......."/>
                </div>
            </main>
          </div>
        </>
    );
}

export default App;
