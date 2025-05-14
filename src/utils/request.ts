import axios from 'axios'
const Axios =  axios.create({
    baseURL: 'http://192.168.0.50:9543',
    timeout: 5000,
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzNDk3NDJlZDFlYzM0ZGMyOTk5M2VmYzA3YmM5NWIyMiIsImp0aSI6ImZjZmI3ZTUwZjY0Yjc4MThjYjM0OWYzZWU1MWQ0MjEzZWExMWFmMTE3Mjg0MjA1NzlhYzZjYjdhYWNiYzdlODQ2YjhmZWE0NTNmMjdlODk3IiwiaWF0IjoxNzQ3MTg3ODQ2LCJuYmYiOjE3NDcxODc4NDYsImV4cCI6MTc0NzI3NDI0Niwic3ViIjoiYzI5ZTQzMjEtZTNlOS00YmU0LWJjYzItOGU3Nzc2OGVmZjZjIiwic2NvcGVzIjpbImJhc2ljIl19.XE7W3dklSnTtRtOAUC1LN8Czi5danpL8kIusUCju0VCinyiKD9Flqy5Muk9MMq01AUUSWUl_eKDg78t11dqG6LlmcS2uClVgMSxiaAiZZYmPGcluBzGUUUeDwnYZtFhkfSQO2h4AQsOjvPVsnZhm5XPkuKfF8oBroDxUW2gQoqBuSuzrKOw5v9a3JMLD_z3PcaypUhXSrp4oXpGI4I8lG79IlcbRFkTA1oDanee5imkLMIc0_KuYYdAQswqmkRfZsXyCzbamDhu7jRXdL1d3Y2cY9qPeB5QtFSUzFm7_8f7cAOlvrfEmWNwgjnI5z-wB3_S4ShY9axdyD0cnntZkuw'
    }
})

Axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default Axios
