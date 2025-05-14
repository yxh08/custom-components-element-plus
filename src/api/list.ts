import Axios from '@/utils/request'
export const list = (data : any) =>Axios.post('/serv/szkd/api_admin_classlist/classlistlist',data)