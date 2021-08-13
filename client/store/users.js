import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS';

/**
 * ACTION CREATORS
 */
 const setUsers = users => ({type: SET_USERS, users})

 /**
 * THUNK CREATORS
 */
export const fetchUsers = () => {
    return async (dispatch) => {
        try {
          const users = (await axios.get('/api/users')).data;
          dispatch(setUsers(users));
        }
          catch(err) {
          console.log(err)
        }
    }
}

 /**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_USERS: {
      return action.users
    }
    default: {
      return state
    }
  }
}