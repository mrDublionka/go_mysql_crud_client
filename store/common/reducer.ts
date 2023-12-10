import * as actionTypes from './actions';

interface initialValues {
    commentText: string,
    show_add_post_form: boolean
}

const initialState: initialValues = {
    commentText: '',
    show_add_post_form: false
}

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.SET_COMMENT_TEXT:
            return {...state, commentText: action.payload};

        case actionTypes.SHOW_ADD_POST:
            return {...state, show_add_post_form: action.payload};
            
        default: return state 
    }
}

export default reducer