function loadImage(img: any): void {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  img.src = src;
}

export function lazyLoad(): IntersectionObserver {
  const options = {
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      console.log("entry: ", entry);
      if (entry.isIntersecting) {
        loadImage(entry.target);

        self.unobserve(entry.target);
      }
    });
  }, options);

  return observer;
}
