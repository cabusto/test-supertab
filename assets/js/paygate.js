
    <script type="module">
      import { Supertab } from "https://js.sbx.supertab.co/v3/supertab.js";

      // Initialize Supertab client
      const supertabClient = new Supertab({ clientId: "test_client.be1f96ce-8ba8-42df-9615-72cfde00b051" });

      // Create the paywall
      const { initialState, show } = await supertabClient.createPaywall({
        experienceId: "experience.73aab530-814a-4d3f-88db-49b9bf2734ba"
      });

      // Check if the user has prior entitlement
      if (initialState.priorEntitlement) {
        // Insert your code to handle when user has prior entitlement when accessing the page
        console.log("User has prior entitlement", initialState.priorEntitlement);
      } else {
        // Show the paywall
        const showPaywall = async () => {
          const { priorEntitlement, purchase, purchasedOffering } = await show();
    
          if (priorEntitlement) {
            // Insert your code to handle when user has prior entitlement
            console.log("User has prior entitlement", priorEntitlement);
          } else if (purchase && purchase.status === "completed") {
            // Insert your code to handle when user purchases an offering
            console.log("Purchase completed!", purchase);
          } else {
            // Insert your code to handle when user abandons the flow without purchase or prior entitlement
            console.log("Purchase canceled!");
            window.location.href = "https://cabusto.github.io/test-supertab";
          }
        }

        // Initially show the Paywall
        await showPaywall()

        // Handle page show event to cover bfcache scenarios
        addEventListener("pageshow", async (e) => e.persisted && showPaywall());
      }
    </script>
  
