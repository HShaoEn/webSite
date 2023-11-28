import axios from 'axios'

function upload(path, userForm) {
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    //console.log(params)
    return axios.post(path, params, {
        headers: {
            // 因為有檔案需要告訴後端 
            // 檔案可能有點大 所以後端要一部分一部分收
            "Content-Type": "mutipart/form-data"
        }

    }).then(res=>res.data)
    // 直接把res弄成data
}
export default upload