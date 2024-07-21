// script.js
$(document).ready(() => {

    calculateTotalPortfolio()
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



    $(".unhideDetail").click(function() {
        // Toggle the .hideDetail sibling element
        $(this).siblings(".hideDetail").toggle();
    
        // Find the img element within this .unhideDetail
        var img = $(this).find(".updownSymbol");
    
        // Check the current source and toggle it
        if (img.attr("src") === "image/vdown.png") {
            img.attr("src", "image/vup.png");
        } else {
            img.attr("src", "image/vdown.png");
        }
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
                        <h2 class="ownPrice" style="font-weight: 600;">${stock.ownPrice}</h2>
                        <h2 class="marketPrice" style="font-weight: 600;">${stock.marketPrice}</h2>
                        <h2 class="volume" style="font-weight: 600;">${stock.volume}</h2>
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
                        <h2 class="tongvon" style="font-weight: 600;">${stock.tongvon}</h2>
                        <h2 class="giatrithitruong" style="font-weight: 600;">${stock.giatrithitruong}</h2>
                        <h2 class="lailo" style="font-weight: 600;">${stock.lailo}</h2>
                    </div>
                    <div class="vol1">
                        <h2 class="tongkl" style="font-weight: 600;">${stock.tongkl}</h2>
                        <h2 class="klthuong" style="font-weight: 600;">${stock.klthuong}</h2>
                        <h2 class="klfs" style="font-weight: 600;">${0}</h2>
                        <h2 class="klkd" style="font-weight: 600;">${stock.klkd}</h2>
                        <h2 class="outroom" style="font-weight: 600;">${stock.outroom}</h2>
                    </div>
                    <div class="vol2">
                        <h2 class="klkhac" style="font-weight: 600;">${stock.klkhac}</h2>
                        <h2 class="cpthuong" style="font-weight: 600;">${stock.cpthuong}</h2>
                    </div>
                    <div class="vol3">
                        <h2 class="t0" style="font-weight: 600;">${stock.t0}</h2>
                        <h2 class="t1" style="font-weight: 600;">${stock.t1}</h2>
                        <h2 class="t2" style="font-weight: 600;">${stock.t2}</h2>
                    </div>
                    <button class="deleteButton">Delete</button>
                </div>
            </div>`

            $(".stockContainer").append(stockHtml);
        });
    } else {
        console.error("Local storage is not supported");
    }
};

// Function to render stocks from local storage
function calculateTotalPortfolio() {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve sto#d93742 data
        var stocks = JSON.parse(localStorage.getItem("stocks")) || [];

        function convertStringToInteger(stringWithCommas) {
            // Remove commas globally and parse the string to an integer
            return parseInt(stringWithCommas.replace(/,/g, ""), 10);
        };

        let totalBudget = 0;
        let totalProfit = 0;
        let totalMarketValue = 0;
        let totalGainPercentage = 0;

        // Iterate over the stocks and render them
        stocks.forEach(function(stock) {
            var budget = convertStringToInteger(stock.tongvon);
            var marketValue = convertStringToInteger(stock.giatrithitruong);
            var profit = convertStringToInteger(stock.lailo);
            totalBudget += budget;
            totalProfit += profit;
            totalMarketValue += marketValue;
        });

        totalGainPercentage = ((totalMarketValue-totalBudget)/totalBudget)*100;

        // Update the content of specific elements with calculated values using jQuery
        $('#totalBudget').text(totalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#totalProfit').text((totalProfit >= 0 ? '+' : '-') + Math.abs(totalProfit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#totalMarketValue').text(totalMarketValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#totalGainPercentage').text((totalGainPercentage >= 0 ? '+' : '-') + Math.abs(totalGainPercentage).toFixed(2) + '%');

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
        changeColorBasedOnValue(symbolElement, percentChange);

        // Change lailo color based on percentChange
        var lailoElement = $(this).find(".lailo");
        changeColorBasedOnValue(lailoElement, percentChange);

        // Change background image based on percentChange
        var unhideDetailElement = $(this).find(".unhideDetail");
        changeBackgroundImageBasedOnValue(unhideDetailElement, percentChange);
    });

    // Update the color of specific elements based on their content
    var totalProfit = parseFloat($("#totalProfit").text().replace(',', ''));
    var todayProfit = parseFloat($("#todayProfit").text().replace(',', ''));

    changeColorBasedOnValue($("#totalProfit"), totalProfit);
    changeColorBasedOnValue($("#todayProfit"), todayProfit);

    // Update the color of the totalGainPercentage element
    var totalGainPercentage = parseFloat($("#totalGainPercentage").text().replace('%', ''));
    changeColorBasedOnValue($("#totalGainPercentage"), totalGainPercentage);

    // Update the color of the totalPercentChangeBox element
    var totalPercentChangeBox = $(".totalPercentChangeBox");
    if (totalGainPercentage > 0) {
        totalPercentChangeBox.css({
            "border": "2px solid #00ab55",
            "background-color": "#d7fadf",
            "color": "#00ab55"
        });
    } else {
        // Handle case when totalGainPercentage is <= 0
        totalPercentChangeBox.css({
            "border": "2px solid #ce414a",
            "background-color": "#ffdadb",
            "color": "#ce414a"
        });
    }
}

// Helper function to change color based on the value
function changeColorBasedOnValue(element, value) {
    if (value > 0) {
        element.css("color", "#00ab55");
    } else if (value < 0) {
        element.css("color", "#d93742");
    } else {
        element.css("color", "black");
    }
}

// Helper function to change background image based on the value
function changeBackgroundImageBasedOnValue(element, value) {
    if (value > 0) {
        element.css("background-image", "url('image/stock_hide_positive.jpg')");
    } else if (value < 0) {
        element.css("background-image", "url('image/stock_hide_negative.jpg')");
    } else {
        element.css("background-image", "url('image/stock_hide_positive.jpg')");
    }
}


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