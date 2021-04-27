export default function auth({ next, store }) {
    const auth = JSON.parse(localStorage.getItem("logged_in"))
    if (!auth) {
        return next({
            name: 'auth'
        })
    }
    return next()
}