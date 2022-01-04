import React from "react";
import styles from "./home.css";
import api from './api';

function Home() {


    const fetchPeople = () => {
        const getPeopleUrl = id => `https://swapi.dev/api/people/${id}`

        const peoplePromises = [];

        for (let i = 1; i <= 83; i++) {
            peoplePromises.push(fetch(getPeopleUrl(i)).then(response => response.json()))

        }
        Promise.all(peoplePromises)
            .then(peoples => {
                const lisPeople = peoples.reduce((accumulator, people) => {
                    accumulator += `
            <li class="card">
            <div>
                <h1 class="card-title">${people.name}</h1>
                <p class="card-subtitle">Peso: ${people.mass}Kg</p>
                <p class="card-subtitle">Cor do Cabelo: ${people.hair_color}</p>
                <p class="card-subtitle">Cor dos Olhos: ${people.skin_color}</p>
                <p class="card-subtitle">Genero: ${people.gender}</p>

                </div>
            </li>`
                    return accumulator
                }, '')

                const ul = document.querySelector('[data-js="starwars"]')

                ul.innerHTML = lisPeople;
            })
    }

    fetchPeople(); return (

        <>
            <div className="bg-home">
            <h1 className="title">STAR WARS</h1>
                <div className="row">
                    <ul data-js="starwars" className="starwars"></ul>
                </div>
            </div>
        </>
    )
}

export default Home