(() => {
  const storageKey = "supertab-mode";
  const queryParam = "supertabMode";
  const defaultMode = "test";
  const modes = {
    test: {
      label: "Test mode",
      description: "Sandbox mode using the existing test Supertab client and experience IDs.",
      sdkUrl: "https://js.sbx.supertab.co/v3/supertab.js",
      clientId: "test_client.be1f96ce-8ba8-42df-9615-72cfde00b051",
      experienceId: "experience.73aab530-814a-4d3f-88db-49b9bf2734ba",
    },
    live: {
      label: "Live mode",
      description: "Production mode using the live Supertab client and experience IDs, where real money is transferred.",
      sdkUrl: "https://js.supertab.co/v3/supertab.js",
      clientId: "live_client.bbc1fed0-ea20-4290-bbca-2d9dbdef6ea2",
      experienceId: "experience.c1eb85c5-524f-454d-8ecb-bd7ef501cfca",
    },
  };

  const normalizeMode = (value) => (value && Object.hasOwn(modes, value) ? value : null);
  const getStoredMode = () => {
    try {
      return normalizeMode(window.localStorage.getItem(storageKey));
    } catch {
      return null;
    }
  };
  const setStoredMode = (value) => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // Ignore storage failures and continue with the in-memory selection.
    }
  };

  const requestedMode = normalizeMode(new URLSearchParams(window.location.search).get(queryParam));
  const state = {
    current: requestedMode ?? getStoredMode() ?? defaultMode,
  };
  setStoredMode(state.current);

  const withMode = (href, mode = state.current) => {
    const normalizedMode = normalizeMode(mode) ?? defaultMode;

    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) {
      return href;
    }

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return href;
    }

    if (url.origin !== window.location.origin) {
      return href;
    }

    url.searchParams.set(queryParam, normalizedMode);
    return `${url.pathname}${url.search}${url.hash}`;
  };

  const updateModeDetails = () => {
    const config = modes[state.current];

    document.querySelectorAll("[data-supertab-mode-label]").forEach((element) => {
      element.textContent = config.label;
    });

    document.querySelectorAll("[data-supertab-mode-description]").forEach((element) => {
      element.textContent = config.description;
    });

    document.querySelectorAll("[data-supertab-mode-toggle]").forEach((button) => {
      const isActive = button.dataset.supertabModeToggle === state.current;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("btn-primary", isActive);
      button.classList.toggle("btn-outline-primary", !isActive);
      button.classList.toggle("active", isActive);
    });
  };

  const updateInternalLinks = () => {
    document.querySelectorAll("a[href]").forEach((link) => {
      if (link.hasAttribute("data-skip-supertab-mode")) {
        return;
      }

      const href = link.getAttribute("href");
      const nextHref = withMode(href);
      if (nextHref && nextHref !== href) {
        link.setAttribute("href", nextHref);
      }
    });
  };

  const setMode = (mode) => {
    const normalizedMode = normalizeMode(mode);
    if (!normalizedMode) {
      return;
    }

    state.current = normalizedMode;
    setStoredMode(normalizedMode);

    const nextLocation = new URL(window.location.href);
    nextLocation.searchParams.set(queryParam, normalizedMode);
    window.history.replaceState({}, "", `${nextLocation.pathname}${nextLocation.search}${nextLocation.hash}`);
    updateModeDetails();
    updateInternalLinks();
  };

  window.SUPERTAB_MODE = {
    defaultMode,
    modes,
    queryParam,
    withMode,
    setMode,
    getConfig: (mode = state.current) => modes[normalizeMode(mode) ?? defaultMode],
    getCurrentMode: () => state.current,
  };

  const initialize = () => {
    updateModeDetails();
    updateInternalLinks();

    document.querySelectorAll("[data-supertab-mode-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        setMode(button.dataset.supertabModeToggle);
      });
    });

    window.dispatchEvent(new CustomEvent("supertabmode:ready"));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
