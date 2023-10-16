import { generateData } from "../../data/data";
import styled from "@emotion/styled";
import Item from "../Item/Item";
import FilterDocket from "../FilterDocket/FilterDocket";
import { useState, useEffect } from "react";
import { TISODateTime } from "../../Model/dateFormat";
import { formatTISODate } from "../../HelperFunctions/helperFunctions";
import { Docket } from "../../Model/dockets";
import { FilterIcon } from "../../icons/Icons";
import { CloseableTag, Tag } from "../Tag/Tag";

const Container = styled.div`
  width: 80%;
  margin: 2rem auto;
  position: relative;
  @media (max-width: 600px) {
    width: 70%;
  }
`;
const Heading = styled.div`
  display: flex;
  margin-bottom: 0;
  align-items: end;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }

  .heading {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.05em;
    color: #000000;
    @media (max-width: 600px) {
      font-size: 25px;
    }
    @media (max-width: 490px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Itemlist = styled.ul`
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const Group = styled.div`
  margin-top: 4rem;
  @media (max-width: 600px) {
    margin-top: 2rem;
  }
`;

export default function Inbox() {
  const dockets: Docket[] = generateData();
  const groupedDockets = dockets.reduce((acc, item) => {
    if (!acc[item.projectSiteAddress]) {
      acc[item.projectSiteAddress] = [];
    }
    acc[item.projectSiteAddress].push(item);
    return acc;
  }, {} as { [address: string]: Docket[] });

  //state
  const [showFilter, setShowFilter] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [items, setItems] = useState(dockets);
  const [showedItems, setShowedItem] = useState(items);
  const [isGrouped, setIsGrouped] = useState(false);
  const [groupedItems, setGroupedItems] = useState(groupedDockets);

  useEffect(() => {
    //get showed items based on filter
    let newshowedItems = [...items];
    if (isFilter) {
      const today = formatTISODate(new Date());
      newshowedItems = newshowedItems.filter(
        (docket) => docket.endDate === today
      );
    }
    //calculate groupedItems
    const newGroupedItems = newshowedItems.reduce((acc, item) => {
      if (!acc[item.projectSiteAddress]) {
        acc[item.projectSiteAddress] = [];
      }
      acc[item.projectSiteAddress].push(item);
      return acc;
    }, {} as { [address: string]: Docket[] });
    setShowedItem(newshowedItems);
    setGroupedItems(newGroupedItems);
  }, [isFilter, items]);

  const deleteItem = (itemID: string) => {
    setItems((prevItems) =>
      prevItems.filter((docket) => docket.docketId !== itemID)
    );
  };

  const commenced = (index: number, date: TISODateTime) => {
    const currentItems = [...items];
    currentItems[index].commenced = date;
    setItems(currentItems);
  };

  return (
    <Container data-testid="inbox">
      <Heading>
        <span className="heading">
          Can Zhao's Inbox
          {!isFilter && !isGrouped && <CloseableTag tagName="ALL Dockets" />}
          {isFilter && (
            <CloseableTag tagName="Due Today" deleteFilter={setIsFilter} />
          )}
          {isGrouped && (
            <CloseableTag
              tagName="Filter By Projects"
              deleteFilter={setIsGrouped}
            />
          )}
        </span>

        <Filter
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        >
          <FilterIcon />
          <span>Filter</span>
        </Filter>
      </Heading>
      <hr />
      <FilterDocket
        isDisplay={showFilter}
        setIsDisplay={setShowFilter}
        filtered={isFilter}
        setFiltered={setIsFilter}
        grouped={isGrouped}
        setGrouped={setIsGrouped}
      />

      {isGrouped ? (
        //  sequence is maintained when an item is deleted
        Object.entries(groupedItems)
          .sort()
          .map(([address, groupitems]) => (
            <Group>
              <Tag tagName={address} />
              <Itemlist>
                {groupitems.map((docket, index) => {
                  return (
                    <Item
                      key={docket.docketId}
                      name={docket.docketName}
                      statusColor={docket.statusColor}
                      ID={docket.docketId}
                      deleteItem={deleteItem}
                      setCommenced={commenced}
                      index={index}
                      grouped={isGrouped}
                      projectSiteAddress={docket.projectSiteAddress}
                    ></Item>
                  );
                })}
              </Itemlist>
            </Group>
          ))
      ) : (
        <Itemlist>
          {showedItems.map((docket, index) => {
            return (
              <Item
                key={docket.docketId}
                name={docket.docketName}
                statusColor={docket.statusColor}
                ID={docket.docketId}
                deleteItem={deleteItem}
                setCommenced={commenced}
                index={index}
                grouped={isGrouped}
                projectSiteAddress={docket.projectSiteAddress}
              ></Item>
            );
          })}
        </Itemlist>
      )}
    </Container>
  );
}
