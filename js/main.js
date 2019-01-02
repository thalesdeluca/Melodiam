window.onload = () => {
  let particleContainer = document.getElementById("background");
const PARTICLE_MAX = 180;

for(let i = 0; i < PARTICLE_MAX; i++){
  let particle = document.createElement("div");
  particle.className = "particle";

  let color = "hsl(280, 100%, " + (Math.floor(Math.random() * 100) + 1) + "%)"; //shades of purple
  let size = Math.floor((Math.random() * 10)+ 5) + "px";

  particle.style.backgroundColor = color;
  particle.style.width = size;
  particle.style.height = size;

  //coordinates
  particle.style.left = Math.floor(Math.random() * window.innerWidth + 1) + "px";
  particle.style.top = Math.floor(Math.random() * window.innerHeight + 1) + "px";

  particleContainer.appendChild(particle);
}
}