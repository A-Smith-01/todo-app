function updateStorage(state){
    localStorage.setItem("state", JSON.stringify(state))
}

function loadStorage(){
    const data = localStorage.getItem("state")
    return data ? JSON.parse(data) : null;
}

function clearStorage(){
    localStorage.clear()
}

export {updateStorage, loadStorage, clearStorage}