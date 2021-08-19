import axios from 'axios';

/**
* ACTION TYPES
*/

const SET_SINGLE_USER = 'SET_SINGLE_USER';
const EDIT_USER = 'EDIT_USER';

/**
* ACTION CREATORS
*/

const setSingleUser = (user) => ({
    type: SET_SINGLE_USER,
    user
});
  
const editUser = (user) => ({
    type: EDIT_USER,
    user
});

/**
* THUNK CREATORS
*/

export const fetchSingleUser = (id) => {
    return async (dispatch) => {
        try {
            const singleUser = (await axios.get(`/api/users/${id}`)).data;
            dispatch(setSingleUser(singleUser));
        }
        catch(err) {
            console.log(err)
        }
    }
};

export const updateUser = (user, history) => {
    return async (dispatch) => {
        const newUser = await axios.put(`/api/users/${user.id}`, user);
        dispatch(editUser(newUser.data));
        history.push(`/users/${user.id}`);
    };
};

/**
* REDUCER
*/

export default function(state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_USER: {
            return action.user;
        };
        case EDIT_USER: {
            return action.user;
        }
        default: {
            return state
        }
    }
};

