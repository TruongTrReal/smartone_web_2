// script.js
$(document).ready(() => {

    renderStocksFromLocalStorage();
    updateColors();

    // Hide the portfolio box initially
    $(".portfolioBox").hide();
    // Hide the .hideDetail div initially
    $(".hideDetail").hide();
    // Hide the .hideDetail div initially
    $(".deleteButton").hide();
    // Toggle the visibility of the portfolio box when the button is clicked
    $("#togglePortfolio").click((event) => {
        // event.preventDefault();
        // console.log('button clicked');
        $(".portfolioBox").toggle();
        $(".deleteButton").toggle();
    });



    // Toggle the visibility of .hideDetail when .unhideDetail is clicked
    $(".unhideDetail").click(function() {
        $(this).siblings(".hideDetail").toggle();
    });

    // Handle form submission
    $("#addStockForm").submit(function(event) {
        event.preventDefault();

        // Get input values
        var symbol = $("#symbolInput").val();
        
        var ownPrice = (parseInt($("#ownPriceInput").val()) - parseInt($("#ownPriceInput").val()) * 0.0013).toFixed(0) || 0;
        var marketPrice = parseInt($("#marketPriceInput").val()) || 0;
        var volume = parseInt($("#volumeInput").val()) || 0;
        var outroom = parseInt($("#outroomInput").val()) || 0;
        var t0 = parseInt($("#t0Input").val()) || 0;
        var t1 = parseInt($("#t1Input").val()) || 0;
        var t2 = parseInt($("#t2Input").val()) || 0;
        var klkhac = parseInt($("#otherVolumeInput").val()) || 0;
        var cpthuong = parseInt($("#rewardVolumeInput").val()) || 0;

        var tongkl = volume + t0 + t1 + t2 + outroom + klkhac + cpthuong;

        var percentChangeValue = ((marketPrice - ownPrice) / ownPrice) * 100;
        var percentChange = (percentChangeValue >= 0 ? '+' : '-') + Math.abs(percentChangeValue).toFixed(2) + '%';
        var tongvon = ownPrice * tongkl;
        var giatrithitruong = marketPrice * tongkl;
        var lailo = giatrithitruong - tongvon;
        var klkd = tongkl - t0 - t1 - t2;
        var klthuong = klkd - outroom || 0;


        // Create a new stock element
        var newStock = {
            symbol: symbol,
            ownPrice: (ownPrice / 1000).toFixed(2),
            marketPrice: (marketPrice / 1000).toFixed(2),
            volume: volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            percentChange: percentChange,
            tongvon: tongvon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            giatrithitruong: giatrithitruong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            lailo: lailo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            tongkl: tongkl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            klthuong: klthuong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            klkhac: klkhac.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            klkd: klkd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            outroom: outroom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            t0: t0.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            t1: t1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            t2: t2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            cpthuong: cpthuong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        };


        // Append the new stock to the portfolio
        // $(".stockContainer").append(newStock);

        // Save data to local storage
        saveStockToLocalStorage(newStock);
        renderStocksFromLocalStorage();
        // Reset the form
        $("#addStockForm")[0].reset();
    });

    // Delegate click event for delete buttons
    $(".stockContainer").on("click", ".deleteButton", function() {
        // Get the parent stock div
        var stockDiv = $(this).closest(".stock");

        // Get the symbol of the stock to be deleted
        var symbolToDelete = stockDiv.attr("id");

        // Delete the stock from local storage
        deleteStockFromLocalStorage(symbolToDelete);

        // Remove the stock div from the page
        stockDiv.remove();
    });

});

