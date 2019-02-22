const interestHtml = (obj) => {
    return `<section class = "card">
    <div class = "placeName"><strong> Place : ${obj.place.name} </strong> </div>
    <div><strong>  Name : </strong> ${obj.name} </div>
    <div><strong>  Description : </strong> ${obj.description}</div>
    <button id = "edit--${obj.id}" type="submit">EDIT</button>
    <button id = "delete--${obj.id}" type="submit">DELETE</button>
    </section> <hr/>
    `
}

export default interestHtml