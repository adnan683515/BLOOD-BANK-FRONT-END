

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

function ValuSet(id,val){
    document.getElementById(id).value=val
}
function innerTextNone(id){
    document.getElementById(id).innerText=" "
}



