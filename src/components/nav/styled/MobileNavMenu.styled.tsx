import { Grid, GridProps, styled } from "@mui/material";

const PREFIX = `MobileNavMenu`;
export const classes = {
  container: `${PREFIX}--container`,
  itemText: `${PREFIX}--menuitem_text`,
};

export const MobileNavMenuStyled = styled(Grid)<GridProps>(({ theme }) => ({
  [`& .${classes.container}`]: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const MobileNavMenuItem = styled(Grid)<GridProps>(({ theme }) => ({
  borderTop: "2px solid lightgrey",
  minHeight: theme.spacing(2),
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),

  [`& . ${classes.itemText}`]: {
    fontSize: theme.typography.pxToRem(16),
  },
}));
