const printToDOM = (Htmlstring, element) => {
    return document.querySelector(element).innerHTML += Htmlstring
}

export default printToDOM