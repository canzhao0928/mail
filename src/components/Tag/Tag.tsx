import styled from "@emotion/styled";
import { FC } from "react";
import { useState } from "react";

const CloseableTagStyle = styled.span<{ isVisible: boolean }>`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  letter-spacing: 0.05em;

  color: #000000;

  background: #eff0f4;
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  margin-left: 2rem;

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;

  @media (max-width: 600px) {
    margin-left: 0.5rem;
  }

  position: relative;
  svg {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
`;
interface CloseableTagProps {
  tagName: string;
  deleteFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CloseableTag: FC<CloseableTagProps> = ({
  tagName,
  deleteFilter = () => {},
}) => {
  const [closed, setClosed] = useState(false);
  const handleCloseTag = () => {
    setClosed(true);
    deleteFilter(false);
  };
  return (
    <CloseableTagStyle isVisible={!closed} onClick={handleCloseTag}>
      {tagName}
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 0C8.53757 0 11 2.46243 11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0ZM3.81807 3.33193L3.79016 3.30687C3.66482 3.20604 3.48518 3.20604 3.35984 3.30687L3.33193 3.33193L3.30687 3.35984C3.20604 3.48518 3.20604 3.66482 3.30687 3.79016L3.33193 3.81807L5.01408 5.5L3.33193 7.18193L3.30687 7.20984C3.20604 7.33518 3.20604 7.51482 3.30687 7.64016L3.33193 7.66807L3.35984 7.69313C3.48518 7.79396 3.66482 7.79396 3.79016 7.69313L3.81807 7.66807L5.5 5.98593L7.18193 7.66807L7.20984 7.69313C7.33518 7.79396 7.51482 7.79396 7.64016 7.69313L7.66807 7.66807L7.69313 7.64016C7.79396 7.51482 7.79396 7.33518 7.69313 7.20984L7.66807 7.18193L5.98593 5.5L7.66807 3.81807L7.69313 3.79016C7.79396 3.66482 7.79396 3.48518 7.69313 3.35984L7.66807 3.33193L7.64016 3.30687C7.51482 3.20604 7.33518 3.20604 7.20984 3.30687L7.18193 3.33193L5.5 5.01408L3.81807 3.33193L3.79016 3.30687L3.81807 3.33193Z"
          fill="#212121"
        />
      </svg>
    </CloseableTagStyle>
  );
};

const TagStyle = styled.span<{ $colorGroup: string; $position: string }>`
  padding: 0.5rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  border-radius: 12px;
  ${(props) => {
    if (props.$colorGroup === "10 Riddle Street, Bentleigh") {
      return `
    color: #19345c;
  background: #a4c8ff;
      `;
    } else if (props.$colorGroup === "26 Melrose Dr, Mont Albert") {
      return `
    color: #8C4698;
  background: #F09CFE;
      `;
    } else if (props.$colorGroup === "47 Tennyson Ave Clayton South") {
      return `
    color: #008080;
  background: #B2DFDB;
      `;
    } else if (props.$colorGroup === "178 Ludstone Street Hampton") {
      return `
    color: #064E8E;
  background: #FFF5E1;
      `;
    }
  }}

  ${(props) => {
    if (props.$position === "end") {
      return `
      position: absolute;
  right: 50px;
  @media (max-width: 600px) {
    right:10px;
    font-size: 8px;
  line-height: 1.2;
  padding: 0.2rem;
  }
      `;
    }
  }}
`;

interface TagProps {
  tagName: string;
  position?: string;
}

export const Tag: FC<TagProps> = ({ tagName, position = "default" }) => {
  return (
    <TagStyle $colorGroup={tagName} $position={position}>
      {tagName}
    </TagStyle>
  );
};
