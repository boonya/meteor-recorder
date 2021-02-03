import {App} from '../imports/ui/App';
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';

Meteor.startup(() => {
	render(<App />, document.getElementById('react-target'));
});
