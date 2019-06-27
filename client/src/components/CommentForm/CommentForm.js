import React, {Component} from 'react';

import axios from 'axios';

import {
    Typography,
    Avatar,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    TextField,
    Button
 } from '@material-ui/core';
 import {
    ExpandMore,
    Delete,
    Create,
    Done
} from '@material-ui/icons';

class CommentForm extends Component {
    state = {
        comments: [],
        commentText: '',
        commentAnswerText:'',
        user: {},
        updateCommentTextField: 0,
        updateCommentText: ''
    };
    componentDidMount = () => {
        
        this.getComments(this.props.entity_type,this.props.entity_id)
    };
    getComments = (entity_type,entity_id) => {
        axios
        .get(`/api/comment/`, 
        {
            params: {
                entity_type,
                entity_id
            }
        })
        .then((res) => {
            this.setState({comments:res.data, user:this.props.user || {}})
        })
    }
    commentText (event) {
        this.setState({commentText:event.target.value})
    }
    updateCommentText (event) {
        this.setState({updateCommentText:event.target.value})
    }
    commentAnswerText (event) {
        this.setState({commentAnswerText:event.target.value})
    }
    addComment = () => {
        if(this.state.commentText){
        axios
        .post(`/api/comment/add`, 
        {
            entity_type:this.props.entity_type,
            entity_id:this.props.entity_id,
            text: this.state.commentText
        })
        .then(() => {
            this.getComments(this.props.entity_type,this.props.entity_id)
            this.setState({commentText:''})
        }).catch(err => {
            const errorText = err.response.data ? err.response.data.error.errors.text[0] : 'Something went wrong!'
            this.showToast(errorText,'error');
        }) 
        }else {
            this.showToast('The text must be at least 3 characters!','error');
        }
    }
    deleteComment = (_id, author_id) => {
        axios
        .delete(`/api/comment/delete`, { data: { _id, author_id } }
        )
        .then(() => {
            this.getComments(this.props.entity_type,this.props.entity_id)
        }).catch(err => {
            this.showToast('Something went wrong','error');
        })

    }
    addCommentAnswer = (_id) => {
        if(this.state.commentAnswerText){
        axios
        .post(`/api/comment/add/answer`, 
        {
            _id,
            text: this.state.commentAnswerText
        })
        .then(() => {
            this.getComments(this.props.entity_type,this.props.entity_id)
            this.setState({commentAnswerText:''})
        }).catch(err => {
            const errorText = err.response.data ? err.response.data.error.errors.text[0] : 'Something went wrong!'
            this.showToast(errorText,'error');
        }) 
        }else {
            this.showToast('The text must be at least 3 characters!','error');
        }
    }
    updateTextField = (_id) => {
        this.setState({updateCommentTextField: _id})
    }
    updateComment = (_id,author_id) => {
        if(this.state.updateCommentText){
            axios
            .put(`/api/comment/update`, 
            {
                _id,
                text: this.state.updateCommentText,
                author_id
            })
            .then(() => {
                this.getComments(this.props.entity_type,this.props.entity_id)
                this.setState({updateCommentTextField: 0, updateCommentText: ''})
            }).catch((err) => {
                const errorText = err.response.data ? err.response.data.error.errors.text[0] : 'Something went wrong!'
                this.showToast(errorText,'error');
            }) 
            }else {
                this.setState({updateCommentTextField: 0});
            }
    }
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
        });
    };
    render() {
        const {comments} = this.state;
        const renderComments = (
        comments.map(comment => {
            return (
            <ExpansionPanel
             key={comment._id ? comment._id : Math.floor(Math.random() * 60) + 1}
             className="commentForm">
                {this.state.user.id == comment.author_id ? 
                <div>
                { this.state.updateCommentTextField === 0 ?
                    <Button
                        className="editCommentBtn"
                        onClick={() => this.updateTextField(comment._id)}
                        >
                        <Create/>
                    </Button>
                    :
                    <div>
                        {comment._id === this.state.updateCommentTextField ? 
                        <Button
                            className="editCommentBtn saveCommentBtn"
                            onClick={() =>this.updateComment(comment._id, comment.author_id) }
                            >
                            <Done/>
                        </Button>
                        :
                        <Button
                            className="editCommentBtn"
                            onClick={() => this.updateTextField(comment._id)}
                            >
                            <Create/>
                        </Button>
                        }
                    </div>
                }
                    <Button
                        className="deleteCommentBtn "
                        onClick={() => this.deleteComment(comment._id, comment.author_id)}
                    >
                        <Delete/>
                    </Button>
                </div>
                    : null}
                <ExpansionPanelSummary 
                    className="event-page__faq-title" expandIcon={<ExpandMore />}  >
                    <Avatar alt="avatar" src={comment.avatar} className="avatar  event-page__avatar" />
                    <div className="commentField">
                    <TextField 
                        multiline={true}
                        disabled={comment._id === this.state.updateCommentTextField ? false : true} 
                        value={this.state.updateCommentText && comment._id === this.state.updateCommentTextField
                             ? this.state.updateCommentText: comment.text}
                        onChange={event => this.updateCommentText(event)}
                        fullWidth
                        onClick={clickEvt => {
                            if (this.state.updateCommentTextField) {
                                clickEvt.preventDefault();
                                clickEvt.stopPropagation();
                            }
                        }}
                    ></TextField>
                    </div>
                </ExpansionPanelSummary>
                {comment.child_comments.map(child_comment => {
                    return (
                    <ExpansionPanelDetails className="event-page__faq-answer"  key={comment._id}>
                    <Avatar alt="" src="https://material-ui.com/static/images/avatar/6.jpg" className="avatar  event-page__avatar" />
                        <Typography className="event-page__faq-text">
                            {child_comment.text}
                        </Typography>
                        
                    </ExpansionPanelDetails>    
                    )
                })}
                {this.props.user ? (
                <div className="footer_field">
                <TextField
                        className="add-event-text-field"
                        label="Add your answer"
                        name="comment"
                        multiline={true}
                        placeholder="Min 3 symbols, Max 100 symbols"
                        onChange={event => this.commentAnswerText(event)}
                        fullWidth
                        value={this.state.commentAnswerText}
                        autoComplete="off"
                        inputProps={{ maxLength: 200 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => this.addCommentAnswer(comment._id)}
                        className="add-event-button-create addAnswerBtn"
                        >
                        Add answer
                    </Button>
                </div>) : null
                }
            </ExpansionPanel>
            
            )
        })
        )
        
        return ( 
        <div className="commentWrapper">
            <Typography className="event-page__desktop-subtitle" variant="h5">
                Comments({comments.length ? comments.length : 0})
            </Typography>
            {comments.length ? renderComments : null}
            
            {this.props.user ? (
            <div>
                <TextField
                    className="add-event-text-field"
                    label="Add your comment"
                    name="comment"
                    placeholder="Min 3 symbols, Max 100 symbols"
                    onChange={event => this.commentText(event)}
                    fullWidth
                    value={this.state.commentText}
                    autoComplete="off"
                    inputProps={{ maxLength: 200 }}
                />
                <Button
                    variant="contained"
                    onClick={this.addComment}
                    className="add-event-button-create addCommentBtn"
                >
                    Add comment
                </Button>
            </div>
            ) : null
            }
        </div>
        )
};
};

export default CommentForm;
