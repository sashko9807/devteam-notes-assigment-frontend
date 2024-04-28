import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import theme from "../../../common/theme";

const FormInput = React.forwardRef(({ ...props }: any, ref) => (
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
));
export default FormInput;
