



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
        
        if(localStorage.getItem('Token')){
            document.getElementById('donate-form').classList.remove('hidden')
        }
        if (!localStorage.getItem('Token')) {
            document.getElementById('logout').classList.add('hidden')
        }
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





const logout = document.getElementById('logout')
console.log(logout)

// const logutfecth = await fetch('http://127.0.0.1:8000/logout/')
// const res = logutfecth.json()
// if (res) {
//     localStorage.removeItem('Token')
//     localStorage.removeItem('user')
//     localStorage.removeItem('is_stuff')
//     localStorage.removeItem('pic')
//     window.location.href = "login.html"
// }

// }


document.getElementById('donate-form').addEventListener('click',()=>{
    window.location.href="donate.html"
})