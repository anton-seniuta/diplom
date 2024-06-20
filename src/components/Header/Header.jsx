import header from "./header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ mastersIds, onChangeSelectedId, onUpdate, selectedId, mastersNames }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);

  const onDeleteAll = async () => {
    const response = await fetch("https://diploma-be.onrender.com/api/requests", {
      method: "DELETE",
    });
    if (response.ok) {
      onUpdate();
    }
  };

  const onChange = async ({ target }) => {
    const file = target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("https://diploma-be.onrender.com/api/upload/requests", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
        console.log(data);
        alert(data.message);
      if (data.message === "Success") {
        onUpdate();
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={header.header}>
      <div className={header.sides}>
        {!jsonUser?.id ? (
          <>
            <div className={header.containerSel}>
              <select className={header.sel} value={selectedId} onChange={onChangeSelectedId}>
                <option key="all" value="all">
                  Все заявки
                </option>
                {mastersIds.map((masterId, index) =>
                  masterId === 0 ? (
                    <option key={masterId} value="0">
                      Свободные
                    </option>
                  ) : (
                    <option key={masterId} value={masterId}>
                      {mastersNames[masterId - 1]}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className={header.containerBtn} onClick={onDeleteAll}>
              <button className={header.btn}>Удалить все</button>
            </div>
            <div className={header.containerBtn}>
              <label className={header.btn} htmlFor="json">
                Загрузить
                <input className={`${header.fileInput}`} type="file" id="json" accept="application/json" onChange={onChange} />
              </label>
            </div>
          </>
        ) : null}
      </div>
      <div className={header.sides}>
        <div className={`${header.containerBtn} ${header.btnToLeft}`} onClick={logOut}>
          <button className={header.btnLeave}>Выйти</button>
        </div>
      </div>
    </div>
  );
};
