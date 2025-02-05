import { useQuery } from "@tanstack/react-query";
import {
  TextField,
  List,
  ListItem,
  Avatar,
  ListItemText,
  Pagination,
} from "@mui/material";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

const fetchUsers = async (page = 1, search = "") => {
  const res = await fetch(
    `https://dummyjson.com/users/search?q=${search}&limit=10&skip=${
      (page - 1) * 10
    }`
  );
  return res.json();
};

export const UserList = () => {
  const { searchQuery, setSelectedUser, setSearchQuery, selectedUser ,toggleDrawer ,drawerOpen} =
    useStore();

  const [page, setPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Query to fetch users based on page and searchQuery
  const { data } = useQuery({
    queryKey: ["users", page, debouncedSearchQuery],
    queryFn: () => fetchUsers(page, debouncedSearchQuery),
    enabled: true, // Ensures the query is always enabled
  });

  // Effect to debounce search input and update the search query after 500ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Debounce delay of 500ms

    // Cleanup the timeout on each render
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Effect to set the selected user once data is fetched
  useEffect(() => {
    if (data?.users?.length > 0) {
      setSelectedUser(data?.users?.[0]?.id);
    }
  }, [data, setSelectedUser]);

  // Effect to show all users when the page loads (ensure the search query is empty)
  useEffect(() => {
    if (!searchQuery) {
      setDebouncedSearchQuery(""); // Make sure the query is empty on initial load
    }
  }, [searchQuery]);





  return (
    <div >
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
      />
      <List>
        {data?.users?.map((user) => (
          <ListItem
            selected={selectedUser === user?.id}
            key={user.id}
            onClick={() => { setSelectedUser(user?.id); toggleDrawer(!drawerOpen); }}
            style={{
              cursor: selectedUser === user?.id ? "default" : "pointer",
              backgroundColor:
                selectedUser === user?.id ? "#e0e0e0" : "transparent",
              transition: "background-color 0.3s ease",
              borderRadius: "8px",
            }}
          >
            <Avatar
              src={user.image}
              sx={{
                width: 30,
                height: 30,
                marginRight: 2,
              }}
            />
            <ListItemText
              primary={`${user.firstName} ${user.lastName}`}
              sx={{
                fontSize: "0.875rem", // Adjust the font size for the name
              }}
            />
          </ListItem>
        ))}
      </List>
      {data?.users?.length > 0 && (
        <Pagination
          count={Math.ceil(data?.total / 10)}
          page={page}
          onChange={(_, p) => setPage(p)}
          boundaryCount={1}
          siblingCount={0}
        />
      )}
    </div>
  );
};
