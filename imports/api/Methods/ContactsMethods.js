import { Meteor } from "meteor/meteor";
import { Roles } from 'meteor/roles';
import { ContactsCollection } from "../Collections/ContactsCollection";
import { Log } from 'meteor/logging'

Meteor.methods({
    "contacts.insert"(doc) {
        Log.warn('Start process for new contact.');

        ContactsCollection.insertAsync({ ...doc });
    },
    getCounterList: function () {
        Log.warn('Start process for get contact list.');
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'You must be logged in.');
        }
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to get list of contacts.');
        }
        return ContactsCollection.find().fetch();
    },
    "getTotalContactsCount"() {
        Log.warn('Start process for get counts of contact.');
        if (!Roles.userIsInRoleAsync(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'Only admins can get contacts counts.');
        }
        return ContactsCollection.find().countAsync();
    },
});