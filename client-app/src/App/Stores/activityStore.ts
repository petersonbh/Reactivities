import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../Models/Activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

export class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activitiesRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activitiesRegistry.set(activity.id, activity)
                });
                this.loadingInitial = false;
            });
        }
        catch (error) {
            runInAction('loading activities error', () => {
                this.loadingInitial = false;
                console.log(error);
            });
        }

    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activities', () => {
                this.activitiesRegistry.set(activity.id, activity)
                this.editMode = false;
                this.submitting = false;
            });
        }
        catch (error) {
            runInAction('creating activities', () => {
                this.submitting = false;
                console.log(error);
            });
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activities', () => {
                this.activitiesRegistry.delete(id);
                this.editMode = false;
                this.target = '';
                this.submitting = false;
            });
        }
        catch (error) {
            runInAction('deleting activities', () => {
                this.submitting = false;
                this.target = '';
                console.log(error);
            });
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        
    }

    @action openCreateForm = () => {
        this.selectedActivity = undefined;
        this.editMode = true;
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());