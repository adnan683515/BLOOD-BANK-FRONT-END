

async function LoadAllDonation() {


    try {

        const donateFetch = await fetch('https://blood-bank-backend-beta.vercel.app/donation/')
        const data = await donateFetch.json()
        displayDonate(data)

    }
    catch {
        console.log('Home.js ar LoadAlldonation a error')
    }
}
LoadAllDonation()



let BPOSI = 0;
let BNEGi = 0;
let APOSI = 0;
let ANEGI = 0;
let ABPOSI = 0;
let ABNEGI = 0;
let OPOSI = 0;
let ONEGI = 0;
async function displayDonate(data) {

    const tkn = localStorage.getItem('Token')


    if (data.length === 0) {
        document.getElementById('card-container').classList.add('hidden')
        document.getElementById('loading').style.display = 'block'
        async function load() {
            await setTimeout(() => {
                document.getElementById('loading').style.display = 'none'
                document.getElementById('notDAtafound').classList.remove('hidden')
            }, 3000);
        }
        load()
        return;
    }
    try {

        document.getElementById('notDAtafound').classList.add('hidden')
        document.getElementById('loading').style.display = 'none'
        document.getElementById('card-container').classList.remove('hidden')
        document.getElementById('card-container').innerHTML = ""
        document.getElementById('loading').style.display = 'block'
        async function AgainLoad() {
            await setTimeout(() => {
                document.getElementById('loading').style.display = 'none'

            }, 2000);
        }
        AgainLoad()
        data.forEach(element => {

            if (element?.bloodType) {
                const blood = element?.bloodType;
                if (blood === 'A+') {
                    APOSI += 1;
                }
                else if (blood === 'AB+') {
                    ABPOSI += 1;
                }
                else if (blood === 'B+') {
                    BPOSI += 1;
                }
                else if (blood === 'B-') {
                    BNEGi += 1;
                }
                else if (blood === 'O+') {
                    OPOSI += 1;
                }
                else if (blood === 'O-') {
                    ONEGI += 1;
                }
                else if (blood === 'AB-') {
                    ABNEGI += 1;
                }
                else {
                    ANEGI += 1;
                }
            }
            async function userDetails() {

                try {

                    const user = await fetch(`https://blood-bank-backend-beta.vercel.app/DetailsUserView/${element?.user}/`)
                    const informaton = await user.json()
                    if (informaton !== undefined) {




                        const { picture, username, first_name, last_name, email, mobile, usertype } = informaton;


                        if (!username || !first_name) {
                            return
                        }
                        const parent = document.getElementById('card-container')
                        const div = document.createElement('div')
                        div.classList.add('col-span-1')
                        div.classList.add('p-2')
                        div.classList.add('rounded-md')
                        div.classList.add('transition', 'duration-300', 'ease-in-out', 'transform', 'hover:shadow-2xl', 'hover:scale-105')

                        div.innerHTML = `
                        
                            <div class="card rounded-md w-80    py-2">
                                        <div class="center">
                                            <div class="avatar tooltip" data-tip="${element?.bloodType} ${usertype}">
                                                <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                                    <img
                                                        src="${picture ? picture : "NO PHOTO"}" />
                                                </div>
                                            </div>
                                        </div>
            
            
                                        <div class="card-body ">
                                            <h2 class="card-title">
                                                Name: ${first_name} ${last_name}
            
                                            </h2>
                                            <div class="">
                                                <p class="poppins  w-full">Address: ${element?.address.slice(0, 25)}..</p>
                                            </div>
                                            <div class="">
                                                <p class="poppins  w-full">Mobile: ${mobile}</p>
                                            </div>
                                            <div class="">
                                                <p class="poppins  w-full">Interested : ${element?.eligibility ? `<span class="bg-green-400 px-5 py-1 rounded-sm ">Yes</span>` : `<span class="bg-red-500 px-5 py-1 rounded-sm ">NO</span>`}</p>
                                            </div>
                                            <div class="card-actions justify-between">
                                                
                                                <button onclick="details('${picture}','${first_name}','${last_name}','${email}','${element?.address}','${mobile}','${usertype}','${element?.last_donation_date}','${element?.donation_center}','${element?.distics}','${element?.eligibility}','${element?.date_of_birth}','${element?.bloodType}')" class="btn">Details</button>
                                                

                                                <div id="requestBtnToggle">

                                                    <button onclick="requestForm('${element.id}','${username}','${element?.bloodType}','${element?.eligibility}')" class="btn">Request</button>
                                                

                                                </div>
                                            </div>
                                        </div>
                                </div>
                        
                        
                        
                        `
                        if (element?.eligibility) {

                        }

                        parent.appendChild(div)

                    }

                }
                catch {
                    console.log("displaydonate innner function error")
                }
            }

            userDetails()



        });
        SetInnerTExt('BPOS', BPOSI)
        ValuSet('BPROG', BPOSI)

        SetInnerTExt('BNEG', BNEGi)
        ValuSet('BNEGPROG', BNEGi)

        SetInnerTExt('APOS', APOSI)
        ValuSet('AGPROG', APOSI)

        SetInnerTExt('ABPOS', ABPOSI)
        ValuSet('ABGPROG', ABPOSI)

        SetInnerTExt('ONEG', ONEGI)
        ValuSet('ONEGIPROG', ONEGI)

        SetInnerTExt('ABNEG', ABNEGI)
        ValuSet('ABNEGIPROG', ABNEGI)

        SetInnerTExt('ANEG', ANEGI)
        ValuSet('ANEGIPROG', ANEGI)

        SetInnerTExt('OPOS', OPOSI)




    }
    catch {
        console.log("displaydonate function a display korte problem hocce")
    }

}
function dontGiveBlood() {
    alert("Donor won't give blood now")
}

