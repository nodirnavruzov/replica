import moment from 'moment'
export default {
  formatDate(time) {
    const formatedDate = moment(time).format('DD-MM-YYYY HH:mm')
    return formatedDate
  },
  originalDate(time) {
    const formatedDate = moment(time).format('DD-MM-YYYY HH:mm:ss')
    return formatedDate
  }
}
