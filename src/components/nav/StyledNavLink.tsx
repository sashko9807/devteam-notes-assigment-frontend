import { Link, LinkProps } from "@tanstack/react-router";
import theme from "../../common/theme";

type StyledNavLinkProps = LinkProps;
const StyledNavLink = ({ children, ...props }: StyledNavLinkProps) => (
  <Link
    {...props}
    style={{ textDecoration: "none", color: theme.palette.common.black }}
  >
    {children}
  </Link>
);

export default StyledNavLink;
