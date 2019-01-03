let searchBar =  document.getElementById("search");
let particleContainer = document.getElementById("background");
let results = document.getElementById("results");
let wrapper = document.getElementsByClassName("wrapper")[0];
window.onload = () => {
  
  const PARTICLE_MAX = 500;

  for(let i = 0; i < PARTICLE_MAX; i++){
    let particle = document.createElement("div");

    particle.className = "particle";

    particle.style.setProperty('--offset-left', (Math.floor(Math.random() * window.innerWidth*2) - window.innerWidth) + "px");
    particle.style.setProperty('--offset-top', (Math.floor(Math.random() * window.innerHeight*2) - window.innerHeight) + "px");

    //shades of purple
    let color = "hsl(280, 100%, " + (Math.floor(Math.random() * 100) + 1) + "%)"; 
    let size = Math.floor((Math.random() * 10) + 5) + "px";

    particle.style.backgroundColor = color;
    particle.style.width = size;
    particle.style.height = size;

    //coordinates
    particle.style.left = Math.floor(Math.random() * window.innerWidth*1.5 + 1) + "px";
    particle.style.top = Math.floor(Math.random() * window.innerHeight*1.5 + 1) + "px";
    

    particleContainer.appendChild(particle);
  }
}


document.addEventListener("keydown", (e) => {
  
  if(e.key == 'Enter'){
    let q = searchBar.value;

    while(results.firstElementChild){
      results.removeChild(results.firstElementChild);
    }

    wrapper.style.display = "flex";
    results.style.overflowX = "hidden";
    let loader = document.createElement("div");
    loader.className = "loader";

    results.appendChild(loader);

    if(q != ''){
      let data = fetch("https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist="+q+"&page=1&page_size=1&apikey=fc5c43e147239696f2f0acb1733a984c")
      .then(response => response.text())
      .then(data => {
        data = data.replace("callback(", "");
        data = data.replace(");", "");
        data = JSON.parse(data);
        if(data.message.body.artist_list.length > 0)
          return data.message.body.artist_list[0];
        else
          throw "Not Found";
      })

      
      data.then(data => {
        results.removeChild(results.firstElementChild);
        results.style.overflowX = "scroll";
        let artistId = data.artist.artist_id;
        
        fetch("https://api.musixmatch.com/ws/1.1/artist.related.get?format=jsonp&callback=callback&artist_id="+ artistId +"&page=0&page_size=10&apikey=fc5c43e147239696f2f0acb1733a984c")
        .then(response => response.text())
        .then(data => {
          data = data.replace("callback(", "");
          data = data.replace(");", "");
          return JSON.parse(data).message.body.artist_list;
        })
        .then(data => {
          for(let artist of data){
            let link = document.createElement("h3");
            link.innerText = artist.artist.artist_name;
            link.onclick = () => {
              window.open("http://www.google.com/search?q="+ artist.artist.artist_name, '_blank'); 
            }
            results.appendChild(link);
          }
        })
      }).catch(err => {
        alert("Artist not found!");
        results.removeChild(results.firstElementChild);
        wrapper.style.display = "none";
        results.style.overflowX = "hidden";
      })
      
    }
  }
});