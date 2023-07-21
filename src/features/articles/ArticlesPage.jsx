import React from "react";

import TopBar from "../../components/TopBar";
import { useGetArticlesQuery } from "../api/apiSlice";
import TableItem from "./TableItem";

import styles from "./articles.module.scss";

const ArticlesPage = () => {
  const {
    data: articles = [],
    // isLoading,
    // isFetching,
    // isSuccess,
    // isError,
    // error,
  } = useGetArticlesQuery(1);

  return (
    <div className={styles.hospitalsContainer}>
      <TopBar title="Master Data Artikel" path="/dashboard/addarticle" />
      <div className={styles.contentContainer}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.label}>No</div>
            <div className={styles.label}>Gambar</div>
            <div className={styles.label}>Deskripsi</div>
            <div className={styles.label}>Aksi</div>
          </div>
          <div className={styles.tableBody}>
            {articles.map((articleItem, articleIndex) => {
              const key = `${articleItem.id}_${articleIndex}`;
              return (
                <TableItem
                  key={key}
                  id={articleItem.id}
                  number={articleIndex + 1}
                  category={articleItem.category}
                  title={articleItem.title}
                  text={articleItem.text}
                  date={articleItem.date}
                  image1={articleItem.image1}
                  image2={articleItem.image2}
                  image3={articleItem.image3}
                  source={articleItem.source}
                  data={articleItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;

// id
// title
// date
// category
// text
// image1
// image2
// image3
// source
