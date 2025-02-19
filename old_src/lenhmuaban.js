function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  minutes = (minutes < 10 ? "0" : "") + minutes;
  hours = (hours < 10 ? "0" : "") + hours;
  var timeString = hours + ":" + minutes;
  document.getElementById("clock").innerHTML = timeString;
}

updateTime();
setInterval(updateTime, 1000);



const form = document.getElementById("add_lenh_form");
const buttonAdd = document.getElementById("button_add");
buttonAdd.addEventListener("click", function() {
	form.style.display = form.style.display === "none" ? "flex" : "none";
});
document.addEventListener("click", function(event) {
	if (!form.contains(event.target) && event.target !== buttonAdd) {
		form.style.display = "none";
	}
});
document.getElementById("submit").addEventListener("click", function(e) {
	e.preventDefault();
    const stockName = document.querySelector('#stock-name').value;
    const time = document.querySelector('#time').value;
    const price = document.querySelector('#price').value;
    const price1 = document.querySelector('#price1').value;
    const orderType = document.querySelector('#order-type').value;
    const volume = document.querySelector('#volume').value;
    const trangthai = document.querySelector('#trang-thai').value;

    let rag = "";
    if (orderType === 'Mua') {
      rag = "#15b059"
    } else {
      rag = "#b0222e"
    }
    


    let data = {
		    stockName,
        time,
        price,
        orderType,
        volume,
        price1,
        rag,
        trangthai
	};

	let buttonMck = addButtonMck(data);
	document.getElementById("add_lenh_form").style.display = "none";

	// Add the new button data to the array
	button_muaban_array.push({
		data
	});
    

	// Save the updated array to local storage
	localStorage.setItem(STORAGE_KEY1, JSON.stringify(button_muaban_array));
  if (document.getElementById("fix_trangthai") !== null) {
    const fixTrangThaiButton = document.getElementById('fix_trangthai');
    const huyLenhButton = document.getElementById('huy_lenh');

    fixTrangThaiButton.addEventListener("click", function() {
      trangthai = "khop";
    });

    huyLenhButton.addEventListener("click", function() {
      trangthai = "huy";
    });
} else {
}

});




