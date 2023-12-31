var searches = [];
const cleanSearch = (searchTerm) => {
  let str = searchTerm.replace(/ /g, "-");
  return str;
};

const clearHistory = () => {
  $("#search-results").empty();
};


let startSearch = () => {
  let st = cleanSearch($("#search").val());
  console.log(st);

  let formatValue = $("#dropdown").val();

  let newUrl = `searchResult.html?q=${st}&f=${formatValue}`;
  let urlObject = { term: st, format: formatValue };
  if (!searches.includes(urlObject)) {
    searches.push(urlObject);
  }
  localStorage.setItem("searches", JSON.stringify(searches));
  location.assign(newUrl);
};

const searchHistory = () => {
  $("#search-history-container").empty();
  if (localStorage.getItem("searches")) {
    searches = JSON.parse(localStorage.getItem("searches"));
  }

  let linkHtml = `<li><a>Name</a></li>`;

  for (let index = 0; index < searches.length; index++) {
    const search = searches[index];
    let linkElement = $(linkHtml);

    let format = ": " + search["format"];
    if (format === ": null") {
      format = "";
    }
    let searchText = search["term"] + format;
    linkElement
      .find("a")
      .attr(
        "href",
        `searchResult.html?q=${search["term"]}&f=${search["format"]}`
      );

    linkElement.find("a").text(searchText);
    $("#search-history-container").append(linkElement);
  }

  // remove duplicate links
  var seenLinks = {};
  $("#search-history-container").children().each(function () {
    var link = $(this).text()
    if (seenLinks[link]) $(this).remove();
    else seenLinks[link] = true;
  });
};
searchHistory();

$("#search-button").on("click", startSearch);

