// script.js
const formatNumber = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

$(document).ready(() => {
  calculateTotalPortfolio();
  renderStocksFromLocalStorage();
  updateColors();

  $(".portfolioBox, .hideDetail, .deleteButton").hide();

  $("#togglePortfolio").click(() => {
    $(".portfolioBox, .deleteButton").toggle();
  });

  $(".unhideDetail").click(function () {
    $(this).siblings(".hideDetail").toggle();
    const img = $(this).find(".updownSymbol");
    img.attr("src", img.attr("src") === "image/vdown.png" ? "image/vup.png" : "image/vdown.png");
  });

  $("#addStockForm").submit(function (event) {
    event.preventDefault();

    const symbol = $("#symbolInput").val();
    const ownPriceInput = parseInt($("#ownPriceInput").val()) || 0;
    const ownPrice = Number((ownPriceInput - ownPriceInput * 0.0013).toFixed(0));
    const marketPrice = parseInt($("#marketPriceInput").val()) || 0;
    const volume = parseInt($("#volumeInput").val()) || 0;
    const outroom = parseInt($("#outroomInput").val()) || 0;
    const t0 = parseInt($("#t0Input").val()) || 0;
    const t1 = parseInt($("#t1Input").val()) || 0;
    const t2 = parseInt($("#t2Input").val()) || 0;
    const klkhac = parseInt($("#otherVolumeInput").val()) || 0;
    const cpthuong = parseInt($("#rewardVolumeInput").val()) || 0;

    const tongkl = volume + t0 + t1 + t2 + outroom + klkhac + cpthuong;
    const percentChangeValue = ((marketPrice - ownPrice) / ownPrice) * 100;
    const percentChange = (percentChangeValue >= 0 ? '+' : '-') + Math.abs(percentChangeValue).toFixed(2) + '%';
    const tongvon = ownPrice * tongkl;
    const giatrithitruong = marketPrice * tongkl;
    const lailoValue = giatrithitruong - tongvon;
    const lailo = (lailoValue >= 0 ? '+' : '-') + Math.abs(lailoValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const klkd = tongkl - t0 - t1 - t2;
    const klthuong = klkd - outroom || 0;

    const newStock = {
      symbol,
      ownPrice: (ownPrice / 1000).toFixed(2),
      marketPrice: (marketPrice / 1000).toFixed(2),
      volume: formatNumber(volume),
      percentChange,
      tongvon: formatNumber(tongvon),
      giatrithitruong: formatNumber(giatrithitruong),
      lailo,
      tongkl: formatNumber(tongkl),
      klthuong: formatNumber(klthuong),
      klkhac: formatNumber(klkhac),
      klkd: formatNumber(klkd),
      outroom: formatNumber(outroom),
      t0: formatNumber(t0),
      t1: formatNumber(t1),
      t2: formatNumber(t2),
      cpthuong: formatNumber(cpthuong)
    };

    saveStockToLocalStorage(newStock);
    renderStocksFromLocalStorage();
    $("#addStockForm")[0].reset();
  });

  $(".stockContainer").on("click", ".deleteButton", function () {
    const stockDiv = $(this).closest(".stock");
    deleteStockFromLocalStorage(stockDiv.attr("id"));
    stockDiv.remove();
  });
});

function renderStocksFromLocalStorage() {
  if (typeof Storage !== "undefined") {
    $(".stockContainer").empty(); // Clear the container before re-rendering
    let stocks = JSON.parse(localStorage.getItem("stocks")) || [];

    // Sort stocks by volume in descending order
    stocks.sort((a, b) => {
      // Remove commas and parse as integers
      const volumeA = parseInt(a.volume.replace(/,/g, ""), 10);
      const volumeB = parseInt(b.volume.replace(/,/g, ""), 10);
      return volumeB - volumeA;
    });

    stocks.forEach(stock => {
      const stockHtml = `
        <div class="stock" id="${stock.symbol}">
          <div class="unhideDetail">
            <div class="detailTextBox">
              <h3 class="symbol">${stock.symbol}
                <img src="image/vdown.png" class="updownSymbol"/>
              </h3>
              <h3 class="ownPrice">${stock.ownPrice}</h3>
              <h3 class="marketPrice">${stock.marketPrice}</h3>
              <h3 class="volume">${stock.volume}</h3>
              <h3 class="percentChange" style="margin-right: 4%; color: white;">${stock.percentChange}</h3>
            </div>
          </div>
          <div class="hideDetail">
            <div class="valueDetail">
              <h3 class="tongvon" style="font-weight: 600;">${stock.tongvon}</h3>
              <h3 class="giatrithitruong" style="font-weight: 600;">${stock.giatrithitruong}</h3>
              <h3 class="lailo" style="font-weight: 600;">${stock.lailo}</h3>
            </div>
            <div class="vol1">
              <h3 class="tongkl" style="font-weight: 600;">${stock.tongkl}</h3>
              <h3 class="klthuong" style="font-weight: 600;">${stock.klthuong}</h3>
              <h3 class="klfs" style="font-weight: 600;">0</h3>
              <h3 class="klkd" style="font-weight: 600;">${stock.klkd}</h3>
              <h3 class="outroom" style="font-weight: 600;">${stock.outroom}</h3>
            </div>
            <div class="vol2">
              <h3 class="klkhac" style="font-weight: 600;">${stock.klkhac}</h3>
              <h3 class="cpthuong" style="font-weight: 600;">${stock.cpthuong}</h3>
            </div>
            <div class="vol3">
              <h3 class="t0" style="font-weight: 600;">${stock.t0}</h3>
              <h3 class="t1" style="font-weight: 600;">${stock.t1}</h3>
              <h3 class="t2" style="font-weight: 600;">${stock.t2}</h3>
            </div>
            <button class="deleteButton">Delete</button>
          </div>
        </div>`;
      $(".stockContainer").append(stockHtml);
    });
  } else {
    console.error("Local storage is not supported");
  }
}

function calculateTotalPortfolio() {
  if (typeof Storage !== "undefined") {
    const stocks = JSON.parse(localStorage.getItem("stocks")) || [];
    const convert = s => parseInt(s.replace(/,/g, ""), 10);
    let totalBudget = 0, totalProfit = 0, totalMarketValue = 0;
    stocks.forEach(stock => {
      totalBudget += convert(stock.tongvon);
      totalProfit += convert(stock.lailo);
      totalMarketValue += convert(stock.giatrithitruong);
    });
    const totalGainPercentage = ((totalMarketValue - totalBudget) / totalBudget) * 100;
    $('#totalBudget').text(formatNumber(totalBudget));
    $('#totalProfit').text((totalProfit >= 0 ? '+' : '-') + formatNumber(Math.abs(totalProfit)));
    $('#totalMarketValue').text(formatNumber(totalMarketValue));
    $('#totalGainPercentage').text((totalGainPercentage >= 0 ? '+' : '-') + Math.abs(totalGainPercentage).toFixed(2) + '%');
  } else {
    console.error("Local storage is not supported");
  }
}

function updateColors() {
  $(".stock").each(function () {
    const pct = parseFloat($(this).find(".percentChange").text().replace('%', ''));
    changeColorBasedOnValue($(this).find(".symbol"), pct);
    changeColorBasedOnValue($(this).find(".lailo"), pct);
    changeBackgroundImageBasedOnValue($(this).find(".unhideDetail"), pct);
  });
  const totalProfit = parseFloat($("#totalProfit").text().replace(',', ''));
  const todayProfit = parseFloat($("#todayProfit").text().replace(',', ''));
  changeColorBasedOnValue($("#totalProfit"), totalProfit);
  changeColorBasedOnValue($("#todayProfit"), todayProfit);
  const totalGain = parseFloat($("#totalGainPercentage").text().replace('%', ''));
  changeColorBasedOnValue($("#totalGainPercentage"), totalGain);
  $(".percentChange").each(function() {
    const pctText = $(this).text().trim();
    $(this).css("color", pctText.charAt(0) === "+" ? "#00ab55" : "#ce414a");
  });  
}

function changeColorBasedOnValue(element, value) {
  element.css("color", value > 0 ? "#00ab55" : value < 0 ? "#d93742" : "black");
}

function changeBackgroundImageBasedOnValue(element, value) {
  element.css("background-image", `url('image/stock_hide_${value < 0 ? 'negative' : 'positive'}.jpg')`);
}

function saveStockToLocalStorage(stock) {
  if (typeof Storage !== "undefined") {
    const stocks = JSON.parse(localStorage.getItem("stocks")) || [];
    stocks.push(stock);
    localStorage.setItem("stocks", JSON.stringify(stocks));
  } else {
    console.error("Local storage is not supported");
  }
}

function deleteStockFromLocalStorage(symbolToDelete) {
  if (typeof Storage !== "undefined") {
    const stocks = JSON.parse(localStorage.getItem("stocks")) || [];
    const updatedStocks = stocks.filter(stock => stock.symbol !== symbolToDelete);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));
  } else {
    console.error("Local storage is not supported");
  }
}
