
document.getElementById('donate-post-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    
    const center = getElementByIdOfValue('center')
    const birth = getElementByIdOfValue('birth')
    const bloodtype = getElementByIdOfValue('blood-type')
    const lastDonate = getElementByIdOfValue('last-Donate')
    const checkbox = document.getElementById('check')
    const address = getElementByIdOfValue('address')
    const zila = getElementByIdOfValue('zila')
    let ck = false
    if(checkbox.checked){
        ck=true

    }

    const obj = {

        user : localStorage.getItem('user'),
        bloodType:bloodtype,
        date_of_birth:birth,
        distics:zila,
        address:address,
        last_donation_date:lastDonate,
        eligibility:ck,
        donation_center:center
    }

    console.log(obj)

    console.log(center,birth,bloodtype,lastDonate,ck,address,zila)
})