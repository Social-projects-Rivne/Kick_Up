import React from 'react';

import logo from '../../assets/images/logo.png';
import face from '../../assets/images/face.png';

import { AppBar, Toolbar, IconButton, InputBase, Link, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
//You can find icon names here: https://jxnblk.com/rmdi/
import { EventAvailable, SupervisorAccount, PersonAdd, Person, ExitToApp, MoreVert, Search } from '@material-ui/icons';
import { Link as RouterLink, withRouter } from 'react-router-dom';

class AppHeader extends React.Component {
    state = {
        mobileMenuOpened: false,
        activePage: window.location.pathname,
    };
    handleLogout = () => {
        this.props.userHasAuthenticated(false);
        localStorage.removeItem("authorization");
        this.props.setAuthToken(null);
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
        this.props.history.push({ pathname: "/profile/" + this.props.user.id });
    }

    render() {
        const { user, isAuthenticated } = this.props;
        const { mobileMenuOpened, activePage } = this.state;
        const avatarURL = user && user.avatar ? 
            <img src={user.avatar} alt={user.email}/> 
            : <img src={face} alt ="user" />;
        const authField = isAuthenticated && user
        ?   <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                <BottomNavigationAction className="icon-details" label="avatar"
                 onClick={this.handleUserProfile}
                  icon={avatarURL} />
                <BottomNavigationAction className="icon-details" label="Sign Out" onClick={this.handleLogout} icon={<ExitToApp />} />
            </BottomNavigation>
        :   <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                <BottomNavigationAction className="icon-details" label="Sign In" value="/sign-in" icon={<Person />} />
                <BottomNavigationAction className="icon-details" label="Sign Up" value="/sign-up" icon={<PersonAdd />} />
            </BottomNavigation>;

        const authFieldForMobile = isAuthenticated && user
        ?   <>
                <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                    <BottomNavigationAction className="icon-details" label="Events" value="/events" icon={<EventAvailable />} />
                    <BottomNavigationAction className="icon-details" label="Spaces" value="/rooms" icon={<SupervisorAccount />} />
                    <BottomNavigationAction className="icon-details" label="avatar" 
                    onClick={this.handleUserProfile} 
                    icon={avatarURL} />
                    <BottomNavigationAction className="icon-details" label="Sign Out" onClick={this.handleLogout} icon={<ExitToApp />} />
                </BottomNavigation>
            </>
        :   <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                <BottomNavigationAction className="icon-details" label="Events" value="/events" icon={<EventAvailable />} />
                <BottomNavigationAction className="icon-details" label="Spaces" value="/rooms" icon={<SupervisorAccount />} />
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
                        <form className="search-form">
                            <div className="search">
                                <div className="search-icon">
                                    <Search />
                                </div>
                                <InputBase className="search-root" name="query" />
                            </div>
                        </form>
                        <div className="section-desktop">
                            <BottomNavigation value={activePage} onChange={this.handleChangeActivePage} className="navigation-buttons">
                                <BottomNavigationAction className="icon-details" label="Events" value="/events" icon={<EventAvailable />} />
                                <BottomNavigationAction className="icon-details" label="Spaces" value="/rooms" icon={<SupervisorAccount />} />
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
}

export default withRouter(AppHeader);
