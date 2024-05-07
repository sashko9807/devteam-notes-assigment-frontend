import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Link, createLink } from "@tanstack/react-router";

type LinkButtonProps = Omit<ButtonProps, "component"> & {
  to: string;
};

function LinkButton({ to, children, ...props }: LinkButtonProps) {
  return <Button {...props}>{children}</Button>;
}

export default createLink(LinkButton);
