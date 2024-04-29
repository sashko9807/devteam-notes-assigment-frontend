import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

import AuthenticationMenu from "./AuthenticationMenu";
import {
  AppBarStyled,
  MobileNavToggleButton,
  classes,
} from "./styled/AppNavbar.styled";
import StyledNavLink from "./StyledNavLink";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import MobileNav from "./MobileNavMenu";
import theme from "../../common/theme";
import { routes } from "../../common/routes";

export function AppNavbar() {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const mobileNavMenuToggle = () => setOpenNavMenu((prev) => !prev);
  return (
    <AppBarStyled
      position="fixed"
      className={classes.container}
      component={"nav"}
      color="default"
    >
      <Toolbar className={classes.wrapper}>
        <StyledNavLink to={"/"}>
          <Typography
            variant="h5"
            component={"span"}
            textAlign={"center"}
            noWrap
          >
            NOTE APP
          </Typography>
        </StyledNavLink>
        <Grid
          container
          component={"ul"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          className={classes.desktopMenu}
          gap={2}
        >
          <Grid item component={"li"}>
            <Button component={Link} to={routes.dashboard.index}>
              <Typography variant="body1">Dashboard</Typography>
            </Button>
          </Grid>
          <Grid item component={"li"}>
            <AuthenticationMenu />
          </Grid>
        </Grid>
        <Grid className={classes.mobileMenu}>
          <MobileNavToggleButton
            theme={theme}
            onClick={mobileNavMenuToggle}
            aria-label="menu"
            aria-expanded={openNavMenu}
            aria-controls="mobile-navigation"
          >
            <Menu fontSize="large" />
          </MobileNavToggleButton>
          <MobileNav open={openNavMenu} menuToggle={mobileNavMenuToggle} />
        </Grid>
      </Toolbar>
    </AppBarStyled>
  );
}
