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

// NHẬP SỐ TÀI KHOẢN

// NHẬP MÃ CHỨNG KHOÁN
const form = document.getElementById("form");
const buttonAdd = document.getElementById("button_add");
buttonAdd.addEventListener("click", () => {
	form.style.display = form.style.display === "none" ? "flex" : "none";
});
document.addEventListener("click", function(event) {
	if (!form.contains(event.target) && event.target !== buttonAdd) {
		form.style.display = "none";
	}
});
document.getElementById("submit").addEventListener("click", function(e) {
	e.preventDefault();

	let stockName = document.getElementById("stock_name").value;
	let id = document.getElementById("id").value;
	let buyingPrice = 0 + parseInt(document.getElementById("buying_price").value);
	let marketPrice = 0 + parseInt(document.getElementById("market_price").value);
	let volume = 0 + parseInt(document.getElementById("volume").value);
	let muat0 = 0 + parseInt(document.getElementById("t0").value);
	let muat1 = 0 + parseInt(document.getElementById("t1").value);
	let muat2 = 0 + parseInt(document.getElementById("t2").value);
	let muafs = 0 + parseInt(document.getElementById("fs").value);


	let klOutroom;
	if (document.getElementById("kl_outroom").value === "") {
		klOutroom = 0;
	} else {
		klOutroom = 0 + parseInt(document.getElementById("kl_outroom").value);
	}
	let klKhac;
	if (document.getElementById("kl_khac").value === "") {
		klKhac = 0;
	} else {
		klKhac = 0 + parseInt(document.getElementById("kl_khac").value);
	}





	buyingPrice = 0 + Math.floor(buyingPrice + (buyingPrice * 0.00135));
	let profit = 0 + ((marketPrice * 100) / buyingPrice) - 100;
	let totalVolume = 0 + parseInt(muat0) + parseInt(muat1) + parseInt(muat2) + parseInt(volume) + parseInt(muafs) + parseInt(klOutroom) + parseInt(klKhac);
	let totalCapital = 0 + totalVolume * buyingPrice;
	let marketValue = 0 + marketPrice * totalVolume;
	let totalRevenue = 0 + marketValue - totalCapital;
	let klthuongValue = 0 + totalVolume - parseInt(muafs) - parseInt(klOutroom) - parseInt(klKhac) - (parseInt(muat0) + parseInt(muat1) + parseInt(muat2));
	let klkdValue = 0 + totalVolume - (parseInt(muat0) + parseInt(muat1) + parseInt(muat2));

	let buyingPriceText = buyingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	let marketPriceText = marketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	let vlolumeText = volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



	let t0Text;
	if (muat0 === 0) {
		t0Text = " ";
	} else {
		t0Text = muat0.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	let t1Text;
	if (muat1 === 0) {
		t1Text = " ";
	} else {
		t1Text = muat1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	let t2Text;
	if (muat2 === 0) {
		t2Text = " ";
	} else {
		t2Text = muat2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	let fsText = muafs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



	let klOutroomText = klOutroom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let klKhacText = klKhac.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let profitText = profit.toFixed(2);
	let totalVolumeText = totalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let totalCapitalText = totalCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let marketValueText = marketValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let totalRevenueText = totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let klthuongValueText = klthuongValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let klkdValueText = klkdValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


	let rag = "";
	if (profit < 0) {
		rag = "#c30406";
	} else {
		rag = "#26c255";
	}


	let data = {
		stockName,
		id,
		buyingPrice,
		buyingPriceText,
		marketPrice,
		marketPriceText,
		volume,
		vlolumeText,
		profit,
		profitText,
		totalCapital,
		totalCapitalText,
		marketValue,
		marketValueText,
		totalRevenue,
		totalRevenueText,
		muafs,
		fsText,
		muat0,
		muat1,
		muat2,
		t0Text,
		t1Text,
		t2Text,
		klOutroom,
		klOutroomText,
		klKhac,
		klKhacText,
		totalVolume,
		totalVolumeText,
		klthuongValue,
		klthuongValueText,
		klkdValue,
		klkdValueText,
		rag,
	};

	let buttonMck = addButtonMck(data);
	document.getElementById("form").style.display = "none";

	// Add the new button data to the array
	button_mck_array.push({
		data
	});

	// Save the updated array to local storage
	localStorage.setItem(STORAGE_KEY, JSON.stringify(button_mck_array));
});
//FUNCTION ADD MA CHUNG KHOAN
function addButtonMck(data) {
	let buttonMck = document.createElement("div");
	buttonMck.classList.add("button_mck");
	buttonMck.innerHTML = `
                            <div class="data-item" id="stock_name_data">
                                <label class="text__mck name" style="color:${data.rag}">${data.stockName}</label>
                                <div class="text__san iddd">${data.id}</div>
                              </div>
                              <div class="data-item" id="buying_price_data">
                                <label class="text__gray">Giá TB</label>
                                <div class="text__number">${data.buyingPriceText}</div>
                              </div>
                              <div class="data-item" id="market_price_data">
                                <label class="text__gray">Giá TT</label>
                                <div class="text__number">${data.marketPriceText}</div>
                            
                              </div>
                              <div class="data-item" id="volume_data">
                                <label class="text__gray">KL khả dụng</label>
                                <div id="" class="text__number__bigger">${data.klkdValueText}</div>
                              </div>
                              <div class="data-item" id="profit_data">
                                <label class="text__gray">Lãi/lỗ</label>
                                <div class="text__number__bigger redgreen" style="color:${data.rag}">${data.profitText}%</div>
                              </div>
                              <div class="data-item hide" id="totalCapital_data">
                                <label class="text__gray">Tổng vốn</label>
                                <div class="text__number__big">${data.totalCapitalText}</div>
                              </div>
                              <div class="data-item hide" id="marketValue_data">
                                <label class="text__gray">Giá trị thị trường</label>
                                <div class="text__number__big">${data.marketValueText}</div>
                              </div>
                              <div class="data-item hide" id="totalRevenue_data">
                                <label class="text__gray">Lãi/lỗ</label>
                                <div class="text__number__big redgreen" style="color:${data.rag};">${data.totalRevenueText}</div>
                              </div>
                              <div class="data-item hide" id="FSvolumes_data">
                                <div class="left_and_right" style="position:absolute;top:0%;">
                                    <label class="text__gray" style="margin: 0.2em 0em 0 0.3em;">Tổng KL</label>
                                    <div class="text__number__biggerfs sortVolume" style="margin: 0em 0.2em 0 0em;">${data.totalVolumeText}</div>
                                </div>
                                <div class="left_and_right" style="position:absolute;top:40%;">
                                    <label class="text__gray"  style="margin: 0em 0em 0 0.3em;">KL thường</label>
                                    <div class="text__thin" style="margin: 0em 0.2em 0 0em;">${data.klthuongValueText}</div>
                                </div>
                                <div class="left_and_right" style="position:absolute;top:70%;">
                                    <label class="text__gray" style="margin: 0em 0em 0 0.3em;">KL FS</label>
                                    <div class="text__thin" style="margin: 0em 0.2em 0 0em;">${data.fsText}</div>
                                </div>
                              </div>
                            
                              <div class="data-item hide" id="outRoom_data">
                                <div class="left_and_right" style="position:absolute;top:0%;">
                                    <label class="text__gray"  style="margin: 0 0em 0 0.2em;">Out room</label>
                                    <div class="text__number__big" style="margin: 0 0.2em 0 0;">${data.klOutroomText}</div>
                                </div>
                              </div>
                              <div class="data-item hide" id="KLKD_data">
                                <label class="text__gray">KL khả dụng</label>
                                <div class="text__number__big">${data.klkdValueText}</div>
                              </div>
                              <div class="data-item hide" id="KLKhac_data">
                                <label class="text__gray">KL khác</label>
                                <div class="text__number__big">${data.klKhacText}</div>
                                <img id="icon1" src="image/icon1.jpg" alt="">
                              </div>
                              <div class="data-item hide" id="KLmua_data">
                                <h2 class="text__gray" style="position:absolute;top:-6%;">KL mua chờ về</h2>
                            
                                <div class="left_and_right" style="position:absolute;top:27%;">
                                  <div class="innerdiv">
                                    <label class="text__gray__thin">${data.t0Text}</label>
                                  </div>
                                  <div class="text__gray__thin" style="position:absolute;top:10%;left: 98.5%;">T0</div>
                                </div>
                                <div class="left_and_right" style="position:absolute;top:51%;">
                                  <div class="innerdiv">
                                    <label class="text__gray__thin">${data.t1Text}</label>
                                  </div>
                                  <div  class="text__gray__thin" style="position:absolute;top:10%;left: 98.5%;">T1</div>
                                </div>
                                <div class="left_and_right" style="position:absolute;top:75%;">
                                  <div class="innerdiv">
                                    <label class="text__gray__thin">${data.t2Text}</label>
                                  </div>
                                  <div  class="text__gray__thin" style="position:absolute;top:10%;left: 98.5%;">T2</div>
                                </div>
                              </div>
  `;
	document.getElementById("container").appendChild(buttonMck);
	buttonMck.addEventListener("click", function() {
		this.classList.toggle("expanded");
	});
	return buttonMck;
}

// RANK CÁC MÃ CHỨNG KHOÁN THEO KHỐI LƯỢNG
var interval = setInterval(function() {
	sortButton();
}, 500); // run every 0.55 seconds
function sortButton() {
	var container = document.getElementById("container");
	var buttons = container.getElementsByClassName("button_mck");

	var prices = [];
	for (var i = 0; i < buttons.length; i++) {
		var priceData = buttons[i].getElementsByClassName("sortVolume")[0].innerHTML;
		var price = parseFloat(priceData.replace(/,/g, ''));
		prices.push({
			button: buttons[i],
			price: price
		});
	}

	prices.sort(function(a, b) {
		return b.price - a.price;
	});

	for (var i = 0; i < prices.length; i++) {
		var priceWithComma = prices[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		prices[i].button.getElementsByClassName("sortVolume")[0].innerHTML = priceWithComma;
		container.appendChild(prices[i].button);
	}
}


// Define the key name for the data in local storage
const STORAGE_KEY = 'button_mck_data';
// Check if data exists in local storage
let button_mck_array = localStorage.getItem(STORAGE_KEY);

// If data does not exist in local storage, initialize the array
if (!button_mck_array) {
	button_mck_array = [];
}

// If data exists in local storage, parse the JSON string
// and set the array to the parsed value
else {
	button_mck_array = JSON.parse(button_mck_array);
}

// Retrieve data from local storage
var storedData = JSON.parse(localStorage.getItem("button_mck_data"));

// Use the stored data
if (storedData) {
	for (var i = 0; i < storedData.length; i++) {
		var data = storedData[i].data;
		addButtonMck(data);
	}
}


// TÍNH TỔNG LÃI VÀ TRUNG BÌNH LÃI %
function calculateProfitAndAverage(button_mck_array) {
	let totalProfit = 0;
	let totalPercent = 0;
	let totalValue = 0;

	for (let i = 0; i < button_mck_array.length; i++) {
		totalProfit += parseInt(button_mck_array[i].data.totalRevenue);
		totalValue += parseInt(button_mck_array[i].data.totalCapital);
		totalPercent = (totalProfit*100)/totalValue;
	}

	const averagePercent = totalPercent;

	return {
		totalProfit: totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
		averagePercent: averagePercent.toFixed(2) + '%'
	};
}
document.getElementById('loinhuan_text').innerHTML = calculateProfitAndAverage(button_mck_array).totalProfit;
document.getElementById('phantram_text').innerHTML = calculateProfitAndAverage(button_mck_array).averagePercent;



// Add the swipe gesture to each button
var buttons = document.querySelectorAll('.button_mck');
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
			// User swiped to the right, show delete and modify buttons
			button.style.transform = 'translateX(100px)';
			var deleteButton = document.createElement('button');
			deleteButton.textContent = 'Delete';
			deleteButton.addEventListener('click', function() {
				// Delete the button and update the local storage data
				button_mck_array.splice(index, 1);
				localStorage.setItem(STORAGE_KEY, JSON.stringify(button_mck_array));
				button.remove();
			});
			var modifyButton = document.createElement('button');
			modifyButton.textContent = 'Modify';
			modifyButton.addEventListener('click', function() {




				// Modify the button and update the local storage data
				var stockName = button_mck_array[index].data.stockName;
				var id = button_mck_array[index].data.id;
				var buyingPrice = 0 + parseInt(prompt("giá mua mới:", button_mck_array[index].data.buyingPrice));
				var marketPrice = 0 + parseInt(prompt("giá thị trường mới:", button_mck_array[index].data.marketPrice));
				var volume = 0 + parseInt(prompt("khối lượng mới:", button_mck_array[index].data.volume));
				var muafs = 0 + parseInt(prompt("mua fs mới:", button_mck_array[index].data.muafs));
				var muat0 = 0 + parseInt(prompt("mua t0 mới:", button_mck_array[index].data.muat0));
				var muat1 = 0 + parseInt(prompt("mua t1 mới:", button_mck_array[index].data.muat1));
				var muat2 = 0 + parseInt(prompt("mua t2 mới:", button_mck_array[index].data.muat2));
				var klOutroom = 0 + parseInt(prompt("mua outroom mới:", button_mck_array[index].data.klOutroom));
				var klKhac = 0 + parseInt(prompt("khối lượng khác mới:", button_mck_array[index].data.klKhac));


				buyingPrice = 0 + Math.floor(buyingPrice + (buyingPrice * 0.00135));
				let profit = 0 + ((marketPrice * 100) / buyingPrice) - 100;
				let totalVolume = 0 + parseInt(muat0) + parseInt(muat1) + parseInt(muat2) + parseInt(volume) + parseInt(muafs) + parseInt(klOutroom) + parseInt(klKhac);
				let totalCapital = 0 + totalVolume * buyingPrice;
				let marketValue = 0 + marketPrice * totalVolume;
				let totalRevenue = 0 + marketValue - totalCapital;
				let klthuongValue = 0 + totalVolume - parseInt(muafs) - parseInt(klOutroom) - parseInt(klKhac) - (parseInt(muat0) + parseInt(muat1) + parseInt(muat2));
				let klkdValue = 0 + totalVolume - (parseInt(muat0) + parseInt(muat1) + parseInt(muat2));

				let buyingPriceText = buyingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				let marketPriceText = marketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				let vlolumeText = volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



				let t0Text;
				if (muat0 === 0) {
					t0Text = " ";
				} else {
					t0Text = muat0.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				let t1Text;
				if (muat1 === 0) {
					t1Text = " ";
				} else {
					t1Text = muat1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				let t2Text;
				if (muat2 === 0) {
					t2Text = " ";
				} else {
					t2Text = muat2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}

				let fsText = muafs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



				let klOutroomText = klOutroom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let klKhacText = klKhac.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let profitText = profit.toFixed(2);
				let totalVolumeText = totalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let totalCapitalText = totalCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let marketValueText = marketValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let totalRevenueText = totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let klthuongValueText = klthuongValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let klkdValueText = klkdValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


				let rag = "";
				if (profit < 0) {
					rag = "#bf1028";
				} else {
					rag = "#26c255";
				}

				var newData = {
					stockName,
					id,
					buyingPrice,
					buyingPriceText,
					marketPrice,
					marketPriceText,
					volume,
					vlolumeText,
					profit,
					profitText,
					totalCapital,
					totalCapitalText,
					marketValue,
					marketValueText,
					totalRevenue,
					totalRevenueText,
					muafs,
					fsText,
					muat0,
					muat1,
					muat2,
					t0Text,
					t1Text,
					t2Text,
					klOutroom,
					klOutroomText,
					klKhac,
					klKhacText,
					totalVolume,
					totalVolumeText,
					klthuongValue,
					klthuongValueText,
					klkdValue,
					klkdValueText,
					rag,
				};
				button_mck_array[index].data = newData;
				localStorage.setItem(STORAGE_KEY, JSON.stringify(button_mck_array));
				button.style.transform = 'translateX(0px)';
			});
			button.appendChild(deleteButton);
			button.appendChild(modifyButton);
		} else {
			// User did not swipe far enough, reset the button position
			button.style.transform = 'translateX(0px)';
		}
	}
}




  // Get the height of the window
  const windowHeight = window.innerHeight;
  // Get the height of the header image
  const headerImageHeight = document.getElementById('img1').clientHeight;
  // Calculate the height of the main content area
  const mainContentHeight = windowHeight - headerImageHeight;
  // Set the height of the main content area
  document.getElementById('main-content').style.height = mainContentHeight + 'px';