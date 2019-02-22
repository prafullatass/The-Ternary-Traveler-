import DataManager from "../utilities/dataManager";
import printToDOM from "../utilities/printToDOM";

const interestForm = () => {
    return DataManager.Get("places")
        .then(places => {
            let html = `<label for="placeId"><strong>Select Location : </strong> </label>
            <select id="placeId"> `
            places.forEach(place => {
                html += `<option value = ${place.id}> ${place.name}</option>`
            });
            html += `</select> </br>
            <label for="intName"><strong> Name : </strong> </label>
            <input type="text" name="intName" id="intName"></input></br>
            <label for="intDesc"><strong> Description : </strong> </label>
            <textarea name="intDesc" id="intDesc" cols="30" rows="5"></textarea>
            `
            printToDOM(html,"#int_list")
         } )
}

export default interestForm