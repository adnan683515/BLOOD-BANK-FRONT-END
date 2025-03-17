document.getElementById('login').addEventListener('click',()=>{
    window.location.href="login.html"
})


async function signupform(event) {
    event.preventDefault();


    const form = document.getElementById('signupform');
    const formdata = new FormData(form); // This grabs all form data, including the file input

    const imageInput = document.getElementById('registration-image').files[0]
    formdata.append('image', imageInput)
    console.log('image')


    // console.log(formdata)
    async function createImage() {
        const imagFetch = await fetch('https://api.imgbb.com/1/upload?key=ed19771b92bb9de8daa6acda58abe8e2', {
            method: "POST",
            body: formdata,
        })
        const url = await imagFetch.json()
        const FinalImageUrl = url?.data?.url;


        if (!FinalImageUrl) {
            alert("tmr img kaj kortese na")
            return;
        }

        // Log the entire FormData object for debug purposes
        let obj = {}
        for (let [key, value] of formdata.entries()) {
            obj[key] = value
        }


        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = regex.test(obj.email);

        if (!result) {
            alert("please give me a valid email!")
            return;
        }



        const registerObject = {
            username: obj.username,
            email: obj.email,
            first_name: obj.first_name,
            last_name: obj.last_name,
            mobile: obj.mobile,
            picture: FinalImageUrl,
            usertype: obj.usertype,
            password: obj.pass1,
            confirm_password: obj.pass2
        }



        console.log(registerObject)

        // curl https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload -X POST --data 'file=<FILE>&timestamp=<TIMESTAMP>&api_key=<API_KEY>&signature=<SIGNATURE>'



        if (registerObject.usertype == undefined) {
            registerObject.usertype = "Patiant"
        }
        try {
            const userFetch = await fetch('https://blood-bank-backend-beta.vercel.app/userdetails/')
            const data = await userFetch.json()
            const found = data.find(item => item.username === registerObject.username || item.email === registerObject.email);
            if (found) {
                const errorTag = document.getElementById('error-text');
                errorTag.classList.remove('hidden')
                errorTag.innerText = "username or email already exits!"
                return;
            }
        }
        catch {
            alert("user details nite problem hoitese")
        }
        if (registerObject.password !== registerObject.confirm_password) {
            const errorTag = document.getElementById('error-text');
            errorTag.classList.remove('hidden')
            errorTag.innerText = "Password Doesn't Match!"
            return;
        }
        try {
            const FH = await fetch('https://blood-bank-backend-beta.vercel.app/register/', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(registerObject)
            })


            const success = await FH.json()
            const errorTag = document.getElementById('error-text');
            errorTag.classList.remove('hidden')
            errorTag.classList.remove('text-red-400')
            errorTag.classList.add('text-green-500')
            errorTag.innerText = "Registration Success fully!"




        }
        catch {
            alert("Registertion invalid")
        }
    }
    createImage()


}
async function loginForm(event) {
    event.preventDefault();


    const usertype = getElementByIdOfValue('pick-your-type')
    const pass = getElementByIdOfValue('pass')
    const username = getElementByIdOfValue('user')

    if (usertype === 'Pick your user type') {
        alert("Please Select Your UserType")
        return;
    }

    const obj = {
        username: username,
        password: pass
    }
    try {

        const loginFecth = await fetch('https://blood-bank-backend-beta.vercel.app/login/', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj)
        })

        const data = await loginFecth.json()

        if (data.token && data.user) {
            localStorage.setItem('Token', data.token)
            localStorage.setItem('user', data.user)
            localStorage.setItem('is_stuff', data.is_stuff)
            localStorage.setItem('pic', data.pic)
            window.location.href = "home.html"
        }
        else {
            window.location.href = "index.html"
        }


    }
    catch {
        alert("login validation eror")
    }


}


