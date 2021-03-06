import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Markup } from 'interweave';

import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Link,
  Fab,
  Collapse
} from '@material-ui/core';
import { ExpandMore, WhereToVote, Edit } from '@material-ui/icons';

import defaultAvatar from '../../assets/images/face.png';

const _maxAllowedPostChars = 500;

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });

    if (this.props.data.clickBtnCallBack) this.props.data.clickBtnCallBack();
  };
  definePostShouldBeCut = () => {
    const html = this.props.data.text;
    return html.length >= _maxAllowedPostChars;
  };
  definePostCanBeEdited = () => {
    try {
      return this.props.currentUser === this.props.data.authorId;
    } catch (err) {
      return false;
    }
  };
  render = () => (
    <Card className={
      this.definePostShouldBeCut()
        ? this.props.data.isPinned ?
        this.definePostCanBeEdited()
          ? 'postcard  postcard_pinned  postcard_edit'
          : 'postcard  postcard_pinned'
        : this.definePostCanBeEdited()
          ? 'postcard  postcard_edit'
          : 'postcard'
        : this.props.data.isPinned
        ? this.definePostCanBeEdited()
          ? 'postcard  postcard_pinned  postcard_no-margin-bottom  postcard_edit'
          : 'postcard  postcard_pinned  postcard_no-margin-bottom'
        : this.definePostCanBeEdited()
          ? 'postcard  postcard_no-margin-bottom  postcard_edit'
          : 'postcard  postcard_no-margin-bottom'
    }>
      <Link data-wrapper-link>
        <CardHeader
          className="postcard__header"
          title={this.props.data.title}
          subheader={
            <div className="postcard__header-info">
              <div className="postcard__header-pin-wrapper">
                <WhereToVote className="postcard__header-pin"/>
                <span>pinned</span>
              </div>
              <div className="postcard__avatar-wrapper">
                <Avatar
                  className="postcard__avatar"
                  src={
                    this.props.data.author_details &&
                    this.props.data.author_details.avatar
                      ? this.props.data.author_details.avatar
                      : defaultAvatar
                  }
                >
                </Avatar>
                <span>{`${
                  this.props.data.author_details &&
                  this.props.data.author_details.firstName
                    ? this.props.data.author_details.firstName
                    : 'Shy'
                  } ${
                  this.props.data.author_details &&
                  this.props.data.author_details.lastName
                    ? this.props.data.author_details.lastName
                    : 'Unicorn'
                  }`}</span>
              </div>
            </div>
          }
        >
        </CardHeader>
      </Link>
      <RouterLink
        className="postcard__edit-ico"
        to={{
          pathname: `/room/${this.props.roomId}/new-post`,
          state: {
            data: this.props.data
          }
        }}
      >
        <Edit/>
        <span className="postcard__edit-ico-text">Edit</span>
      </RouterLink>
      {/* @temp We may need it to add covers done by Igor */}
      {/* <CardMedia
            className="postcard__img-wrapper"
            image={this.props.cover}
        >
            <div className="postcard__label">
                <Loyalty />
                <b>{this.props.category}</b>
            </div>
        </CardMedia> */}
      <CardContent className=
                     {
                       this.definePostShouldBeCut()
                         ? this.state.expanded
                         ? 'postcard__description  postcard__description_cut_expanded'
                         : 'postcard__description  postcard__description_cut'
                         : 'postcard__description'
                     }
      >
        <Markup
          allowList={['oembed']}
          allowElements={true}
          content={this.props.data.text}
        />
      </CardContent>
      <CardActions
        disableActionSpacing
        className="postcard__read-more"
      >
        <Fab
          className={this.state.expanded ? 'postcard__expand-btn  postcard__expand-btn_expanded' : 'postcard__expand-btn'}
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Extend"

          onClick={this.handleExpandClick}
        >
          <ExpandMore/>
          {this.state.expanded ? 'Read less' : 'Read more'}
        </Fab>
      </CardActions>
      <Collapse
        className="postcard__collpse-content"
        in={window.innerWidth >= 768 ? true : this.state.expanded}
        timeout="auto"
        unmountOnExit
      >
      </Collapse>
    </Card>
  );
}

export default PostCard;