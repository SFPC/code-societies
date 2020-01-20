function createArenaDrawer(channel) {
  const arenaDrawer = document.getElementById('arena-drawer');
  const arenaDrawerButton = document.getElementById('arena-drawer-button');
  const axiosArena = axios.create({
    baseURL: "https://api.are.na/v2/",
  });

  arenaDrawerButton.addEventListener('click', arenaDrawerOpen);

  function arenaDrawerOpen() {
    window.scrollTo(0, 0);
    arenaDrawer.classList.toggle('open');
    arenaDrawerButton.classList.toggle('open');
  }

  let loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = 'loading...';
  arenaDrawer.appendChild(loading);

  axiosArena.defaults.headers.Authorization = 'Bearer ---' ;
  axiosArena.get(`channels/${channel}?per=100`).then(response => {
    console.log(response);
    if (response.data && response.data.contents.length > 1) {
      arenaDrawer.removeChild(loading);
      createDrawer(response.data.contents);
    } else {

    }
  });

  function createDrawer(drawerData) {
    for (let i=0; i<drawerData.length; i++) {
      //create block
      let block = document.createElement("div");
      block.className = "block";

      if (drawerData[i].source && drawerData[i].class !== "Channel") {
        block = document.createElement("a");
        block.className = "block";
        block.href = drawerData[i].source.url;
        block.target = "_blank";
      }

      //create image
      if (drawerData[i].image && drawerData[i].image) {
        const image = document.createElement("img");
        image.className = "image";
        image.src = drawerData[i].image.square.url;
        block.appendChild(image);
      }
      //create title
      if (drawerData[i].title) {
        const title = document.createElement("div");
        title.className = "title";
        title.innerHTML = drawerData[i].title;
        block.appendChild(title);
      }

      //create text
      if (drawerData[i].class === "Text") {
        const text = document.createElement("div");
        text.className = "text";
        text.innerHTML = drawerData[i].content;
        block.appendChild(text);
      }

      arenaDrawer.appendChild(block);
    }
  }
}
