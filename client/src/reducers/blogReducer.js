import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const byLikes = (a, b) => b.likes - a.likes;

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs.sort(byLikes);
    case 'ADD_BLOG':
      return [...state, action.blog];
    case 'LIKE_BLOG':
      return state
        .map((blog) =>
          blog.id !== action.updatedBlog.id ? blog : action.updatedBlog
        )
        .sort(byLikes);
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    case 'ADD_COMMENT':
      return state.map((blog) =>
        blog.id !== action.commentedBlog.id ? blog : action.commentedBlog
      );

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: 'INIT_BLOGS', blogs });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newBlog);
      dispatch({ type: 'ADD_BLOG', blog });
      dispatch(
        setNotification({
          alert: 'success',
          message: `a new blog ${blog.title} by ${blog.author} added`,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({ alert: 'error', message: error.response.data.error })
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const toLike = { ...blog, likes: blog.likes + 1 };
      await blogService.update(toLike);
      dispatch({ type: 'LIKE_BLOG', updatedBlog: toLike });
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({ alert: 'error', message: error.response.data.error })
      );
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch({ type: 'REMOVE_BLOG', id: blog.id });
      dispatch(
        setNotification({
          alert: 'success',
          message: `Removed ${blog.title} successfully`,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({ alert: 'error', message: error.response.data.error })
      );
    }
  };
};

export const createComment = (blog, content) => {
  return async (dispatch) => {
    try {
      const savedComment = await blogService.createComment(blog.id, {
        content,
      });
      const commentedBlog = {
        ...blog,
        comments: [...blog.comments, savedComment],
      };
      dispatch({ type: 'ADD_COMMENT', commentedBlog });
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({ alert: 'error', message: error.response.data.error })
      );
    }
  };
};

export default blogReducer;
