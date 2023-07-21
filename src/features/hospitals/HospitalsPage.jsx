import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TopBar from "../../components/TopBar";
import { useGetHospitalsQuery } from "../api/apiSlice";
import { selectData } from "./hospitalsSlice";
import TableItem from "./TableItem";

import styles from "./hospitals.module.scss";

const HospitalsPage = () => {
  const { window, status } = useParams();
  useGetHospitalsQuery({
    latitude: 4.59061,
    longitude: 99.69684,
    window,
    status,
  });

  const hospitals = useSelector(selectData);

  return (
    <div className={styles.hospitalsContainer}>
      <TopBar
        title="Master Data Rumah Sakit"
        path={`/dashboard/addHospitals/${window}/${status}`}
      />
      <div className={styles.contentContainer}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.label}>No</div>
            <div className={styles.label}>Nama Rumah Sakit</div>
            <div className={styles.label}>Nomor Telepon</div>
            <div className={styles.label}>Aksi</div>
          </div>
          <div className={styles.tableBody}>
            {hospitals.map((hospitalItem, hospitalIndex) => {
              const key = `${hospitalItem.id}_${hospitalIndex}`;
              return (
                <TableItem
                  key={key}
                  id={hospitalItem.id}
                  number={hospitalIndex + 1}
                  name={hospitalItem.name}
                  address={hospitalItem.address}
                  image={hospitalItem.image}
                  phoneNumber={hospitalItem.phone_num}
                  bpjsStatus={hospitalItem.bpjs_status}
                  windowParam={window}
                  statusParam={status}
                  data={hospitalItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalsPage;
