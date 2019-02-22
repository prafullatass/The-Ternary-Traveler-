import DataManager from "../utilities/dataManager";
import interestList from "./interestsList";
import interestForm from "./interestForm";
import validate from "../utilities/validation";

const $ = document.querySelector.bind(document)

const makeObject = () => {
    return {
        "placeId": $("#placeId").value,
        "name": $("#intName").value,
        "description": $("#intDesc").value
    }
}


const submitButtonStatus = () => {
    //submit button
    if ($("#AddNewInterest").textContent === "Submit") {
        let obj = makeObject()
        if (validate(obj.taskName, obj.completionDate)) {
            DataManager.Post("interests", makeObject()).then(interestList)
        }
    } else {
        //update -- after edit
        if ($("#AddNewInterest").textContent === "Update") {
            let obj = makeObject()
            obj.id = $("#AddNewInterest").classList.value
            DataManager.Put(`interests/${obj.id}`, obj)
                .then(interestList)
        }
        else {
            //adding new form
            $("#int_list").innerHTML = ""
            interestForm().then(() => {
                interestManager.Add()
            })
        }

    }
}

const interestManager = {
    clickEL() {
        $("#int_list").addEventListener("click",
            event => {
                if (event.target.id.startsWith("delete--"))
                    this.Delete(event.target.id.split("--")[1])
                else if (event.target.id.startsWith("edit--"))
                    this.Edit(event.target.id.split("--")[1])
            })
    },
    Add() {
        $("#AddNewInterest").addEventListener("click",
            () => {
                submitButtonStatus()
            })
    },
    Delete(id) {
        if (window.confirm("DELETE interest ?"))
            DataManager.Delete(`interests/${id}`).then(interestList)
    },
    Edit(id) {
        DataManager.Get(`interests/${id}`).then(
            (obj) => {
                $("#int_list").innerHTML = ""
                interestForm().then(() => {
                    $("#intName").value = obj.name
                    $("#intDesc").value = obj.description
                    $("#AddNewInterest").textContent = "Update"
                    $("#placeId").value = obj.placeId
                    $("#placeId").enabled = false
                    $("#AddNewInterest").classList = obj.id
                    this.Add()
                })

            }
        )
    }
}

export default interestManager