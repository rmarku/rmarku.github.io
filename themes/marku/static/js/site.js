
// Dark mode
function setDark(val) {
  if (val) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}
const currentTheme = localStorage.getItem('theme')
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme)
}

setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)

// search

async function searchStart() {
  const response = await fetch("/index.json");
  const index = await response.json();

  const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    threshold: 0.25,
    tokenize:true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {name:"title",weight:0.8},
      {name:"contents",weight:0.5},
      {name:"tags",weight:0.3},
      {name:"categories",weight:0.3}
    ]
  };
  const fuse = new Fuse(index, fuseOptions);
  
  const searchInput = document.getElementById('searchInput')
  const searchResults = document.getElementById('searchResults')
  searchInput.addEventListener('keyup',()=>{
    const search = searchInput.value
    if(search == ''){
      searchResults.innerHTML = ''
      return
    }

    const res = fuse.search(search)
    let html = ''
    for (const result of res) {
      html += `<p><a href="${result.item.permalink}">${result.item.title}</a></p>`
    }
    console.log(search)
    searchResults.innerHTML = html
  })
}

searchStart()
