import { create } from "zustand";

export const useStore = create((set) => ({
//app setting
loader: false,
drawerOpen: false,
toggleDrawer: (isOpen) =>
  set((state) => ({
    drawerOpen: isOpen !== undefined ? isOpen : !state.drawerOpen,
  })),
setLoader: (value) => {
  set({ loader: value });
},
  selectedUser: 1,
  currentTab: "details",
  searchQuery: "",
  setSelectedUser: (user) => set({ selectedUser: user }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),


//users
userDetails:[],
 addUserDetails: (user) => {
  set((state) => ({
    userDetails: user,
  }));
},
  // Todos
  todos: [],
  // setTodos: (todos) => set({ todos }), // Set todos from API
  setTodos: (todos) => {
    set((state) => ({
      todos: [
        ...state.todos, // Keep existing todos
        ...todos.filter(
          (newTodo) => !state.todos.some((existingTodo) => existingTodo.id === newTodo.id)
        ), // Add only new todos that don’t exist in state
      ],
    }));
  },



  addTodo: (todo) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
        ...todo,

        },
      ],
    }));
  },

  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  completeTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  // Update Todo
  // updateTodo: (id, updatedTodo) => {

  //   debugger
  //   set((state) => ({
  //     todos: state.todos.map((todo) =>
  //       todo.id === id
  //         ? {...todo,
  //             ...updatedTodo,  // Merge the updated fields
  //           }
  //         : todo
  //     ),
  //   }));
  // },
  updateTodo: (id, updatedTodo) => {
    set((state) => {
      console.log("Current State:", state.todos); // Access the state
      debugger;

      return {
        todos: state.todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                ...updatedTodo, // Merge the updated fields
                completed: false, // Ensure completed is always false
              }
            : todo
        ),
      };
    });
  },




}));
