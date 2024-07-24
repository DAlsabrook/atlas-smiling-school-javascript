$(document).ready(function () {
  // Initial customization
  getQuotes();
});

function customizeArrows() {
  $('.slick-prev, .slick-next').css({ 'border': 'none', 'background-color': 'transparent' });
  $('.slick-prev').html('<img src="images/arrow_white_left.png" alt="Previous">');
  $('.slick-next').html('<img src="images/arrow_white_right.png" alt="Next">'); // Corrected alt attribute
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
          <div>
            <div>
              <img
                src="${person.pic_url}"
                class="d-block align-self-center"
                alt="Carousel Pic of ${person.name}"
              />
            </div>
            <div>
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
      customizeArrows();
    },
    error: function (xhr, status, error) {
      console.log('ajax broke: ' + error);
    }
  });
};


