import { connect } from "react-redux";
import axios from "axios";

import { LOAD_INDEX_POSTS } from "./actionTypes";
import { enqueueSnackbar } from "./toast";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

export const storeHomePagePosts = data => ({
    type: LOAD_INDEX_POSTS,
    payload: data
});

export const loadHomePagePosts = () => dispatch => {
    axios.get('/api')
        .then(res => {
            if (res && res.data) {
                dispatch(storeHomePagePosts(res.data));
            }
        })
        .catch(err => {
            dispatch(enqueueSnackbar({
                message: 'Could not load posts, please reload your page',
                options: {
                    variant: messageType.INFO,
                },
            }));
        });
    };