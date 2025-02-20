import { Meteor } from 'meteor/meteor';
import "../imports/api/TasksPublications";
import "../imports/api/Methods/tasksMethods";
import "../imports/api/Methods/roleMethods";
import "../imports/api/Methods/emailMethods";
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/roles';

Meteor.startup(async () => {

  Accounts.config({
    sendVerificationEmail: true,
  });

  // Create roles if they don't exist
  await Roles.createRoleAsync("admin", { unlessExists: true });
  await Roles.createRoleAsync("user", { unlessExists: true });

  // Create permission roles
  await Roles.createRoleAsync("USERS_VIEW");
  await Roles.createRoleAsync("TODO_EDIT");
  await Roles.createRoleAsync("TODO_ADD");
  await Roles.createRoleAsync("TODO_DELETE");

  // Set up hierarchy
  await Roles.addRolesToParentAsync("USERS_VIEW", "admin");
  await Roles.addRolesToParentAsync(["TODO_EDIT", "TODO_ADD", "TODO_DELETE"], "user");

  if (Meteor.settings.private && Meteor.settings.private.MAIL_USERNAME && Meteor.settings.private.MAIL_PASSWORD && Meteor.settings.private.MAIL_SERVER && Meteor.settings.private.MAIL_PORT) {
    process.env.MAIL_URL = `smtps://${encodeURIComponent(Meteor.settings.private.MAIL_USERNAME)}:${encodeURIComponent(Meteor.settings.private.MAIL_PASSWORD)}@${Meteor.settings.private.MAIL_SERVER}:${Meteor.settings.private.MAIL_PORT}`;
  } else {
    console.error("Mail configuration is missing or incomplete in Meteor.settings.private!");
  }

  Accounts.emailTemplates.from = `${Meteor.settings.public.APP_NAME || "Your App"} <${Meteor.settings.private.MAIL_USERNAME}>`;

  Accounts.emailTemplates.verifyEmail = {
    subject(user) {
      return `Verify your email for ${Meteor.settings.public.APP_NAME || "Our App"}!`;
    },
    html(user, url) {
      let verificationUrl = `${Meteor.absoluteUrl()}verify-email/${user.services.email.verificationTokens[0].token}`
      return `
      <html><body>
        <p>Hello ${user.profile?.name || 'there'},</p>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <p><a href="${verificationUrl}">Verify Email</a></p>
        <p>This link will expire.</p>
      </body></html>
    `;
    }
  };

  Accounts.emailTemplates.resetPassword = {
    subject(user) {
      return `Reset your Password email for ${Meteor.settings.public.APP_NAME || "Our App"}!`;
    },
    html(user, url) {
      let ResetUrl = `${Meteor.absoluteUrl()}reset-password/${user.services.password.reset.token}`

      return `
      <html><body>
        <p>Hello ${user.profile?.name || 'there'},</p>
        <p>To reset your password, simply click the link below.</p>
        <p><a href="${ResetUrl}">Reset Password</a></p>
        <p>Thank you.</p>
      </body></html>`;
    }
  };
});

Accounts.onCreateUser(async (options, user) => {
  // Assign a default role to the new user
  const defaultRole = options.profile.isAdmin ? 'admin' : 'user'; // Change this to your desired role
  user.profile = options.profile || {}; // Ensure the profile is set

  // Add the user to the specified role
  await Roles.addUsersToRolesAsync(user._id, defaultRole);

  return user; // Return the new user object
});
