import DataManager from "../utilities/dataManager";
import printToDOM from "../utilities/printToDOM";
import interestHtml from "./interestHtml";
import interestManager from "./interestManager";

const interestList = () => {
    document.querySelector("#int_list").innerHTML =""
    printToDOM("Interests - All", "#heading")
    DataManager.Get("interests?_expand=place")
        .then(
            interestArray => {
                interestArray.forEach(interest => {
                    printToDOM(interestHtml(interest), "#int_list")
                });
                //printToDOM(`<button id="AddNewInterest">Add New Interest</button>`, "#int_list")
                document.querySelector("AddNewInterest").textContent = "Add New Interest"
                interestManager.clickEL()
                interestManager.Add()
            }

        )
}

export default interestList