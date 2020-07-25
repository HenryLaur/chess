import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Form } from "../components/form/Form";
const useStyles = makeStyles({
  root: {
    background: "#cccccc",
    height: "99vh",
  },
});
export const SelectScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Form />
    </Box>
  );
};
