import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { List } from "../components/List/List.jsx";
import { Header } from "../components/Header/Header.jsx";
import { ListItemModal } from "../components/ListItemModal/ListItemModal.jsx";
import "./MainPage.css";

const mapState = {
  center: [53.906761, 27.561822],
  zoom: 5,
};

function Main() {
  const mastersNames = ["Пупкин В", "Сидоров П", "Ломов И", "Пашков П", "Мишкин К"];
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [jsonUser, setJsonUser] = useState({});
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setJsonUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (jsonUser.id) {
      setSelectedMasterId(jsonUser.id);
    } else {
      setSelectedMasterId("all");
    }
  }, [jsonUser]);

  const ymaps = useYMaps(["route", "templateLayoutFactory"]);
  const [myCoords, setMyCoords] = useState([53.906761, 27.561822]);
  const map = useRef(null);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedMasterId, setSelectedMasterId] = useState("all");

  const mastersIds = useMemo(() => {
    return [...new Set(requests.map((request) => request.masterId))].sort((a, b) => a - b);
  }, [requests]);

  const filteredRequests = useMemo(() => {
    if (selectedMasterId === "all") {
      return requests;
    }
    return requests.filter((request) => request.masterId === selectedMasterId);
  }, [requests, selectedMasterId]);

  const handleChoiceRequest = (id) => {
    const existRequest = requests.find((request) => request.id === id);
    if (existRequest) {
      setSelectedRequest(existRequest);
    }
  };

  const handleChangeSelectedId = ({ target: { value } }) => {
    setSelectedMasterId(value === "all" ? value : Number(value));
  };

  const onUpdate = () => {
    fetch("https://diploma-be.onrender.com/api/requests")
      .then((response) => response.json())
      .then(({ data }) => setRequests(data))
      .finally(() => setLoading(false));
  };

  const getCoordsByAddress = async (address) => {
    const url = new URL("https://geocode-maps.yandex.ru/1.x/");
    url.search = new URLSearchParams({
      apikey: "f350c3e7-a0ff-4eab-b0ec-c1e91e7ad76b",
      geocode: address,
      format: "json",
    }).toString();
    try {
      const response = await fetch(url);
      const data = await response.json();
      const coords = data?.response.GeoObjectCollection.featureMember?.[0]?.GeoObject.Point.pos.split(" ");
      return coords.reverse();
    } catch (error) {
      console.log("yandex api error: ", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMyCoords([latitude, longitude]);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    setLoading(true);
    onUpdate();
  }, []);

  useEffect(() => {
    const geocode = "минск, проспект Независимости, 119";
    const t = ymaps?.geocode?.(geocode);
  }, [selectedRequest]);

  useEffect(() => {
    if (selectedMasterId === "all") {
      return;
    }
    const allCoords = filteredRequests.map(({ address }) => address);

    if (myCoords.length === 2) {
      allCoords.unshift(myCoords.join(","));
    }

    if (ymaps) {
      const route = ymaps.route;
      route(allCoords, { mapStateAutoApply: true }).then((r) => {
        try {
          r.getWayPoints().each((wayPoint, index) => {
            if (index === 0) {
              wayPoint.properties.set("iconContent", "Я здесь!");
            } else {
              wayPoint.properties.set("iconContent", `${index}`);
            }
            wayPoint.options.set("preset", "islands#blackStretchyIcon");
          });
          r.getPaths().options.set({
            strokeColor: "0000ff",
            opacity: 0.5,
          });
        } catch (err) {
          console.log("set options: ", err);
        }
        map.current.geoObjects.add(r);
      });
    }
  }, [ymaps, selectedMasterId, myCoords]);

  if (!requests.length && loading) {
    return <div className="loader"></div>;
  }

  const onClose = () => {
    setSelectedRequest(null);
  };
  const handleDeleteItem = async (id) => {
    const response = await fetch(`https://diploma-be.onrender.com/api/requests/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onUpdate();
      onClose();
    }
  };

  return (
    <>
      <Header onChangeSelectedId={handleChangeSelectedId} mastersIds={mastersIds} onUpdate={onUpdate} selectedId={selectedMasterId} mastersNames={mastersNames} />
      <div className="app">
        <List requests={filteredRequests} selectedRequest={selectedRequest} onSelect={handleChoiceRequest} mastersNames={mastersNames} />
        <div className="map">
          <Map className="mapContainer" state={mapState} instanceRef={map} key={selectedMasterId}></Map>
          {selectedRequest && <pre>{JSON.stringify(selectedRequest)}</pre>}
          {selectedRequest && <ListItemModal selectedRequest={selectedRequest} onClose={onClose} onDelete={handleDeleteItem} />}
        </div>
      </div>
    </>
  );
}

export default Main;
