import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import TopBar from "../../components/TopBar";
import { hospitalsApiSlice } from "../api/apiSlice";
import styles from "./ambulances.module.scss";
import TableItem from "./TableItem";

const AmbulancesPage = () => {
  const dispatch = useDispatch();
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        const result = dispatch(
          hospitalsApiSlice.endpoints.getAmbulances.initiate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );

        result.unwrap().then((res) => setAmbulances(res));

        result.unsubscribe();
      });
    }
  }, [setAmbulances, dispatch]);

  return (
    <div className={styles.ambulancesContainer}>
      <TopBar title="Master Data Ambulans" path="/dashboard/addambulance" />
      <div className={styles.contentContainer}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.label}>No</div>
            <div className={styles.label}>Nama Rumah Sakit</div>
            <div className={styles.label}>Nomor Telepon</div>
            <div className={styles.label}>Aksi</div>
          </div>
          <div className={styles.tableBody}>
            {ambulances?.map((ambulanceItem, ambulanceIndex) => {
              const key = `${ambulanceItem.id}_${ambulanceIndex}`;
              return (
                <TableItem
                  key={key}
                  id={ambulanceItem.id}
                  number={ambulanceIndex + 1}
                  name={ambulanceItem.name}
                  address={ambulanceItem.address}
                  distance={ambulanceItem.distance}
                  phoneNumber={ambulanceItem.phone_num}
                  data={ambulanceItem}
                  onRemove={() => {
                    setAmbulances((value) => {
                      const tempVal = [...value];
                      tempVal.splice(ambulanceIndex, 1);
                      return tempVal;
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulancesPage;
