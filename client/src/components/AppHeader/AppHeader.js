import React from 'react';
import { connect } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from '../../assets/images/logo.png';
import face from '../../assets/images/face.png';
import { signOutUser } from './../../store/actions/authentication';

import { AppBar, Toolbar, IconButton, Link, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
//You can find icon names here: https://jxnblk.com/rmdi/
import { EventAvailable, SupervisorAccount, PersonAdd, Person, MoreVert, ReportProblem } from '@material-ui/icons';
import { Link as RouterLink, withRouter } from 'react-router-dom';

class AppHeader extends React.Component {
    state = {
        mobileMenuOpened: false,
        activePage: window.location.pathname,
        anchorEl: null,
    };
    handleSignOut = () => {
        this.setState({ anchorEl: null });
        this.props.signOutUser(this.props.history);
    }
    componentWillMount() {
        this.unlisten = this.props.history.listen(location => {
            const { pathname } = location;
            this.setState({ activePage: pathname });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleChangeActivePage = (event, activePage) => {
        this.setState({ activePage });
        this.props.history.push(activePage);
    };

    handleMobileMenuToggle = event => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
        this.setState({ mobileMenuOpened: this.mobileMenuOpened });
    };

    handleUserProfile = () => {
        this.setState({ anchorEl: null });
        this.props.history.push({ pathname: "/profile/" + this.props.user.id });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { user, isAuthenticated } = this.props;
        const { mobileMenuOpened, activePage, anchorEl } = this.state;
        const avatarURL = user && user.avatar ?
            <img src={user.avatar} alt={user.email} />
            : <img src={face} alt="" />;
        const avatar = [
            <BottomNavigationAction
                className="icon-details-avatar"
                label="Profile"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                icon={avatarURL}
                key="1"
            />,
            <Menu
                id="simple-menu"
                className="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                key="2"
            >
                <MenuItem onClick={this.handleUserProfile}>Profile</MenuItem>
                <MenuItem onClick={this.handleSignOut}>SignOut</MenuItem>
            </Menu>];
        const authField = isAuthenticated && user
            ? <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                {avatar}
            </BottomNavigation>
            : <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                <BottomNavigationAction className="icon-details" label="Sign In" value="/sign-in" icon={<Person />} />
                <BottomNavigationAction className="icon-details" label="Sign Up" value="/sign-up" icon={<PersonAdd />} />
            </BottomNavigation>;

        const authFieldForMobile = isAuthenticated && user
            ? <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                <BottomNavigationAction className="icon-details" label="Events" value="/events" icon={<EventAvailable />} />
                <BottomNavigationAction className="icon-details" label="Rooms" value="/rooms" icon={<SupervisorAccount />} />
                {isAuthenticated && user && user.role === 1 &&
                <BottomNavigationAction className="icon-details" label="Report" value="/admin-panel" icon={<ReportProblem />} />
                }
                {avatar}
            </BottomNavigation>
            : <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                <BottomNavigationAction className="icon-details" label="Events" value="/events" icon={<EventAvailable />} />
                <BottomNavigationAction className="icon-details" label="Rooms" value="/rooms" icon={<SupervisorAccount />} />
                <BottomNavigationAction className="icon-details" label="Sign In" value="/sign-in" icon={<Person />} />
                <BottomNavigationAction className="icon-details" label="Sign Up" value="/sign-up" icon={<PersonAdd />} />
            </BottomNavigation>
        const renderMobileMenu = (
            <div className={"mobile-menu" + (mobileMenuOpened ? "" : " hidden")}>
                {authFieldForMobile}
            </div>
        );

        return (
            <header className="root">
                <AppBar position="static" className="header-bg">
                    <Toolbar>
                        <IconButton className="logo-hover">
                            <Link component={RouterLink} to="/">
                                <img className="logo-img" src={logo} alt="Logo" />
                            </Link>
                        </IconButton>
                        <div className="section-desktop">
                            <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                                <BottomNavigationAction className="icon-details" label="Events" value="/events" icon={<EventAvailable />} />
                                <BottomNavigationAction className="icon-details" label="Rooms" value="/rooms" icon={<SupervisorAccount />} />
                                {isAuthenticated && user && user.role === 1 &&
                                    <BottomNavigationAction className="icon-details" label="Report" value="/admin-panel" icon={<ReportProblem />} />
                                }
                            </BottomNavigation>
                        </div>
                        <div className="grow" />
                        <div className="section-desktop">
                            {authField}
                        </div>
                        <div className="section-mobile">
                            <IconButton
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuToggle}
                                className="icon-details"
                            >
                                <MoreVert />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </header>
        );
    }
};

const mapStateToProps = store => ({
    user: store.auth.user,
    isAuthenticated: store.auth.isAuthenticated,
    errors: store.auth.errors,
});

const mapDispatchToProps = dispatch => ({
    signOutUser: history => dispatch(signOutUser(history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));
