import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import blogReducer from '../reducers/blogReducer';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  const reducer = combineReducers({
    blogs: blogReducer,
  });

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  test('should call the form event handler with the right details', async () => {
    const toggleForm = jest.fn();

    const component = render(
      <Provider store={store}>
        <BlogForm toggleForm={toggleForm} />
      </Provider>
    );

    const titleInput = component.container.querySelector('#title');
    const authorInput = component.container.querySelector('#author');
    const urlInput = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    const blogData = {
      author: 'author for test',
      title: 'title for test',
      url: 'url for test',
    };

    fireEvent.change(titleInput, {
      target: { value: blogData.title },
    });
    fireEvent.change(authorInput, {
      target: { value: blogData.author },
    });
    fireEvent.change(urlInput, {
      target: { value: blogData.url },
    });

    expect(form).toHaveFormValues(blogData);

    fireEvent.submit(form);

    expect(form).toHaveFormValues({ author: '', title: '', url: '' });
    expect(component.container).toHaveTextContent('create');
  });
});