async function details(...data) {
    const [pic, first_name, last_name, email, address, mobile, usertype, last_donation_date, donation_center, distics, dibo, date_of_birth, bloodType] = data

    details_modal.showModal()

    const parent = document.getElementById('DonarDetails')
    parent.innerHTML = `
    
    <div class="card bg-base-100 w-fullshadow-sm">
                        <figure>
                            <img class=" w-full" src="${pic}"
                                alt="Shoes" />
                        </figure>
                        <div class="space-y-1 mt-2">
                            <h4 class="card-title font-bold poppins">Name:${first_name} ${last_name}</h4>
                            <div class="flex justify-between">
                                <p class="font-semibold text-xl">Blood: ${bloodType}</p>
                                <p>Last Donate: ${last_donation_date} </p>

                            </div>
                            <div class="flex justify-between">
                                <p class="font-semibold text-xl">Mobile: ${mobile}</p>
                                <p>User Type: ${usertype} </p>

                            </div>
                            <p class="my-2 poppins font-semibold">Address : ${address} </p>
                    
                        </div>
                        <div class="flex justify-between">
                            <p class="text-xl">Districs: ${distics}</p>
                            <p class="text-xl">Donation center: ${donation_center}</p>

                        </div>
                    </div>
    
    
    
    `
}

async function searchDontate() {

    const value = document.getElementById('searchBlood').value;
    document.getElementById('searchBlood').value = ""
    BPOSI = 0; BNEGi = 0;
    APOSI = 0;
    ANEGI = 0;
    ABPOSI = 0;
    ABNEGI = 0;
    OPOSI = 0;
    ONEGI = 0;

    try {
        const searchFetch = await fetch(`https://blood-bank-backend-beta.vercel.app/searchBlood/${value}/`)
        const data = await searchFetch.json()
        displayDonate(data)
    }
    catch {
        console.log("Search donate funciton errror")
    }


}



let donateid = null
let eligibility = null
async function requestForm(...rest) {

    const [id, name, blood, intrarested] = rest

    if (intrarested) {
        request.showModal()
        donateid = id
        eligibility = intrarested

        innerTextNone('req-username')
        innerTextNone('blood-req')
        SetInnerTExt('req-username', name)
        SetInnerTExt('blood-req', blood)

    }




}

async function requestFormSubmit(event) {
    event.preventDefault();

    const userid = localStorage.getItem('user')
    let quantity = parseInt(getElementByIdOfValue('quantity'))
    if (quantity <= 0) {
        alert("Please Type postivite value")
        return;
    }
    const obj = {
        user: userid,
        DonateBlood: donateid,
        numberOfBag: quantity,
        donateDate: getElementByIdOfValue('donate-date'),
        place: getElementByIdOfValue('place'),
        mobile: getElementByIdOfValue('mobile'),
        status: 'pending',
        massage: getElementByIdOfValue('condition')
    }


    try {

        const donateFetach = await fetch('https://blood-bank-backend-beta.vercel.app/bloodRequest/', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj)

        })
        const res = await donateFetach.json()

        if (donateFetach.status === 200) {

            SetInnerTExt('success', "Successfully Your Request Done Please waiting for approved!!")
            valueNone('quantity')
            valueNone('donate-date')
            valueNone('place')
            valueNone('mobile')
            valueNone('condition')
        }
    }
    catch {

        console.log("donate request submit from a post korte problemhocce")
    }

}

