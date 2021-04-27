export default {
    install(Vue, options) {
        Vue.prototype.$message = function (html) {
            M.toast({ html, classes: 'pink darken-1 rounded' })
        }
    }
}