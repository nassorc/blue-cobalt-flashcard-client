const API = import.meta.env.VITE_SERVER_API_URL || "http://localhost:3001";
const config = {
  api: {
    baseUrl: API,
    user: {
      get: (id: string) => API + "/user/" + id,
      register: () => API + "/user",
      login: () => API + "/user/login",
      logout: () => API + "/user/logout",
      delete: (id: string) => API + "/user/" + id + "/delete",
      updateProfileImage: () => API + "/user/profile-image"
    },
    deck: {
      getByUserId: (id: string) => API + "/deck/user/" + id ,
      getByDeckId: (id: string) => API + "/deck" + id,
      add: () => API + "/deck",
      update: (id: string) => API + "/deck/update/" + id,
      delete: (id: string) => API + "/deck/delete/" + id,
    },
    card: {
      grade: (id: string) => API + "/card/" + id + "/grade"
    }

  },
  storage: {

  }
}
export default config