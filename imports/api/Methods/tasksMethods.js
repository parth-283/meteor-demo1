import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../Collections/TasksCollection";

Meteor.methods({
    "tasks.insert"(doc) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRole(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to add todos.');
        }
        TasksCollection.insertAsync({ ...doc, userId: this.userId });
    },
    "tasks.toggleChecked"({ _id, isChecked }) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRole(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to add todos.');
        }
        TasksCollection.updateAsync(_id, { $set: { isChecked: !isChecked } });
    },
    'tasks.edit'(_id, newText) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRole(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to edit todos.');
        }
        TasksCollection.update(_id, { $set: { text: newText } });
    },
    "tasks.delete"({ _id }) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRole(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to delete todos.');
        }
        return TasksCollection.removeAsync(_id);
    },
});