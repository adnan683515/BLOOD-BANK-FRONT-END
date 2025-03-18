



fetch('nav.html')
    .then((res) => res.text())
    .then((data) => {

        document.getElementById('navi').innerHTML = `${data}`
        const picture = localStorage.getItem('pic')
        const nav_img = document.getElementById('navigationimage')


        document.getElementById('logout').classList.remove('hidden')

        const logout = document.getElementById('logout')
        logout.addEventListener('click', (event) => {
            localStorage.removeItem('Token')
            localStorage.removeItem('user')
            localStorage.removeItem('is_stuff')
            localStorage.removeItem('pic')
            window.location.href = "login.html"

        })

        // if (localStorage.getItem('Token')) {
        //     document.getElementById('sidebar').innerHTML += ` <button id="toggleSidebar" class="p-2 bg-white text-blue-500 font-semibold rounded">
        //     Open Sidebar
        // </button>`
        // }

        if (localStorage.getItem('Token') && localStorage.getItem('user')) {
            document.getElementById('signup').classList.add('hidden')
            document.getElementById('login').classList.add('hidden')

        }


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






document.getElementById('donate-form').addEventListener('click', () => {
    window.location.href = "donate.html"
})