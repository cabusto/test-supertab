// assets/js/paygate.js

    import { createPaygateExperience } from "https://js.sbx.supertab.co/v2/experiences.js";

    const { show } = await createPaygateExperience({
      clientId: "test_client.22c8c287-577b-473e-b18e-60ae1f560401",
      experienceId: "experience.9d0e463d-4f6a-4b12-9f28-054020486019",
      onPurchaseCompleted: () => {
        //insert your code to grant user access
        console.log("Paygate completed!");
      },
      onPurchaseCanceled: () => {
        //insert your code to handle when purchase is not completed
        console.log("Paygate canceled!");

        // Redirect to the paygateRedirectUrl
        window.location.href = "https://cabusto.github.io";
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

    