// Function to render stocks from local storage
function renderStocksFromLocalStorage() {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve sto#d93742 data
        var stocks = JSON.parse(localStorage.getItem("stocks")) || [];

        // Iterate over the stocks and render them
        stocks.forEach(function(stock) {
            var stockHtml = `
            <div class="stock" id="${stock.symbol}" >
                <div class="unhideDetail">
                    <div class="detailTextBox">
                        <h2 class="symbol">${stock.symbol}
                            <img 
                                src="image/vdown.png"
                                class="updownSymbol"
                            />
                        </h2>
                        <h2 class="ownPrice">${stock.ownPrice}</h2>
                        <h2 class="marketPrice">${stock.marketPrice}</h2>
                        <h2 class="volume">${stock.volume}</h2>
                        <div class="percentChangeBox" style="
                            width: 15vw;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 5.5%;
                            margin-top: 0.2%;">
                            <p class="percentChange" style="font-size: 3vw;color: white;">${stock.percentChange}</p>
                        </div>
                    </div>
                </div>
    
                <div class="hideDetail">
                    <div class="valueDetail">
                        <h2 class="tongvon">${stock.tongvon}</h2>
                        <h2 class="giatrithitruong">${stock.giatrithitruong}</h2>
                        <h2 class="lailo">${stock.lailo}</h2>
                    </div>
                    <div class="vol1">
                        <h2 class="tongkl">${stock.tongkl}</h2>
                        <h2 class="klthuong">${stock.klthuong}</h2>
                        <h2 class="klfs">${0}</h2>
                        <h2 class="klkd">${stock.klkd}</h2>
                        <h2 class="outroom">${stock.outroom}</h2>
                    </div>
                    <div class="vol2">
                        <h2 class="klkhac">${stock.klkhac}</h2>
                        <h2 class="cpthuong">${stock.cpthuong}</h2>
                    </div>
                    <div class="vol3">
                        <h2 class="t0">${stock.t0}</h2>
                        <h2 class="t1">${stock.t1}</h2>
                        <h2 class="t2">${stock.t2}</h2>
                    </div>
                    <button class="deleteButton">Delete</button>
                </div>
            </div>`;

            $(".stockContainer").append(stockHtml);
        });
    } else {
        console.error("Local storage is not supported");
    }
};

function updateColors() {
    // Loop through each stock
    $(".stock").each(function() {
        var percentChange = parseFloat($(this).find(".percentChange").text().replace('%', ''));

        // Change symbol color based on percentChange
        var symbolElement = $(this).find(".symbol");
        if (percentChange > 0) {
            symbolElement.css("color", "#00ab55");
        } else if (percentChange < 0) {
            symbolElement.css("color", "#d93742");
        } else {
            // Handle case when percentChange is 0
            symbolElement.css("color", "black");
        }

        // Change lailo color based on percentChange
        var lailoElement = $(this).find(".lailo");
        if (percentChange > 0) {
            lailoElement.css("color", "#00ab55");
        } else if (percentChange < 0) {
            lailoElement.css("color", "#d93742");
        } else {
            // Handle case when percentChange is 0
            lailoElement.css("color", "black");
        }

        // Change background image based on percentChange
        var unhideDetailElement = $(this).find(".unhideDetail");
        if (percentChange > 0) {
            unhideDetailElement.css("background-image", "url('/image/stock_hide_positive.jpg')");
        } else if (percentChange < 0) {
            unhideDetailElement.css("background-image", "url('/image/stock_hide_negative.jpg')");
        } else {
            // Handle case when percentChange is 0
            unhideDetailElement.css("background-image", "url('/image/default_background.jpg')");
        }
    });
};

// Function to save data to local storage
function saveStockToLocalStorage(stock) {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing data or initialize an empty array
        var stocks = JSON.parse(localStorage.getItem("stocks")) || [];

        // Add the new stock data

        stocks.push(stock);

        // Save the updated data back to localStorage
        localStorage.setItem("stocks", JSON.stringify(stocks));
    } else {
        console.error("Local storage is not supported");
    }
};

// Function to delete a stock from local storage
function deleteStockFromLocalStorage(symbolToDelete) {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing data or initialize an empty array
        var stocks = JSON.parse(localStorage.getItem("stocks")) || [];

        // Find the index of the stock to be deleted
        var indexToDelete = stocks.findIndex(function(stock) {
            return stock.symbol === symbolToDelete;
        });

        // If the stock is found, remove it from the array
        if (indexToDelete !== -1) {
            stocks.splice(indexToDelete, 1);

            // Save the updated data back to localStorage
            localStorage.setItem("stocks", JSON.stringify(stocks));
        }
    } else {
        console.error("Local storage is not supported");
    }
};