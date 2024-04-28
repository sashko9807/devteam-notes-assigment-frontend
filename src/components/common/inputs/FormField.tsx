import { Grid, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";
import theme from "../../../common/theme";
import { FieldError } from "react-hook-form";

type FormInput = TextFieldProps & {
  errorMsg: FieldError | undefined;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInput>(
  ({ ...props }, ref) => (
    <Grid direction="column" gap={1}>
      <TextField {...props} ref={ref} />
      {props.errorMsg && (
        <Typography
          component={"span"}
          color={"error"}
          fontSize={theme.typography.pxToRem(14)}
        >
          {props.errorMsg.message}
        </Typography>
      )}
    </Grid>
  )
);
export default FormInput;
