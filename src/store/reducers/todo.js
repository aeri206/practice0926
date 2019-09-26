import * as actionTypes from "../actions/actionTypes";

const initialState = {
    todos: [
      { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
      { id: 2, title: 'Movie', content: 'watch movie', done: false },
      { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
  };
  
  const reducer = (state = initialState, action) => {
    let newState = {};
    
      switch (action.type) {
          case actionTypes.ADD_TODO:
              const newTodo = {
                  id: state.todos.length +1, 
                  title : action.title,
                  content : action.content,
                  done : false
              }
              newState = { ...state, todos: state.todos.concat(newTodo)};
          
              return newState;
          case actionTypes.DELETE_TODO:
              const deletedTodos = state.todos.filter((todo) => {
                return todo.id !== action.targetID;
              });
              newState = { ...state, todos: deletedTodos };
            
              return newState;
          case actionTypes.TOGGLE_DONE:
              const modified = state.todos.map((todo) => {
                if (todo.id === action.targetID) {
                  return { ...todo, done: !todo.done };
                } else {
                  return { ...todo };
                }
              });
              newState = { ...state, todos: modified };
            
              return newState;
          case actionTypes.GET_TODO:
            const target = { ...state.todos[action.targetID - 1] };
            newState =  { ...state, selectedTodo: target };
            return newState;
            default:
                break;
      }
return state;
  }

  export default reducer;