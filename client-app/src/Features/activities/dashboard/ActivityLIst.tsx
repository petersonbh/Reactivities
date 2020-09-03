import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/Activity';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ activities, selectActivity, deleteActivity }) => {
    return (

        <Segment clear>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>

                            </Item.Description>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                            <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red' />
                            <Label basic content={activity.category} />
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>


    );
}

export default ActivityList