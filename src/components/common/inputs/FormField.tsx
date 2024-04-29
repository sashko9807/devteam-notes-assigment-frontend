import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";
import theme from "../../../common/theme";
import { FieldError } from "react-hook-form";

type FormInput = TextFieldProps & {
  fielderror: FieldError | undefined;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInput>(
  ({ ...props }, ref) => (
    <Box flexDirection="column" gap={1}>
      <TextField {...props} ref={ref} />
      {props.fielderror && (
        <Typography
          component={"span"}
          color={"error"}
          fontSize={theme.typography.pxToRem(14)}
        >
          {props.fielderror.message}
        </Typography>
      )}
    </Box>
  )
);
export default FormInput;
