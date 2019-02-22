const DataManager = {
    Get (dbString) {
        return fetch(`http://localhost:8088/${dbString}`)
            .then(res => res.json())
    },
    Post (dbString, obj) {
        return fetch(`http://localhost:8088/${dbString}`, {
            method: "POST",
            headers: {
                "content-type": "application/JSON"
            },
            body : JSON.stringify(obj)
        })
        .then(res => res.json())
    },
    Put (dbString, obj) {
        return fetch(`http://localhost:8088/${dbString}`, {
            method: "PUT",
            headers: {
                "content-type": "application/JSON"
            },
            body : JSON.stringify(obj)
        })
        .then(res => res.json())
    },
    Delete (dbString) {
        return fetch(`http://localhost:8088/${dbString}`,{
            method : "DELETE"
        })
        .then(res => res.json())
    }
}


export default DataManager