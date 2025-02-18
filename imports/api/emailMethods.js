import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";

// Server: Define a method that the client can call.
Meteor.methods({
    async sendEmail({ to, from, subject, text }) {
        // Make sure that all arguments are strings.
        check([to, from, subject, text], [String]);

        try {
            return await Email.sendAsync({ to, from, subject, text });
        } catch (err) {
            console.log(err, "ERORRRR#####################################");
        }
    },
});