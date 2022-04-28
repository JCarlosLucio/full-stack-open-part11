import deepFreeze from 'deep-freeze';
import blogReducer from './blogReducer';

describe('blogReducer', () => {
  const initialState = [
    {
      comments: [],
      likes: 0,
      title: 'Testing is good',
      author: 'Yoshi',
      url: 'http://testblog.dev',
      user: {
        username: 'yoshi',
        name: 'Yoshi Tester',
        id: '1',
      },
      id: '1',
    },
  ];

  test('should initialize all blogs to state', () => {
    const action = {
      type: 'INIT_BLOGS',
      blogs: initialState,
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual(action.blogs);
  });

  test('should add blog to state', () => {
    const action = {
      type: 'ADD_BLOG',
      blog: {
        comments: [],
        likes: 0,
        title: 'blog to add',
        author: 'Yoshi',
        url: 'http://addblog.dev',
        user: {
          username: 'yoshi',
          name: 'Yoshi Tester',
          id: '1',
        },
        id: '2',
      },
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(action.blog);
  });

  test('should add 1 to likes property to blog', () => {
    const [toLike] = initialState;
    const action = {
      type: 'LIKE_BLOG',
      updatedBlog: { ...toLike, likes: toLike.likes + 1 },
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual([action.updatedBlog]);
  });

  test('should remove to blog from state', () => {
    const action = {
      type: 'REMOVE_BLOG',
      id: '1',
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual([]);
  });

  test('should add a comment to comments', () => {
    const action = {
      type: 'ADD_COMMENT',
      commentedBlog: {
        comments: [{ content: 'test blog', id: '1' }],
        likes: 0,
        title: 'Testing is good',
        author: 'Yoshi',
        url: 'http://testblog.dev',
        user: {
          username: 'yoshi',
          name: 'Yoshi Tester',
          id: '1',
        },
        id: '1',
      },
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toContainEqual(action.commentedBlog);
    expect(newState[0].comments).toHaveLength(
      initialState[0].comments.length + 1
    );
    expect(newState[0].comments).toContainEqual(
      action.commentedBlog.comments[0]
    );
  });
});
