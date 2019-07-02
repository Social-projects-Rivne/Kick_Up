import React from 'react';
import { connect } from "react-redux";

import { 
    addNewRoom, 
    loadRoomCategories, 
    loadRoomTags,
    editRoom,
    saveRoomDetails
} from '../../store/actions/rooms';
import { enqueueSnackbar } from '../../store/actions/toast';

import { TextField, Input, FormControlLabel, Switch, FormGroup, Button, NativeSelect, Paper,
    InputLabel, FormControl, InputAdornment, Grid, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';
import Spinner from "../UI/Spinner/Spinner";
import ImageUploader from "./../ImageUploader/ImageUploader";
import defaultCover from "../../assets/images/bg-1.jpg"

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

class AddRoom extends React.Component {
    state = {
        activeStep: 0,
        roomId: 0,
        tagId: 0,
        roomData: {
            title: '',
            description: '',
            category: 5,
            tags: 0,
            permission: false,
            invite: false,
            members_limit: 1,
            members_limit_checked: false,
        },
        errors: {
            title: false,
            description: false,
            category: false,
            tags: false,
            members_limit: false,
            permission: false
        },
        lastRoomLoaded: this.props.roomsAmount,
        showUpload: false,
        imageSRC: null,
        authUser: false
    };
    componentDidUpdate() {
        // Check if new room was added OK, then change UI;
        if (this.state.lastRoomLoaded !== this.props.roomsAmount) {
            this.setState(prevState => ({
                lastRoomLoaded: this.props.roomsAmount,
                roomId: this.props.rooms[this.props.roomsAmount - 1].id,
                activeStep: prevState.activeStep + 1,
                authUser: this.props.rooms[this.props.roomsAmount - 1].creator.id === this.props.user.id
            }));
        // In case room was successfully updated, redirect to room;
        } else if (
            this.state.lastRoomLoaded === this.props.roomsAmount &&
            this.props.rooms.length > 0 &&
            this.props.rooms[this.props.roomsAmount - 1].wasEdited
        ) {
            this.props.history.push({ pathname: "/room/" + this.state.roomId });
            this.props.showToast("Congratulations! Room created!", messageType.SUCCESS);      
        }
    }
    componentDidMount() {
        // In case we have 0 categories, reload them;
        if (this.props.categories.length <= 0) {
            this.props.loadCatogories();
        }

        // In case we have 0 tags, load them;
        if (this.props.tags.length <= 0) {
            this.props.loadTags();
        }
    };

    handleUpdateData (event) {
        this.setState({
            roomData:{
                ...this.state.roomData,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
            }
        });
    }

    handleNext = () => {
        const { activeStep } = this.state;

        switch (activeStep) {
            case 0:
                const data = {
                    title: this.state.roomData.title,
                    description: this.state.roomData.description,
                    creator_id: this.props.user.id,
                    category_id: this.state.roomData.category,
                    cover: defaultCover,
                    permission: this.state.roomData.permission ? 1 : 0,
                    members_limit: this.state.roomData.members_limit_checked ? this.state.roomData.members_limit : null
                };

                // Fire action to create new room;
                this.props.addRoom(data);
                break;
            case 1:
                const updatedData = {
                    cover: this.state.imageSRC || defaultCover,
                    description: this.state.roomData.description,
                    title: this.state.roomData.title
                };

                // Fire action to update new room;
                this.props.editRoom(this.state.roomId, updatedData);
                break;
            default:
                break;
        }
    };

    showUploadComponent = () => {
        this.setState({showUpload: true})
    }

    closeUploadComponent = () => {
        this.setState({showUpload: false})
    }

    getImagesSRC = (imageSRC) => {
        this.setState({imageSRC});
    }

    render() {
        const { activeStep } = this.state;
        const { isAuthenticated } = this.props;

        if (this.props.loading) {
            return (<Spinner className="rooms-page"/>);
        }

        return (
            <>
                <ImageUploader 
                    show={this.state.showUpload}
                    closeUploadComponent={this.closeUploadComponent}
                    uploaderType="cover"
                    entityURL={this.props.match.url}
                    authUser={this.state.authUser}
                    isAuthenticated={isAuthenticated}
                    getImagesSRC={this.getImagesSRC}
                />
                <div className="add-room-page">
                    <form className="add-room-page-container">
                        <label className="add-room-header">Please fill in all fields to create room</label>
                        <Stepper activeStep={activeStep} orientation="vertical" className="add-room-stepper">
                            <Step key={0}>
                                <StepLabel>Room info</StepLabel>
                                <StepContent>
                                    <div>
                                        <TextField
                                            required
                                            className="add-room-text-field"
                                            label="Title"
                                            name="title"
                                            placeholder="Min 3 symbols, Max 100 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.roomData.title}
                                            fullWidth
                                            autoComplete="off"
                                            inputProps={{ maxLength: 100 }}
                                            error={this.state.errors.title}
                                        />

                                        <TextField
                                            required
                                            className="add-room-text-field"
                                            label="Description"
                                            name="description"
                                            placeholder="Min 6 symbols, Max 300 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.roomData.description}
                                            fullWidth
                                            multiline
                                            autoComplete="off"
                                            inputProps={{ maxLength: 300 }}
                                            error={this.state.errors.description}
                                        />

                                        <FormControl required className="formControl">
                                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                Category
                                            </InputLabel>
                                            <NativeSelect
                                                value={this.state.roomData.category}
                                                name="category"
                                                onChange={event => this.handleUpdateData(event)}
                                                input={<Input name="category" />}
                                                className="add-room-select"
                                                error={this.state.errors.category}
                                            >
                                                {this.props.categories.map((category) =>
                                                    <option value={category.id}>{category.title}</option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>

                                        <FormControl className="formControl">
                                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                Tags
                                            </InputLabel>
                                            <NativeSelect
                                                value={this.state.roomData.tags}
                                                name="tags"
                                                onChange={event => this.handleUpdateData(event)}
                                                input={<Input name="tags" />}
                                                className="add-room-select"
                                                error={this.state.errors.tags}
                                            >
                                                <option value="">none</option>
                                                {this.props.tags.map((tag) =>
                                                    <option value={tag.id}>{tag.title}</option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>

                                        <FormGroup className="add-room-text-field">
                                            <FormControlLabel
                                                label="Private room"
                                                control={
                                                    <Switch
                                                        name="permission"
                                                        onChange={event => this.handleUpdateData(event)}
                                                        checked={this.state.roomData.permission}
                                                        error={this.state.errors.permission}
                                                    />
                                                }
                                            />
                                        </FormGroup>

                                        <FormGroup className="add-room-invite-members">
                                            <FormControlLabel
                                                className="invite-members"
                                                label="Members limits"
                                                control={
                                                    <Switch
                                                        checked={this.state.roomData.members_limit_checked}
                                                        name="members_limit_checked"
                                                        onChange={event => this.handleUpdateData(event)}
                                                    />
                                                }
                                            />

                                            {this.state.roomData.members_limit_checked && <div className="invite-link">
                                                <FormControl className="textField">
                                                    <TextField
                                                        className="add-room-text-field"
                                                        label="Members limit"
                                                        type="number"
                                                        min="1"
                                                        name="members_limit"
                                                        onChange={event => this.handleUpdateData(event)}
                                                        value={this.state.roomData.members_limit}
                                                        fullWidth
                                                        autoComplete="off"
                                                        error={this.state.errors.members_limit}
                                                    />
                                                </FormControl>
                                            </div>}
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={this.handleNext}
                                            className="add-room-button-create"
                                        >
                                            Save and continue
                                        </Button>
                                    </div>
                                </StepContent>
                            </Step>
                            <Step key={1}>
                                <StepLabel>Invite members and upload cover</StepLabel>
                                <StepContent>
                                    <div>
                                        <Paper elevation={1} className="created-room-info">
                                            <InputLabel className="created-room-info-label-info">Room information</InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Title:&nbsp;{this.state.roomData.title}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Description:&nbsp;{this.state.roomData.description}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Category:&nbsp;
                                                {
                                                    this.props.categories.map(
                                                        (category) => (parseInt(category.id) === parseInt(this.state.roomData.category) 
                                                            ? category.title 
                                                            : null
                                                        )
                                                    )
                                                
                                                }
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Tags:&nbsp;
                                                {this.props.tags.map((tag) =>
                                                    (parseInt(tag.id) === parseInt(this.state.roomData.tags) 
                                                        ? tag.title 
                                                        : null
                                                    )
                                                )}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Permission:&nbsp;{this.state.roomData.permission ? "Private room" : "Open room"}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Members limit:&nbsp;{this.state.roomData.members_limit_checked ? this.state.roomData.members_limit : "-"}
                                            </InputLabel>
                                        </Paper>

                                        <FormGroup className="add-room-invite-members">
                                            <FormControlLabel
                                                className="invite-members"
                                                label="Invite members"
                                                control={
                                                    <Switch
                                                        checked={this.state.roomData.invite}
                                                        name="invite"
                                                        onChange={event => this.handleUpdateData(event)}
                                                        value="1"
                                                    />
                                                }
                                            />
                                            {this.state.roomData.invite && <div className="invite-link">
                                                <FormControl  className="textField">
                                                    <TextField
                                                        InputProps={{
                                                            readOnly: true,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Link /> &nbsp;{window.location.origin + '/room/' + this.state.roomId}
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>}
                                        </FormGroup>

                                        <Grid container spacing={24}>
                                            <Grid item md={12}>
                                                <Button variant="contained" className="add-room-button-upload" onClick={this.showUploadComponent}>
                                                    <CloudUpload />&nbsp;&nbsp;
                                                    <span >Upload cover</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={this.handleNext}
                                            className="add-room-button-update-cover"
                                        >
                                            Create room
                                        </Button>
                                    </div>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </form>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    roomsAmount: state.rooms.rooms.length,
    rooms: state.rooms.rooms,
    categories: state.rooms.categories,
    tags: state.rooms.tags,
    loading: state.rooms.roomsLoading
});
  
const mapDispatchToProps = dispatch => ({
    addRoom : data => dispatch(addNewRoom(data)),
    editRoom: (id, data) => dispatch(editRoom(id, data)),
    saveRoomDetails: (id, data) => dispatch(saveRoomDetails(id, data)),
    loadCatogories: () => dispatch(loadRoomCategories()),
    loadTags: () => dispatch(loadRoomTags()),
    showToast: (message, variant) => dispatch(enqueueSnackbar({
        message,
        options: { variant }
    }))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);