
async function submitBtnDisabled() {
    try {
        const auth_donate = localStorage.getItem('donate_id')
        console.log(auth_donate)
        if (auth_donate) {
            const btn = document.getElementById('donate-post-btn')
            btn.disabled = true
            btn.style.opacity = '0.2';
        }
        if (auth_donate === 'undefined') {
            const disBtn = document.getElementById('donate-post-btn')
            
            disBtn.disabled =false
            disBtn.style.opacity = '1.0'; 
            
        }
    }
    catch {
        console.log("doante.js a submitBtnDisaabled function")
    }

}

submitBtnDisabled()

document.getElementById('donateSuccess').innerText = ""

document.getElementById('donate-post-btn').addEventListener('click', (event) => {
    event.preventDefault();

    const center = getElementByIdOfValue('center')
    const birth = getElementByIdOfValue('birth')
    const bloodtype = getElementByIdOfValue('blood-type')
    const lastDonate = getElementByIdOfValue('last-Donate')
    const checkbox = document.getElementById('check')
    const address = getElementByIdOfValue('address')
    const zila = getElementByIdOfValue('zila')

    if (!center || !birth || !bloodtype || !address || !zila) {
        alert("please fill up all data!")
        return;
    }

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

    const token = localStorage.getItem('Token')
    console.log(token)

    async function donateBlood() {

        try {
            const donateFetch = await fetch('https://blood-bank-backend-beta.vercel.app/donation/', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(obj)
            })
            const res = donateFetch.json()
            console.log(res)
            console.log(donateFetch)
            if (donateFetch.status === 200) {
                document.getElementById('donateSuccess').innerText = `Your Donate successfully!`
                localStorage.setItem('Donate', 'Done')
            }

        }
        catch {

            console.log("donate blood donate.js file")
        }

    }

    donateBlood()
})



// http://127.0.0.1:8000/doanteDetails/11/


async function successfullyDonateCard(user) {

    const donate = localStorage.getItem('Donate')
    console.log(donate)
    if (donate !== 'Done') {
        document.getElementById('request-donte').classList.remove('hidden')
        return;
    }
    if (user) {


        try {
            const donateDetailsFetch = await fetch(`http://127.0.0.1:8000/doanteDetails/${user}/`)
            const data = await donateDetailsFetch.json()
            console.log(data)
            const parent = document.getElementById('card-of-donate')
            parent.innerHTML = `
                <div class="card w-96 bg-base-100 shadow-sm">
                    <div class="card-body">
                
                        <div class="flex justify-between">
                        <h2 class="text-3xl font-bold">Blood: ${data?.bloodType}</h2>
                        <span class="text-xl">Intarested: ${data?.eligibility ? `<span class="text-xl bg-green-400 text-white px-3 py-1 rounded-md">YES</span>` : `<span class="text-xl text-white bg-red-600 px-3 py-1 rounded-md">NO</span>`}</span>
                        </div>
                        <ul class="mt-6 flex flex-col gap-2 text-xs">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Last Donate :  ${data?.last_donation_date}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Date Of Birth: ${data?.date_of_birth}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Zila: ${data?.distics}</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Donation Center: ${data?.donation_center}</span>
                        </li>
                    
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span>Address: ${data?.address}</span>
                        </li>
                        
                        </ul>
                        <div onclick="UpdateDonate.showModal()" class="mt-6">
                        <button class="btn  btn-block">update</button>
                        </div>
                    </div>
                    </div>
                                
            
            
            `
        }
        catch {
            console.log('donate js successfully doante card error')
        }

    }
    else {
        console.log("You Have don't card")
    }
}

const user = localStorage.getItem('user')
if (user) {
    successfullyDonateCard(user)
}