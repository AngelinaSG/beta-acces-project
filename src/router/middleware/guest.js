export default function guest({ next, store }) {
    const auth = JSON.parse(localStorage.getItem("logged_in"))
    if (auth) {
        return next({
            name: 'home'
        })
    }
    return next()
}