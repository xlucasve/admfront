
export const GRID_ACTIONS = {
    SET_ROWS: 'SET_ROWS',
    ADD_NEW_ROW: 'ADD_NEW_ROW',
    SAVE_ROW: 'SAVE_ROW',
    DELETE_ROW: 'DELETE_ROW',
    LOADING_SUCCESS: 'LOADING_SUCCESS',
    SHOW_SUCCESS: 'SHOW_SUCCESS',
    SET_PAGINATION_MODEL: 'SET_PAGINATION_MODEL'
}


export const initialState = {
    rows: [],
    editableRowId: null,
    isAddingNewRow: false,
    disableAddNewRow: false,
    isSavingSuccess: false,
    isLoadingSuccess: false,
    paginationModel: { page: 0, pageSize: 25 },
    totalUsers: 0
};


export const gridReducer = (state, action) => {

    switch (action.type) {
        case GRID_ACTIONS.SET_ROWS:
            return {
                ...state,
                rows: action.payload.foundUsersPaginated,
                totalUsers: action.payload.totalUsers
            };

        case GRID_ACTIONS.ADD_NEW_ROW:
            return {
                ...state,
                rows: [action.payload, ...state.rows],
                editableRowId: action.payload._id,
            };

        case GRID_ACTIONS.SAVE_ROW:
            return {
                ...state,
                rows: state.rows.map((row) => row._id === action.payload._id ? action.payload : row),
                editableRowId: action.payload._id,
            };

        case GRID_ACTIONS.DELETE_ROW:
            return {
                ...state,
                rows: state.rows.filter((row) => row._id !== action.payload),
                totalUsers: state.totalUsers - 1
            }

        case GRID_ACTIONS.LOADING_SUCCESS:
            return {
                ...state,
                isLoadingSuccess: true,
                isSavingSuccess: false
            };
        case GRID_ACTIONS.SHOW_SUCCESS:
            return {
                ...state,
                isLoadingSuccess: false,
                isSavingSuccess: true,
                editableRowId: null,
            }
        case GRID_ACTIONS.SET_PAGINATION_MODEL:
            return {
                ...state,
                paginationModel: action.payload
            };

        default:
            return state;
    }
};


// case 'SET_EDITABLE_ROW':
//     return {
//         ...state,
//         editableRowId: action.payload,
//         rowBackup: action.rowBackup || null,
//         disableAddNewRow: action.disableAddNewRow || false,
//         isSavingSuccess: false
//     };
// case 'CANCEL_OPERATION':
//     return {
//         ...state,
//         rows: state.isAddingNewRow
//             ? state.rows.filter(row => row._id !== state.editableRowId)
//             : state.rows.map(row => row._id === state.editableRowId ? state.rowBackup : row),
//         isAddingNewRow: false,
//         rowBackup: null,
//         // newRow: NEW_ROW_EMPLOYEE,
//         editableRowId: null,
//     };