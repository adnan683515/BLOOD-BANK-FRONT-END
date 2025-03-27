



// http://127.0.0.1:8000/requestOfuser/21/

async function loadAllRequest() {
    const donate_id = getLocalStorageItem('donate_id')
    if (!donate_id) {
        return
    }
    try {
        const allRequestFetch = await fetch(`https://blood-bank-backend-beta.vercel.app/requestOfuser/${donate_id}/`)
        const allData = await allRequestFetch.json()





        const parent = document.getElementById('all-request-container')
        allData.forEach(element => {

            async function LoadUserDAta(id) {

                try {
                    const userinfo = await fetch(`https://blood-bank-backend-beta.vercel.app/DetailsUserView/${id}/`)
                    const informatonData = await userinfo.json()
                    

                    const tr = document.createElement('tr')

                    tr.innerHTML = `
            
            
    
                            <th>
                                <label>
                                    <input value="f" type="checkbox" class="checkbox" />
                                </label>
                            </th>
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
                                        <div class="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button class="btn btn-ghost btn-xs">details</button>
                            </th>
                
            
            
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
    catch {
        console.log('all_request.js file load all request load problem')
    }

}
loadAllRequest()