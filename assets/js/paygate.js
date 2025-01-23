// assets/js/paygate.js

<script type="module">
  import { createPaygateExperience } from "https://js.sbx.supertab.co/v2/experiences.js";

  const { show } = await createPaygateExperience({
    clientId: "test_client.22c8c287-577b-473e-b18e-60ae1f560401",
    experienceId: "experience.a722bd6c-24b0-4db5-8dde-289a90ed5dee",
    merchantName: "Github Blog",
    merchantLogoUrl: "https://imagedelivery.net/QJK89lvTX7ncD07wQAcNLQ/image.aa5b1ae6-1f7d-4c7e-baf4-1d5673e071db/public",
    onPurchaseCompleted: () => {
      //insert your code to grant user access
      console.log("Paygate completed!");
    },
    onPurchaseCanceled: () => {
      //insert your code to handle when purchase is not completed
      console.log("Paygate canceled!");
      // Check if the current path is not the root
      if (window.location.pathname !== "https://cabusto.github.io/") {
        // Redirect to the paygateRedirectUrl
        window.location.href = "https://cabusto.github.io/";
      }
    },
    onPriorEntitlement: () => {
      //insert your code to handle when user has prior entitlement
      console.log("Paygate: User has prior entitlement. Showing the content.");
    },
    onError: (error) => {
      //insert your code to handle an unexpected error
      console.error("Paygate error!", error);
    },
  })

  // The "show()" method call is an example of how to trigger the Paygate.
  // For custom behavior, use methods like "hide", "toggle", "isShowing", or "destroy".
  show();
</script>



