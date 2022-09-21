const submitbuy = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("buy button clicked");

  const input = document.querySelector("#stockinput"),
    json = { stockinput: input.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // if the response is ok, then add the stock to the list and clear the input
    if (response.ok) {
      console.log("response worked!");
      //get response data
      response.json().then((data) => {
        //add the stock to the list
        addStockToList(data.symbol, data.dateAdded);
        input.value = "";
      });
    }
  });

  return false;
};

function addStockToList(ticker, dateAdded) {
  //use the data from the server to populate the div stock-list with stocks
  //copy the template from the html
  const template = document.querySelector("#stock-template");
  //get the div to put the stocks in
  const stockList = document.querySelector("#stock-list");
  const stock = new Stock(ticker, dateAdded);
  stock.init(template);
  stock.startUpdating();

  stockList.appendChild(stock.html);
}

const submitsell = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("sell button clicked");

  const input = document.querySelector("#stockinput"),
    json = { stockinput: input.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // do something with the reponse
    console.log(response);
  });

  return false;
};

window.onload = async function () {
  const buybutton = document.querySelector("#buybutton");
  buybutton.onclick = submitbuy;

  //get data from server
  let response = await fetch("/stocks", {
    method: "GET",
  });
  let data = await response.json();

  //use the data from the server to populate the div stock-list with stocks
  //copy the template from the html
  const template = document.querySelector("#stock-template");
  //get the div to put the stocks in
  const stockList = document.querySelector("#stock-list");

  //loop through the data
  for (let i = 0; i < data.length; i++) {
    //add the clone to the div
    //create a stock object and call init
    const stock = new Stock(data[i].symbol, data[i].dateAdded);
    stock.init(template);
    stock.startUpdating();

    stockList.appendChild(stock.html);
  }
};

