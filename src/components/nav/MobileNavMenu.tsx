import { Grid, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import {
  MobileNavMenuItem,
  MobileNavMenuStyled,
  classes,
} from "./styled/MobileNavMenu.styled";
import { Close } from "@mui/icons-material";
import StyledNavLink from "./StyledNavLink";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

type MobileNavProps = {
  open: boolean;
  menuToggle: () => void;
};
export default function MobileNav({ open, menuToggle }: MobileNavProps) {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = router.subscribe("onBeforeLoad", () => {
      if (open) {
        menuToggle();
      }
    });
    return unsubscribe;
  }, [open]);
  return (
    <MobileNavMenuStyled>
      <Grid className={classes.container}>
        <SwipeableDrawer
          anchor="right"
          onClose={menuToggle}
          open={open}
          onOpen={menuToggle}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          PaperProps={{ style: { width: "100%" } }}
        >
          <Grid container direction={"column"} width={"100%"}>
            <Grid
              container
              item
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ paddingLeft: 2 }}
            >
              <Grid item>
                <StyledNavLink to="/">
                  <Typography
                    variant="h5"
                    component={"span"}
                    textAlign={"center"}
                    noWrap
                  >
                    NOTE APP
                  </Typography>
                </StyledNavLink>
              </Grid>
              <Grid item>
                <IconButton onClick={menuToggle}>
                  <Close fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction={"column"}
              gap={2}
              component={"ul"}
              sx={{ padding: 0 }}
            >
              <MobileNavMenuItem item>
                <StyledNavLink to={"/dashboard"}>
                  <Typography className={classes.itemText}>
                    Dashboard
                  </Typography>
                </StyledNavLink>
              </MobileNavMenuItem>
              <MobileNavMenuItem item>
                <StyledNavLink to={"/login"}>
                  <Typography className={classes.itemText}>Login</Typography>
                </StyledNavLink>
              </MobileNavMenuItem>
              <MobileNavMenuItem item>
                <StyledNavLink to={"/register"}>
                  <Typography className={classes.itemText}>Register</Typography>
                </StyledNavLink>
              </MobileNavMenuItem>
            </Grid>
          </Grid>
        </SwipeableDrawer>
      </Grid>
    </MobileNavMenuStyled>
  );
}
