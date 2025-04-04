



// http://127.0.0.1:8000/requestOfuser/21/

async function loadAllRequest() {
    const donate_id = getLocalStorageItem('donate_id')
    if (!donate_id) {
        return
    }
    try {
        const allRequestFetch = await fetch(`https://blood-bank-backend-beta.vercel.app/requestOfuser/${donate_id}/`)
        const allData = await allRequestFetch.json()



        if (allData.length === 0) {

            document.getElementById('table-header').innerHTML = ""
            document.getElementById('table-conatiner').innerHTML = ""

            document.getElementById('loading-div').innerHTML = `
            
            <div class="flex justify-center items-center w-[100%]">
                <div class="">
                    <span class="loading loading-ring loading-xs"></span>
                    <span class="loading loading-ring loading-sm"></span>
                    <span class="loading loading-ring loading-md"></span>
                    <span class="loading loading-ring loading-lg"></span>
                    <span class="loading loading-ring loading-xl"></span>
                </div>
            
            </div>
`
            setTimeout(() => {
                document.getElementById('table-conatiner').innerHTML = ""
                document.getElementById('table-conatiner').innerHTML = `
                <div class="flex justify-center items-center" > 
                    

                        <div class="relative" >
                            <div class="absolute left-40   "><span>Request Not found</span></div>
                            <div><img class="w-96 rounded-full" src="./picture/notfound.png"></div>
                        </div>
                
                    
                </div>
                
                `

            }, 5000);

            return
        }
        document.getElementById('loading-div').innerHTML = `
                    
                <div class="flex justify-center  items-center w-[100%]">
                    <div id="loading-box" class="">
                        <span class="loading loading-ring loading-xs"></span>
                        <span class="loading loading-ring loading-sm"></span>
                        <span class="loading loading-ring loading-md"></span>
                        <span class="loading loading-ring loading-lg"></span>
                        <span class="loading loading-ring loading-xl"></span>
                    </div>
                
                </div>
        `

        async function displayLoading() {

            await new Promise((resolve) => {
                setTimeout(() => {
                    document.getElementById('loading-box').innerHTML = "";
                    resolve();
                }, 2000);
            });

            const parent = document.getElementById('all-request-container')
            allData.forEach(element => {

                async function LoadUserDAta(id) {

                    try {
                        const userinfo = await fetch(`https://blood-bank-backend-beta.vercel.app/DetailsUserView/${id}/`)
                        const informatonData = await userinfo.json()


                        const tr = document.createElement('tr')

                        tr.innerHTML = `
                
                
        
                        
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle h-12 w-12">
                                                <img src="${informatonData?.picture}"
                                                    alt="Avatar Tailwind CSS Component" />
                                        
                                            
                                            
                                                
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">${element?.user?.username}</div>
                                            <div class="text-sm text-white opacity-100">${element?.place}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-ghost badge-sm">B+ </span>
                                </td>
                                <td>${element?.status === 'Accepted' ? `<span class="bg-green-500 text-black px-3 py-1 rounded-md" >Accepted</span> ` : `<span class="bg-white px-3 py-1 rounded-md text-black" >Pending</span>`} </td>
                            
                                <td>
                                ${element?.mobile}
                                </td>
                                <td>${element?.massage}  </td>
                                <td class="flex gap-1">
                                <select id="selectStatus${element.id}" class="select select-ghost text-white">
                                    <option selected disabled>Pick a Action</option>
                                    <option class="text-black">pending</option>
                                    <option class="text-black" >Accepted</option>
                    
                                </select>
                                <span class="bg-white text-black px-3  rounded-md text-center flex justify-center items-center py-1"><div onclick="handleBloodReqStatus('${element.id}','${element?.user?.id}','${element?.DonateBlood?.id}','${element?.numberOfBag}','${element?.place}','${element?.mobile}','${element?.massage}','${element?.donateDate}')">save</div></span>
                                </td>

                    
                
                
                            `
                        parent.appendChild(tr)
                    }
                    catch {
                        console.log("all request. js LoaduserData problem")
                    }
                }
                LoadUserDAta(element?.user?.id)
                console.log(element)


            });

        }

        displayLoading();

    }
    catch {
        console.log('all_request.js file load all request load problem')
    }

}
loadAllRequest()



const handleBloodReqStatus = async (bloodReqId, userId,bloodId,beg,place,mobile,massage,donateDate) => {

    console.log(userId, bloodReqId)
    let status = document.getElementById(`selectStatus${bloodReqId}`).value
    if(status == 'Pick a Action'){
        alert("plase select a action")
        status=""
        return; 
    }
    console.log(status)
    const obj = {
        id: bloodReqId,
        numberOfBag: beg,
        donateDate: donateDate,
        place: place,
        mobile: mobile,
        status: status,
        massage: massage,
        user: userId,
        DonateBlood: bloodId
    }
    console.log(obj)
    try {

        const reqPromise = await fetch(`https://blood-bank-backend-beta.vercel.app/bloodReqAction/${bloodReqId}/?user=${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj)
        })
        if(reqPromise.ok){
            console.log("YESS UPDATe")
        }

    }
    catch {
        console.log("HandleBloodReqStatus problem")
    }
}