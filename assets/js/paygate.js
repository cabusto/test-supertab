
     
      <script type="module">
        import { createPaygateExperience } from "https://js.sbx.supertab.co/v2/experiences.js";

        const { show } = await createPaygateExperience({
          clientId: "test_client.446dc09c-acec-487b-89e2-f8a0784285da",
          experienceId: "experience.8f8673bc-4a4d-4fb8-a7d6-0d6810c99199",
          onPurchaseCompleted: () => {
            //insert your code to grant user access
            console.log("Paygate completed!");
          },
          onPurchaseCanceled: () => {
            //insert your code to handle when purchase is not completed
            console.log("Paygate canceled!");

            // Redirect to the paygateRedirectUrl
            window.location.href = "https://cabusto.github.io/test-supertab";
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
    
    
