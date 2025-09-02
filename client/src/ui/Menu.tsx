import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiCalendar, HiOutlineHome, HiUsers } from 'react-icons/hi2';
import { BiBriefcase } from 'react-icons/bi';
import { BsFileExcel } from 'react-icons/bs';

const StyledMenu = styled.div`
  flex: 1;
  background-color: var(--color-grey-1000);
  min-height: 100vh;
  padding: 1rem;
`;

const StyledMenuItem = styled.div`
  opacity: 1;
`;

const StyledMenuText = styled.span`
  /* font-size: 1rem; */
  color: var(--color-grey-100);
  opacity: 1;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  &:link,
  &:visited {
    align-items: center;
    gap: 0.7rem;
    color: var(--color-grey-50);
    font-weight: 500;
    padding: 1rem 2.1rem;
    transition: all 0.3s;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function Menu() {
  return (
    <StyledMenu className="flex-col ">
      <StyledMenuItem className="menu-item">
        <StyledNavLink
          to="/"
          className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
        >
          <HiOutlineHome></HiOutlineHome>
          <StyledMenuText>Home</StyledMenuText>
        </StyledNavLink>
      </StyledMenuItem>
      <StyledMenuItem className="menu-item">
        <StyledNavLink
          to="/trips"
          className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
        >
          <BiBriefcase></BiBriefcase>
          <StyledMenuText>Trips</StyledMenuText>
        </StyledNavLink>
      </StyledMenuItem>
      <StyledMenuItem className="menu-item">
        <StyledNavLink
          to="/calendar"
          className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
        >
          <HiCalendar></HiCalendar>
          <StyledMenuText>Calendar</StyledMenuText>
        </StyledNavLink>
      </StyledMenuItem>
      <StyledMenuItem className="menu-item">
        <StyledNavLink
          to="/reports"
          className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
        >
          <BsFileExcel></BsFileExcel>
          <StyledMenuText>Reports</StyledMenuText>
        </StyledNavLink>
      </StyledMenuItem>
      <StyledMenuItem className="menu-item">
        <StyledNavLink
          to="/travellers"
          className={({ isActive }) => (isActive ? 'menu-item-active' : '')}
        >
          <HiUsers></HiUsers>
          <StyledMenuText>Travellers</StyledMenuText>
        </StyledNavLink>
      </StyledMenuItem>
    </StyledMenu>
  );
}
