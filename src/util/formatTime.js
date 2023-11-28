
// 處理時間用 moment
import moment from 'moment'

moment.locale("zh-tw")
const formatTime = {
    getTime: (date) => {
        return moment(date).format('YYYY/MM/DD, a  h:mm:ss');

    }


}

export default formatTime