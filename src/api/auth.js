const API_URL = '/api/auth'

export default {
  login(context, name, pwd) {

    return context.$http.post(
      API_URL + '/login',
      {
        name,
        pwd
      },
      {
        emulateJSON: true
      }
    )
  }
}
