
fetch('nav.html')
    .then((res) => res.text())
    .then((data) => {

        document.getElementById('navi').innerHTML = `${data}`
        const picture = localStorage.getItem('pic')
        const nav_img = document.getElementById('navigationimage')

        const navItemContainer = document.getElementById('navItemBox')
        const token = localStorage.getItem('Token')

        if (!token) {
            navItemContainer.innerHTML += `
                        <li id="signup"><a href="signup.html">signup</a></li>
                            <li id="login"><a href="login.html">login</a></li>
                            
            `
        }

        if (token) {
            navItemContainer.innerHTML += `
            <a class="cursor-pointer" href="profile.html" id="profileLi">Profile</a>
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

    try {

        const user_id = localStorage.getItem('user')
        const donateFetch = await fetch(`http://127.0.0.1:8000/doanteDetails/${user_id}/`)
        const data = await donateFetch.json()
        console.log(data)
        localStorage.setItem('donate_id',`${data.id}`)
        
    }
    catch {
        console.log("setDonateId function a problem")
    }

}

setDoanteId()