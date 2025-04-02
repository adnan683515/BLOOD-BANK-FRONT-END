



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

            document.getElementById('table-conatiner').innerHTML = `
            
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
        document.getElementById('all-request-container').innerHTML = `
                    
                <div class="flex justify-end  ml-10 items-center w-[100%]">
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
                }, 5000);
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
                                <td>${element?.status ==='Accepted' ? `<span class="bg-green-500 text-black px-3 py-1 rounded-md" >Accepted</span> `: `<span class="bg-white px-3 py-1 rounded-md text-black" >Pending</span>` } </td>
                            
                                <td>
                                asdfasdfasdfadfs
                                </td>
                                <td>${element?.massage}  </td>
                                <td class="flex gap-1" >
                                <select class="select select-ghost">
                                    <option disabled selected>Pick a Action</option>
                                    
                                    <option>Cencel</option>
                                    <option>Accepted</option>
                                </select>

                                <span class="bg-white text-black px-3  rounded-md text-center flex justify-center items-center py-1"><div>save</div></span>
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