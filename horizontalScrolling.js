const horizontalScrolls = document.querySelectorAll(".horizontal-scroll");

horizontalScrolls.forEach((item) => {
  item.addEventListener("wheel", function (e) {
    e.preventDefault();
    if (e.deltaY > 0) item.scrollLeft += 100;
    else item.scrollLeft -= 100;
  });
});
