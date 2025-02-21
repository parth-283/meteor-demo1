import { Meteor } from "meteor/meteor";
import { Roles } from 'meteor/roles';
import { TasksCollection } from "../Collections/TasksCollection";

Meteor.methods({
    "tasks.insert"(doc) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to add todos.');
        }
        TasksCollection.insertAsync({ ...doc, userId: this.userId });
    },
    "tasks.toggleChecked"({ _id, isChecked }) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to add todos.');
        }
        TasksCollection.updateAsync(_id, { $set: { isChecked: !isChecked } });
    },
    'tasks.edit'({ _id, editedValue }) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to edit todos.');
        }
        TasksCollection.updateAsync(_id, { $set: { text: editedValue } });
    },
    "tasks.delete"({ _id }) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, 'user')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to delete todos.');
        }
        return TasksCollection.removeAsync(_id);
    },
    "getTotalTasksCount"() {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user counts.');
        }
        return TasksCollection.find().countAsync();
    },
    "getTotalCompletedTasksCount"() {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user counts.');
        }
        return TasksCollection.find({ isChecked: true }).countAsync();
    },
});