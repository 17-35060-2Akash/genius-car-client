export const setAuthToken = (user) => {

    const currentUser = {
        email: user.email
    }

    fetch('https://genius-car-server-xi.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //save to local storage
            localStorage.setItem('genius-token', data.token)


        })
}