import React, {  useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import ActivityStore from '../../../App/Stores/activityStore';
import { observer } from 'mobx-react-lite';

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { selectActivity, deleteActivity, submitting, target } = activityStore;
    return (        
        <Segment clear>
            <Item.Group divided>
                {activityStore.activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>

                            </Item.Description>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                            <Button name={activity.id}
                                loading= {target === activity.id && submitting}
                                onClick={(e) => deleteActivity(e, activity.id)}
                                floated='right' content='Delete' color='red' />
                            <Label basic content={activity.category} />
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>


    );
}

export default observer(ActivityList);