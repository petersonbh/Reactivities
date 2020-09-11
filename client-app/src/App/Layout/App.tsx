import React, { useEffect, Fragment,  useContext } from 'react';
import { Header, Icon, List, Container, Message } from 'semantic-ui-react'
import NavBar from '../../Features/activities/Nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadinComponent';
import ActivityStore from '../Stores/activityStore';
import { observer } from 'mobx-react-lite';


const App = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activity...'/>
   
    return (
        <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>                
                <ActivityDashboard/>
            </Container>
        </Fragment>
    );

}

export default observer(App);
