export default function (instance) {
    return {
        signIn() {
            return instance.get("./server/codes.json")
        }
    }
}