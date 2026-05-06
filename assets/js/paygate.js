import { Supertab } from "https://js.sbx.supertab.co/v3/supertab.js";

// Blur/unblur helpers
const blurContent = () => {
  const inner = document.getElementById("content-inner");
  if (inner) {
    inner.classList.add("content-blurred");
    inner.setAttribute("inert", "");
    inner.setAttribute("aria-hidden", "true");
  }
  const overlay = document.getElementById("blur-overlay");
  if (overlay) overlay.style.display = "flex";
};

const unblurContent = () => {
  const inner = document.getElementById("content-inner");
  if (inner) {
    inner.classList.remove("content-blurred");
    inner.removeAttribute("inert");
    inner.removeAttribute("aria-hidden");
  }
  const overlay = document.getElementById("blur-overlay");
  if (overlay) overlay.style.display = "none";
};

// Derive site base URL from meta tag set by the layout
const baseUrl = document.querySelector('meta[name="base-url"]')?.content ?? '/';

// Initialize Supertab client
const supertabClient = new Supertab({ clientId: "test_client.be1f96ce-8ba8-42df-9615-72cfde00b051" });

// Create the paywall
let initialState, show;
try {
  ({ initialState, show } = await supertabClient.createPaywall({
    experienceId: "experience.73aab530-814a-4d3f-88db-49b9bf2734ba"
  }));
} catch (err) {
  console.error("Failed to initialize paywall. Please refresh the page or contact support if the issue persists.", err);
  unblurContent();
  throw err;
}

// Check if the user has prior entitlement
if (initialState.priorEntitlement) {
  // Insert your code to handle when user has prior entitlement when accessing the page
  console.log("User has prior entitlement", initialState.priorEntitlement);
  unblurContent();
} else {
  // Show the paywall
  const showPaywall = async () => {
    const { priorEntitlement, purchase, purchasedOffering } = await show();

    if (priorEntitlement) {
      // Insert your code to handle when user has prior entitlement
      console.log("User has prior entitlement", priorEntitlement);
      unblurContent();
    } else if (purchase && purchase.status === "completed") {
      // Insert your code to handle when user purchases an offering
      console.log("Purchase completed!", purchase);
      unblurContent();
    } else {
      // Insert your code to handle when user abandons the flow without purchase or prior entitlement
      console.log("Purchase canceled!");
      window.location.href = baseUrl;
    }
  };

  // Initially show the Paywall
  await showPaywall();

  // Handle page show event to cover bfcache scenarios
  addEventListener("pageshow", async (e) => {
    if (e.persisted) {
      blurContent();
      await showPaywall();
    }
  });
}

