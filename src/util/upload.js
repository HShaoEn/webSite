import axios from 'axios'

function upload(path, userForm) {
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    //console.log(params)
    return axios.post(path, params, {
        headers: {
            // �]�����ɮ׻ݭn�i�D��� 
            // �ɮץi�঳�I�j �ҥH��ݭn�@�����@������
            "Content-Type": "mutipart/form-data"
        }

    }).then(res=>res.data)
    // ������res�˦�data
}
export default upload