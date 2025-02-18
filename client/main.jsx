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