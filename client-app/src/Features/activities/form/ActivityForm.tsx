import React, { useState, FormEvent, useContext } from 'react';
import { Button, Segment, Form } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/Activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../App/Stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }

    };

    return (
        <Segment clearing>
            <Form>
                <Form.Input
                    onChange={handleInputChange}
                    name='title'
                    placeholder='Title'
                    value={activity.title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    name='description'
                    rows={2}
                    placeholder='Description'
                    value={activity.description}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='category'
                    placeholder='Category'
                    value={activity.category}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='date'
                    type='datetime-local'
                    placeholder='datetime-local'
                    value={activity.date}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='city'
                    placeholder='City'
                    value={activity.city}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='venue'
                    placeholder='Venue'
                    value={activity.venue}
                />
                <Button  loading={submitting} onClick={() => handleSubmit()} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => cancelFormOpen()} floated='right'  content='Cancel' />
            </Form>
        </Segment>

    );
}

export default observer(ActivityForm);