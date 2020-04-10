import React from 'react'
import { text } from '@storybook/addon-knobs'

const FakeComponent = ({ name }) => <div>{`Hello ${name}`}</div>

export default {
    title: 'Component/FakeComponent',
    component: FakeComponent,
    includeStories: [],
}

export const basic = () => <FakeComponent name={text('Name', 'Renaud')} />

basic.story = {
    title: 'Default',
}
