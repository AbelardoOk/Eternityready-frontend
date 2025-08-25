(function() {
  // ── Configuration constants ─────────────────────────────────────────────
  const RETURN_VISIT_THRESHOLD = 3;     // show popup on 3rd visit (client can change to 1,2,4,…)
  const POPUP_INTERVAL_DAYS = 7;        // days between popups (0 = visits only)
  const MESSAGE_CHOICES = [
    "Do you love Eternity Ready?",
    "Stay connected—sign up for our newsletter!",
    "Your support keeps us going!"
  ];
  const SELECTED_MESSAGE_INDEX = 0;     // 0, 1, or 2
  const DONATION_URL = "https://eternityready.com/donate";
  const LOGO_URL = "https://eternityready.com/uploads/custom-logo.png";
  const POPUP_BG_OPACITY = 0.0;        // use for container background (Effectively transparent, was 0.85)
  const CONTENT_BG_OPACITY = 0.70;      // use for content background (Changed from 0.76 to 0.50)
  const OVERLAY_BG_OPACITY = 0.10;      // use for overlay (Changed from 0.60 to 0.10)
  const Z_INDEX_OVERLAY = 9998;
  const Z_INDEX_POPUP = 9999;
  // ────────────────────────────────────────────────────────────────────────

  // Feature detection: if localStorage is unavailable, do nothing
  if (!window.localStorage) {
    console.warn("Eternity Popup: localStorage is not available. Popup will not function.");
    return;
  }

  // 1. Increment visit count
  let visitCount = parseInt(localStorage.getItem("eternity_visit_count") || "0", 10);
  visitCount++;
  localStorage.setItem("eternity_visit_count", visitCount.toString());

  // 2. If user checked “don’t show again,” bail out
  if (localStorage.getItem("eternity_never_show_again") === "true") {
    return;
  }

  // 3. If visits < threshold, do nothing
  if (visitCount < RETURN_VISIT_THRESHOLD) {
    return;
  }

  // 4. Check days since last shown
  let lastShown = parseInt(localStorage.getItem("eternity_last_shown") || "0", 10);
  const now = Date.now();
  const daysSince = (now - lastShown) / (1000 * 60 * 60 * 24);

  // If never shown OR interval elapsed OR clock went backwards
  if (lastShown === 0 || daysSince >= POPUP_INTERVAL_DAYS || now < lastShown) {
    showPopup();
  }

  // ────────────────────────────────────────────────────────────────────────
  function showPopup() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "eternity-popup-overlay";
    overlay.style.backgroundColor = `rgba(0,0,0,${OVERLAY_BG_OPACITY})`;
    overlay.style.zIndex = Z_INDEX_OVERLAY.toString(); // Ensure zIndex is a string

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.id = "eternity-popup-container"; // Changed from 'eternity-popup'
    popupContainer.style.backgroundColor = `rgba(0,0,0,${POPUP_BG_OPACITY})`; // Uses POPUP_BG_OPACITY (now 0.0)
    popupContainer.style.zIndex = Z_INDEX_POPUP.toString(); // Ensure zIndex is a string

    // Build Top Bar
    const topBar = document.createElement("div");
    topBar.id = "eternity-popup-topbar";

    const logoDiv = document.createElement("div");
    logoDiv.id = "eternity-popup-logo-container";
    const logoImg = document.createElement("img");
    logoImg.src = LOGO_URL;
    logoImg.alt = "Eternity Ready Logo";
    logoDiv.appendChild(logoImg);

    const closeDiv = document.createElement("div");
    closeDiv.id = "eternity-popup-close-container";
    const closeSpan = document.createElement("span");
    closeSpan.innerHTML = "&times;";
    closeDiv.appendChild(closeSpan);

    topBar.appendChild(logoDiv);
    topBar.appendChild(closeDiv);

    // Build Content Area
    const content = document.createElement("div");
    content.id = "eternity-popup-content";
    content.style.backgroundColor = `rgba(0,0,0,${CONTENT_BG_OPACITY})`;

    const heading = document.createElement("h2");
    heading.id = "eternity-popup-heading";
    // Ensure MESSAGE_CHOICES[SELECTED_MESSAGE_INDEX] is valid
    heading.textContent = MESSAGE_CHOICES[SELECTED_MESSAGE_INDEX] || "Default Heading";


    const subheading = document.createElement("p");
    subheading.id = "eternity-popup-subheading";
    // This subheading is static in the provided JS.
    // If it needs to be dynamic like MESSAGE_CHOICES, the config constants would need another array.
    subheading.textContent = "Sign up for updates!"; 
    
    // Email + Sign Up
    const emailContainer = document.createElement("div");
    emailContainer.id = "eternity-popup-email-container";
    const emailInput = document.createElement("input");
    emailInput.id = "eternity-popup-email";
    emailInput.type = "email";
    emailInput.placeholder = "Your email address";
    emailInput.setAttribute("aria-label", "Your email address");
    const signupBtn = document.createElement("button");
    signupBtn.id = "eternity-popup-signup";
    signupBtn.textContent = "Sign Up";
    emailContainer.appendChild(emailInput);
    emailContainer.appendChild(signupBtn);

    // Donate Button (Removed)
    // const donateBtn = document.createElement("button");
    // donateBtn.id = "eternity-popup-donate";
    // const donateIcon = document.createElement("div");
    // donateIcon.id = "eternity-popup-donate-icon";
    // donateBtn.appendChild(donateIcon);
    // donateBtn.appendChild(document.createTextNode("Donate"));

    // Close Button (red, at the bottom of content) - Repurposed as Donate Button
    const redCloseBtn = document.createElement("button");
    redCloseBtn.id = "eternity-popup-close-button"; // ID kept for styling
    redCloseBtn.textContent = "Donate";

    // “Don’t show again” checkbox
    const optionsDiv = document.createElement("div");
    optionsDiv.id = "eternity-popup-options";
    const neverCheckbox = document.createElement("input");
    neverCheckbox.type = "checkbox";
    neverCheckbox.id = "eternity-popup-never";
    const neverLabel = document.createElement("label");
    neverLabel.htmlFor = "eternity-popup-never";
    neverLabel.id = "eternity-popup-never-label";
    neverLabel.textContent = "Do not show me this popup window later";
    optionsDiv.appendChild(neverCheckbox);
    optionsDiv.appendChild(neverLabel);

    // Append all content elements, respecting exact order and spacing
    content.appendChild(heading);
    content.appendChild(subheading);
    content.appendChild(emailContainer);
    // content.appendChild(donateBtn); // Original donate button removed
    content.appendChild(redCloseBtn);
    content.appendChild(optionsDiv);

    popupContainer.appendChild(topBar);
    popupContainer.appendChild(content);
    overlay.appendChild(popupContainer);
    document.body.appendChild(overlay);

    // Disable body scroll while popup is open
    document.body.style.overflow = "hidden";

    // Event listeners:

    // 1) Click on red circle “×” in top bar
    closeDiv.addEventListener("click", () => {
      closePopup();
    });

    // 2) Click on red “Donate” button (at the bottom, formerly "Close")
    redCloseBtn.addEventListener("click", () => {
      window.location.href = DONATION_URL; 
    });

    // 3) Click on overlay outside popupContainer
    // Refined listener for overlay click to prevent closing on popup drag attempt
    let mousedownTargetIsOverlay = false;
    overlay.addEventListener("mousedown", (event) => {
      if (event.target === overlay) {
        mousedownTargetIsOverlay = true;
      } else {
        mousedownTargetIsOverlay = false;
      }
    });
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay && mousedownTargetIsOverlay) {
        closePopup();
      }
      mousedownTargetIsOverlay = false; // Reset for next click sequence
    });
    
    // 4) “Don’t show again” checkbox
    neverCheckbox.addEventListener("change", () => {
      if (neverCheckbox.checked) {
        localStorage.setItem("eternity_never_show_again", "true");
      } else {
        // As per spec, only set true. To allow unchecking to re-enable,
        // one might use removeItem or set to "false".
        // The provided spec implies once checked, it stays.
        // For reversibility:
        localStorage.removeItem("eternity_never_show_again");
      }
    });

    // 5) “Sign Up” button click
    signupBtn.addEventListener("click", async () => {
      const userEmail = emailInput.value.trim();

      if (!userEmail) {
        alert("Please enter an email address.");
        return; // Don't proceed further
      }

      // Get the subscription endpoint URL from the global configuration
      const endpointUrl = window.eternityPopupConfig && window.eternityPopupConfig.subscribeEndpointUrl;

      if (!endpointUrl) {
        console.error("Eternity Popup: Subscription endpoint URL is not configured. Please define window.eternityPopupConfig.subscribeEndpointUrl on your page.");
        alert("Subscription service is not configured for this website.");
        return; // Don't proceed further
      }

      // Optional: Basic client-side email format check (server should also validate)
      // if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
      //   alert("Please enter a valid email format.");
      //   return;
      // }

      try {
        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        // Try to parse JSON, but handle cases where response might not be JSON
        let resultMessage = 'Subscription status: ' + response.status;
        try {
            const result = await response.json();
            resultMessage = result.message || resultMessage;
        } catch (e) {
            // If response is not JSON, use the raw text or a generic message
            if (response.statusText) {
                resultMessage = response.statusText;
            }
            console.warn('Eternity Popup: Subscription response was not valid JSON.');
        }

        if (response.ok) {
          alert(resultMessage || 'Subscribed successfully!');
          emailInput.value = ""; // Clear the input field
          closePopup();
          localStorage.setItem("eternity_newsletter_impression", Date.now().toString());
        } else {
          alert(resultMessage || 'Subscription failed. Please try again.');
          // Optionally, do not close popup on failure, or handle differently
        }
      } catch (error) {
        console.error('Error subscribing email via fetch:', error);
        alert('Subscription request failed. Please check your connection or if the endpoint is correct.');
        // Optionally, do not close popup on network error
      }
    });

    // 6) “Donate” button click (Original button and its listener removed)
    // donateBtn.addEventListener("click", () => {
    //   window.location.href = DONATION_URL;
    //   // Optionally close popup after redirect attempt, though page will change
    //   // closePopup(); 
    // });

    // Helper to close popup
    function closePopup() {
      localStorage.setItem("eternity_last_shown", Date.now().toString());
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      document.body.style.overflow = "";
    }
  }
})();
