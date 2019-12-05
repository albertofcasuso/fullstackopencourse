import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

const blog = {
    title:'The cool title',
    author:'the star author',
    likes:55
}

const component = render(<SimpleBlog blog={blog}/>)

test('renders title', ()=>{
    const component = render(<SimpleBlog blog={blog}/>)
    expect(component.container).toHaveTextContent('The cool title')
    expect(component.container).toHaveTextContent('the star author')
    expect(component.container).toHaveTextContent(55)
})