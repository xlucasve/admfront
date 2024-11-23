export const SET_LOADING_TRUE = "SET_LOADING_TRUE"
export const SET_LOADING_FALSE = "SET_LOADING_FALSE"

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"
export const SIDEBAR_SIZE = { OPEN: 215, CLOSE: 80, CLOSE_MOBILE: 0 }

export const LIST_PRIORITIES = ["Baja", "Normal", "Alta", "Urgente"]
export const LIST_STATUS = ["Abierto", "En Proceso", "Resuelto", "Cerrado"]

export const LIST_CATEGORIES = [
    "Técnicos",
    "Cobros/Pagos",
    "Servicio",
    "Mediaciones",
    "Información",
    "Perfil/Usuario",
    "Inmuebles",
    "Contrato",
    "Servicio de Mudanza",
    "Otros"
];

export const CASE_PATHS = { ALL_CLAIMS: "/all-claims", MY_CLAIMS: "/my-claims", 
    ALL_ARBITRATIONS: "/all-arbitrations", MY_ARBITRATIONS: "/my-arbitrations" }

export const CASE_TABS_MAP = {
    'claims': [
        { label: 'Mis Reclamos', value: CASE_PATHS.MY_CLAIMS },
        { label: 'Todos los Reclamos', value: CASE_PATHS.ALL_CLAIMS }
    ],
    'arbitrations': [
        { label: 'Mis Mediaciones', value: CASE_PATHS.MY_ARBITRATIONS },
        { label: 'Todas las Mediaciones', value: CASE_PATHS.ALL_ARBITRATIONS }
        
    ]
}


export const CASE_PATH_ORDER = {
    'my-claims': 0,
    'all-claims': 1,
    'my-arbitrations': 0,
    'all-arbitrations': 1,
}

export const MAP_CASE_TYPE = {
    'claims': 'Reclamo',
    'arbitrations': 'Mediacion'
}


export const MODALS_TYPES = { 
    OPERATOR_ACCEPT_CASE: "operator-accept-case", 
    EDIT_CASE: "edit-case", 
    DETAILS_CASE: "details-case",
    DELETE_USER: "delete-user",
    PUT_POST_USER: "put-post-user",
    CHAT: 'chat'
}



export const NEW_DEFAULT_USER = {
    fullName: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    localidad: '',
    position: '',
    department: '',
    accessRole: '',
}