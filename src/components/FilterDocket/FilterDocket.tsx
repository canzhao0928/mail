import styled from "@emotion/styled";
import { ClosedIcon, SelectedIcon } from "../../icons/Icons";
import React from "react";

const FilterSheet = styled.div<{ isVisible: boolean }>`
  background-color: #ffffff;
  width: 233px;
  z-index: 100;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;

  border: #e1e3e4 solid 1px;

  position: absolute;
  right: 0;
  padding: 0.5rem;

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;

  .heading {
    display: flex;
    align-items: end;
    justify-content: space-between;

    font-size: 15px;
    line-height: 18px;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 90%;
    margin: auto;
  }

  li {
    font-size: 12px;
    line-height: 15px;
    background: #e7e7e7;
    border-radius: 14px;
    padding: 0.5rem;
    margin-bottom: 0.8rem;

    display: flex;
    justify-content: space-between;
  }

  li:hover {
    background: #7979ff;
  }
`;

interface FilterProps {
  isDisplay: boolean;
  setIsDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  filtered: boolean;
  setFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  grouped: boolean;
  setGrouped: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterDocket: React.FC<FilterProps> = ({
  isDisplay,
  setIsDisplay,
  filtered,
  setFiltered,
  grouped,
  setGrouped,
}) => {
  const handleCloseFilter = (): void => {
    setIsDisplay(false);
  };

  const handleSelected = (filter: string): void => {
    if (filter === "Due Today") {
      setFiltered(true);
    }
    if (filter === "Filter By Projects") {
      setGrouped(true);
    }
  };
  return (
    <FilterSheet isVisible={isDisplay}>
      <div className="heading">
        <span>Filter Dockets</span>
        <ClosedIcon onClickEvent={handleCloseFilter} />
      </div>
      <hr />
      <ul>
        <li
          key="Filter By Projects"
          onClick={() => handleSelected("Filter By Projects")}
        >
          Filter By Projects
          {grouped && <SelectedIcon />}
        </li>
        <li key="Due Today" onClick={() => handleSelected("Due Today")}>
          Due Today
          {filtered && <SelectedIcon />}
        </li>
      </ul>
    </FilterSheet>
  );
};

export default FilterDocket;
