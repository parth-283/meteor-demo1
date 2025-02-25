import { Meteor } from "meteor/meteor";
import { Roles } from 'meteor/roles';
import { ContactsCollection } from "../Collections/ContactsCollection";
import { Log } from 'meteor/logging'
import { TasksCollection } from "../Collections/TasksCollection";

Meteor.methods({
    getDashboardCounter: async function () {
        Log.warn('Start process for get counts for dashboard.');

        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get contacts counts.');
        }

        try {
            const admins = await Roles.getUsersInRoleAsync('admin');
            const users = await Roles.getUsersInRoleAsync('user');

            const adminsWithDetails = await admins.map(admin => admin);
            const usersWithDetails = await users.map(user => user);

            let usersCounter = usersWithDetails.filter((user) => !user.isDeleted).length;
            let adminsCounter = adminsWithDetails.filter((admin) => !admin.isDeleted).length;
            let contactCounter = await ContactsCollection.find().countAsync();
            let completedTasksCounter = await TasksCollection.find({ isChecked: true }).countAsync();
            let TasksCounter = await TasksCollection.find().countAsync();

            return [{ counter: adminsCounter, title: "Total Admins", label: "admins" },
            { counter: usersCounter, title: "Total Users", label: "users" },
            { counter: TasksCounter, title: "Total Tasks", label: "tasks" },
            { counter: completedTasksCounter, title: "Total Completed Tasks", label: "completedTasks" },
            { counter: contactCounter, title: "Total Contacts", label: "contacts" }]
        } catch (error) {
            throw new Meteor.Error('get-dashboard-counter', error.message ? error.message : 'Some things went wrong!');
        }
    },
});