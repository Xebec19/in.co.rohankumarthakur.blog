import React, { useEffect } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function loadClarity(clarityID: string) {
  if (!clarityID) {
    return;
  }

  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", clarityID);
}

export default function Root({ children }: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  const clarityID = siteConfig.customFields.clarityID as string;

  useEffect(() => {
    const cookieValue = getCookieConsentValue();
    if (cookieValue === "true") {
      loadClarity(clarityID);
    }
  }, []);

  return (
    <>
      {children}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="docusaurusCookieConsent"
        style={{
          background: "var(--ifm-background-surface-color)",
          color: "var(--ifm-font-color-base)",
          fontSize: "14px",
          padding: "1rem 2rem",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          borderTop: "1px solid var(--ifm-color-emphasis-200)",
          alignItems: "center",
        }}
        buttonStyle={{
          background: "var(--ifm-color-primary)",
          color: "var(--ifm-color-emphasis-0)",
          borderRadius: "6px",
          padding: "8px 20px",
          fontWeight: 600,
          fontSize: "14px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s ease-in-out, transform 0.1s",
        }}
        declineButtonStyle={{
          background: "transparent",
          color: "var(--ifm-font-color-base)",
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: "6px",
          padding: "8px 20px",
          fontWeight: 500,
          fontSize: "14px",
          cursor: "pointer",
          marginLeft: "10px",
          transition: "background 0.2s ease-in-out, transform 0.1s",
        }}
        buttonWrapperClasses="flex gap-3"
        expires={150}
        onAccept={() => {
          loadClarity(clarityID);
        }}
      >
        <span style={{ lineHeight: 1.6 }}>
          This website uses cookies to enhance the user experience.
        </span>
      </CookieConsent>
    </>
  );
}
