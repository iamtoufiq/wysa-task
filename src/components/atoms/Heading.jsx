import React from "react";
import Typography from "@mui/material/Typography";

const Heading = ({
  variant = "h5",
  gutterBottom = true,
  align = "left",
  children,
}) => {
  return (
    <Typography variant={variant} gutterBottom={gutterBottom} align={align}>
      {children}
    </Typography>
  );
};

export default Heading;
