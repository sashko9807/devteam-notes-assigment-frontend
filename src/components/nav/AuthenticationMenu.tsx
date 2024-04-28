import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonIcon from "@mui/icons-material/Person";

import StyledNavLink from "./StyledNavLink";

export default function AuthenticationMenu() {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <Button
        onClick={openMenu}
        size="medium"
        color="inherit"
        aria-label="authentication"
        endIcon={
          open ? (
            <ArrowDropUpIcon color="primary" />
          ) : (
            <ArrowDropDownIcon color="primary" />
          )
        }
      >
        <PersonIcon />
      </Button>
      <Menu
        disableScrollLock={true}
        open={Boolean(anchorEl)}
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        onKeyDown={(e) => {
          const targetElement = e.nativeEvent.target as HTMLElement;
          const firstChild = targetElement.firstChild as HTMLAnchorElement;
          if (e.key === "Enter" && firstChild) {
            firstChild.click();
            handleClose();
          }
        }}
      >
        <MenuItem>
          <StyledNavLink to="/login">
            <Typography>Login</Typography>
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/register">Register</StyledNavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
