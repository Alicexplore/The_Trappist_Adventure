async function callSystemTrappist1 () {
    try {
        const response = await fetch(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=exoplaneteu_catalog-1%40datastro&q=&lang=fr&sort=updated&facet=discovered&facet=updated&facet=mass&facet=semi_major_axis&facet=eccentricity&facet=inclination&facet=detection_type&facet=molecules&facet=star_name&facet=ra&facet=dec&facet=star_distance&facet=star_metallicity&facet=star_mass&facet=star_radius&facet=star_age&facet=star_magnetic_field&facet=planet_status&refine.star_name=TRAPPIST-1&timezone=europe%2FParis`);
        let data = await response.json();
        let promise = data.records
        console.log("planet dans callSystemTrappist1", promise)
        return promise;
    }
    catch (error){
        console.log ("Message d'erreur: ", error.message);
    }
}
const planetInfos =
    callSystemTrappist1()
        .then((promise) => {
            let planets = [];
            for (let i in promise) {
                planets.push({   
                    name : promise[i].fields.name,
                    temps : promise[i].fields.temp_calculated,
                    periodDay : promise[i].fields.orbital_period

                })
            }
            return planets;
        })

let objectTest = [{
    name : "TRAPPIST-1 b",
    img : "img/1b.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
    {name : "TRAPPIST-1 g",
    img : "img/1g.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
    {name : "TRAPPIST-1 h",
    img : "img/1h.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
    {name : "TRAPPIST-1 f",
    img : "img/1f.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
    {name : "TRAPPIST-1 c",
    img : "img/1c.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
    {name : "TRAPPIST-1 d",
    img : "img/1d.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
    {name : "TRAPPIST-1 e",
    img : "img/1e.png",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
    },
]
    

addTextAndImgToPlanetInfo =
    planetInfos
    .then((planets)=>{
        let planetsImg = [];
        for (let i in planets) {
            for (let j in objectTest) {
                if(planets[i].name == objectTest[j].name) {
                    planetsImg.push(Object.assign(planets[i], objectTest[j]))
                }
            }
        }
        return planetsImg
    })

function showErrorMessage(){
    document.getElementById("Planet1.name").innerHTML = "Désolé, allez chercher dans une autre galaxie" 
} 

function writePlanet(id, name, img, text) {
    let planetId="Planet"+id
    document.getElementById(planetId+".name").innerHTML =name
    document.getElementById(planetId+".img").src =img
    document.getElementById(planetId+".text").innerHTML =text
    document.getElementById(planetId).style.backgroundColor="rgba(0, 0, 26, 0.800)"
}

function compareUserChoiceToApiInfo (tableau) {
    let userTemperature = document.getElementById("temp-select").value;
    let userPeriodDay = document.getElementById("periodDay-select").value; 
    console.log(tableau)
    for (let i in tableau) {
        if (userTemperature == 250 && userPeriodDay == 5) { // Froide Courte
            if (tableau[i].temps < 250 && tableau[i].periodDay < 5) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
            }
            else {
                showErrorMessage()
            }
        } 
        else if (userTemperature == 250 && userPeriodDay == 10) { // Froide Moyenne
            if (tableau[i].temps < 250 && tableau[i].periodDay > 4 && tableau[i].periodDay < 11) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
                console.log("froid moyenne", tableau[i])
            }
            // else {
            //     showErrorMessage()
            // }
        }
        else if (userTemperature == 250 && userPeriodDay == 15) { // Froide Longue (1 6)
            if (tableau[i].temps < 250 && tableau[i].periodDay > 10) {
                console.log("test froide longue", tableau[i], i)
                writePlanet(1, tableau[1].name, tableau[1].img, tableau[1].text)
                writePlanet(2, tableau[6].name, tableau[6].img, tableau[6].text)
                
            }
            // else {
            //     showErrorMessage()
            // }
        }
        else if (userTemperature == 288 && userPeriodDay == 5) { // Tempérée Courte
            if (tableau[i].temps > 250 && tableau[i].temps < 315 && tableau[i].periodDay < 5) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
                console.log(tableau[i])
            }
            // else {
            //     showErrorMessage()
            // }
        }
        else if (userTemperature == 288 && userPeriodDay == 10) { // Tempérée Moyenne
            if (tableau[i].temps > 250 && tableau[i].temps < 315 && tableau[i].periodDay > 5 && tableau[i].periodDay < 10) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
                console.log(tableau[i])
            }
            // else {
            //     showErrorMessage()
            // }
        }
        else if (userTemperature == 288 && userPeriodDay == 15) { // Tempérée Longue
            if (tableau[i].temps > 250 && tableau[i].temps < 315 && tableau[i].periodDay > 10) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
            }
            else {
                showErrorMessage()
            }
        }
        else if (userTemperature == 315 && userPeriodDay == 5) { // Chaude Courte 0 4
            if (tableau[i].temps > 314 && tableau[i].periodDay < 5) {
                console.log("test froide longue", tableau[i], i)
                writePlanet(1, tableau[0].name, tableau[0].img, tableau[0].text)
                writePlanet(2, tableau[4].name, tableau[4].img, tableau[4].text)
            }
            // else {
            //     showErrorMessage()
            // }
        }
        else if (userTemperature == 315 && userPeriodDay == 10) { // Chaude Moyenne
            if (tableau[i].temps > 314 && tableau[i].periodDay > 5 && tableau[i].periodDay < 10) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
            }
            else {
                showErrorMessage()
            }
        }         
        else if (userTemperature == 315 && userPeriodDay == 15) { // Chaude Longue
            if (tableau[i].temps > 314 && tableau[i].periodDay > 10) {
                writePlanet(1, tableau[i].name, tableau[i].img, tableau[i].text)
            }
            else {
                showErrorMessage()
            }
        }                
    }
}

function showPlanets () {
    addTextAndImgToPlanetInfo
    .then((planetsImg)=>{
        compareUserChoiceToApiInfo(planetsImg)
    })  
}   
