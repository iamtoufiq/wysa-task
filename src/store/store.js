import { create } from "zustand";

export const useStore = create((set) => ({
//app setting
loader: false,
drawerOpen: false, // New state for drawer
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
 // Function to add user details
 addUserDetails: (user) => {
  set((state) => ({
    userDetails: user,
  }));
},

  // Todos
  todos: [],
  setTodos: (todos) => set({ todos }), // Set todos from API
  // {"id":255,"todo":"asfdasf","completed":false,"userId":5}
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
  updateTodo: (id, updatedTodo) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {...todo,
              ...updatedTodo,  // Merge the updated fields
            }
          : todo
      ),
    }));
  },




}));
