import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles({
  select: {
    width: "150px",
  },
});
export const Select = ({
  value,
  onChange,
  label,
}: {
  value: any;
  onChange: (change: any) => void;
  label: string;
}) => {
  console.log(label);
  const classes = useStyles();
  return (
    <FormControl className={classes.select}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <MUISelect
        fullWidth
        className={classes.select}
        labelId={`${label}-select`}
        label={label}
        id={`${label}-select`}
        value={value}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
          onChange(event.target.value)
        }
      >
        <MenuItem value={"HUMAN"}>Human</MenuItem>
        <MenuItem value={"AI"}>AI</MenuItem>
      </MUISelect>
    </FormControl>
  );
};
