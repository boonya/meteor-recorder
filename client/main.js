import {App} from '../imports/ui/App';
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createRoot} from 'react-dom/client';

Meteor.startup(() => {
	const root = createRoot(document.getElementById('root'));
	root.render(<App />);
});
