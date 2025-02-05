import React from "react";
import Typography from "@mui/material/Typography";

const Body1Text = ({ color = "text.secondary", children }) => {
  return (
    <Typography variant="body1" color={color}>
      {children}
    </Typography>
  );
};

export default Body1Text;
