function toggleToc() {
  const tocElement = document.querySelector('.post-toc');
  tocElement.classList.toggle('show');

  const tocToggler = document.querySelector('.toc-toggler');
  tocToggler.classList.toggle('active');
}
