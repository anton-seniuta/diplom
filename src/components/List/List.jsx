import { ListItem } from '../ListItem/ListItem.jsx';
import list from './list.module.css';

//Компонент List отображает список заявок (requests) с помощью компонента ListItem, который отображает каждый элемент списка
export const List = ({ requests, selectedRequest, onSelect, mastersNames}) => {
  return (
    <>
      <ul className={list.requestList}>
        {requests.map((request, index) => (
          <ListItem
            key={index}
            {...request}
            selected={request?.id === selectedRequest?.id}
            onClick={onSelect}
            mastersNames={mastersNames}
          />
        ))}
      </ul>
    </>
  );
};
