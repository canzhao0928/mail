import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon } from "../../icons/Icons";

const Navlist = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  gap: 0.8rem;

  a {
    text-decoration: none;
    color: black;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.02em;
    &.active {
      font-weight: 600;
    }
  }
`;

export default function Navbar() {
  const links = [
    { name: "Inbox", path: "/inbox" },
    { name: "Files", path: "/files" },
  ];
  return (
    <Navlist data-testid="navbar">
      <LogoIcon />
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            to={link.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </Navlist>
  );
}
