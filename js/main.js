let searchBar =  document.getElementById("search");
let particleContainer = document.getElementById("background");

window.onload = () => {
  
  const PARTICLE_MAX = 500;

  for(let i = 0; i < PARTICLE_MAX; i++){
    let particle = document.createElement("div");

    particle.className = "particle";

    particle.style.setProperty('--offset-left', (Math.floor(Math.random() * window.innerWidth*2) - window.innerWidth) + "px");
    particle.style.setProperty('--offset-top', (Math.floor(Math.random() * window.innerHeight*2) - window.innerHeight) + "px");

    let color = "hsl(280, 100%, " + (Math.floor(Math.random() * 100) + 1) + "%)"; //shades of purple
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
    if(q != ''){
      fetch("https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist="+q+"&page=1&page_size=1&apikey=fc5c43e147239696f2f0acb1733a984c")
      .then(response => response.text())
      .then(data => {
        data = data.replace("callback(", "");
        data = data.replace(");", "");
        return JSON.parse(data);
        console.log(JSON.parse(data));
      })
      .then(data => {
        console.log(data);
        let artistId = data.message.body.artist_list[0].artist.artist_id;
        console.log(artistId);
      });
    }
  }
});