import React from 'react';
import Index from '../components/Index';
import renderer from 'react-test-renderer';

// Test UI View
it('Index page renders correctly', () => {
    const index = renderer.create(<img/>).toJSON();
    expect(index).toMatchSnapshot();
});
