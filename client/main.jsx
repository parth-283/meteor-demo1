import React from 'react';
import { Meteor } from 'meteor/meteor';
import { App } from '../imports/ui/App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

// FlowRouter.route('/verify-email/:token', {
//   action(params) {
//     Accounts.verifyEmail(params.token, (error) => {
//       if (error) {
//         console.error("Email verification failed:", error);
//         // Optionally, show an error message to the user
//       } else {
//         console.log("Email verified successfully!");
//         // Redirect to a success page or dashboard
//         FlowRouter.go('/dashboard'); // Adjust the route as needed
//       }
//     });
//   }
// });