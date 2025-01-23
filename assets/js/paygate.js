// assets/js/paygate.js
import { createPaygateExperience } from "https://js.sbx.supertab.co/v2/experiences.js";

const { show } = await createPaygateExperience({
  clientId: "test_client.22c8c287-577b-473e-b18e-60ae1f560401",
  experienceId: "experience.a722bd6c-24b0-4db5-8dde-289a90ed5dee",
  merchantName: "Github Blog",
  merchantLogoUrl: "https://imagedelivery.net/QJK89lvTX7ncD07wQAcNLQ/image.aa5b1ae6-1d5673e071db/public",
  onPurchaseCompleted: () => {
    console.log("Paygate completed!");
  },
  onPurchaseCanceled: () => {
    console.log("Paygate canceled!");
    if (window.location.pathname !== "https://cabusto.github.io/test-supertab") {
      window.location.href = "https://cabusto.github.io/test-supertab";
    }
  },
  onPriorEntitlement: () => {
    console.log("Paygate: User has prior entitlement. Showing the content.");
  },
  onError: (error) => {
    console.error("Paygate error!", error);
  },
});

show();
