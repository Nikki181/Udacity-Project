let restaurant;
var newMap;

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
  initMap();
});

/**
 * Initialize leaflet map
 */
initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {      
      self.newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
        scrollWheelZoom: false
      });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        
        mapboxToken:'pk.eyJ1Ijoibmlra2kxMjMiLCJhIjoiY2psd3V4dGs3MDFpZzN3cWR1ODY0ZHB5biJ9.376IksYPVGuxn7IXXrqaRQ',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'    
      }).addTo(newMap);
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
}  
 
/* window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
} */

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

var count=0;
/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
    document.getElementById("commentsid" + count).colSpan="2";
    //document.getElementById("li" + count).border-radius="25px";
    document.getElementById("li" + count).style.borderRadius="25px";
    count++;

  });

  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
li.setAttribute('id',"li"+count);  

var tbl = document.createElement("table");
tbl.style.width="100%";
//tbl.style.border-sradius="25px";
  var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    row.style.height="40px";
 row.style.background="black";
    for (var j = 0; j < 2; j++) {
      var cellText;
      var cell;
      if(j==0){
        cell = document.createElement("td");
      cell.style.textAlign="left";
      cell.style.color="white"; 
      cell.style.padding="0 10px";     
        const name=review.name;
        
      cellText = document.createTextNode(name);      
      }
      if(j==1){
        var cell = document.createElement("td");
      cell.style.textAlign="right";
      cell.style.color="white";
      cell.style.padding=" 0 10px";
      const date=review.date + "   ";      
      cellText = document.createTextNode(date);
      
      }      
      cell.appendChild(cellText);
      row.appendChild(cell);
    } 
    tblBody.appendChild(row);

      var row=document.createElement("tr");
      var cell = document.createElement("td");
      const rating1=`Rating: ${review.rating}`;
      cell.style.background="darkorange";
      cell.style.padding="10px";
      cell.style.borderRadius ="15px";
      var cellText = document.createTextNode(rating1);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBody.appendChild(row);
  
      var row=document.createElement("tr");
      var cell = document.createElement("td");
      cell.setAttribute('id',"commentsid"+count);      
      //document.getElementById("commentsid").columnSpan="2";
      //cell.columnSpan="2";
      //cell.style.columnSpan="all";
      var cellText = document.createTextNode(review.comments);
      cell.appendChild(cellText);
      //cell.colspan="2";
      row.appendChild(cell);
      tblBody.appendChild(row);

      //var cell = document.createElement("td");
      //var cellText = document.createTextNode("1");
      //cell.appendChild(cellText);
      //row.appendChild(cell);
      //tblBody.appendChild(row);
  
  tbl.appendChild(tblBody);
li.appendChild(tbl);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
