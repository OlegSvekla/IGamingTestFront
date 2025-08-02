import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export function HandleHttpError(error: unknown) {
  const { t } = useTranslation("translation", {
    keyPrefix: "http",
  });
  
  const err = error as AxiosError;

  if (err.response) {
    const status = err.response.status;

    switch (true) {
      case status === 400:
        alert(t("400"));
        break;
      case status === 404:
        alert(t("404"));
        break;
      case status >= 500:
        alert(t("5xx"));
        break;
      default:
        alert(t("unexpected", { status }));
    }

    console.error(`HTTP ${status}:`, err.response.data);
  } else if (err.request) {
    alert(t("noResponse"));
    console.error("Request was sent, but no response received:", err.request);
  } else {
    alert(t("unknown"));
    console.error("Error while setting up the request:", err.message);
  }
}
