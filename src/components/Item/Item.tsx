import styled from "@emotion/styled";
import { useState } from "react";
import { TISODateTime } from "../../Model/dateFormat";
import { formatTISODateTime } from "../../HelperFunctions/helperFunctions";
import { DeleteIcon, CommenceIcon, TickIcon } from "../../icons/Icons";
import { Tag } from "../Tag/Tag";

const Hovericon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-95%);
  padding: 1rem;
  display: flex;
  gap: 5px;
  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;
const ItemContainer = styled.li<{ borderColor: string }>`
  background-color: #f5f6f7;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  &:hover {
    background: #f0f1f4;
  }

  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 1.2;
    padding: 0.5rem;
  }

  position: relative;

  display: flex;
  align-items: center;

  color: #000000;
  ::before {
    content: "";
    border: 2.5px solid ${(props) => props.borderColor};
    display: inline-block;
    width: 12px;
    height: 12px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 7.5px;
    margin-right: 12px;
    @media (max-width: 600px) {
      width: 8px;
      height: 8px;
      margin-right: 5px;
    }
  }
`;

interface ItemProps {
  name: string;
  statusColor: string;
  ID: string;
  deleteItem: (item: string) => void;
  setCommenced: (index: number, date: TISODateTime) => void;
  index: number;
  grouped: boolean;
  projectSiteAddress: string;
}

export default function Item(props: ItemProps) {
  const [isHovered, setIsHover] = useState(false);
  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleDelete = () => {
    props.deleteItem(props.ID);
  };

  const handleCommenced = () => {
    const currentDate = new Date();
    const date = formatTISODateTime(currentDate);
    props.setCommenced(props.index, date);
  };

  return (
    <ItemContainer
      borderColor={props.statusColor}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseLeave}
    >
      {props.name}
      {isHovered && (
        <Hovericon>
          <DeleteIcon onClickEvent={handleDelete} />
          <TickIcon />
          <CommenceIcon onClickEvent={handleCommenced} />
        </Hovericon>
      )}
      {!props.grouped && (
        <Tag tagName={props.projectSiteAddress} position="end" />
      )}
    </ItemContainer>
  );
}
