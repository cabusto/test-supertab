const defaultSupertabConfig = {
  sdkUrl: "https://js.sbx.supertab.co/v3/supertab.js",
  clientId: "test_client.be1f96ce-8ba8-42df-9615-72cfde00b051",
  experienceId: "experience.73aab530-814a-4d3f-88db-49b9bf2734ba",
};
const allowedSdkUrls = new Set([
  "https://js.sbx.supertab.co/v3/supertab.js",
  "https://js.supertab.co/v3/supertab.js",
]);

const getSupertabMode = async () => {
  if (window.SUPERTAB_MODE) {
    return window.SUPERTAB_MODE;
  }

  return new Promise((resolve) => {
    const handleReady = () => resolve(window.SUPERTAB_MODE ?? null);

    window.addEventListener("supertabmode:ready", handleReady, { once: true });
    if (window.SUPERTAB_MODE) {
      window.removeEventListener("supertabmode:ready", handleReady);
      handleReady();
    }
  });
};

const supertabMode = await getSupertabMode();
const supertabConfig = supertabMode?.getConfig?.() ?? defaultSupertabConfig;
const sdkUrl = allowedSdkUrls.has(supertabConfig.sdkUrl) ? supertabConfig.sdkUrl : defaultSupertabConfig.sdkUrl;
const { Supertab } = await import(sdkUrl);

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
const homeUrl = supertabMode?.withMode?.(baseUrl) ?? baseUrl;

// Initialize Supertab client
const supertabClient = new Supertab({ clientId: supertabConfig.clientId });

// Create the paywall
let initialState, show;
try {
  ({ initialState, show } = await supertabClient.createPaywall({
    experienceId: supertabConfig.experienceId
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
      window.location.href = homeUrl;
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
