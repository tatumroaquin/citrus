document.addEventListener('DOMContentLoaded', function() {
  const fuseOptions = {
    threshold: 0.1,
    keys: [
      "title",
      "path",
    ]
  };

  const fuse = new Fuse(window.searchIndex, fuseOptions);

  const searchInput = document.querySelector('.find__input');

  const searchList = document.querySelector('.find__list');

  function debounce(func, wait) {
    let timeout;

    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  searchInput.addEventListener('input', debounce(function() {
    const searchQuery = this.value;
    const fuseResults = fuse.search(searchQuery);

    // count item per slash, excludes section titles that only has 3 
    const filterResults = fuseResults.filter(elem => elem.item.path.split('/').length === 4);
    const cleanResults = filterResults.map(elem => elem.item);

    searchList.innerHTML = "";

    for (const elem of cleanResults) {
      const item = document.createElement('li');
      const link = document.createElement('a');

      link.href = elem.url;
      link.innerHTML = elem.title;
      link.className = "find__link";

      item.className = "find__item";
      item.appendChild(link);

      searchList.appendChild(item);
    }

  }, 200));
});
