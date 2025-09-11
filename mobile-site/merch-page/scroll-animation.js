document.addEventListener('DOMContentLoaded', function () {

    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const grid = document.querySelector('.product-grid');
    const body = document.body;

    let scrollPosition = 0;

    const allInitialProductCards = Array.from(document.querySelectorAll('.product-grid .product-card'));

    const productModal = document.createElement('div');
    productModal.className = 'product-modal';
    productModal.style.display = 'none'; 
    productModal.style.position = 'fixed';
    productModal.style.top = '0';
    productModal.style.left = '0';
    productModal.style.width = '100vw';
    productModal.style.height = '100vh';
    productModal.style.backgroundColor = 'rgba(0,0,0,0.8)'; 
    productModal.style.zIndex = '1000'; 
    productModal.style.justifyContent = 'center'; 
    productModal.style.alignItems = 'center'; 
    productModal.style.opacity = '0'; 
    productModal.style.transition = 'opacity 0.3s ease-in-out';
    body.appendChild(productModal); 
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '90%';
    modalContent.style.maxWidth = '1000px';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto'; 
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'row';
    modalContent.style.transform = 'scale(0.8)'; 
    modalContent.style.opacity = '0'; 
    modalContent.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'; 
    modalContent.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)'; 
    productModal.appendChild(modalContent); 
    
    const closeModalBtn = document.createElement('button');
    closeModalBtn.className = 'close-modal';
    closeModalBtn.textContent = 'x';
    closeModalBtn.style.position = 'absolute'; 
    closeModalBtn.style.top = '15px';
    closeModalBtn.style.right = '15px';
    closeModalBtn.style.fontSize = '24px';
    closeModalBtn.style.fontWeight = 'bold';
    closeModalBtn.style.backgroundColor = 'transparent';
    closeModalBtn.style.border = 'none';
    closeModalBtn.style.cursor = 'pointer';
    closeModalBtn.style.color = '#333';
    closeModalBtn.style.zIndex = '1002';
    modalContent.appendChild(closeModalBtn); 
    
    const modalImageContainer = document.createElement('div');
    modalImageContainer.className = 'modal-image-container';
    modalImageContainer.style.flex = '1'; 
    modalImageContainer.style.padding = '20px';
    modalImageContainer.style.display = 'flex';
    modalImageContainer.style.flexDirection = 'column'; 
    modalImageContainer.style.alignItems = 'center'; 
    modalImageContainer.style.width = '50%';
    modalImageContainer.style.height = '500px'; 
    modalContent.appendChild(modalImageContainer); 
    
    const modalMainImage = document.createElement('img');
    modalMainImage.className = 'modal-main-image';
    modalMainImage.style.width = '100%';
    modalMainImage.style.height = '350px'; 
    modalMainImage.style.objectFit = 'contain'; 
    modalMainImage.style.marginBottom = '15px';
    modalImageContainer.appendChild(modalMainImage);
    
    const modalThumbnails = document.createElement('div');
    modalThumbnails.className = 'modal-thumbnails';
    modalThumbnails.style.display = 'flex';
    modalThumbnails.style.justifyContent = 'center';
    modalThumbnails.style.gap = '10px';
    modalThumbnails.style.flexWrap = 'wrap';
    modalThumbnails.style.width = '100%';
    modalImageContainer.appendChild(modalThumbnails);
    
    const modalProductInfo = document.createElement('div');
    modalProductInfo.className = 'modal-product-info';
    modalProductInfo.style.flex = '1';
    modalProductInfo.style.padding = '20px';
    modalProductInfo.style.display = 'flex';
    modalProductInfo.style.flexDirection = 'column';
    modalProductInfo.style.width = '50%';
    modalProductInfo.style.height = '500px';
    modalContent.appendChild(modalProductInfo);
    
    const modalProductTitle = document.createElement('h2');
    modalProductTitle.className = 'modal-product-title';
    modalProductTitle.style.fontSize = '24px';
    modalProductTitle.style.marginBottom = '15px';
    modalProductTitle.style.color = '#333';
    modalProductInfo.appendChild(modalProductTitle);
    
    const modalProductDescription = document.createElement('p');
    modalProductDescription.className = 'modal-product-description';
    modalProductDescription.style.fontSize = '16px';
    modalProductDescription.style.lineHeight = '1.6';
    modalProductDescription.style.marginTop = '10px';
    modalProductDescription.style.marginBottom = '20px';
    modalProductDescription.style.color = '#666';
    modalProductDescription.style.flex = '1';
    modalProductDescription.style.overflow = 'auto';
    modalProductInfo.appendChild(modalProductDescription);
    
    const modalProductPrice = document.createElement('div');
    modalProductPrice.className = 'modal-product-price';
    modalProductPrice.style.fontSize = '24px';
    modalProductPrice.style.fontWeight = 'bold';
    modalProductPrice.style.marginBottom = '15px';
    modalProductPrice.style.color = '#333';
    modalProductInfo.appendChild(modalProductPrice);
    
    const modalStockStatus = document.createElement('div');
    modalStockStatus.className = 'modal-stock-status';
    modalStockStatus.style.fontSize = '16px';
    modalStockStatus.style.marginBottom = '20px';
    modalStockStatus.style.padding = '5px 5px';
    modalStockStatus.style.display = 'inline-block';
    modalStockStatus.style.borderRadius = '4px';
    modalProductInfo.appendChild(modalStockStatus);
    
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart-btn';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.style.backgroundColor = '#F44336';
    addToCartBtn.style.color = 'white';
    addToCartBtn.style.border = 'none';
    addToCartBtn.style.padding = '12px 24px';
    addToCartBtn.style.fontSize = '16px';
    addToCartBtn.style.fontWeight = 'bold';
    addToCartBtn.style.borderRadius = '4px';
    addToCartBtn.style.cursor = 'pointer';
    addToCartBtn.style.transition = 'background-color 0.2s';
    addToCartBtn.style.alignSelf = 'flex-start';
    addToCartBtn.style.marginTop = 'auto';
    modalProductInfo.appendChild(addToCartBtn);
    
    function setupDetailsButtons() {
        const detailsButtons = document.querySelectorAll('.details-btn');
        detailsButtons.forEach(button => {
            const oldListener = button.dataset.listener;
            if (oldListener && window[oldListener]) {
                button.removeEventListener('click', window[oldListener]);
                delete window[oldListener];
            }
            const newListener = function() {
                const productCard = this.closest('.product-card');
                openProductModal(productCard);
            };
            const listenerName = `detailsBtnListener_${Math.random().toString(36).substr(2, 9)}`;
            window[listenerName] = newListener;
            button.addEventListener('click', newListener);
            button.dataset.listener = listenerName;
        });
    }
    
    function openProductModal(product) {
        scrollPosition = window.scrollY; 
        body.style.position = 'fixed';
        body.style.top = `-${scrollPosition}px`;
        body.style.width = '100%'; 
    
        const title = product.querySelector('h3').textContent;
        const originalDescriptionElement = product.querySelector('p');
        const originalDescription = originalDescriptionElement ? originalDescriptionElement.textContent : '';
        const price = product.querySelector('.price').textContent;
        const stockStatus = product.querySelector('.stock-status');
        const isInStock = stockStatus.classList.contains('in-stock');
        const mainImage = product.querySelector('.main-image').src;
        const thumbnails = product.querySelectorAll('.thumbnail');
    
        modalProductTitle.textContent = title;
        modalProductDescription.textContent = `This is a detailed description for ${title}. ${originalDescription} High-quality material and excellent craftsmanship. Available in various sizes and colors.`;
        modalProductPrice.textContent = price;
    
        if (isInStock) {
            modalStockStatus.textContent = 'In Stock';
            modalStockStatus.style.backgroundColor = 'rgba(76, 175, 80, 0.1)'; 
            modalStockStatus.style.color = '#4CAF50';
            addToCartBtn.disabled = false;
            addToCartBtn.style.opacity = '1';
        } else {
            modalStockStatus.textContent = 'Out of Stock';
            modalStockStatus.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
            modalStockStatus.style.color = '#F44336';
            addToCartBtn.disabled = true;
            addToCartBtn.style.opacity = '0.5'; 
        }
    
        modalMainImage.src = mainImage;
        modalMainImage.alt = title;
        modalThumbnails.innerHTML = '';
    
        thumbnails.forEach(thumbnail => {
            const modalThumbnail = document.createElement('img');
            modalThumbnail.className = 'modal-thumbnail';
            modalThumbnail.src = thumbnail.src;
            modalThumbnail.alt = thumbnail.alt;
            modalThumbnail.style.width = '60px';
            modalThumbnail.style.height = '60px';
            modalThumbnail.style.objectFit = 'cover';
            modalThumbnail.style.cursor = 'pointer';
            const isActive = thumbnail.classList.contains('active');
            modalThumbnail.style.border = isActive ? '2px solid #F44336' : '2px solid transparent';
            modalThumbnail.style.borderRadius = '4px';
            modalThumbnail.style.transition = 'border-color 0.2s';
    
            modalThumbnail.addEventListener('click', function() {
                modalMainImage.src = this.src;
                modalMainImage.alt = this.alt;
                const allModalThumbs = modalThumbnails.querySelectorAll('.modal-thumbnail');
                allModalThumbs.forEach(t => t.style.border = '2px solid transparent');
                this.style.border = '2px solid #F44336';
            });
    
            modalThumbnails.appendChild(modalThumbnail); 
        });
        productModal.style.display = 'flex';
  
        setTimeout(() => {
            productModal.style.opacity = '1'; 
            
            modalContent.style.transform = 'scale(1)'; 
            modalContent.style.opacity = '1'; 
        }, 10);
    }

    function closeProductModal() {
      
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
       
        setTimeout(() => {
            productModal.style.opacity = '0';
         
            setTimeout(() => {
                productModal.style.display = 'none'; 
                // Restore body scroll
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                window.scrollTo(0, scrollPosition); 
            }, 300); 
        }, 200); 
    }

    closeModalBtn.addEventListener('click', closeProductModal);

    productModal.addEventListener('click', function(e) {
    
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    const imagePopup = document.createElement('div');
    imagePopup.className = 'image-popup';
    imagePopup.style.display = 'none'; // Initially hidden
    imagePopup.style.position = 'fixed';
    imagePopup.style.top = '0';
    imagePopup.style.left = '0';
    imagePopup.style.width = '100vw';
    imagePopup.style.height = '100vh';
    imagePopup.style.backgroundColor = 'rgba(0,0,0,0.9)'; 
    imagePopup.style.zIndex = '1000';
    imagePopup.style.justifyContent = 'center';
    imagePopup.style.alignItems = 'center';
    imagePopup.style.flexDirection = 'column'; 
    body.appendChild(imagePopup); 

    const popupImageContainer = document.createElement('div');
    popupImageContainer.className = 'popup-image-container';
    popupImageContainer.style.maxWidth = '90%';
    popupImageContainer.style.maxHeight = '80%';
    popupImageContainer.style.position = 'relative'; 
    imagePopup.appendChild(popupImageContainer);

    const popupImage = document.createElement('img');
    popupImage.className = 'popup-image';
    popupImage.style.maxWidth = '100%';
    popupImage.style.maxHeight = '80vh';
    popupImage.style.objectFit = 'contain';
    popupImageContainer.appendChild(popupImage);

    const closeButton = document.createElement('div');
    closeButton.className = 'close-popup';
    closeButton.textContent = '×'; 
    closeButton.style.position = 'absolute'; 
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '30px';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '1001'; // Ensure it's above the image
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.backgroundColor = 'rgba(0,0,0,0.5)'; // Semi-transparent background
    closeButton.style.borderRadius = '50%'; // Circular shape
    imagePopup.appendChild(closeButton); // Add close button to the popup

    const popupThumbnails = document.createElement('div');
    popupThumbnails.className = 'popup-thumbnails';
    popupThumbnails.style.display = 'flex';
    popupThumbnails.style.justifyContent = 'center';
    popupThumbnails.style.gap = '10px';
    popupThumbnails.style.marginTop = '20px';
    imagePopup.appendChild(popupThumbnails);

    closeButton.addEventListener('click', function() {
        imagePopup.style.display = 'none'; // Hide the popup
       
         const zoomLens = document.querySelector('.zoom-lens'); 
         const zoomContainer = document.querySelector('.zoom-container'); 
         if (zoomLens) zoomLens.style.display = 'none';
         if (zoomContainer) zoomContainer.style.display = 'none';
    });


    function showPopup(mainImageSrc, mainImageAlt, thumbnails) {
        popupThumbnails.innerHTML = '';
        popupImage.src = mainImageSrc; 
        popupImage.alt = mainImageAlt; 

     
        thumbnails.forEach(thumbnail => {
            const popupThumb = document.createElement('img');
            popupThumb.className = 'popup-thumbnail'; // Added class for clarity
            popupThumb.src = thumbnail.src;
            popupThumb.alt = thumbnail.alt;
            popupThumb.style.width = '60px';
            popupThumb.style.height = '60px';
            popupThumb.style.objectFit = 'cover'; // Crop thumbnail to fit
            popupThumb.style.cursor = 'pointer';
            // Highlight active thumbnail
            popupThumb.style.border = thumbnail.classList.contains('active') ? '2px solid white' : '2px solid transparent';

            // Add click listener to popup thumbnails to change the main popup image
            popupThumb.addEventListener('click', function() {
                popupImage.src = this.src;
                popupImage.alt = this.alt;
                // Remove active border from all thumbnails and add to the clicked one
                const allThumbs = popupThumbnails.querySelectorAll('.popup-thumbnail'); // Use class
                allThumbs.forEach(t => t.style.border = '2px solid transparent');
                this.style.border = '2px solid white';
            });
            popupThumbnails.appendChild(popupThumb); 
        });
        imagePopup.style.display = 'flex'; 
    }



    function getProductCards() {
        return Array.from(grid.querySelectorAll('.product-card'));
    }


    function checkForNoProducts() {
        const currentProductCardsInGrid = Array.from(grid.querySelectorAll('.product-card'));
        const existingMessage = document.querySelector('.no-products-message');

        if (existingMessage) {
            existingMessage.remove();
        }

        if (currentProductCardsInGrid.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.className = 'no-products-message';
            noProductsMessage.textContent = 'No products available in this category or matching criteria.'; // Generic message
            noProductsMessage.style.width = '100%';
            noProductsMessage.style.padding = '20px';
            noProductsMessage.style.textAlign = 'center';
            noProductsMessage.style.fontSize = '18px';
            noProductsMessage.style.color = '#666'; // Medium gray color
            // Append only if it doesn't exist (double check)
            if (!document.querySelector('.no-products-message')) {
                grid.appendChild(noProductsMessage);
            }
        }
    }

  
    function applyFiltersAndSorting() {
        const selectedCategory = categoryFilter.value;
        const sortType = sortFilter.value;
    
    
        const filteredCards = allInitialProductCards.filter(card => {
            if (selectedCategory === 'all') {
                return true; 
            } else {
            
                return card.classList.contains(selectedCategory);
            }
        });
    


        const sortedCards = filteredCards.sort((a, b) => {
            if (sortType === 'price-asc') {
                // Extract price numbers, handling currency symbols
                const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ""));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ""));
                return priceA - priceB; // Ascending order
            } else if (sortType === 'price-desc') {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ""));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ""));
                return priceB - priceA; // Descending order
            } else if (sortType === 'popularity') {
                
                const isPopularA = a.classList.contains('popularity');
                const isPopularB = b.classList.contains('popularity');
                if (isPopularA && !isPopularB) return -1; // a is popular, b is not -> a comes first
                if (!isPopularA && isPopularB) return 1; // a is not popular, b is -> b comes first
               
                 return allInitialProductCards.indexOf(a) - allInitialProductCards.indexOf(b);
            } else if (sortType === 'best-sellers') {

                 const isBestSellerA = a.classList.contains('best-seller');
                 const isBestSellerB = b.classList.contains('best-seller');
                 if (isBestSellerA && !isBestSellerB) return -1; 
                 if (!isBestSellerA && isBestSellerB) return 1; 
              
                 return allInitialProductCards.indexOf(a) - allInitialProductCards.indexOf(b);
            }
        
             return allInitialProductCards.indexOf(a) - allInitialProductCards.indexOf(b);
        });

  
        grid.innerHTML = ''; 
        sortedCards.forEach(card => {
            card.style.display = 'block'; 
            grid.appendChild(card); 
        });

      
        checkForNoProducts();

        setupDetailsButtons(); 
   
        getProductCards().forEach(setupImageInteraction);

       
        const observerOptions = { threshold: 0.2 };
         const tempObserver = new IntersectionObserver((entries, observer) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     entry.target.classList.add('is-visible');
                     observer.unobserve(entry.target);
                 }
             });
         }, observerOptions);
         getProductCards().forEach(card => tempObserver.observe(card));
    }

    categoryFilter.addEventListener('change', applyFiltersAndSorting);
    sortFilter.addEventListener('change', applyFiltersAndSorting);


    function setupImageInteraction(card) {
        const container = card.querySelector('.product-image-container');
        if (!container) return;
    
        const mainImage = container.querySelector('.main-image');
        if (!mainImage) return;
    
        const thumbnails = card.querySelectorAll('.thumbnail');
   
        if (thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('mouseenter', function () {
                    mainImage.src = this.src;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        
    }
        let zoomLens;
        let zoomContainer;
        let zoomedImage;
        let zoomActive = false; 

         function handleThumbnailHover() {
             mainImage.src = this.src; 
    
             if (zoomedImage) zoomedImage.src = this.src;
             // Update active class for styling
             thumbnails.forEach(t => t.classList.remove('active'));
             this.classList.add('active');
         }

      
        if (thumbnails.length > 0) {
             thumbnails.forEach(thumbnail => {
         
                 const oldThumbListener = thumbnail.dataset.thumbEnterListener; // Use a unique dataset key
                 if (oldThumbListener && window[oldThumbListener]) {
                     thumbnail.removeEventListener('mouseenter', window[oldThumbListener]);
                     delete window[oldThumbListener];
                 }
                
                 const thumbListenerName = `thumbEnterListener_${Math.random().toString(36).substr(2, 9)}`;
                 window[thumbListenerName] = handleThumbnailHover; // Assign the handler
                 thumbnail.addEventListener('mouseenter', handleThumbnailHover);
                 thumbnail.dataset.thumbEnterListener = thumbListenerName; // Store listener name
             });
         }


      
        function enableZoom() {
        
             if (!zoomLens) {
                 zoomLens = document.createElement('div');
                 zoomLens.className = 'zoom-lens';
                 container.appendChild(zoomLens); // Append lens to the image container
             }
             if (!zoomContainer) {
                 zoomContainer = document.createElement('div');
                 zoomContainer.className = 'zoom-container';
                 body.appendChild(zoomContainer); // Append zoom container to the body
             }
             if (!zoomedImage) {
                 zoomedImage = document.createElement('img');
                 zoomedImage.className = 'zoomed-image';
                 zoomContainer.appendChild(zoomedImage); // Append zoomed image to the zoom container
             }

            // Set initial source for zoomed image
            zoomedImage.src = mainImage.src;

            // Set initial display for zoom elements
            zoomLens.style.display = 'block';
            zoomContainer.style.display = 'block';

            zoomActive = true; // Set zoom active flag

            const imageRect = mainImage.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect(); 

            zoomContainer.style.width = `${imageRect.width}px`;
            zoomContainer.style.height = `${imageRect.height}px`;
           
             zoomContainer.style.top = `${cardRect.top + window.scrollY - imageRect.height - 10}px`;
             zoomContainer.style.left = `${cardRect.left + window.scrollX}px`;
             zoomContainer.style.overflow = 'hidden'; // Crucial for clipping the zoomed image
             // Ensure basic styles from your CSS are applied if not external
             zoomContainer.style.border = '1px solid #ccc';
             zoomContainer.style.backgroundColor = 'white';
             zoomContainer.style.zIndex = '999'; // Below modal, above page content


             const zoomFactor = 2;
             zoomedImage.style.width = `${imageRect.width * zoomFactor}px`;
             zoomedImage.style.height = `${imageRect.height * zoomFactor}px`;
             zoomedImage.style.objectFit = 'cover'; 
             zoomedImage.style.position = 'absolute'; 

             const oldMoveListener = mainImage.dataset.moveListener;
             if (oldMoveListener && window[oldMoveListener]) {
                 mainImage.removeEventListener('mousemove', window[oldMoveListener]);
                 delete window[oldMoveListener];
             }
             const moveListenerName = `mainMoveListener_${Math.random().toString(36).substr(2, 9)}`;
             window[moveListenerName] = handleZoomMove; // Assign the handleZoomMove function
             mainImage.addEventListener('mousemove', handleZoomMove);
             mainImage.dataset.moveListener = moveListenerName; // Store listener name

        }

        // Function to disable zoom (from your working code)
        function disableZoom() {
            zoomActive = false; // Set zoom active flag to false

            // Remove zoom elements from the DOM
            if (zoomLens) {
                 zoomLens.style.display = 'none'; // Hide first (optional, for smoother transition)
                 zoomLens.remove();
                 zoomLens = null; // Reset reference
            }
            if (zoomContainer) {
                 zoomContainer.style.display = 'none'; 
                 zoomContainer.remove();
                 zoomContainer = null;
            }
            zoomedImage = null; 


             const moveListenerName = mainImage.dataset.moveListener;
             if (moveListenerName && window[moveListenerName]) {
                 mainImage.removeEventListener('mousemove', window[moveListenerName]);
                 delete window[moveListenerName];
                 delete mainImage.dataset.moveListener;
             }

        
             thumbnails.forEach(thumbnail => {
                 const enterListenerName = thumbnail.dataset.thumbEnterListener;
                 if (enterListenerName && window[enterListenerName]) {
                     thumbnail.removeEventListener('mouseenter', window[enterListenerName]);
                     delete window[enterListenerName];
                     delete thumbnail.dataset.thumbEnterListener;
                 }
             });
        }

        function handleZoomMove(e) {
        
            if (!zoomActive || !zoomLens || !zoomedImage || !mainImage) return;

            const imageRect = mainImage.getBoundingClientRect();
           
            const xPosition = (e.clientX - imageRect.left) / imageRect.width;
            const yPosition = (e.clientY - imageRect.top) / imageRect.height;

            const lensWidth = zoomLens.offsetWidth || 80;
            const lensHeight = zoomLens.offsetHeight || 80;

      
            let lensLeft = e.clientX - imageRect.left - lensWidth / 2;
            let lensTop = e.clientY - imageRect.top - lensHeight / 2;

      
            lensLeft = Math.max(0, Math.min(lensLeft, imageRect.width - lensWidth));
            lensTop = Math.max(0, Math.min(lensTop, imageRect.height - lensHeight));

    
            zoomLens.style.left = `${lensLeft}px`;
            zoomLens.style.top = `${lensTop}px`;

            zoomedImage.style.transformOrigin = `${xPosition * 100}% ${yPosition * 100}%`;
        }


  
        function checkDeviceAndSetup() {
      
            disableZoom(); 

    
            const oldMainEnter = mainImage.dataset.mainEnterListener;
            const oldMainLeave = mainImage.dataset.mainLeaveListener; 
            const oldMainClick = mainImage.dataset.mainClickListener; 


             if (oldMainEnter && window[oldMainEnter]) {
                 mainImage.removeEventListener('mouseenter', window[oldMainEnter]);
                 delete window[oldMainEnter];
                 delete mainImage.dataset.mainEnterListener; // Remove dataset key
             }
             if (oldMainLeave && window[oldMainLeave]) {
                  mainImage.removeEventListener('mouseleave', window[oldMainLeave]);
                  delete window[oldMainLeave];
                  delete mainImage.dataset.mainLeaveListener;
             }
              if (oldMainClick && window[oldMainClick]) {
                  mainImage.removeEventListener('click', window[oldMainClick]);
                  delete window[oldMainClick];
                  delete mainImage.dataset.mainClickListener;
              }
    


            if (window.innerWidth < 768) {
             
                 const handlePopupClick = () => { 
                     const currentMainImage = card.querySelector('.main-image');
                     const currentThumbnails = card.querySelectorAll('.thumbnail');
                     showPopup(currentMainImage.src, currentMainImage.alt, currentThumbnails);
                 };
            
                 const clickListenerName = `mainClickListener_${Math.random().toString(36).substr(2, 9)}`;
                 window[clickListenerName] = handlePopupClick;
                 mainImage.addEventListener('click', handlePopupClick);
                 mainImage.dataset.mainClickListener = clickListenerName;

            } else {
           
                 const handleMainEnter = () => { enableZoom(); };
                 const handleMainLeave = () => { disableZoom(); }; 

                 const enterListenerName = `mainEnterListener_${Math.random().toString(36).substr(2, 9)}`;
                 const leaveListenerName = `mainLeaveListener_${Math.random().toString(36).substr(2, 9)}`;

                 window[enterListenerName] = handleMainEnter;
                 window[leaveListenerName] = handleMainLeave;

                 mainImage.addEventListener('mouseenter', handleMainEnter); 
                 mainImage.addEventListener('mouseleave', handleMainLeave);

                 mainImage.dataset.mainEnterListener = enterListenerName; 
                 mainImage.dataset.mainLeaveListener = leaveListenerName;

            }
        }

       
         const oldResizeListenerName = mainImage.dataset.resizeListener;
         if(oldResizeListenerName && window[oldResizeListenerName]) {
             window.removeEventListener('resize', window[oldResizeListenerName]);
             delete window[oldResizeListenerName];
         }
         const resizeListenerName = `checkDeviceAndSetupListener_${Math.random().toString(36).substr(2, 9)}`;
         window[resizeListenerName] = checkDeviceAndSetup;
         window.addEventListener('resize', window[resizeListenerName]);
         mainImage.dataset.resizeListener = resizeListenerName; // Store listener name on the element


        checkDeviceAndSetup();
    }

    function cleanupImageInteraction(card) {
         const container = card.querySelector('.product-image-container');
         if (!container) return;
         const mainImage = container.querySelector('.main-image');
         const thumbnails = card.querySelectorAll('.thumbnail');

         if (mainImage) {
           
             const enterListenerName = mainImage.dataset.mainEnterListener; 
             const leaveListenerName = mainImage.dataset.mainLeaveListener; 
             const moveListenerName = mainImage.dataset.moveListener; 
             const clickListenerName = mainImage.dataset.mainClickListener; 
             const resizeListenerName = mainImage.dataset.resizeListener; 


             if (enterListenerName && window[enterListenerName]) {
                 mainImage.removeEventListener('mouseenter', window[enterListenerName]);
                 delete window[enterListenerName];
                 delete mainImage.dataset.mainEnterListener;
             }
             if (leaveListenerName && window[leaveListenerName]) {
                 mainImage.removeEventListener('mouseleave', window[leaveListenerName]);
                 delete window[leaveListenerName];
                 delete mainImage.dataset.mainLeaveListener;
             }
              if (moveListenerName && window[moveListenerName]) {
                 mainImage.removeEventListener('mousemove', window[moveListenerName]);
                 delete window[moveListenerName];
                 delete mainImage.dataset.moveListener;
             }
             if (clickListenerName && window[clickListenerName]) {
                 mainImage.removeEventListener('click', window[clickListenerName]);
                 delete window[clickListenerName];
                 delete mainImage.dataset.mainClickListener;
             }

       
             if (resizeListenerName && window[resizeListenerName]) {
                 const resizeHandler = window[resizeListenerName];
                 if(resizeHandler) {
                     window.removeEventListener('resize', resizeHandler);
                     delete window[resizeListenerName];
                 }
                 delete mainImage.dataset.resizeListener;
             }
         }

         thumbnails.forEach(thumbnail => {
              const clickListenerName = thumbnail.dataset.clickListener;
              const enterListenerName = thumbnail.dataset.thumbEnterListener; 

              if (clickListenerName && window[clickListenerName]) {
                  thumbnail.removeEventListener('click', window[clickListenerName]);
                  delete window[clickListenerName];
                  delete thumbnail.dataset.clickListener;
              }
               if (enterListenerName && window[enterListenerName]) {
                   thumbnail.removeEventListener('mouseenter', window[enterListenerName]);
                   delete window[enterListenerName];
                   delete thumbnail.dataset.thumbEnterListener;
               }
         });

       
         const zoomLens = card.querySelector('.zoom-lens');
         if (zoomLens) zoomLens.remove();

         const zoomContainer = document.querySelector('.zoom-container'); 
         if (zoomContainer) zoomContainer.remove();

    }


    
    function setupResponsiveLayout() {
        if (window.innerWidth < 768) {
            modalContent.style.flexDirection = 'column';
            modalImageContainer.style.width = '100%';
            modalProductInfo.style.width = '100%';
        } else {
            modalContent.style.flexDirection = 'row';
            modalImageContainer.style.width = '50%';
            modalProductInfo.style.width = '50%';
        }
    }
    applyFiltersAndSorting();


 
    window.addEventListener('resize', setupResponsiveLayout);
    setupResponsiveLayout();

    
    const style = document.createElement('style');
    style.textContent = `
        .add-to-cart-btn:hover {
            background-color: #E53935 !important; 
        }

        .modal-thumbnail:hover {
            border-color: #F44336 !important; 
        }

        .close-modal:hover {
            color: #f44336;
        }

        /* Ensure .product-image-container has position: relative; for absolute positioning of the zoom lens */
         .product-image-container {
             position: relative; 
             overflow: hidden; 
         }

        .zoom-lens {
            /* Basic styles - match your working CSS */
            position: absolute;
            border: 1px solid #d4d4d4;
            width: 80px; /* Adjust size as needed */
            height: 80px; /* Adjust size as needed */
            background-color: rgba(200, 200, 200, 0.4);
            cursor: none;
            display: none; /* Controlled by JS */
            pointer-events: none; /* Important: ensures mouse events pass through to the image */
        }

         .zoom-container {
             position: absolute; /* Position relative to the body */
             /* Size and position set by JS in enableZoom */
             border: 1px solid #ccc;
             overflow: hidden;
             z-index: 999; /* Below modal, above page content */
             display: none; /* Controlled by JS */
             background-color: white;
         }

        .zoomed-image {
            display: block;
            position: absolute; /* Position within zoom container */
            top: 0; /* Initial position */
            left: 0; /* Initial position */
            width: auto; /* Size set by JS */
            height: auto; /* Size set by JS */
            object-fit: cover; /* Ensure it covers the container area it's supposed to */
            transform-origin: 0% 0%; /* Updated by JS */
        }


        @media (max-width: 768px) {
            .modal-content {
                flex-direction: column;
                max-height: 85vh;
            }

            .modal-image-container, .modal-product-info {
                width: 100% !important;
                height: auto !important;
            }

            .modal-main-image {
                height: 250px !important;
            }

            .modal-thumbnails {
                margin-bottom: 15px;
            }

            /* Hide zoom on small screens */
             .zoom-lens, .zoom-container {
                 display: none !important; /* Ensure completely hidden on small screens */
             }
        }
    `;
    document.head.appendChild(style);

});
