import React from "react";
import Typography from "@mui/material/Typography";

const Body2Text = ({ color = "text.secondary", children }) => {
  return (
    <Typography variant="body2" color={color}>
      {children}
    </Typography>
  );
};

export default Body2Text;
