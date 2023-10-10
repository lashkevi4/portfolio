let slidePosition = 0;
SlideShow();

function SlideShow() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slidePosition++;
  if (slidePosition > slides.length) {
    slidePosition = 1;
  }
  slides[slidePosition - 1].style.display = "block";
  setTimeout(SlideShow, 6000); // Change image every 2 seconds
}

function selectBand(id) {
  let redirect = new URL(
    `${window.location.origin}/src/buy-tickets-page/buy-tickets.html`
  );
  redirect.searchParams.append("id", id); 
  window.location.href = redirect.href;
}
