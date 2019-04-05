import React from 'react';

import '../../styles/index.scss';
import logo from '../../assets/images/logo.png';

import { AppBar, Toolbar, IconButton, InputBase, Link } from '@material-ui/core';
//You can find icon names here: https://jxnblk.com/rmdi/
import { EventAvailable, SupervisorAccount, PersonAdd, Person, MoreVert, Search } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

class AppHeader extends React.Component {
    state = {
        mobileMenuOpened: false,
    };

    handleMobileMenuToggle = event => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
        this.setState({ mobileMenuOpened: this.mobileMenuOpened });
    };

    render() {
        const { mobileMenuOpened } = this.state;
        const renderMobileMenu = (
            <div className={"mobile-menu" + (mobileMenuOpened ? "" : " hidden")}>
                <IconButton className="icon-details">
                    <Link component={RouterLink} to="/events">
                        <EventAvailable />
                    </Link>
                </IconButton>
                <IconButton className="icon-details">
                    <Link component={RouterLink} to="/rooms">
                        <SupervisorAccount />
                    </Link>
                </IconButton>
                <IconButton className="icon-details">
                    <Link component={RouterLink} to="/sign-in">
                        <Person />
                    </Link>
                </IconButton>
                <IconButton className="icon-details">
                    <Link component={RouterLink} to="/register">
                        <PersonAdd />
                    </Link>
                </IconButton>
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
                            <IconButton className="icon-details">
                                <Link component={RouterLink} to="/events">
                                    <EventAvailable />
                                </Link>
                            </IconButton>
                            <IconButton className="icon-details">
                                <Link component={RouterLink} to="/rooms">
                                    <SupervisorAccount />
                                </Link>
                            </IconButton>
                        </div>
                        <div className="grow" />
                        <div className="section-desktop">
                            <IconButton className="icon-details">
                                <Link component={RouterLink} to="/sign-in">
                                    <Person />
                                </Link>
                            </IconButton>
                            <IconButton className="icon-details">
                                <Link component={RouterLink} to="/register">
                                    <PersonAdd />
                                </Link>
                            </IconButton>
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

export default AppHeader;
