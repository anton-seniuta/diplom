import listItem from "./listItem.module.css";

// Структура заявки
export const ListItem = ({ contractNumber, phoneNumber, name, address, contactNumber, date, timeInterval, about, id, masterId, selected, onClick, mastersNames }) => {
  return (
    <li className={listItem.requestContainer} onClick={() => onClick(id)}>
      <div className={listItem.listItemRequest}>
        <div className={listItem.listItemColumn}>
          {contractNumber}
          <br />
          {phoneNumber}
        </div>
        <div className={listItem.listItemColumn}>
          {name}
          <br />
          {address}
          <br />
          {contactNumber}
        </div>
        <div className={listItem.listItemColumn}>
          {new Date(date).toLocaleDateString()}
          <br />
          {timeInterval}
        </div>
        <div className={listItem.listItemColumn}>{mastersNames[masterId-1]}</div>
      </div>
    </li>
  );
};
