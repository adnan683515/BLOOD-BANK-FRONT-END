
document.getElementById('donate-post-btn').addEventListener('click', (event) => {
    event.preventDefault();

    const center = getElementByIdOfValue('center')
    const birth = getElementByIdOfValue('birth')
    const bloodtype = getElementByIdOfValue('blood-type')
    const lastDonate = getElementByIdOfValue('last-Donate')
    const checkbox = document.getElementById('check')
    const address = getElementByIdOfValue('address')
    const zila = getElementByIdOfValue('zila')
    let ck = false
    if (checkbox.checked) {
        ck = true

    }

    const obj = {

        user: localStorage.getItem('user'),
        bloodType: bloodtype,
        date_of_birth: birth,
        distics: zila,
        address: address,
        last_donation_date: lastDonate,
        eligibility: ck,
        donation_center: center
    }

    valueNone('center')
    valueNone('address')

    console.log(obj)

    console.log(center, birth, bloodtype, lastDonate, ck, address, zila)


    async function donateBlood() {

        try {
            const donateFetch = await fetch('http://127.0.0.1:8000/donation/', {

                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj)

            })
            const res = donateFetch.json()
        
            console.log(res)
        }
        catch {
            console.log("donate blood donate.js file")
        }

    }

    donateBlood()
})