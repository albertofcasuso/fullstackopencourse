import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

const blog = {
    title:'The cool title',
    author:'the star author',
    likes:55
}

const component = render(<SimpleBlog blog={blog}/>)
const mockHandler = jest.fn()

test('renders title', ()=>{
    const component = render(<SimpleBlog blog={blog}/>)
    expect(component.container).toHaveTextContent('The cool title')
    expect(component.container).toHaveTextContent('the star author')
    expect(component.container).toHaveTextContent(55)
})

test('clicking the button works', ()=>{
    const {getByText} = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})