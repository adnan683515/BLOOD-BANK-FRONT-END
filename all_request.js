



// http://127.0.0.1:8000/requestOfuser/21/

async function loadAllRequest() {
    const donate_id = getLocalStorageItem('donate_id')
    console.log(donate_id)
    if(!donate_id){
        return
    }
    try {
        const allRequestFetch = await fetch(`http://127.0.0.1:8000/requestOfuser/${donate_id}/`)
        const allData = await allRequestFetch.json()
        console.log(allData)
    }
    catch {
        console.log('all_request.js file load all request load problem')
    }

}
loadAllRequest()