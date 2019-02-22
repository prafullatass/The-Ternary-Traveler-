import DataManager from "../utilities/dataManager";
import printToDOM from "../utilities/printToDOM";


const placesList = () => {
    DataManager.Get("places")
        .then(
            placesArray => {
                placesArray.forEach(place => {
                    printToDOM(`${place.name} </br>`, "#places_list")
                });
            }

        )
}

export default placesList