//create a stock object
function Stock(symbol, dateAdded) {
  this.symbol = symbol;
  this.dateAdded = dateAdded;
  this.price = 0;
  this.html = null;

  this.init = async function (template) {
    //create the html for the stock from the template
    //create a clone of the template
    this.html = template.cloneNode(true);

    //add additional elements to the clone's summary tag

    //get the summary tag
    const summaryTag = this.html.querySelector("summary");

    //create the elements using addSection
    this.addSection(summaryTag, "Ticker", "symbol");
    this.addSection(summaryTag, "Price", "price");
    this.addSection(summaryTag, "Change", "change");
    this.addSection(summaryTag, "Change Percent", "change-percent");
    this.addSection(summaryTag, "Last Update", "last-update");

    const detailsTag = this.html.querySelector(".detailed-data");

    //create the elements using addSection
    this.addSection(detailsTag, "Full Name", "full-name");
    this.addSection(detailsTag, "Open", "open");
    this.addSection(detailsTag, "High", "high");
    this.addSection(detailsTag, "Low", "low");
    this.addSection(detailsTag, "Volume", "volume");
    this.addSection(detailsTag, "Previous Close", "previous-close");
    this.addSection(detailsTag, "Market Cap", "market-cap");

    //add an expansion indicator for expansion-indicator
    const expansionIndicator = this.html.querySelector(".expansion-indicator");

    const summaryBlock = this.html.querySelector("summary");
    //on click, toggle the expansion indicator from side arrow to down arrow
    summaryBlock.onclick = function () {
      expansionIndicator.innerHTML =
        expansionIndicator.innerHTML == "▶" ? "▼" : "▶";
    };

    const symbolHTML = this.html.querySelector(".symbol");
    symbolHTML.innerHTML = this.symbol.toUpperCase();

    //set the id of the clone to empty
    this.html.id = "";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("sell");
    deleteButton.innerHTML = "DEL";
    deleteButton.onclick = () => {
      this.stopUpdating();
      //post to the server to delete the stock
      const json = { stockinput: this.symbol };
      const body = JSON.stringify(json);
      fetch("/delete", {
        method: "POST",
        body,
      }).then(function (response) {
        // do something with the reponse
        console.log(response);
      });
      this.html.remove();
    };

    //get the summary element and append the delete button there
    const summary = this.html.querySelector("summary");
    summary.appendChild(deleteButton);
    // this.html.appendChild(deleteButton);

    this.updateData();

    //get some historical data from the server
    const historicalData = await this.getHistoricalData(this.symbol);

    makeChart(this.html, this.symbol, historicalData);

    return this.html;
  };

  this.addSection = function (root, heading, valueClass) {
    //create the elements
    const dataSection = document.createElement("div");
    const dataHeading = document.createElement("h3");
    const dataValue = document.createElement("p");

    //add classes to the elements
    dataSection.classList.add("data-section");
    dataHeading.classList.add("data-heading");
    dataValue.classList.add(valueClass);

    //add text to the elements
    dataHeading.textContent = heading;

    //add the elements to the div
    dataSection.appendChild(dataHeading);
    dataSection.appendChild(dataValue);

    //add the div to the html
    root.appendChild(dataSection);
  };

  this.getHistoricalData = async function (ticker) {
    //get the last year of data
    const response = await fetch("/historical?symbol=" + ticker, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  this.setHTMLFromData = function (data) {
    //last update should be the current time with no date
    let lastUpdate = new Date();
    lastUpdate = lastUpdate.toLocaleTimeString();
    this.html.querySelector(".last-update").innerHTML = lastUpdate;
    this.html.querySelector(".price").innerHTML = data.regularMarketPrice;
    this.html.querySelector(".full-name").innerHTML = data.longName;
    let change = data.regularMarketChange;
    //format the change to 2 decimal places and add a $ and + if it is positive
    change = change.toFixed(2);
    if (data.regularMarketChange > 0) {
      change = "+" + change;
    }
    this.setPosNegClass(
      this.html.querySelector(".change"),
      data.regularMarketChange
    );

    this.html.querySelector(".change").innerHTML = change;
    let changePercent = data.regularMarketChangePercent;
    //format the change percent to 2 decimal places and add a % sign and a + or - sign
    changePercent = changePercent.toFixed(2) + "%";
    if (data.regularMarketChange > 0) {
      changePercent = "+" + changePercent;
    }
    this.setPosNegClass(
      this.html.querySelector(".change-percent"),
      data.regularMarketChangePercent
    );
    this.html.querySelector(".change-percent").innerHTML = changePercent;
    this.html.querySelector(".volume").innerHTML = this.formatNumberWithSuffix(
      data.regularMarketVolume
    );
    let marketCap = data.marketCap;
    //format the market cap to use the correct suffix
    marketCap = this.formatNumberWithSuffix(marketCap);
    this.html.querySelector(".market-cap").innerHTML = "$" + marketCap;

    //open, high, low, previous close
    this.html.querySelector(".open").innerHTML = "$" + data.regularMarketOpen;
    this.html.querySelector(".high").innerHTML =
      "$" + data.regularMarketDayHigh;
    this.html.querySelector(".low").innerHTML = "$" + data.regularMarketDayLow;
    this.html.querySelector(".previous-close").innerHTML =
      "$" + data.regularMarketPreviousClose;
    this.html.querySelector(".date-added").innerHTML =
      "Date Added: " + new Date(this.dateAdded).toLocaleString();
  };

  this.formatNumberWithSuffix = function (number) {
    if (number === undefined) {
      return "N/A";
    }
    //format the number to use the correct suffix
    let suffix = "";
    if (number >= 1000000000000) {
      number = number / 1000000000000;
      suffix = "T";
    } else if (number >= 1000000000) {
      number = number / 1000000000;
      suffix = "B";
    } else if (number >= 1000000) {
      number = number / 1000000;
      suffix = "M";
    } else if (number >= 1000) {
      number = number / 1000;
      suffix = "K";
    }
    //format the number to 2 decimal places and add the suffix
    number = number.toFixed(2);
    number = number + suffix;
    return number;
  };

  this.setPosNegClass = function (element, value) {
    if (value > 0) {
      //add positive class
      element.classList.add("positive");
      //remove negative class
      element.classList.remove("negative");
    } else {
      //remove positive class
      element.classList.remove("positive");
      //add negative class
      element.classList.add("negative");
    }
  };

  this.startUpdating = function () {
    //start updating the price
    this.updateData();
    //update the price every 5 seconds
    setInterval(this.updateData.bind(this), 5000);
  };

  this.stopUpdating = function () {
    //stop updating the price
    clearInterval(this.updateData.bind(this));
  };

  this.updateData = async function () {
    console.log(symbol + " Data Refreshing");
    const fetchedData = await getCompanyData(this.symbol);
    const parsedData = await fetchedData.json();
    this.setHTMLFromData(parsedData);
    return parsedData;
  };
}

async function getCompanyData(ticker) {
  const url = "/stock?ticker=" + ticker;
  //fetch from server
  const response = await fetch(url);
  // const data = await response.json();
  return response;
}

function makeChart(root, ticker, data) {
  var ctx = root.querySelector("#chart").getContext("2d");

  var barData = parseHistoricalData(data);

  var chart = new Chart(ctx, {
    type: "candlestick",
    data: {
      datasets: [
        {
          label: ticker.toUpperCase() + " 2 Year, 1 Week",
          data: barData,
        },
      ],
    },
    //set axis label color to white
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 18,
              family: "Share Tech Mono",
              weight: "bold",
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: "white",
            font: {
              size: 18,
              family: "Share Tech Mono",
            },
            stepSize: 1,
            beginAtZero: true,
          },
        },
        x: {
          ticks: {
            color: "white",
            font: {
              size: 14,
              family: "Share Tech Mono",
            },
            stepSize: 1,
            beginAtZero: true,
          },
        },
      },
    },
  });

  var dataset = chart.config.data.datasets[0];
  dataset.color = {
    up: "#00ff00",
    down: "#ff0000",
    unchanged: "#0000ff",
  };

  dataset.borderColor = {
    up: "#111111",
    down: "#111111",
    unchanged: "#111111",
  };

  function parseHistoricalData(data) {
    let parsedData = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      parsedData.push({
        x: luxon.DateTime.fromISO(element.date).valueOf(),
        o: element.open,
        h: element.high,
        l: element.low,
        c: element.close,
      });
    }
    return parsedData;
  }
}
