export const INTERNAL_ROLES = {
  ADMIN: "admin",
  GERENTE: "ceo",
  SOPORTE: "soporte"
}

export const EXTERNAL_ROLES = {
  RECLAMANTE: "reclamante",
  ABOGADO: "legales",
}


export const VIEWS_PATH = {
    GET_DASHBOARD: "/",
    GET_MY_CLAIMS: "/my-claims",
    GET_ALL_CLAIMS: "/all-claims",
    GET_ALL_ARBITRATIONS: "/all-arbitrations", 
    GET_MY_ARBITRATIONS: "/my-arbitrations",
    GET_CHAT: "/chat",
    GET_ALL_USERS: "/access-control",
    GET_LOGS: "/logs",
    GET_USER_PROFILE: "/profile"
};


export const PATH_VIEWS = {
  [VIEWS_PATH.GET_DASHBOARD]: "GET_DASHBOARD",
  [VIEWS_PATH.GET_MY_CLAIMS]: "GET_MY_CLAIMS",
  [VIEWS_PATH.GET_ALL_CLAIMS]: "GET_ALL_CLAIMS",
  [VIEWS_PATH.GET_ALL_ARBITRATIONS]: "GET_ALL_ARBITRATIONS",
  [VIEWS_PATH.GET_MY_ARBITRATIONS]: "GET_MY_ARBITRATIONS",
  [VIEWS_PATH.GET_CHAT]: "GET_CHAT",
  [VIEWS_PATH.GET_ALL_USERS]: "GET_ALL_USERS",
  [VIEWS_PATH.GET_LOGS]: "GET_LOGS",
  [VIEWS_PATH.GET_USER_PROFILE]: "GET_USER_PROFILE"
}



