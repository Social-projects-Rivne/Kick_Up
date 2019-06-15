import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import AppHeader from './../../components/AppHeader/AppHeader';
import Footer from './../../components/Footer/Footer';
import { withSnackbar } from 'notistack';
import CustomizedSnackbars from "./../../components/Toast/Toast";
import { clearToast } from "./../../store/actions/toast";

const pageContainer = props => {
    return (
        <>
            <AppHeader />
            {props.type && (
                <CustomizedSnackbars
                    variant={props.type}
                    message={props.message}
                    open={props.messageOpened}
                    resetToast={props.clearToast}
                />
            )}
            <main id="content">{props.children}</main>
            <Footer />
        </>
    );
}

const mapStateToProps = store => ({
    type: store.toast.type,
    message: store.toast.message,
    messageOpened: store.toast.messageOpened,
});

const mapDispatchToProps = dispatch => ({
    clearToast: () => dispatch(clearToast())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(pageContainer));








//const [toast, setToast] = useState(null);


    //useEffect(() => setToast({type:props.type, message: props.message}));

/* useEffect( () => {
    enqueueSnackbar('toast.message', "success")
    //enqueueSnackbar(toast.message, toast.message)
}, [toast] ); */


/* export function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
        <PageContainer />
      </SnackbarProvider>
    );
}; */
