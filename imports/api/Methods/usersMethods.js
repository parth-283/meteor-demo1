import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/roles';
import { Log } from 'meteor/logging'

Meteor.methods({
    checkUserRoles: async function (rolesToCheck) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }

        return await Roles.userIsInRoleAsync(this.userId, rolesToCheck)
    },
    getUserRoles: async function () {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }

        return await Roles.getRolesForUserAsync(this.userId)
    },
    getUserByID: async function (_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        const users = await Meteor.users.findOneAsync({ _id })
        let roles = await Roles.getRolesForUserAsync(_id)

        return {
            _id: users._id,
            name: users.profile.name,
            email: users.emails[0]?.address,
            roles: roles
        }
    },
    updateUserProfile: function (_id, data) {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can remove roles.');
        }
        return Meteor.users.updateAsync(_id, { $set: { profile: { ...data } } });
    },
    removeUser: function (_id) {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can remove roles.');
        }
        return Meteor.users.updateAsync(_id, { $set: { isDeleted: true } });
    },
    getTotalUsersCount: async function () {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user counts.');
        }

        try {
            const users = await Roles.getUsersInRoleAsync('user');

            const usersWithDetails = await users.map(user => user);

            return usersWithDetails.length;
        } catch (error) {
            console.error("Error getting users in role:", error);
            throw new Meteor.Error('get-users-error', 'Error getting users in role.');
        }
    },
    getTotalAdminsCount: async function () {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user counts.');
        }

        try {
            const users = await Roles.getUsersInRoleAsync('admin');

            const usersWithDetails = await users.map(user => user);

            return usersWithDetails.length;
        } catch (error) {
            console.error("Error getting users in role:", error);
            throw new Meteor.Error('get-users-error', 'Error getting users in role.');
        }
    },
    getAllUsersWithRoles: async function () {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user list.');
        }

        const users = await Meteor.users.find({}, {
            fields: {
                'profile.name': 1,
                'emails.address': 1,
                roles: 1
            }
        }).fetchAsync();

        return users.map(user => ({
            _id: user._id,
            name: user.profile.name,
            email: user.emails[0]?.address
        }));
    },
});