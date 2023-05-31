import React, { useEffect } from "react";
import styles from "../styles/AdsContainer.module.css";

const AdsContainer = (props: any) => {
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    var window: any;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  return (
    <div className={styles.container}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          overflow: "hidden",
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
        data-ad-slot="5888974435"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdsContainer;
