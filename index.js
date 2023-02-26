const APIKey = "70f57951";
const detail = document.querySelector(".details");
const error = document.querySelector(".details .error img");
const image = document.querySelector(".details .image img");
const title = document.querySelector(".details .title h1");
const rating = document.querySelector(".details .rating span");
const rated = document.querySelector(".details .rated-year .rated");
const year = document.querySelector(".details .rated-year .year");
const type = document.querySelector(".details .type");
const plot = document.querySelector(".details .plot p");
const cast = document.querySelector(".details .cast");
const writer = document.querySelector(".details .writer");
function removeClass(element, className = "valid") {
    element.classList.contains(className) &&
        element.classList.remove(className);
}
function mapStringAndAppendToDiv(array, div) {
    const arrays = array.split(", ");
    const arraySpans = arrays.map((genre) => {
        const span = document.createElement("span");
        span.textContent = genre;
        return span;
    });
    div.append(...arraySpans);
}
function removeElementExist(element) {
    document.querySelectorAll(element).forEach(function (typeItem) {
        if (typeItem) {
            typeItem.remove();
        }
    });
}
document.querySelector("button").addEventListener("click", () => {
    const inputValue = document.querySelector(".input").value;
    fetch(`https://www.omdbapi.com/?t=${inputValue}&apikey=${APIKey}`)
        .then((response) => response.json())
        .then((data) => {
            detail.classList.add("active");
            if (data.Response === "False") {
                removeClass(detail, "valid");
                detail.classList.add("invalid");
            } else {
                console.log(data);
                removeClass(detail, "invalid");
                detail.classList.add("valid");
                removeElementExist(".details .type span");
                mapStringAndAppendToDiv(data.Genre, type);
                removeElementExist(".details .cast span");
                mapStringAndAppendToDiv(data.Actors, cast);
                removeElementExist(".details .writer span");
                mapStringAndAppendToDiv(data.Writer, writer);
                title.innerHTML = data.Title;
                rating.innerHTML = data.imdbRating;
                rated.innerHTML = data.Rated;
                year.innerHTML = data.Year;
                plot.innerHTML = data.Plot;
                src = data.Poster;
                image.setAttribute("src", src);
            }
        });
});
