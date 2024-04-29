import {
  AppBar,
  AppBarProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const classes = {
  container: `AppBar--container`,
  wrapper: `AppBar-wrapper`,
  desktopMenu: `AppBar-desktop--menu`,
  mobileMenu: `Appbar-mobile--menu`,
};

export const AppBarStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
  textDecoration: "none",
  [`& .${classes.container}`]: {
    overflow: "hidden",
    alignItems: "center",
    width: "100%",
    height: theme.spacing(11),
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(8),
    },
    backgroundColor: "#fff",
  },
  [`& .${classes.wrapper}`]: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 1,

    ["ul"]: {
      listStyle: "none",
    },
  },

  [`& .${classes.desktopMenu}`]: {
    textDecoration: "none",
    listStyle: "none",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(5),
    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(10),
    },
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export const MobileNavToggleButton = styled(IconButton)<IconButtonProps>(
  ({ theme }) => ({
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  })
);
