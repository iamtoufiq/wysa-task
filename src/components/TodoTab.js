import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  Snackbar,
  Box,
  Stack,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";
import LoadingText from "./LoadingText";
import { BaseURL } from "../api";

const TodoTab = () => {
  const {setLoader, selectedUser, todos, setTodos, addTodo, removeTodo, completeTodo,updateTodo } = useStore();
  const [newTodo, setNewTodo] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

console.log("todos",todos);

  const showSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
  };

  // Fetch Todos
  const {  isLoading, isFetching } = useQuery({
    queryKey: ["todos", selectedUser],
    queryFn: async () => {
      const response = await fetch(`${BaseURL}/todos/user/${selectedUser}`);
      if (!response.ok) throw new Error("Failed to fetch todos");
      const result = await response.json();
      setTodos(result.todos);
      return result.todos;
    },
    enabled: !!selectedUser,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  // Add Todo Mutation
  const addMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BaseURL}/todos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId:selectedUser ?? 1,
        }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      return response.json();
    },
    onSuccess: (newTodoData) => {
      addTodo({
        ...newTodoData,
      });
      showSnackbar("Todo added successfully!", "success");
      setNewTodo("");
    },
  });

  // Delete Todo Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${BaseURL}/todos/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete todo");
      return response.json();
    },
    onSuccess: (_, id) => {
      removeTodo(id);
      showSnackbar("Todo deleted successfully!", "error");
    },
    onError: (_, id) => {
      removeTodo(id);
      showSnackbar("Todo deleted successfully!", "error");
    },
  });

  // Complete Todo Mutation
  const completeMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${BaseURL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) throw new Error("Failed to mark todo as completed");
      return response.json();
    },
    onSuccess: (_, id) => {
      completeTodo(id);
    },
    onError: (_, id) => {
      completeTodo(id);
    },
  });

  // Edit Todo Mutation
// Edit Todo Mutation
const editMutation = useMutation({
  mutationFn: async ({ id, updatedTodo }) => {
    debugger
    const response = await fetch(`${BaseURL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo), // Pass updatedTodo as the request body
    });
    if (!response.ok) throw new Error("Failed to edit todo");
    return response.json();
  },
  onSuccess: (updatedTodoData, { id }) => {
    updateTodo(id, { ...updatedTodoData });
    showSnackbar("Todo updated successfully!", "success");
    setEditTodo(null);
  },
  onError: (error, { id, updatedTodo }) => {
    // updateTodo(id, todo:updatedTodo);
    updateTodo(id, updatedTodo);
    showSnackbar("Todo updated successfully!", "success");
    setEditTodo(null);
  },
});

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setEditText(todo.todo);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== editTodo.todo) {
      debugger
      editMutation.mutate({
        id: editTodo.id,  // The id
        updatedTodo: {
          todo: editText,
        },
      });
    }
    else {
      // If no changes, show a snackbar with the message "No changes done"
      setSnackbar({
        open: true,
        message: "You didn't make any changes",
        type: "red",
      });
      setEditTodo(null)
    }
  };
useEffect(()=>{
  if(isLoading || isFetching){
    setLoader(true);
  }else{
    setLoader(false);
  }
},[isFetching, isLoading, setLoader])

console.log("todos",todos);
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
        <TextField
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          label="New Todo"
          fullWidth
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => setNewTodo("")}
            sx={{ width: "fit-content" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={() => addMutation.mutate()}
            startIcon={<AddIcon />}
            sx={{ width: "fit-content" }}
            disabled={!newTodo.trim()}
          >
            Add
          </Button>
        </Stack>
      </Box>
{
  !isLoading && !isFetching && todos.filter((todo) => todo.userId === selectedUser).length === 0 ?  <div>No data</div> :  <List>
  {isLoading || isFetching ? (
     <LoadingText/>
  ) : (
    todos
    .filter((todo) => todo.userId === selectedUser)?.map((todo) => (
      <ListItem
      id="todo item"
        key={todo.id}
        sx={{
          border: "1px solid #ddd",
          boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
          borderRadius: "6px",
          marginBottom: "16px",
          paddingInline: {
            xs: "0px",  // For screen sizes less than 'md' (xs, sm)
            md: "12px", // For 'md' and larger screens
          },
        }}
        secondaryAction={
          <>
            <IconButton sx={{
    position: "relative",
    right: {
      xs: "-10px",     // For screen sizes less than 'sm' (xs, sm)
      md: "0px",     // For 'md' and larger screens (i.e., medium and larger devices)
    },
  }} id="edit" disabled={todo?.completed} onClick={() => handleEditTodo(todo)}>
              <EditIcon />
            </IconButton>
            <IconButton id="delete" onClick={() => setDeleteConfirm({ open: true, userId: todo.id })}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <Checkbox
        id="checkbox"
          checked={todo.completed}
          onChange={() => completeMutation.mutate(todo.id)}
          sx={{ marginRight: "12px" }}
        />
        <Stack direction="column" spacing={0}>
          <Typography
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#888" : "inherit",
              transition: "all 0.3s ease-in-out",
              fontSize: "18px",
              wordBreak:"break-word",
              maxWidth:"80%"
            }}
          >
            {todo.todo}
          </Typography>

        </Stack>
      </ListItem>
    ))
  )}
</List>
}
      {/* Todo List */}


      {/* Edit Todo Modal/Popup */}
      {editTodo && (
        <Dialog open={!!editTodo} onClose={() => setEditTodo(null)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: { xs: "90vw", md: "500px" },
          },
        }}

        >
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              variant="outlined"

            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTodo(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbar({ ...snackbar, open: false })}>
            <CloseIcon />
          </IconButton>
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbar.type === "success" ? "green" : "red",
            color: "white",
            fontWeight: "bold",
          },
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this todo?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</Button>
          <Button
            onClick={() => {
              deleteMutation.mutate(deleteConfirm.userId);
              setDeleteConfirm({ open: false, id: null });
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoTab;
