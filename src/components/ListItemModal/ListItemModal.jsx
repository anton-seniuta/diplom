import "./listItemModal.css";

export const ListItemModal = ({ onClose, selectedRequest, onDelete }) => {
  const onPopUpClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={onPopUpClick}>
        <div className="request">
          <div className="contract component">
            {selectedRequest.contractNumber}
            <br />
            {selectedRequest.phoneNumber}
          </div>
          <div className="adress component">
            {selectedRequest.name}
            <br />
            {selectedRequest.address}
            <br />
            {selectedRequest.contactNumber}
          </div>
          <div className="date component">
            {new Date(selectedRequest.date).toLocaleDateString()}
            <br />
            {selectedRequest.timeInterval}
          </div>
          <div className="about component">{selectedRequest.about}</div>
        </div>
        <button className="modalButton" onClick={() => onDelete(selectedRequest.id)}>
          Удалить
        </button>
        <button className="modalButton" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
