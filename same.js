

function GetelementById(id){
    return document.getElementById(id)
}
function getElementByIdOfValue(id){
    return document.getElementById(id).value;
}
function getElementByIdOfInnerText(id){
    return document.getElementById(id).innerText;
}

function valueNone(id){
    document.getElementById(id).value=""
}
function SetInnerTExt(id,val){
    console.log(id,val)
    document.getElementById(id).innerText=`${val} Donar`
}

// async function FindOUtLen(val) {
    
//     const searchFetch = await fetch(`https://blood-bank-backend-beta.vercel.app/searchBlood/${val}/`)
//     const data = await searchFetch.json()
//     console.log(data)
// }

