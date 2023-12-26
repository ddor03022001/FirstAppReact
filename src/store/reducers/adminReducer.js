import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyStateLoading = { ...state };
            copyStateLoading.isLoadingGender = true;
            return {
                ...copyStateLoading
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyStateGender = { ...state };
            copyStateGender.genders = action.data;
            copyStateGender.isLoadingGender = false;
            return {
                ...copyStateGender
            }

        case actionTypes.FETCH_GENDER_FAILED:
            let copyGender = { ...state };
            copyGender.isLoadingGender = false;
            copyGender.genders = [];
            return {
                ...copyGender
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = { ...state };
            copyStatePosition.positions = action.data;
            return {
                ...copyStatePosition
            }

        case actionTypes.FETCH_POSITION_FAILED:
            let copyPosition = { ...state };
            copyPosition.positions = [];
            return {
                ...copyPosition
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = { ...state };
            copyStateRole.roles = action.data;
            return {
                ...copyStateRole
            }

        case actionTypes.FETCH_ROLE_FAILED:
            let copyRole = { ...state };
            copyRole.roles = [];
            return {
                ...copyRole
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }


        default:
            return state;
    }
}

export default adminReducer;