

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


async function displayDonate(data) {


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

        // document.getElementById('notDAtafound').classList.remove('hidden')
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


            console.log(element?.user, element)

            async function userDetails() {

                try {

                    const user = await fetch(`https://blood-bank-backend-beta.vercel.app/DetailsUserView/${element?.user}/`)
                    const informaton = await user.json()
                    if (informaton !== undefined) {

                        // console.log(informaton)


                        const { picture, username, first_name, last_name, email, mobile, usertype } = informaton;


                        if (!username || !first_name) {
                            return
                        }
                        const parent = document.getElementById('card-container')
                        const div = document.createElement('div')
                        div.classList.add('col-span-1')
                        div.classList.add('p-2')




                        div.innerHTML = `
                        
                            <div class="card  w-80   shadow-lg py-2">
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
                                            <div class="card-actions justify-center">
                                                
                                                <button onclick="details('${picture}','${first_name}','${last_name}','${email}','${element?.address}','${mobile}','${usertype}','${element?.last_donation_date}','${element?.donation_center}','${element?.distics}','${element?.eligibility}','${element?.date_of_birth}','${element?.bloodType}')" class="btn">Details</button>
                                                
                                            </div>
                                        </div>
                                </div>
                        
                        
                        
                        `
                        parent.appendChild(div)
                    }

                }
                catch {
                    console.log("displaydonate innner function error")
                }
            }

            userDetails()



        });
    }
    catch {
        console.log("displaydonate function a display korte problem hocce")
    }

}

async function details(...data) {
    const [pic, first_name, last_name, email, address, mobile, usertype, last_donation_date, donation_center, distics, dibo, date_of_birth, bloodType] = data
    console.log(pic, dibo)
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

    try {
        const searchFetch = await fetch(`https://blood-bank-backend-beta.vercel.app/searchBlood/${value}/`)
        const data = await searchFetch.json()
        displayDonate(data)
    }
    catch {
        console.log("Search donate funciton errror")
    }


}

