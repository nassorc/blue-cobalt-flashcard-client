const API = "http://localhost:3001"
const config = {
  api: {
    user: {
      queryById: (id) => API + "/user/" + id,
      register: () => API + "/user",
      login: () => API + "/user/login",
    },
    deck: {
      getByUserId: (id) => API + "/deck/user/" + id ,
      getByDeckId: (id) => API + "/deck" + id,
      add: () => API + "/deck",
      update: (id) => API + "/deck/update/" + id,
      delete: (id) => API + "/deck/delete/" + id,
    },
    card: {
      grade: (id) => API + "/card/" + id + "/grade"
    }

  },
  storage: {

  }
}
export default config