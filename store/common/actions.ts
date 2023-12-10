export const SET_COMMENT_TEXT = '@common/SET_COMMENT_TEXT';
export const SHOW_ADD_POST = '@common/SHOW_ADD_POST';



export function setCommentText(comment: string) {
    return {type: SET_COMMENT_TEXT, payload: comment}
}

export function showAddPost(show: boolean) {
    return {type: SHOW_ADD_POST, payload: show}
}