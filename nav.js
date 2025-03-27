
fetch('nav.html')
    .then((res) => res.text())
    .then((data) => {

        document.getElementById('navi').innerHTML = `${data}`
        const picture = localStorage.getItem('pic')
        const nav_img = document.getElementById('navigationimage')

        const navItemContainer = document.getElementById('navItemBox')
        const token = localStorage.getItem('Token')

        if (!token) {

            document.getElementById('sidebar').innerHTML += `
            <a href="login.html" class=""><img class="h-10  rounded-full w-auto"
                        src="picture/lgo.jpg" alt="Your Company"></a>
            
            `
            document.getElementById('cart-container').innerHTML += `
            
                    
                    <div class="card-actions">
                    <a href="login.html" > <button  class="px-2 py-2 text-white rounded-md   btn-block bg-red-700">View All Request</button> </a>
                    </div>
            `
            navItemContainer.innerHTML += `
                        <li id="signup"><a href="signup.html">signup</a></li>
                            <li id="login"><a href="login.html">login</a></li>
                            
            `
        }

        if (token) {
            document.getElementById('sidebar').innerHTML += `
            <a href="home.html" class=""><img class="h-10  rounded-full w-auto"
                        src="picture/lgo.jpg" alt="Your Company"></a>
            
            `
            document.getElementById('cart-container').innerHTML += `
                        <span class="text-lg font-bold">8 Request</span>
                                
                                <div class="card-actions">
                                    <button id="all-request-btn" class="px-2 py-2 text-white rounded-md   btn-block bg-red-700">View All Request</button>
                                </div>
            `

            navItemContainer.innerHTML += `
        
            <a class="cursor-pointer" id="logout">logout</a>
            <a class="cursor-pointer" href="donate.html" id="donate-post">Donate</a>
            
            `
        }
        document.getElementById('logout').classList.remove('hidden')
        const logout = document.getElementById('logout')
        logout.addEventListener('click', (event) => {
            localStorage.removeItem('Token')
            localStorage.removeItem('user')
            localStorage.removeItem('is_stuff')
            localStorage.removeItem('pic')
            localStorage.removeItem('Donate')
            localStorage.removeItem('donate_id')
            window.location.href = "login.html"

        })

        document.getElementById('all-request-btn').addEventListener('click', () => {
            window.location.href = "profile.html"
        })
        if (picture) {
            nav_img.src = ""
            nav_img.src = `${picture}`
        }


        // console.log(data)
        let admin = false;
        if (admin === true) {
            document.getElementById('desh').style.display = `block`
        }
        else {
            document.getElementById('desh').style.display = `none`
        }
    })




async function setDoanteId() {
    const user_id = localStorage.getItem('user')
    if (!user_id) {
        return;
    }

    try {


        const donateFetch = await fetch(`https://blood-bank-backend-beta.vercel.app/doanteDetails/${user_id}/`)
        const data = await donateFetch.json()
        if (data.done) {
            localStorage.setItem('Donate', 'Done')
        }
        localStorage.setItem('donate_id', `${data.id}`)

    }
    catch {
        console.log("setDonateId function a problem")
    }

}

setDoanteId()