function addButtonMck(data) {
	let buttonMck = document.createElement("div");
	buttonMck.classList.add("btn-lenh");

  let position = data.trangthai;
  if (position === "chokhop") {
    buttonMck.classList.add("chokhop")
    buttonMck.innerHTML = `
    <div class="data-item" id="stock_name_data">
      <label class="text__mck name">${data.stockName}</label>
      <div class="text__gray iddd">${data.time}</div>
    </div>
    <div class="data-item" id="buying_price_data">
      <label class="text__mck2" style="color: ${data.rag};">${data.orderType}</label>
      <div class="text__gray">Thường</div>
    </div>
    <div class="data-item" id="market_price_data">
      <label class="text__mck2">${data.volume}</label>
      <div class="text__gray">${data.price}</div>
    
    </div>
    <div class="data-item" id="volume_data">
      <label class="text__mck2">-</label>
      <div id="" class="text__gray sortVolume">-</div>
    </div>
    <div class="data-item" id="profit_data">
      <label class="text__mck2">${data.volume}</label>
      <div class="text__mck3 fill">Chờ khớp</div>
    </div>
    <div class="sua_huy">
    <button class="sua-btn box" id="fix_trangthai">Sửa</button>
    <button class="huy-btn box"id="huy_lenh">Hủy</button>
    `;
  } else if (position == "khop") {
    buttonMck.innerHTML = `
    <div class="data-item" id="stock_name_data">
    <label class="text__mck name">${data.stockName}</label>
    <div class="text__gray iddd">${data.time}</div>
    </div>
    <div class="data-item" id="buying_price_data">
    <label class="text__mck2" style="color: ${data.rag};">${data.orderType}</label>
    <div class="text__gray">Thường</div>
    </div>
    <div class="data-item" id="market_price_data">
    <label class="text__mck2">${data.volume}</label>
    <div class="text__gray">${data.price}</div>

    </div>
    <div class="data-item" id="volume_data">
    <label class="text__mck2">${data.volume}</label>
    <div id="" class="text__gray sortVolume">${data.price1}</div>
    </div>
    <div class="data-item" id="profit_data">
    <label class="text__gray" style="min-height: 1.6em;"></label>
    <div class="text__mck3 redgreen" style="color:#15b059">Đã khớp</div>
    </div>
    `;
  } else if (position == "huy") {
    buttonMck.innerHTML = `
      <div class="data-item" id="stock_name_data">
          <label class="text__mck name" style="color: #8a8a8a;">${data.stockName}</label>
          <div class="text__gray iddd" style="color: #8a8a8a;">${data.time}</div>
      </div>
      <div class="data-item" id="buying_price_data">
          <label class="text__mck2" style="color: #8a8a8a;">${data.orderType}</label>
          <div class="text__gray" style="color: #8a8a8a;">Thường</div>
      </div>
      <div class="data-item" id="market_price_data">
          <label class="text__mck2" style="color: #8a8a8a;">${data.volume}</label>
          <div class="text__gray" style="color: #8a8a8a;">${data.price}</div>
      </div>
      <div class="data-item" id="volume_data">
          <label class="text__mck2" style="color: #8a8a8a;">-</label>
          <div id="" class="text__gray sortVolume" style="color: #8a8a8a;">-</div>
      </div>
      <div class="data-item" id="profit_data" style="text-align: right;">
          <label class="text__mck2" style="min-height: 1.6em;"></label>
          <div class="text__mck3 redgreen" style="color: #8a8a8a;">Đã hủy</div>
      </div>`;
  }



  // Get a reference to the container element
  const container = document.getElementById("container");
  // Get the first child element of the container
  const firstChild = container.firstChild;
  // Insert the new element before the first child element
  container.insertBefore(buttonMck, firstChild);
  return buttonMck;
}


// Define the key name for the data in local storage
const STORAGE_KEY1 = 'button_muaban_data';
// Check if data exists in local storage
let button_muaban_array = localStorage.getItem(STORAGE_KEY1);

// If data does not exist in local storage, initialize the array
if (!button_muaban_array) {
	button_muaban_array = [];
}

// If data exists in local storage, parse the JSON string
// and set the array to the parsed value
else {
	button_muaban_array = JSON.parse(button_muaban_array);
}

// Retrieve data from local storage
var storedData = JSON.parse(localStorage.getItem("button_muaban_data"));

// Use the stored data
if (storedData) {
	for (var i = 0; i < storedData.length; i++) {
		var data = storedData[i].data;
		addButtonMck(data);
	}
}

// Add the swipe gesture to each button
var buttons = document.querySelectorAll('.btn-lenh');
buttons.forEach(addSwipeGesture);

function addSwipeGesture(button, index) {
	var startX;
	var currentX;

	button.addEventListener('touchstart', handleTouchStart);
	button.addEventListener('touchmove', handleTouchMove);
	button.addEventListener('touchend', handleTouchEnd);

	function handleTouchStart(event) {
		startX = event.touches[0].pageX;
		currentX = startX;
	}

	function handleTouchMove(event) {
		currentX = event.touches[0].pageX;
		var delta = currentX - startX;
		if (delta > 0) {
			button.style.transform = 'translateX(' + delta + 'px)';
		}
	}

	function handleTouchEnd(event) {
		var delta = currentX - startX;
		if (delta > 50) {
			
				button_muaban_array.splice(index, 1);
				localStorage.setItem(STORAGE_KEY1, JSON.stringify(button_muaban_array));
				button.remove();
			
		} else {
			// User did not swipe far enough, reset the button position
			button.style.transform = 'translateX(0px)';
		}
	}
}