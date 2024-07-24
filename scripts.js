$(document).ready(function () {
  // Check if the page has this carousel
  if ($('.quoteCarousel').length) {
    getQuotes();
  }
  if ($('.latestVideoCarousel').length) {
    getVideos('latest', 'latest-videos');
  }
});

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
  $(`.${section} .slick-prev`).html(`<img src="images/arrow_${color}_left.png" alt="Previous">`);
  $(`.${section} .slick-next`).html(`<img src="images/arrow_${color}_right.png" alt="Next">`);
}

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
          <div class="col-12 mt-5 pt-5 row d-flex justify-content-between align-items-center text-white">
            <div class="col-3 d-flex justify-content-between align-items-center">
              <img
                class="quotePic"
                src="${person.pic_url}"
                alt="Carousel Pic of ${person.name}"
              />
            </div>
            <div class="col-8">
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
      // append html to element and then init slick so it grabs then element already loaded
      $('.quoteCarousel').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
      // Reapply custom arrows
      customizeArrows('quoteCarousel', 'white');
    },
    error: function (xhr, status, error) {
      console.log('ajax request error: ' + error);
    }
  });
};

function getVideos(section, videosSelector) {
  $(`.${section}VideoCarousel`).css({ 'display': 'none' });
  $.ajax({
    url: `https://smileschool-api.hbtn.info/${videosSelector}`,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $(`.${section}VideoCarousel`).css({ 'height': 'auto'})
      data.forEach((video) => {
        console.log(video)
        let htmlFromData = `
          <div class="card m-3">
            <img
              src="images/thumbnail_4.jpg"
              class="card-img-top"
              alt="Video thumbnail"
            />
            <div class="card-img-overlay text-center">
              <img
                src="images/play.png"
                alt="Play"
                width="64px"
                class="align-self-center play-overlay"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">
                Diagonal Smile
              </h5>
              <p class="card-text text-muted">
                Lorem ipsum dolor sit amet, consect adipiscing elit,
                sed do eiusmod.
              </p>
              <div class="creator d-flex align-items-center">
                <img
                  src="images/profile_1.jpg"
                  alt="Creator of
                  Video"
                  width="30px"
                  class="rounded-circle"
                />
                <h6 class="pl-3 m-0 main-color">Phillip Massey</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">
                  <img
                    src="images/star_on.png"
                    alt="star on"
                    width="15px"
                  />
                  <img
                    src="images/star_on.png"
                    alt="star on"
                    width="15px"
                  />
                  <img
                    src="images/star_on.png"
                    alt="star on"
                    width="15px"
                  />
                  <img
                    src="images/star_on.png"
                    alt="star on"
                    width="15px"
                  />
                  <img
                    src="images/star_off.png"
                    alt="star on"
                    width="15px"
                  />
                </div>
                <span class="main-color">8 min</span>
              </div>
            </div>
          </div>
        `;
        $(`.${section}VideoCarousel`).append(htmlFromData);
      });
      $('.loader').css({ 'display': 'none' });
      $(`.${section}VideoCarousel`).css({ 'display': 'flex' });
      // append html to element and then init slick so slick grabs the element already created

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
      // Reapply custom arrows
      customizeArrows('videoCarousel', 'black');
    },
    error: function (xhr, status, error) {
      console.log('ajax request error: ' + error);
    }
  });
};


