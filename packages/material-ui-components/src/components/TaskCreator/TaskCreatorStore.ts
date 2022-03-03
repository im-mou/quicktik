import { makeAutoObservable, toJS } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { TASK_CONTENT_TYPE, TASK_REPETITION } from '../../Utils/constants';

class TaskCreatorStore {
    open = false;
    title = '';
    taskType = TASK_CONTENT_TYPE.TEXT;
    body = '';
    date = new Date();
    milestones: any[] = [];
    minutes = 15;
    hours = 0;
    groups: any[] = [];
    repetition = TASK_REPETITION.ONCE;

    constructor() {
        makeAutoObservable(this);
    }

    setTitle(value: string) {
        this.title = value;
    }

    setBody(value: string) {
        this.body = value;
    }

    setRepetition(value: string) {
        this.repetition = value;
    }

    setMilestones(value: any[]) {
        this.milestones = value;
    }

    setDate(value: Date) {
        this.date = value;
    }

    incHours() {
        if (this.hours < 23) {
            this.hours++;
        }
    }

    setOpen(value: boolean) {
        this.open = value;
    }

    decHours() {
        if (this.hours > 0) {
            this.hours--;
        }
    }

    setMinutes(minutes: number) {
        this.minutes = minutes;
    }

    setTaskType(type: any) {
        // convert paragraph lines into checklist and viceversa
        if (this.taskType === TASK_CONTENT_TYPE.TEXT && type === TASK_CONTENT_TYPE.CHECKLIST) {
            this.milestones = [];
            if (this.body.trim().length) {
                const els = this.body.trim().split('\n');
                if (els.length > 0) {
                    this.milestones = [];
                    els.forEach((item) => {
                        if (item.trim().length) {
                            this.insertMilestone(item.trim());
                        }
                    });
                }
            }
        } else if (this.taskType === TASK_CONTENT_TYPE.CHECKLIST && type === TASK_CONTENT_TYPE.TEXT) {
            this.body = '';
            if (this.milestones.length) {
                this.body = this.milestones.map((el) => el.value).join('\n');
            }
        }
        this.taskType = type;
    }

    reset() {
        this.title = '';
        this.body = '';
        this.date = new Date();
        this.milestones = [];
        this.groups = [];
        this.hours = 0;
    }

    /**
     * Milestones operations
     */
    insertMilestone(value: string, id = uuidv4()) {
        this.milestones.push({ id, value, order: Date.now() + this.milestones.length + 1 });
    }

    updateMilestone(id: any, newValue: any) {
        const idx = this.milestones.findIndex((el) => el.id === id);
        this.milestones[idx].value = newValue;
    }

    deleteMilestone(id: any) {
        const idx = this.milestones.findIndex((el) => el.id === id);
        this.milestones.splice(idx, 1);
    }

    /**
     * groups operations
     */

    toggleGroup(newGroup: { id: any }) {
        const idx = this.groups.findIndex((el) => el.id === newGroup.id);
        // add group if not in the list
        if (idx === -1) {
            this.groups.push(newGroup);
        } else {
            // remove group
            this.groups.splice(idx, 1);
        }
    }

    unassignGroup(id: any) {
        const idx = this.groups.findIndex((el) => el.id === id);
        if (idx !== -1) {
            this.groups.splice(idx, 1);
        }
    }

    updateGroup(id: any, newGroup: any) {
        const idx = this.groups.findIndex((el) => el.id === id);
        if (idx !== -1) {
            this.groups.splice(idx, 1, newGroup);
        }
    }

    /**
     * Computed values
     */
    get taskContent() {
        if (this.taskType === TASK_CONTENT_TYPE.CHECKLIST) {
            return this.milestones;
        } else if (this.taskType === TASK_CONTENT_TYPE.TEXT) {
            return this.body;
        } else return '';
    }

    get isNewTaskValid() {
        if (this.title.trim() === '') return false;
        if (this.minutes === 0 && this.hours === 0) return false;
        return true;
    }

    get createTask() {
        if (!this.isNewTaskValid) return {};
        return {
            title: this.title.trim(),
            type: this.taskType,
            content: toJS(this.taskContent),
            groups: toJS(this.groups),
            date: this.date,
            repetition: this.repetition,
            time: {
                minutes: this.minutes,
                hours: this.hours
            }
        };
    }
}

const taskCreatorStore = new TaskCreatorStore();

export default taskCreatorStore;
