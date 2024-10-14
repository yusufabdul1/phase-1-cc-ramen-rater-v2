const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    addRamenToMenu(newRamen);

    form.reset();
  });
};

const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');

  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ramen) => {
        addRamenToMenu(ramen);
      });

      if (data.length > 0) {
        handleClick(data[0]);
      }
    })
    .catch((error) => console.error('Error fetching ramen data:', error));
};

const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener('click', () => handleClick(ramen));

  ramenMenu.appendChild(img);
};

const main = () => {
  displayRamens();      
  addSubmitListener();  
};

main();

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
