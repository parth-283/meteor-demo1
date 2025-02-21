import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/roles';

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

            return usersWithDetails.filter((user) => !user.isDeleted).length;
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
            const admins = await Roles.getUsersInRoleAsync('admin');

            const usersWithDetails = await admins.map(admin => admin);

            return usersWithDetails.filter((admin) => !admin.isDeleted).length;
        } catch (error) {
            console.error("Error getting admins in role:", error);
            throw new Meteor.Error('get-admins-error', 'Error getting admins in role.');
        }
    },
    getAllAdminsWithRoles: async function () {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user list.');
        }
        try {
            const admins = await Roles.getUsersInRoleAsync('admin');

            return (await admins.map(admin => ({
                _id: admin._id,
                name: admin.profile.name,
                email: admin.emails[0]?.address
            }))).filter((admin) => !admin.isDeleted);
        } catch (error) {
            console.error("Error getting admins in role:", error);
            throw new Meteor.Error('get-all-admins-with-roles-error', 'Error getting admins base to role.');
        }
    },
    getAllUsersWithRoles: async function () {
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get user list.');
        }
        try {
            const users = await Roles.getUsersInRoleAsync('user');

            return (await users.map(user => ({
                _id: user._id,
                name: user.profile.name,
                isDeleted: user.isDeleted,
                email: user.emails[0]?.address
            }))).filter((user) => !user.isDeleted);
        } catch (error) {
            console.error("Error getting users in role:", error);
            throw new Meteor.Error('get-all-users-with-roles-error', 'Error getting users base to role.');
        }
    },
});