$(document).ready(function() {
    // Function to check if the movie is saved in the cookies
    function isMovieSaved(sliderTitle) {
      var existingData = document.cookie.match(/watchLater=([^;]*)/);
      if (existingData) {
        try {
          var watchLaterData = JSON.parse(decodeURIComponent(existingData[1]));
          return watchLaterData.some(function(item) {
            return item.slider_title === sliderTitle;
          });
        } catch(e) {
          console.error('Error parsing cookie data:', e);
        }
      }
      return false;
    }
  
    // Function to update the SVG icon based on whether the movie is saved
    function updateSVGIcon($form, isSaved) {
      var $svgIcon = $form.find('.svg-icon'); // Assuming you have a class or identifier for the SVG icon
      if (isSaved) {
        $svgIcon.html('<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0H15C15.5523 0 16 0.44772 16 1V20.1433C16 20.4194 15.7761 20.6434 15.5 20.6434C15.4061 20.6434 15.314 20.6168 15.2344 20.5669L8 16.0313L0.76559 20.5669C0.53163 20.7136 0.22306 20.6429 0.0763698 20.4089C0.0264698 20.3293 0 20.2373 0 20.1433V1C0 0.44772 0.44772 0 1 0Z" fill="#E50914"/></svg>');
      } else {
        $svgIcon.html('<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.006 3.42444H7.49401C7.07801 3.42444 6.72601 3.56844 6.43801 3.85644C6.15001 4.14444 6.00601 4.49644 6.00601 4.91244V21.4244C6.00601 21.5524 6.04201 21.6764 6.11401 21.7964C6.18601 21.9164 6.27801 22.0084 6.39001 22.0724C6.50201 22.1364 6.62601 22.1684 6.76201 22.1684C6.89801 22.1684 7.02201 22.1364 7.13401 22.0724L12.75 18.5444L18.366 22.0724C18.478 22.1364 18.602 22.1724 18.738 22.1804C18.874 22.1884 19.002 22.1564 19.122 22.0844C19.242 22.0124 19.334 21.9164 19.398 21.7964C19.462 21.6764 19.494 21.5524 19.494 21.4244V4.91244C19.494 4.49644 19.35 4.14444 19.062 3.85644C18.774 3.56844 18.422 3.42444 18.006 3.42444ZM18.006 20.0804L13.134 17.0324C13.022 16.9684 12.894 16.9364 12.75 16.9364C12.606 16.9364 12.478 16.9684 12.366 17.0324L7.49401 20.0804V4.91244H18.006V20.0804Z" fill="white"/></svg>');
      }
    }
  
    // Watch Later button click handler
    $(document).on('submit', '#MX_for_watcher', function(e) {
      e.preventDefault();
      
      // Show loader
      $(this).find('.MX_loader_lazty').removeClass('d-none');
      
      // Get form data
      var formData = {
        slider_image: $(this).find('input[name="slider_image"]').val(),
        slider_title: $(this).find('input[name="slider_title"]').val(),
        slider_description: $(this).find('input[name="slider_description"]').val(), 
        slider_link: $(this).find('input[name="slider_link"]').val(),
        slider_rating: $(this).find('input[name="slider_rating"]').val(),
        slider_rating_value: $(this).find('input[name="slider_rating_value"]').val(),
        slider_is_saved: $(this).find('input[name="slider_is_saved"]').val()
      };
  
      var $form = $(this);
  
      // Save to cookie after 2 second delay
      setTimeout(() => {
        // Hide loader
        $form.find('.MX_loader_lazty').addClass('d-none');
        
        try {
          // Get existing cookie data
          var existingData = document.cookie.match(/watchLater=([^;]*)/);
          var watchLaterData = [];
          
          if (existingData) {
            try {
              watchLaterData = JSON.parse(decodeURIComponent(existingData[1]));
            } catch(e) {
              watchLaterData = [];
            }
          }
  
          // Check if movie already exists
          var exists = watchLaterData.some(function(item) {
            return item.slider_title === formData.slider_title;
          });
  
          if (!exists) {
            // Add new movie data
            watchLaterData.push(formData);
  
            // Save updated data back to cookie
            var cookieValue = encodeURIComponent(JSON.stringify(watchLaterData));
            document.cookie = "watchLater=" + cookieValue + "; path=/; max-age=" + (30*24*60*60); // 30 days
  
            // Verify cookie was set and reload page
            if (document.cookie.indexOf("watchLater=") >= 0) {
              window.location.reload();
            } else {
              alert('Error: Could not save to Watch Later. Please check your cookie settings.');
            }
          } else {
            window.location.reload();
          }
  
        } catch(err) {
          console.error('Error saving to cookie:', err);
          alert('Error saving to Watch Later. Please try again.');
        }
      }, 2000);
    });
  
    // On page load, check if the movie is saved and update the SVG icon accordingly
    $('#MX_for_watcher').each(function() {
      var $form = $(this);
      var sliderTitle = $form.find('input[name="slider_title"]').val();
      if (isMovieSaved(sliderTitle)) {
        updateSVGIcon($form, true);
      } else {
        updateSVGIcon($form, false);
      }
    });
  });