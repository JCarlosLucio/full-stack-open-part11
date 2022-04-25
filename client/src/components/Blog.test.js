import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let likeBlog;
  let removeBlog;

  beforeEach(() => {
    const blog = {
      title: 'The Title for the test',
      author: 'The Blog Author',
      url: 'https://fakeurl.dev',
      likes: 0,
      user: {
        username: 'yoshi',
        name: 'Yoshi',
      },
    };

    likeBlog = jest.fn();
    removeBlog = jest.fn();

    component = render(
      <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
    );
  });

  test('should display title and author but not url or likes', () => {
    expect(component.container).toHaveTextContent('The Title for the test');
    expect(component.container).toHaveTextContent('The Blog Author');

    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogDetails).toHaveStyle('display: none');
  });

  test('should show url and likes after button click', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogDetails).not.toHaveStyle('display: none');
    expect(blogDetails).toHaveTextContent('https://fakeurl.dev');
    expect(blogDetails).toHaveTextContent('likes 0');
  });

  test('should fire like event handler twice if button is clicked twice', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeBlog.mock.calls).toHaveLength(2);
  });

  test('should fire remove event handler', () => {
    const removeButton = component.getByText('remove');
    fireEvent.click(removeButton);
    expect(removeBlog.mock.calls).toHaveLength(1);
  });
});
