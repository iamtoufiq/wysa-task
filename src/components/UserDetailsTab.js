import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Snackbar,
  Typography,
} from "@mui/material";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";
import LoadingText from "./LoadingText";
import UserPersonalInfor from "./UserPersonalInfor";
import UserAddress from "./UserAddress";
import UserCompanyDetails from "./UserCompanyDetails";
import UserTopProfile from "./UserTopProfile";
import { BaseURL } from "../api";

const UserDetailsTab = () => {
  const { selectedUser, addUserDetails, setLoader } = useStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch user details on page load
  const {
    data: user,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["user", selectedUser],
    queryFn: async () => {
      const response = await fetch(
        `${BaseURL}/users/${selectedUser ?? 1}`
      );
      if (!response.ok) throw new Error("Failed to fetch user data");
      let data = await response.json();
      addUserDetails(data);
      return data;
    },
  });
  useEffect(() => {
    if (isLoading || isFetching) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [isFetching, isLoading, setLoader]);

  if (isLoading) return <LoadingText />;
  if (error) return <Typography>Error fetching data</Typography>;
  if (!user) return null;

  return (
    <Box sx={{ p: 3 }}>
      <UserTopProfile user={user} />
      {/* Personal Info */}
      <UserPersonalInfor user={user} />
      {/* Address */}
      <UserAddress user={user} />
      {/* Company Details */}
      <UserCompanyDetails user={user} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message="User updated successfully"
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default UserDetailsTab;
