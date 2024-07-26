$(document).ready(function () {
  // Check if the page has this carousel
  if ($('.quoteCarousel').length) {
    setTimeout(getQuotes(), 0);
  }
  if ($('.latestVideoCarousel').length) {
    setTimeout(getVideos('latest', 'latest-videos'), 0);
  }
  if ($('.popularVideoCarousel').length) {
    setTimeout(getVideos('popular', 'popular-tutorials'), 0);
  }
});

// Function to apply custom arrow images to video sections
function customizeArrows(section, color) {
  // Removing slick default button styling
  $(`.${section} .slick-prev, .${section} .slick-next`).css({
    'border': 'none',
    'background-color': 'transparent',
    'padding': '0',
    'margin': '0',
    'outline': 'none',
    'box-shadow': 'none'
  });
  // Adding custom arrow images
  $(`.${section} .slick-prev.slick-arrow`).html(`<img src="images/arrow_${color}_left.png" alt="Previous">`);
  $(`.${section} .slick-next.slick-arrow`).html(`<img src="images/arrow_${color}_right.png" alt="Next">`);
}

// Function for both quotes sections
function getQuotes() {
  $('.quoteCarousel').css({ 'display': 'none' });
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $('.quoteCarousel').css({ 'height': '400px' })
      data.forEach((person) => {
        let htmlFromData = `
          <div class="col-12  col-md-4 p-3 d-flex flex-column flex-md-row p-0 justify-content-center align-items-center text-white">
            <div class="m-auto d-flex justify-content-between align-items-center">
              <img
                class="quotePic"
                src="${person.pic_url}"
                alt="Carousel Pic of ${person.name}"
              />
            </div>
            <div class="col-12 col-md-8">
              <div>
                <p >
                  « ${person.text} »
                </p>
                <h4>${person.name}</h4>
                <span>${person.title}</span>
              </div>
            </div>
          </div>`;
        $('.quoteCarousel').append(htmlFromData);
      });
      $('.loader').css({ 'display': 'none' });
      $('.quoteCarousel').css({ 'display': 'flex' });
      // Initialize slick
      $('.quoteCarousel').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
      // Apply custom arrows after init of slick
      customizeArrows('quoteCarousel', 'white');
    },
    error: function (xhr, status, error) {
      console.log('ajax request error: ' + error);
    }
  });
};

// Function to handle all video sections api calls and html injections
function getVideos(section, videosSelector) {
  $(`.${section}VideoCarousel`).css({ 'display': 'none' });
  $.ajax({
    url: `https://smileschool-api.hbtn.info/${videosSelector}`,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(section + data);
      $(`.${section}VideoCarousel`).css({ 'height': 'auto'})
      data.forEach((video) => {
        // Handle how many stars each video has
        let stars = `<div class="rating d-flex p-0 col-6 align-items-center">`;
        for(let i = 1; i <= 5; i++) {
          if (i <= video.star) {
            stars += `
              <img
                src = "images/star_on.png"
                alt = "star on"
                width = "15px"
                height = "15px"
              /> `;
          } else {
            stars += `
              <img
                src = "images/star_off.png"
                alt = "star off"
                width = "15px"
                height = "15px"
              /> `;
          }
        }
        stars += `</div>`;
        let htmlFromData = `
          <div class="card m-2 m-md-1 col-3">
            <img
              src="${video.thumb_url}"
              class="card-img-top"
              alt="Video thumbnail"
            />
            <div class="card-img-overlay m-auto text-center">
              <img
                src="images/play.png"
                alt="Play"
                width="64px"
                class="align-self-center play-overlay m-auto"
              />
            </div>
            <div class="col-11 col-md-12 p-1">
              <h5 class="card-text font-weight-bold">
                ${video.title}
              </h5>
              <p class="card-text text-muted">
                ${video['sub-title']}
              </p>
              <div class="d-flex align-items-center">
                <img
                  src="${video.author_pic_url}"
                  alt="Creator of Video"
                  width="30px"
                  class="rounded-circle"
                />
                <h6 class="card-text pl-3 m-0 main-color">${video.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                ${stars}
                <span class="main-color p-0 col-6 text-right">${video.duration}</span>
              </div>
            </div>
          </div>
        `;
        $(`.${section}VideoCarousel`).append(htmlFromData);
      });

      // Ajax is done. Hide loader, and show the carousel
      $('.loader').css({ 'display': 'none' });
      $(`.${section}VideoCarousel`).css({ 'display': 'flex' });

      // Initialize slick carousel
      $(`.${section}VideoCarousel`).slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            //tablet
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            // phone
            breakpoint: 576,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
      // Change default slick buttons to custom arrow images
      customizeArrows(`${section}VideoCarousel`, 'black');
      // Add listener for window size change to then update to custom arrows again
      $(window).on('resize', function () {
        customizeArrows(`${section}VideoCarousel`, 'black');
      });
    },
    error: function (xhr, status, error) {
      console.log('ajax request error: ' + error);
    }
  });
};

// Function to handle filtered videos

