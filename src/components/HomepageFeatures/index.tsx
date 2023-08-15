import React from "react";
import styles from "./styles.module.css";

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div>
          <h3 className={styles.heading}>About me</h3>
          <p className={styles.description}>
            I am a full stack developer currently
          </p>
        </div>
      </div>
    </section>
  );
}
