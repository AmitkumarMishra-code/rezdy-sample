const URL = `https://email-marketing-app.herokuapp.com`

export async function getList() {
    try {
        let response = await fetch(URL + '/rezdy-list')
        let data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            throw new Error(data.message)
        } else {
            return data.message
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export async function getProduct(id) {
    try {
        let response = await fetch(URL + '/rezdy-product/'+id)
        let data = await response.json()
        if (response.status !== 200) {
            throw new Error(data.message)
        } else {
            return data.message
        }
    } catch (error) {
        throw error
    }
}
