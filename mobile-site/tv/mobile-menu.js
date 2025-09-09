document.addEventListener("DOMContentLoaded", function () {
    // Select all menu items with the class 'has-arrow spaceing'
    const menuItems = document.querySelectorAll('.has-arrow.spaceing');

    // Handler for menu item click
    function handleMenuItemClick(e) {
        // Get references to the menu link and arrow icon
        const menuLink = this.querySelector('a');
        const arrowIcon = this.querySelector('.arrow-icon');

        // Check if the click is on the menu item, menu link, or arrow icon
        if (e.target === this || e.target === menuLink || e.target === arrowIcon || e.target.closest('.arrow-icon')) {
            e.preventDefault(); // Prevent default behavior for toggling

            const parentMenuItem = this;
            const isOpen = parentMenuItem.classList.toggle('open');

            // Update ARIA attribute for accessibility
            parentMenuItem.setAttribute('aria-expanded', isOpen);

            // Optionally close other menus
            closeOtherMenus(parentMenuItem);
        } else {
            // Click is inside the dropdown (e.g., on a link), allow default behavior
        }
    }


    // Handler for document click
    function handleDocumentClick(e) {
        if (!e.target.closest('.has-arrow.spaceing')) {
            // Close all open dropdowns
            menuItems.forEach(function (menuItem) {
                menuItem.classList.remove('open');
                menuItem.setAttribute('aria-expanded', 'false');
            });
        }
    }

    // Function to close other open menus
    function closeOtherMenus(currentMenuItem) {
        menuItems.forEach(function (menuItem) {
            if (menuItem !== currentMenuItem) {
                menuItem.classList.remove('open');
                menuItem.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Function to initialize the mobile menu
    function initMobileMenu() {
        menuItems.forEach(function (menuItem) {
            menuItem.addEventListener('click', handleMenuItemClick);
        });

        document.addEventListener('click', handleDocumentClick);
    }

    // Function to destroy the mobile menu event listeners
    function destroyMobileMenu() {
        menuItems.forEach(function (menuItem) {
            menuItem.removeEventListener('click', handleMenuItemClick);

            // Close any open dropdowns
            menuItem.classList.remove('open');
            menuItem.setAttribute('aria-expanded', 'false');
        });

        document.removeEventListener('click', handleDocumentClick);
    }

    // Function to check screen width and initialize/destroy mobile menu
    function checkScreenWidth() {
        if (window.innerWidth <= 1025) {
            initMobileMenu();
        } else {
            destroyMobileMenu();
        }
    }

    // Initial check
    checkScreenWidth();

    // Listen for window resize events (with debounce to improve performance)
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkScreenWidth, 200);
    });

    document.addEventListener("click", (event) => {
        // Check if the parent element of the target has the class "has-right-arrow"
        if (event.target.parentElement && event.target.parentElement.classList.contains("has-right-arrow")) {
          event.preventDefault(); // Prevent default behavior
      
          // Hide all .vertizontal-dropdown elements
          document.querySelectorAll(".vertizontal-dropdown").forEach((dropdown) => {
            dropdown.style.display = "none"; // Hide dropdown
          });
      
          // Find the closest .vertizontal-dropdown and show it
          const closestDropdown = event.target.parentElement.querySelector(".vertizontal-dropdown");
          if (closestDropdown) {
            closestDropdown.style.display = "block"; // Show the dropdown
          }
        }
      });
      
      
    

});

