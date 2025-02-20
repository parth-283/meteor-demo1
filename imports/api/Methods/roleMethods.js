import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/roles';
import { Log } from 'meteor/logging'

Meteor.methods({
    adminAction: function () {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized.');
        }
        Log.warn('Admin action performed!');
        return "Admin Data";
    },

    moderatorAction: function () {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, ['admin', 'moderator'])) {
            throw new Meteor.Error('not-authorized', 'You are not authorized.');
        }
        Log.warn('Moderator action performed!');
        return "Moderator Data";
    },

    userAction: function () {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        Log.warn('User action performed!');
        return "User Data";
    },

    assignRole: function (userId, role) {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can assign roles.');
        }
        Roles.addUsersToRole(userId, role);
    },

    removeRole: function (userId, role) {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can remove roles.');
        }
        Roles.removeUsersFromRole(userId, role);
    },

    getAllUsersWithRoles: function () {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user list.');
        }
        return Meteor.users.find({}, { fields: { username: 1, email: 1, roles: 1 } }).fetch();
    },
});