import React from "react";
import Darth from "./darth.jpg"
import styles from "./home.css";
import api from './api';

const fetchPeople =() =>{
    const getPeopleUrl = id => `https://swapi.dev/api/people/${id}`

    const peoplePromises = [];

    for( let i = 1; i<=83; i++){
        peoplePromises.push(fetch(getPeopleUrl(i)).then(response => response.json()))
        
    }
    Promise.all(peoplePromises)
    .then(people =>{
        console.log(people)
    })
}

fetchPeople();
function Home() {
    return (

        <>
            <div className="barra">
                <img className="logo-image" src={Darth} />
                <h1 className="title">STAR WARS</h1>
            </div>
            <div className="bg">

                <div className="row">
                    <li className="card">
                        <div>
                            <h2 className="card-title">ola mundo</h2>
                            <p className="card-subtitle">ola </p>
                        </div>
                    </li>
                    <li className="card">
                        <div>
                            <h2 className="card-title">ola mundo</h2>
                            <p className="card-subtitle">ola </p>
                        </div>
                    </li>
                </div>
                <div className="row">
                    <li className="card">
                        <div>
                            <h2 className="card-title">ola mundo</h2>
                            <p className="card-subtitle">ola </p>
                        </div>
                    </li>
                    <li className="card">
                        <div>
                            <h2 className="card-title">ola mundo</h2>
                            <p className="card-subtitle">ola </p>
                        </div>
                    </li>
                </div>

            </div>
        </>
    )
}

export default Home