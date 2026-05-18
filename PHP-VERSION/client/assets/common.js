(() => {
  const routeMap = {
    "/about": "about.html",
    "/assets": "assets.html",
    "/convert": "convert.html",
    "/deposit/binance-pay": "deposit-binance-pay.html",
    "/deposit/crypto": "deposit-crypto.html",
    "/deposit/p2p": "deposit-p2p.html",
    "/deposit/php/history": "deposit-php-history.html",
    "/deposit/php": "deposit-php.html",
    "/deposit": "deposit.html",
    "/assets/exchange": "exchange.html",
    "/futures": "futures.html",
    "/history": "history.html",
    "/": "index.html",
    "/login": "login.html",
    "/markets": "markets.html",
    "/page": "page.html",
    "/assets/perpetual": "perpetual-assets.html",
    "/perpetual": "perpetual.html",
    "/register": "register.html",
    "/security/devices": "security-devices.html",
    "/security/password": "security-password.html",
    "/security/verification": "security-verification.html",
    "/security": "security.html",
    "/settings": "settings.html",
    "/share": "share.html",
    "/support": "support.html",
    "/assets/trade": "trade-assets.html",
    "/transfer": "transfer.html",
    "/withdraw": "withdraw.html",
  };
  const pageRegistry = new Map();
  // Change these values later if you want slower or faster live updates.
  const MARKET_REFRESH_INTERVAL_MS = 1000;
  const TRADE_REFRESH_INTERVAL_MS = 1000;
  const STATUS_CLOCK_INTERVAL_MS = 1000;
  // Change this value later if you want a different looping trade countdown.
  // This countdown is independent from the duration selected in the trade controls.
  const DEFAULT_TRADE_COUNTDOWN_SECONDS = 60;

  function resolveLegacyHref(href) {
    if (!href || !href.startsWith("#")) {
      return href;
    }

    const rawTarget = href.slice(1) || "/";
    const routePart = rawTarget.split("#")[0];
    const hashFragment = rawTarget.includes("#")
      ? rawTarget.split("#").slice(1).join("#")
      : "";
    const pathnamePart = routePart.split("?")[0];
    const searchPart = routePart.includes("?")
      ? routePart.split("?").slice(1).join("?")
      : "";
    const pathname = pathnamePart || "/";
    const fileName = routeMap[pathname];

    if (!fileName) {
      return href;
    }

    const search = searchPart ? "?" + searchPart : "";
    const fragment = hashFragment ? "#" + hashFragment : "";
    return "./" + fileName + search + fragment;
  }

  function normalizeLegacyLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const nextHref = resolveLegacyHref(anchor.getAttribute("href"));
      if (nextHref) {
        anchor.setAttribute("href", nextHref);
      }
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function numeric(value) {
    return Number(String(value ?? "").replace(/[^\d.-]/g, "")) || 0;
  }

  function formatClock(value) {
    const date = value instanceof Date ? value : new Date(value);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return hours + ":" + minutes + ":" + seconds;
  }

  function formatPrice(value, symbol) {
    const price = Number(value) || 0;
    const normalized = String(symbol || "").toUpperCase();
    const decimals =
      normalized.includes("SHIB") || Math.abs(price) < 0.01
        ? 6
        : Math.abs(price) < 1
          ? 5
          : Math.abs(price) < 100
            ? 3
            : 2;
    return price.toFixed(decimals);
  }

  function formatPercent(value) {
    const percent = Number(value) || 0;
    return (percent >= 0 ? "+" : "") + percent.toFixed(2) + "%";
  }

  function setLiveStatus(root, mode, updatedAt) {
    if (!root) {
      return;
    }

    const textNode = root.querySelector("span:last-child");
    if (!textNode) {
      return;
    }

    const prefix = mode === "simulated" ? "SIM" : "LIVE";
    textNode.textContent = prefix + " " + formatClock(updatedAt || new Date());
  }

  function flash(element, isPositive) {
    if (!element) {
      return;
    }

    const addClass = isPositive
      ? "market-flash-positive"
      : "market-flash-negative";
    const removeClass = isPositive
      ? "market-flash-negative"
      : "market-flash-positive";
    element.classList.remove(removeClass);
    element.classList.remove(addClass);
    element.getBoundingClientRect();
    element.classList.add(addClass);
  }

  function toggleDirectionalClasses(
    element,
    isPositive,
    positiveClass,
    negativeClass,
  ) {
    if (!element) {
      return;
    }

    element.classList.toggle(positiveClass, isPositive);
    element.classList.toggle(negativeClass, !isPositive);
  }

  function deriveTickerSymbol(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/\s*\/\s*/g, "")
      .replace(/[^A-Z0-9]/g, "");
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Request failed for " + url);
    }
    return response.json();
  }

  async function fetchBinanceTickers(symbols) {
    const supported = Array.from(
      new Set(symbols.filter((symbol) => /^[A-Z0-9]+USDT$/.test(symbol))),
    );
    if (!supported.length) {
      return {};
    }

    try {
      const payload = await fetchJson(
        "https://api.binance.com/api/v3/ticker/24hr?symbols=" +
          encodeURIComponent(JSON.stringify(supported)),
      );
      return Object.fromEntries(
        payload.map((entry) => [
          entry.symbol,
          {
            price: Number(entry.lastPrice),
            percent: Number(entry.priceChangePercent),
          },
        ]),
      );
    } catch {
      return {};
    }
  }

  const fallbackChangeProfiles = {
    BCHUSDT: -3.07,
    BTCUSDT: -1.68,
    CHFUSD: -0.24,
    DOGEUSDT: -4.02,
    ETHUSDT: -2.59,
    LTCUSDT: -3.09,
    SHIBUSDT: -3.28,
    TRXUSDT: -0.2,
    XAGUSD: -9.03,
    XAUUSD: -2.4,
    XPDUSD: -1.88,
    XPTUSD: -4.16,
    XRPUSDT: -2.36,
  };

  function hashSymbol(symbol) {
    return Array.from(String(symbol || "")).reduce(
      (value, character, index) => {
        return value + character.charCodeAt(0) * (index + 1);
      },
      0,
    );
  }

  function pickFallbackProfile(symbol, baselineChange) {
    const explicit = fallbackChangeProfiles[symbol];
    if (Number.isFinite(explicit)) {
      return explicit;
    }

    if (Number.isFinite(baselineChange) && Math.abs(baselineChange) >= 0.08) {
      return baselineChange;
    }

    const hash = hashSymbol(symbol);
    const direction = hash % 3 === 0 ? 1 : -1;
    const magnitude = 0.45 + (hash % 700) / 100;
    return Number((direction * magnitude).toFixed(2));
  }

  function derivePercentFromBaseline(price, baselinePrice, fallbackPercent) {
    const nextPrice = Number(price);
    const anchorPrice = Number(baselinePrice);
    if (
      Number.isFinite(nextPrice) &&
      Number.isFinite(anchorPrice) &&
      anchorPrice > 0
    ) {
      const derived = ((nextPrice - anchorPrice) / anchorPrice) * 100;
      if (Math.abs(derived) >= 0.01) {
        return derived;
      }
    }

    return fallbackPercent;
  }

  function buildFallbackTicker(
    symbol,
    price,
    percent,
    baselinePrice,
    baselineChange,
  ) {
    const seed = Math.max(
      Number(price) || Number(baselinePrice) || 1,
      0.000001,
    );
    const profile = pickFallbackProfile(symbol, baselineChange);
    const anchorPrice = Math.max(Number(baselinePrice) || seed, 0.000001);
    const jitterWindow = Math.min(
      Math.max(Math.abs(profile) * 0.16, 0.04),
      0.85,
    );
    const nextPercent = profile + (Math.random() - 0.5) * jitterWindow;
    const nextPrice = Math.max(anchorPrice * (1 + nextPercent / 100), 0.000001);
    return {
      price: nextPrice,
      percent: Math.abs(nextPercent) < 0.01 ? profile : nextPercent,
    };
  }

  function updateHomeRow(row, symbol, ticker) {
    const priceNode = row.querySelector(".home-price-row-price");
    const changeNode = row.querySelector(".home-change-chip");
    const isPositive = Number(ticker.percent) >= 0;

    if (priceNode) {
      priceNode.textContent = formatPrice(ticker.price, symbol);
    }

    if (changeNode) {
      changeNode.textContent = formatPercent(ticker.percent);
      toggleDirectionalClasses(changeNode, isPositive, "positive", "negative");
    }

    toggleDirectionalClasses(row, isPositive, "positive-row", "negative-row");
    flash(row, isPositive);
  }

  function updateMarketBoardRow(row, symbol, ticker) {
    const valueContainer = row.children[1];
    const priceStrong = valueContainer
      ? valueContainer.querySelector("strong")
      : null;
    const priceSecondary = valueContainer
      ? valueContainer.querySelector("span")
      : null;
    const changeNode = row.querySelector(".change-chip");
    const isPositive = Number(ticker.percent) >= 0;
    const formattedPrice = formatPrice(ticker.price, symbol);

    if (priceStrong) {
      priceStrong.textContent = formattedPrice;
    }

    if (priceSecondary) {
      priceSecondary.textContent = "$ " + formattedPrice;
    }

    if (changeNode) {
      changeNode.textContent = formatPercent(ticker.percent);
      toggleDirectionalClasses(changeNode, isPositive, "positive", "negative");
    }

    flash(row, isPositive);
  }

  function extractRowPrice(element) {
    const explicitPriceNode =
      element.querySelector(".home-price-row-price") ||
      element.querySelector(".price-row-price") ||
      element.querySelector(".market-board-row > div:nth-child(2) strong") ||
      element.querySelector(":scope > div:nth-child(2) strong");

    if (explicitPriceNode) {
      return numeric(explicitPriceNode.textContent);
    }

    return numeric(element.textContent);
  }

  function createMarketState(rowSelector, statusSelector, updater) {
    const rows = Array.from(document.querySelectorAll(rowSelector)).map(
      (element) => {
        const initialPrice = extractRowPrice(element);
        const initialChange = numeric(
          element.querySelector(".change-chip")?.textContent,
        );

        return {
          element,
          symbol: deriveTickerSymbol(
            element.querySelector("strong")?.textContent || "",
          ),
          baseline: {
            price: initialPrice,
            change: initialChange,
          },
          current: {
            price: initialPrice,
            change: initialChange,
          },
        };
      },
    );

    return {
      container: document.querySelector(rowSelector)?.parentElement || null,
      rows,
      statusNode: document.querySelector(statusSelector),
      updater,
      mode: "simulated",
      updatedAt: new Date(),
      sortKey: null,
      sortDirection: "desc",
      sortButtons: null,
      applySort: null,
    };
  }

  function ensureMarketSort(state) {
    if (!state || state.applySort) {
      return;
    }

    state.applySort = () => {
      if (!state.sortKey || !state.container) {
        return;
      }

      const direction = state.sortDirection === "asc" ? 1 : -1;
      const rows = [...state.rows].sort((left, right) => {
        const delta =
          (left.current[state.sortKey] - right.current[state.sortKey]) *
          direction;
        if (delta !== 0) {
          return delta;
        }
        return left.symbol.localeCompare(right.symbol);
      });
      rows.forEach((rowState) => state.container.appendChild(rowState.element));
    };
  }

  function attachMarketSortButtons(stateOrResolver) {
    const getState =
      typeof stateOrResolver === "function"
        ? stateOrResolver
        : () => stateOrResolver;
    const initialState = getState();
    if (!initialState?.sortButtons) {
      return;
    }

    ensureMarketSort(initialState);

    Object.entries(initialState.sortButtons).forEach(([key, button]) => {
      if (!button) {
        return;
      }

      button.addEventListener("click", () => {
        const state = getState();
        if (!state?.sortButtons) {
          return;
        }

        ensureMarketSort(state);

        if (state.sortKey === key) {
          state.sortDirection = state.sortDirection === "desc" ? "asc" : "desc";
        } else {
          state.sortKey = key;
          state.sortDirection = "desc";
        }

        Object.entries(state.sortButtons).forEach(([buttonKey, node]) => {
          node.classList.toggle("active", buttonKey === state.sortKey);
        });

        state.applySort();
      });
    });
  }

  async function refreshMarketState(state) {
    const supportedTickers = await fetchBinanceTickers(
      state.rows.map((rowState) => rowState.symbol),
    );
    state.mode = Object.keys(supportedTickers).length ? "live" : "simulated";
    state.updatedAt = new Date();

    state.rows.forEach((rowState) => {
      const liveTicker = supportedTickers[rowState.symbol];
      const ticker =
        liveTicker ||
        buildFallbackTicker(
          rowState.symbol,
          rowState.current.price,
          rowState.current.change,
          rowState.baseline.price,
          rowState.baseline.change,
        );
      const nextPrice = Number(ticker.price);
      const fallbackPercent = pickFallbackProfile(
        rowState.symbol,
        rowState.baseline.change,
      );
      const nextPercent = Number.isFinite(Number(ticker.percent))
        ? Number(ticker.percent)
        : derivePercentFromBaseline(
            nextPrice,
            rowState.baseline.price,
            fallbackPercent,
          );

      rowState.current = {
        price: Number.isFinite(nextPrice) ? nextPrice : rowState.current.price,
        change:
          Number.isFinite(nextPercent) && Math.abs(nextPercent) >= 0.01
            ? nextPercent
            : fallbackPercent,
      };
      state.updater(rowState.element, rowState.symbol, {
        price: rowState.current.price,
        percent: rowState.current.change,
      });
    });

    if (typeof state.applySort === "function") {
      state.applySort();
    }

    setLiveStatus(state.statusNode, state.mode, state.updatedAt);
  }

  function renderMarketBoardRows(rows) {
    return rows
      .map((row) => {
        const symbol = String(row.symbol || "").toUpperCase();
        const pairLabel =
          row.pair || symbol.replace(/([A-Z0-9]+)(USD|USDT)$/, "$1 / $2");
        const volumeLabel = row.volume || "VOL: --";
        const price = Number(row.price) || 0;
        const change = Number(row.change) || 0;
        const isPositive = change >= 0;

        return (
          '<article class="market-board-row">' +
          "<div><strong>" +
          pairLabel +
          "</strong><span>" +
          volumeLabel +
          "</span></div>" +
          "<div><strong>" +
          formatPrice(price, symbol) +
          "</strong><span>$ " +
          formatPrice(price, symbol) +
          "</span></div>" +
          '<div class="change-chip ' +
          (isPositive ? "positive" : "negative") +
          '">' +
          formatPercent(change) +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function readInitialMarketRows() {
    return Array.from(
      document.querySelectorAll(".market-list .market-board-row"),
    ).map((row) => {
      const columns = row.querySelectorAll(":scope > div");
      return {
        pair: columns[0]?.querySelector("strong")?.textContent?.trim() || "",
        volume:
          columns[0]?.querySelector("span")?.textContent?.trim() || "VOL: --",
        symbol: deriveTickerSymbol(
          columns[0]?.querySelector("strong")?.textContent || "",
        ),
        price: numeric(columns[1]?.querySelector("strong")?.textContent),
        change: numeric(columns[2]?.textContent),
      };
    });
  }

  function initHomePage() {
    const state = createMarketState(
      ".home-list .home-price-row",
      ".home-market-head .live-status-indicator",
      updateHomeRow,
    );
    if (!state.rows.length) {
      return;
    }
    refreshMarketState(state);
    window.setInterval(
      () => refreshMarketState(state),
      MARKET_REFRESH_INTERVAL_MS,
    );
    window.setInterval(
      () => setLiveStatus(state.statusNode, state.mode, state.updatedAt),
      STATUS_CLOCK_INTERVAL_MS,
    );
  }

  function initMarketsPage() {
    const listRoot = document.querySelector(".market-list");
    const categoryButtons = Array.from(
      document.querySelectorAll(".markets-tab-strip .market-tab-button"),
    );
    if (!listRoot) {
      return;
    }

    const marketCategories = {
      digital: readInitialMarketRows(),
      forex: [
        {
          pair: "EUR / USD",
          volume: "VOL: 93.11M",
          symbol: "EURUSD",
          price: 1.0824,
          change: -0.42,
        },
        {
          pair: "GBP / USD",
          volume: "VOL: 71.48M",
          symbol: "GBPUSD",
          price: 1.2741,
          change: -0.37,
        },
        {
          pair: "USD / JPY",
          volume: "VOL: 88.02M",
          symbol: "USDJPY",
          price: 155.62,
          change: 0.28,
        },
        {
          pair: "AUD / USD",
          volume: "VOL: 49.37M",
          symbol: "AUDUSD",
          price: 0.6612,
          change: -0.31,
        },
        {
          pair: "CHF / USD",
          volume: "VOL: 38.91M",
          symbol: "CHFUSD",
          price: 1.097,
          change: -0.24,
        },
        {
          pair: "USD / CAD",
          volume: "VOL: 41.56M",
          symbol: "USDCAD",
          price: 1.3661,
          change: 0.16,
        },
      ],
      metals: [
        {
          pair: "XAU / USD",
          volume: "VOL: 16.18M",
          symbol: "XAUUSD",
          price: 4532.28,
          change: -2.4,
        },
        {
          pair: "XAG / USD",
          volume: "VOL: 14.42M",
          symbol: "XAGUSD",
          price: 75.856,
          change: -9.03,
        },
        {
          pair: "XPD / USD",
          volume: "VOL: 9.21M",
          symbol: "XPDUSD",
          price: 1431.53,
          change: -1.88,
        },
        {
          pair: "XPT / USD",
          volume: "VOL: 7.64M",
          symbol: "XPTUSD",
          price: 1984.14,
          change: -4.16,
        },
      ],
    };

    let currentCategory = "digital";
    let currentState = null;

    const buttons = Array.from(
      document.querySelectorAll(".live-table-head .table-sort-button"),
    );
    const sortButtons = {
      price:
        buttons.find((button) =>
          button.textContent.trim().startsWith("Price"),
        ) || null,
      change:
        buttons.find((button) =>
          button.textContent.trim().startsWith("Change"),
        ) || null,
    };

    const renderCategory = (categoryKey) => {
      const rows = marketCategories[categoryKey] || marketCategories.digital;
      listRoot.innerHTML = renderMarketBoardRows(rows);

      const nextState = createMarketState(
        ".market-list .market-board-row",
        ".live-table-head .live-status-indicator",
        updateMarketBoardRow,
      );
      nextState.sortButtons = sortButtons;

      if (currentState?.sortKey) {
        nextState.sortKey = currentState.sortKey;
        nextState.sortDirection = currentState.sortDirection;
      } else {
        nextState.sortKey = "change";
        nextState.sortDirection = "desc";
      }

      ensureMarketSort(nextState);
      nextState.applySort();
      currentState = nextState;
    };

    attachMarketSortButtons(() => currentState);

    categoryButtons.forEach((button, index) => {
      const categoryKey = ["digital", "forex", "metals"][index] || "digital";
      button.addEventListener("click", () => {
        currentCategory = categoryKey;
        categoryButtons.forEach((node) =>
          node.classList.toggle("active", node === button),
        );
        renderCategory(currentCategory);
        refreshMarketState(currentState);
      });
    });

    renderCategory(currentCategory);
    refreshMarketState(currentState);
    window.setInterval(() => {
      if (currentState) {
        refreshMarketState(currentState);
      }
    }, MARKET_REFRESH_INTERVAL_MS);
    window.setInterval(() => {
      if (currentState) {
        setLiveStatus(
          currentState.statusNode,
          currentState.mode,
          currentState.updatedAt,
        );
      }
    }, STATUS_CLOCK_INTERVAL_MS);
  }

  function toCoinbaseProduct(symbol) {
    const normalized = deriveTickerSymbol(symbol);
    if (normalized.endsWith("USDT")) {
      return normalized.slice(0, -4) + "-USD";
    }
    if (normalized.endsWith("USD")) {
      return normalized.slice(0, -3) + "-USD";
    }
    return "BTC-USD";
  }

  function readOrderBook(root, selector) {
    return Array.from(root.querySelectorAll(selector)).map((row) => {
      const values = row.querySelectorAll("strong, span");
      return {
        price: numeric(values[0]?.textContent),
        amount: numeric(values[1]?.textContent),
      };
    });
  }

  function createSyntheticCandles(lastPrice) {
    const candles = [];
    let price = Math.max(Number(lastPrice) || 100, 0.0001);
    const start = Date.now() - 23 * 60 * 1000;
    for (let index = 0; index < 24; index += 1) {
      const open = price;
      const drift = (Math.random() - 0.5) * Math.max(price * 0.006, 0.0001);
      const close = Math.max(open + drift, 0.0001);
      const high =
        Math.max(open, close) +
        Math.max(price * 0.0025, 0.0001) * Math.random();
      const low =
        Math.min(open, close) -
        Math.max(price * 0.0025, 0.0001) * Math.random();
      candles.push({
        time: new Date(start + index * 60 * 1000),
        open,
        high,
        low,
        close,
      });
      price = close;
    }
    return candles;
  }

  function buildSyntheticTradeState(root, previousState) {
    const lastPrice =
      previousState?.lastPrice ||
      numeric(root.querySelector(".trade-screen-mid-price")?.textContent) ||
      78314.4;
    const candles = previousState?.candles?.length
      ? previousState.candles.slice(1)
      : createSyntheticCandles(lastPrice).slice(1);
    const nextSeries = createSyntheticCandles(
      candles.at(-1)?.close || lastPrice,
    );
    candles.push(nextSeries.at(-1));
    const nextPrice = candles.at(-1)?.close || lastPrice;
    const spread = Math.max(nextPrice * 0.0003, 0.01);
    return {
      candles,
      lastPrice: nextPrice,
      asks: Array.from({ length: 6 }, (_, index) => ({
        price: nextPrice + spread * (index + 1),
        amount: 4 + Math.random() * 48,
      })),
      bids: Array.from({ length: 6 }, (_, index) => ({
        price: nextPrice - spread * (index + 1),
        amount: 4 + Math.random() * 40,
      })),
      mode: "simulated",
      updatedAt: new Date(),
    };
  }

  async function fetchCoinbaseCandles(product, granularity) {
    const response = await fetchJson(
      "https://api.exchange.coinbase.com/products/" +
        encodeURIComponent(product) +
        "/candles?granularity=" +
        granularity,
    );
    return [...response]
      .sort((left, right) => left[0] - right[0])
      .slice(-24)
      .map((entry) => ({
        time: new Date(entry[0] * 1000),
        low: Number(entry[1]),
        high: Number(entry[2]),
        open: Number(entry[3]),
        close: Number(entry[4]),
      }));
  }

  async function fetchCoinbaseBook(product) {
    const response = await fetchJson(
      "https://api.exchange.coinbase.com/products/" +
        encodeURIComponent(product) +
        "/book?level=2",
    );
    return {
      asks: (response.asks || [])
        .slice(0, 6)
        .map((entry) => ({
          price: Number(entry[0]),
          amount: Number(entry[1]),
        })),
      bids: (response.bids || [])
        .slice(0, 6)
        .map((entry) => ({
          price: Number(entry[0]),
          amount: Number(entry[1]),
        })),
    };
  }

  function ensureTradeChart(root) {
    const panel = root.querySelector(".trade-screen-panel");
    const bookLayout = panel?.querySelector(".trade-screen-book-layout");
    if (!panel || !bookLayout) {
      return null;
    }

    let chart = panel.querySelector(".trade-chart-card");
    if (chart) {
      return chart;
    }

    chart = document.createElement("section");
    chart.className = "trade-chart-card";
    chart.innerHTML =
      '<div class="trade-chart-head"><div><span class="trade-chart-eyebrow">Live Price Chart</span><strong class="trade-chart-price">--</strong></div><div class="live-status-indicator compact live"><span class="live-status-dot" aria-hidden="true"></span><span>LIVE --:--:--</span></div></div><svg class="trade-chart-svg" viewBox="0 0 320 184" aria-label="Trade price chart"></svg><div class="trade-chart-meta"><span class="trade-chart-range">1m candles</span><span class="trade-chart-change">--</span></div>';
    panel.insertBefore(chart, bookLayout);
    return chart;
  }

  function renderTradeChart(svg, candles) {
    if (!svg || !candles.length) {
      return;
    }

    const width = 320;
    const height = 184;
    const paddingX = 18;
    const paddingY = 16;
    const high = Math.max(...candles.map((candle) => candle.high));
    const low = Math.min(...candles.map((candle) => candle.low));
    const range = Math.max(high - low, 0.0001);
    const innerWidth = width - paddingX * 2;
    const innerHeight = height - paddingY * 2;
    const candleWidth = Math.max(4, innerWidth / (candles.length * 1.9));
    const pointStep = innerWidth / Math.max(candles.length - 1, 1);
    const toX = (index) => paddingX + pointStep * index;
    const toY = (value) => paddingY + ((high - value) / range) * innerHeight;
    const lastClose = candles.at(-1)?.close || 0;
    const firstClose = candles[0]?.close || lastClose;
    const isPositive = lastClose >= firstClose;
    const lineColor = isPositive ? "#5ee6b7" : "#ff7d87";
    const closePath = candles
      .map((candle, index) => toX(index) + "," + toY(candle.close))
      .join(" ");
    const gridLines = [0, 0.25, 0.5, 0.75, 1]
      .map((ratio) => {
        const y = paddingY + innerHeight * ratio;
        return (
          '<line x1="' +
          paddingX +
          '" y1="' +
          y +
          '" x2="' +
          (width - paddingX) +
          '" y2="' +
          y +
          '"></line>'
        );
      })
      .join("");
    const candleMarkup = candles
      .map((candle, index) => {
        const x = toX(index);
        const openY = toY(candle.open);
        const closeY = toY(candle.close);
        const highY = toY(candle.high);
        const lowY = toY(candle.low);
        const bodyHeight = Math.max(Math.abs(openY - closeY), 2);
        const bodyY = Math.min(openY, closeY);
        const bodyColor = candle.close >= candle.open ? "#5ee6b7" : "#ff7d87";
        return (
          '<line class="trade-chart-wick" x1="' +
          x +
          '" y1="' +
          highY +
          '" x2="' +
          x +
          '" y2="' +
          lowY +
          '" stroke="' +
          bodyColor +
          '"></line><rect x="' +
          (x - candleWidth / 2) +
          '" y="' +
          bodyY +
          '" width="' +
          candleWidth +
          '" height="' +
          bodyHeight +
          '" rx="1.6" fill="' +
          bodyColor +
          '"></rect>'
        );
      })
      .join("");

    svg.innerHTML =
      '<g class="trade-chart-grid">' +
      gridLines +
      '</g><line class="trade-chart-last-price-line" x1="' +
      paddingX +
      '" y1="' +
      toY(lastClose) +
      '" x2="' +
      (width - paddingX) +
      '" y2="' +
      toY(lastClose) +
      '"></line>' +
      candleMarkup +
      '<polyline class="trade-chart-close-line" stroke="' +
      lineColor +
      '" points="' +
      closePath +
      '"></polyline>';
  }

  function renderTradeBook(list, rows, className) {
    if (!list) {
      return;
    }

    list.innerHTML = rows
      .slice(0, 6)
      .map(
        (row) =>
          '<div class="trade-screen-book-row ' +
          className +
          '"><strong>' +
          Number(row.price).toFixed(2) +
          "</strong><span>" +
          Number(row.amount).toFixed(2) +
          "</span></div>",
      )
      .join("");
  }

  function renderTradeState(root, state) {
    const chart = ensureTradeChart(root);
    const chartPrice = chart?.querySelector(".trade-chart-price");
    const chartChange = chart?.querySelector(".trade-chart-change");
    const chartStatus = chart?.querySelector(".live-status-indicator");
    const pairChange = root.querySelector(".trade-screen-pair-change");
    const midPrice = root.querySelector(".trade-screen-mid-price");
    const askList = root.querySelector(".trade-screen-book-list.ask");
    const bidList = root.querySelector(".trade-screen-book-list.bid");
    const open = state.candles[0]?.close || state.lastPrice;
    const changePercent = open ? ((state.lastPrice - open) / open) * 100 : 0;
    const isPositive = changePercent >= 0;

    if (chart) {
      renderTradeChart(chart.querySelector(".trade-chart-svg"), state.candles);
    }

    if (chartPrice) {
      chartPrice.textContent = Number(state.lastPrice).toFixed(2) + " USD";
      toggleDirectionalClasses(chartPrice, isPositive, "positive", "negative");
    }

    if (chartChange) {
      chartChange.textContent = formatPercent(changePercent) + " today";
      toggleDirectionalClasses(chartChange, isPositive, "positive", "negative");
    }

    setLiveStatus(chartStatus, state.mode, state.updatedAt);

    if (pairChange) {
      pairChange.textContent = formatPercent(changePercent);
      toggleDirectionalClasses(pairChange, isPositive, "positive", "negative");
    }

    if (midPrice) {
      midPrice.textContent = Number(state.lastPrice).toFixed(2);
    }

    renderTradeBook(askList, state.asks, "ask");
    renderTradeBook(bidList, state.bids, "bid");
  }

  function tickCountdown(root) {
    const deadline =
      root.__tradeDeadline instanceof Date ? root.__tradeDeadline : null;
    const countdownNode = root.querySelector(
      ".trade-screen-topline-right strong",
    );
    if (!countdownNode) {
      return;
    }
    if (!(deadline instanceof Date) || Number.isNaN(deadline.getTime())) {
      return;
    }

    const remainingSeconds = Math.floor(
      (deadline.getTime() - Date.now()) / 1000,
    );
    if (remainingSeconds <= 0) {
      const nextDeadline = new Date(
        Date.now() + DEFAULT_TRADE_COUNTDOWN_SECONDS * 1000,
      );
      syncTradeDeadline(root, nextDeadline);
      return;
    }

    const next = Math.max(remainingSeconds, 0);
    const hours = String(Math.floor(next / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((next % 3600) / 60)).padStart(2, "0");
    const seconds = String(next % 60).padStart(2, "0");
    countdownNode.textContent = hours + ":" + minutes + ":" + seconds;
  }

  function parseTradeDurationSeconds(label) {
    const value = Math.max(
      Number.parseInt(String(label), 10) || DEFAULT_TRADE_COUNTDOWN_SECONDS,
      1,
    );
    return value;
  }

  function formatTradeDeadline(value) {
    return (
      value.getFullYear() +
      "/" +
      String(value.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(value.getDate()).padStart(2, "0") +
      " " +
      String(value.getHours()).padStart(2, "0") +
      ":" +
      String(value.getMinutes()).padStart(2, "0") +
      ":" +
      String(value.getSeconds()).padStart(2, "0")
    );
  }

  function formatTradeWindowRange(start, end) {
    const formatPart = (value) => {
      return (
        String(value.getHours()).padStart(2, "0") +
        ":" +
        String(value.getMinutes()).padStart(2, "0") +
        ":" +
        String(value.getSeconds()).padStart(2, "0")
      );
    };
    return formatPart(start) + " - " + formatPart(end);
  }

  function getTradeTimingStorageKey(root) {
    const pageName = document.body?.dataset?.page || "trade";
    return "aurx-trade-deadline:" + pageName;
  }

  function persistTradeDeadline(root, deadline) {
    root.__tradeDeadline = deadline;
    try {
      window.localStorage.setItem(
        getTradeTimingStorageKey(root),
        String(deadline.getTime()),
      );
    } catch {}
  }

  function resolveTradeDeadline(root) {
    try {
      const stored = Number(
        window.localStorage.getItem(getTradeTimingStorageKey(root)),
      );
      if (Number.isFinite(stored) && stored > Date.now()) {
        return new Date(stored);
      }
    } catch {}

    return new Date(Date.now() + DEFAULT_TRADE_COUNTDOWN_SECONDS * 1000);
  }

  function syncTradeDeadline(root, deadline) {
    const deadlineNode = root.querySelector(
      ".trade-screen-topline > div:first-child strong",
    );

    persistTradeDeadline(root, deadline);

    if (deadlineNode) {
      deadlineNode.textContent = formatTradeDeadline(deadline);
    }
    tickCountdown(root);
  }

  function formatTradeWindow(label) {
    const seconds = parseTradeDurationSeconds(label);
    const start = new Date();
    const end = new Date(start.getTime() + seconds * 1000);
    return formatTradeWindowRange(start, end);
  }

  function formatTradeDateInput(value) {
    return (
      value.getFullYear() +
      "-" +
      String(value.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(value.getDate()).padStart(2, "0")
    );
  }

  function formatTradeMoney(value) {
    return (Number(value) || 0).toFixed(2) + " USDT";
  }

  function formatTradeSignedMoney(value) {
    const amount = Number(value) || 0;
    return (amount >= 0 ? "+" : "") + amount.toFixed(2) + " USDT";
  }

  function buildInitiateFollowTimeOptions() {
    const options = [];
    const start = new Date();
    start.setSeconds(0, 0);
    for (let index = 0; index < 4; index += 1) {
      const optionStart = new Date(start.getTime() + index * 60 * 1000);
      const optionEnd = new Date(
        optionStart.getTime() + DEFAULT_TRADE_COUNTDOWN_SECONDS * 1000,
      );
      options.push(formatTradeWindowRange(optionStart, optionEnd));
    }
    return options;
  }

  function createInitiateFollowForm(root) {
    const tradeMeta = getCurrentTradeMeta(root);
    const timeOptions = buildInitiateFollowTimeOptions();
    return {
      title: "",
      tradingPair: tradeMeta.currentSymbol || "BTCUSDT",
      direction: "Buy Call",
      purchaseDuration: "60s",
      orderTime: timeOptions[0] || "",
      conditionType: "fixed",
      fixedMin: "0",
      fixedMax: "0",
      percentageMin: "0",
      percentageMax: "0",
    };
  }

  function buildInitiateFollowOrder(root, formState) {
    const tradeMeta = getCurrentTradeMeta(root);
    const walletBalance = getTradeWalletBalance(root);
    const isPercentage = formState.conditionType === "percentage";
    const primaryValue =
      Number(isPercentage ? formState.percentageMin : formState.fixedMin) || 0;
    const secondaryValue =
      Number(isPercentage ? formState.percentageMax : formState.fixedMax) || 0;
    const resolvedValue = Math.max(primaryValue, secondaryValue, 0);
    const amountValue = isPercentage
      ? Number((walletBalance * (resolvedValue / 100)).toFixed(2))
      : Number(resolvedValue.toFixed(2));
    const purchaseDuration = formState.purchaseDuration || "60s";
    const releaseTime = new Date(
      Date.now() + parseTradeDurationSeconds(purchaseDuration) * 1000,
    );
    return {
      code:
        "AURX-" +
        String(formState.tradingPair || "BTCUSDT").slice(0, 4) +
        "-" +
        Date.now().toString(36).slice(-4).toUpperCase(),
      title: formState.title.trim() || "Initiated Follow",
      tradingPair:
        formState.tradingPair || tradeMeta.currentSymbol || "BTCUSDT",
      purchaseDuration,
      releaseTime: formatTradeDeadline(releaseTime),
      releaseAt: releaseTime.getTime(),
      orderAmountValue: amountValue,
      orderAmount: formatTradeMoney(amountValue),
      orderPercentage: isPercentage ? resolvedValue.toFixed(0) + "%" : "",
      orderPercentageValue: isPercentage ? resolvedValue : 0,
      rateOfReturn: "12%",
      rateOfReturnValue: 12,
      actionLabel: "Follow Up",
      openPrice: Number(tradeMeta.currentPrice) || 0,
      direction: formState.direction === "Sell Put" ? "Short" : "Long",
      orderTime: formState.orderTime,
    };
  }

  function renderTradeRuntimeIcon(name) {
    const icons = {
      arrowLeft:
        '<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>',
      chevronLeft:
        '<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>',
      chevronRight:
        '<svg viewBox="0 0 24 24" class="ui-icon" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"></path></svg>',
    };

    return icons[name] || "";
  }

  function renderTradeEmptyState(label) {
    return (
      '<section class="empty-state"><div class="empty-illustration"><span class="tower left"></span><span class="tower center"></span><span class="tower right"></span><span class="base"></span></div><p>' +
      escapeHtml(label) +
      "</p></section>"
    );
  }

  function getTradeStorageKey(root, suffix) {
    const pageName = document.body?.dataset?.page || "trade";
    return "aurx-trade:" + pageName + ":" + suffix;
  }

  function readTradeStorage(root, suffix, fallback) {
    try {
      const rawValue = window.localStorage.getItem(
        getTradeStorageKey(root, suffix),
      );
      if (!rawValue) {
        return fallback;
      }
      return JSON.parse(rawValue);
    } catch {
      return fallback;
    }
  }

  function writeTradeStorage(root, suffix, value) {
    try {
      window.localStorage.setItem(
        getTradeStorageKey(root, suffix),
        JSON.stringify(value),
      );
    } catch {}
  }

  function createTradeIdentifier(prefix) {
    return (
      prefix +
      "-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 8)
    );
  }

  function getTradeUiState(root) {
    if (!root.__tradeUiState) {
      root.__tradeUiState = {
        activeTab: "orders",
        tradeNotice: "",
        followUpNotice: "",
        invitedOrderCode: "",
        showInitiateFollowSheet: false,
        showCopyHistoryPage: false,
        loadedInviteOrder: null,
        initiateFollowForm: createInitiateFollowForm(root),
        showInviteDetails: false,
        showFollowUpConfirmSheet: false,
        inviteErrorTitle: "Invite Code Already Used",
        inviteErrorMessage: "",
        copyHistoryPage: 1,
        copyHistoryItemsPerPage: 5,
        historicalStartDate: formatTradeDateInput(
          new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        ),
        historicalEndDate: formatTradeDateInput(new Date()),
        historicalPage: 1,
        historicalItemsPerPage: 5,
      };
    }

    return root.__tradeUiState;
  }

  function getTradeWalletBalance(root) {
    const storedBalance = Number(readTradeStorage(root, "wallet-balance", NaN));
    if (Number.isFinite(storedBalance)) {
      return storedBalance;
    }

    const label = root.querySelector(".trade-screen-balance-row span");
    const parsedBalance = numeric(label?.textContent);
    const initialBalance = parsedBalance > 0 ? parsedBalance : 1000;
    writeTradeStorage(root, "wallet-balance", initialBalance);
    return initialBalance;
  }

  function setTradeWalletBalance(root, nextBalance) {
    const safeBalance = Math.max(Number(nextBalance) || 0, 0);
    writeTradeStorage(root, "wallet-balance", safeBalance);
    const label = root.querySelector(".trade-screen-balance-row span");
    if (label) {
      label.textContent =
        "Trade wallet available " + safeBalance.toFixed(2) + " USDT";
    }
  }

  function getManualTradeRecords(root) {
    return readTradeStorage(root, "manual-records", []);
  }

  function setManualTradeRecords(root, records) {
    writeTradeStorage(root, "manual-records", records);
  }

  function getInviteTradeRecords(root) {
    return readTradeStorage(root, "invite-records", []);
  }

  function setInviteTradeRecords(root, records) {
    writeTradeStorage(root, "invite-records", records);
  }

  function getCurrentTradeMeta(root) {
    return (
      root.__tradeMeta || {
        currentSymbol:
          root.querySelector(".trade-screen-pair-copy strong")?.textContent ||
          "BTCUSDT",
        currentInterval:
          root.querySelector(".trade-screen-select-button span")?.textContent ||
          DEFAULT_TRADE_COUNTDOWN_SECONDS + "s",
        currentPrice:
          numeric(root.querySelector(".trade-screen-mid-price")?.textContent) ||
          78314.4,
      }
    );
  }

  function ensureTradeOverlayHost(root) {
    const panel = root.querySelector(".trade-screen-panel");
    if (!panel) {
      return null;
    }

    if (!root.__tradeOverlayHost) {
      const host = document.createElement("div");
      host.className = "trade-runtime-overlays";
      panel.appendChild(host);
      root.__tradeOverlayHost = host;
    }

    return root.__tradeOverlayHost;
  }

  function getLatestInviteSignal(root) {
    const tradeMeta = getCurrentTradeMeta(root);
    const balance = getTradeWalletBalance(root);
    const orderPercentageValue = 18;
    const rateOfReturnValue = 12;
    const durationSeconds = parseTradeDurationSeconds(
      tradeMeta.currentInterval,
    );
    const now = new Date();
    const releaseTime = new Date(now.getTime() + durationSeconds * 1000);
    const baseAmount = Math.max(balance * (orderPercentageValue / 100), 25);

    return {
      code:
        "AURX-" +
        String(tradeMeta.currentSymbol || "BTCUSDT").slice(0, 4) +
        "-" +
        String(durationSeconds).padStart(3, "0"),
      title: "VIP Futures Signal",
      tradingPair: tradeMeta.currentSymbol || "BTCUSDT",
      purchaseDuration:
        tradeMeta.currentInterval || DEFAULT_TRADE_COUNTDOWN_SECONDS + "s",
      releaseTime: formatTradeDeadline(releaseTime),
      releaseAt: releaseTime.getTime(),
      orderAmountValue: Number(baseAmount.toFixed(2)),
      orderAmount: formatTradeMoney(baseAmount),
      orderPercentage: orderPercentageValue.toFixed(0) + "%",
      orderPercentageValue,
      rateOfReturn: rateOfReturnValue.toFixed(0) + "%",
      rateOfReturnValue,
      actionLabel: "Follow Up",
      openPrice: Number(tradeMeta.currentPrice) || 0,
    };
  }

  function renderPositionOrderCard(order, compact) {
    return (
      '<article class="position-order-card">' +
      '<div class="position-order-status ' +
      escapeHtml(order.statusTone || "") +
      '">' +
      escapeHtml(order.status || "Pending") +
      "</div>" +
      '<div class="position-order-grid">' +
      '<div class="position-order-row"><span>Product</span><strong>' +
      escapeHtml(order.product || "--") +
      "</strong></div>" +
      '<div class="position-order-row"><span>Direction</span><strong>' +
      escapeHtml(order.direction || "--") +
      "</strong></div>" +
      '<div class="position-order-row"><span>Time Period</span><strong>' +
      escapeHtml(order.timePeriod || "--") +
      "</strong></div>" +
      '<div class="position-order-row position-order-row-strong"><span>Amount</span><strong>' +
      escapeHtml(order.amount || "--") +
      "</strong></div>" +
      (!compact && order.orderPercentage
        ? '<div class="position-order-row"><span>Order percentage</span><strong>' +
          escapeHtml(order.orderPercentage) +
          "</strong></div>"
        : "") +
      '<div class="position-order-row"><span>Open Position Time</span><strong>' +
      escapeHtml(order.openPositionTime || "--") +
      "</strong></div>" +
      '<div class="position-order-row"><span>Open Price</span><strong>' +
      escapeHtml(order.openPrice || "--") +
      "</strong></div>" +
      '<div class="position-order-row position-order-row-strong"><span>Turnover</span><strong>' +
      escapeHtml(order.turnover || "--") +
      "</strong></div>" +
      (!compact && order.settlementPrice
        ? '<div class="position-order-row"><span>Settlement price</span><strong>' +
          escapeHtml(order.settlementPrice) +
          "</strong></div>"
        : "") +
      (!compact && order.profitLoss
        ? '<div class="position-order-row position-order-row-profit"><span>Profit/Loss</span><strong>' +
          escapeHtml(order.profitLoss) +
          "</strong></div>"
        : "") +
      (!compact && order.rateOfReturn
        ? '<div class="position-order-row"><span>Rate of return</span><strong>' +
          escapeHtml(order.rateOfReturn) +
          "</strong></div>"
        : "") +
      "</div>" +
      '<div class="position-order-divider"></div>' +
      "</article>"
    );
  }

  function renderFollowUpOrderCard(order, isConfirmed) {
    return (
      '<article class="followup-order-card">' +
      '<div class="followup-order-row"><span>Title</span><strong>' +
      escapeHtml(order.title) +
      "</strong></div>" +
      '<div class="followup-order-row"><span>Trading pair</span><strong>' +
      escapeHtml(order.tradingPair) +
      "</strong></div>" +
      '<div class="followup-order-row"><span>Purchase duration</span><strong>' +
      escapeHtml(order.purchaseDuration) +
      "</strong></div>" +
      '<div class="followup-order-row"><span>Release time</span><strong>' +
      escapeHtml(order.releaseTime) +
      "</strong></div>" +
      '<div class="followup-order-row"><span>Order amount</span><strong>' +
      escapeHtml(order.orderAmount) +
      "</strong></div>" +
      '<div class="followup-order-row followup-order-row-action"><span>Operate</span><button type="button" class="followup-order-button" data-action="confirm-followup"' +
      (isConfirmed ? " disabled" : "") +
      ">" +
      escapeHtml(isConfirmed ? "Following order" : order.actionLabel) +
      "</button></div>" +
      "</article>"
    );
  }

  function normaliseManualRecord(record) {
    return {
      id: record.id,
      status: record.status,
      statusTone: record.status === "Pending" ? "" : "settled",
      product: record.product,
      direction: record.direction,
      timePeriod: record.timePeriod,
      amount: formatTradeMoney(record.amountValue),
      openPositionTime: record.openPositionTime,
      openPrice: formatPrice(record.openPrice, record.product),
      turnover: formatTradeMoney(record.amountValue),
      settlementPrice: record.settlementPrice
        ? formatPrice(record.settlementPrice, record.product)
        : "",
      profitLoss: Number.isFinite(record.profitLossValue)
        ? formatTradeSignedMoney(record.profitLossValue)
        : "",
      rateOfReturn: Number.isFinite(record.rateOfReturnValue)
        ? formatPercent(record.rateOfReturnValue)
        : "",
    };
  }

  function normaliseInviteRecord(record) {
    return {
      id: record.id,
      status: record.status,
      statusTone: record.status === "Pending" ? "" : "settled",
      product: record.product,
      direction: record.direction,
      timePeriod: record.timePeriod,
      amount: formatTradeMoney(record.amountValue),
      orderPercentage: record.orderPercentage,
      openPositionTime: record.openPositionTime,
      openPrice: formatPrice(record.openPrice, record.product),
      turnover: formatTradeMoney(record.amountValue),
      settlementPrice: record.settlementPrice
        ? formatPrice(record.settlementPrice, record.product)
        : "",
      profitLoss: Number.isFinite(record.profitLossValue)
        ? formatTradeSignedMoney(record.profitLossValue)
        : "",
      rateOfReturn: record.rateOfReturn || "",
    };
  }

  function settleTradeRecords(root, currentPrice) {
    const now = Date.now();
    let walletBalance = getTradeWalletBalance(root);
    let walletChanged = false;

    const manualRecords = getManualTradeRecords(root).map((record) => {
      if (
        record.status !== "Pending" ||
        !record.releaseAt ||
        record.releaseAt > now
      ) {
        return record;
      }

      const livePrice = Number(currentPrice) || Number(record.openPrice) || 0;
      const movement =
        record.openPrice > 0
          ? ((livePrice - record.openPrice) / record.openPrice) * 100
          : 0;
      const rateOfReturnValue =
        record.direction === "Short" ? -movement : movement;
      const profitLossValue = Number(
        (record.amountValue * (rateOfReturnValue / 100)).toFixed(2),
      );
      walletBalance += record.amountValue + profitLossValue;
      walletChanged = true;

      return {
        ...record,
        status: "Settled",
        settlementPrice: livePrice,
        profitLossValue,
        rateOfReturnValue,
      };
    });

    const inviteRecords = getInviteTradeRecords(root).map((record) => {
      if (
        record.status !== "Pending" ||
        !record.releaseAt ||
        record.releaseAt > now
      ) {
        return record;
      }

      const rateOfReturnValue = Number(record.rateOfReturnValue) || 0;
      const profitLossValue = Number(
        (record.amountValue * (rateOfReturnValue / 100)).toFixed(2),
      );
      const settlementPrice =
        record.direction === "Short"
          ? Number(record.openPrice) * (1 - rateOfReturnValue / 100)
          : Number(record.openPrice) * (1 + rateOfReturnValue / 100);
      walletBalance += record.amountValue + profitLossValue;
      walletChanged = true;

      return {
        ...record,
        status: "Settled",
        settlementPrice,
        profitLossValue,
      };
    });

    setManualTradeRecords(root, manualRecords);
    setInviteTradeRecords(root, inviteRecords);
    if (walletChanged) {
      setTradeWalletBalance(root, walletBalance);
    }
  }

  function placeManualTrade(root, payload) {
    const uiState = getTradeUiState(root);
    const quantity = Number(payload.quantity) || 0;
    const walletBalance = getTradeWalletBalance(root);

    if (quantity <= 0) {
      uiState.tradeNotice = "Enter a valid quantity before placing the order.";
      return false;
    }

    if (quantity > walletBalance) {
      uiState.tradeNotice = "Insufficient trade wallet balance.";
      return false;
    }

    const now = new Date();
    const nextRecord = {
      id: createTradeIdentifier("manual"),
      product: payload.symbol,
      direction: payload.direction,
      timePeriod: payload.interval,
      amountValue: Number(quantity.toFixed(2)),
      openPositionTime: formatTradeDeadline(now),
      openPrice: Number(payload.openPrice) || 0,
      releaseAt:
        now.getTime() + parseTradeDurationSeconds(payload.interval) * 1000,
      status: "Pending",
    };

    setManualTradeRecords(root, [nextRecord, ...getManualTradeRecords(root)]);
    setTradeWalletBalance(root, walletBalance - nextRecord.amountValue);
    uiState.tradeNotice =
      payload.direction +
      " order " +
      nextRecord.id.slice(-6).toUpperCase() +
      " placed for " +
      formatTradeMoney(nextRecord.amountValue) +
      ".";
    uiState.activeTab = "orders";
    return true;
  }

  function syncTradeOverlays(root) {
    const uiState = getTradeUiState(root);
    const host = ensureTradeOverlayHost(root);
    if (!host) {
      return;
    }

    const settledInviteOrders = getInviteTradeRecords(root).filter(
      (record) => record.status !== "Pending",
    );
    const previousCopyHistoryPage = host.querySelector(
      ".copy-history-overlay-page",
    );
    if (previousCopyHistoryPage) {
      uiState.copyHistoryScrollTop = previousCopyHistoryPage.scrollTop;
    }
    let overlayHtml = "";
    if (uiState.showCopyHistoryPage) {
      overlayHtml += renderCopyHistoryOverlay(root, settledInviteOrders);
    }

    if (uiState.showInitiateFollowSheet) {
      const formState =
        uiState.initiateFollowForm || createInitiateFollowForm(root);
      const timeOptions = buildInitiateFollowTimeOptions();
      overlayHtml +=
        '<div class="initiate-follow-overlay" data-action="dismiss-initiate-follow-overlay"><aside class="initiate-follow-sheet" role="dialog" aria-modal="true" aria-label="Initiate follow" data-action="initiate-follow-sheet">' +
        '<div class="initiate-follow-sheet-header"><strong class="initiate-follow-sheet-title">Initiate follow</strong><button type="button" class="initiate-follow-close" data-action="close-initiate-follow-sheet">x</button></div>' +
        '<div class="initiate-follow-form">' +
        '<div class="initiate-follow-field"><label for="initiate-follow-title">Title</label><input id="initiate-follow-title" class="initiate-follow-input" type="text" data-action="initiate-follow-title" value="' +
        escapeHtml(formState.title) +
        '" placeholder="Please enter a title" /></div>' +
        '<div class="initiate-follow-field"><label for="initiate-follow-pair">Trading pair</label><input id="initiate-follow-pair" class="initiate-follow-input" type="text" readonly value="' +
        escapeHtml(formState.tradingPair) +
        '" /></div>' +
        '<div class="initiate-follow-field"><label for="initiate-follow-direction">Follow the order direction</label><select id="initiate-follow-direction" class="initiate-follow-select" data-action="initiate-follow-direction"><option value="Buy Call"' +
        (formState.direction === "Buy Call" ? " selected" : "") +
        '>Buy Call</option><option value="Sell Put"' +
        (formState.direction === "Sell Put" ? " selected" : "") +
        ">Sell Put</option></select></div>" +
        '<div class="initiate-follow-field"><label for="initiate-follow-duration">Purchase duration</label><select id="initiate-follow-duration" class="initiate-follow-select" data-action="initiate-follow-duration"><option value="60s"' +
        (formState.purchaseDuration === "60s" ? " selected" : "") +
        '>60s</option><option value="120s"' +
        (formState.purchaseDuration === "120s" ? " selected" : "") +
        '>120s</option><option value="300s"' +
        (formState.purchaseDuration === "300s" ? " selected" : "") +
        ">300s</option></select></div>" +
        '<div class="initiate-follow-field"><label for="initiate-follow-order-time">Order time</label><select id="initiate-follow-order-time" class="initiate-follow-select" data-action="initiate-follow-order-time">' +
        timeOptions
          .map(
            (option) =>
              '<option value="' +
              escapeHtml(option) +
              '"' +
              (formState.orderTime === option ? " selected" : "") +
              ">" +
              escapeHtml(option) +
              "</option>",
          )
          .join("") +
        "</select></div>" +
        '<div class="initiate-follow-conditions"><span class="initiate-follow-range-label">Conditions for following orders</span><div class="initiate-follow-condition-tabs"><button type="button" class="initiate-follow-condition-tab' +
        (formState.conditionType === "fixed" ? " active" : "") +
        '" data-action="set-follow-condition-fixed">Fixed Amount</button><button type="button" class="initiate-follow-condition-tab' +
        (formState.conditionType === "percentage" ? " active" : "") +
        '" data-action="set-follow-condition-percentage">Percentage</button></div><div class="initiate-follow-range-row"><input class="initiate-follow-range-input" type="number" inputmode="decimal" data-action="initiate-follow-primary" value="' +
        escapeHtml(
          formState.conditionType === "fixed"
            ? formState.fixedMin
            : formState.percentageMin,
        ) +
        '" min="0" /><span class="initiate-follow-range-separator">-</span><input class="initiate-follow-range-input" type="number" inputmode="decimal" data-action="initiate-follow-secondary" value="' +
        escapeHtml(
          formState.conditionType === "fixed"
            ? formState.fixedMax
            : formState.percentageMax,
        ) +
        '" min="0" /></div></div>' +
        '<div class="initiate-follow-available"><span>Available</span><strong>' +
        escapeHtml(getTradeWalletBalance(root).toFixed(2)) +
        "</strong></div>" +
        '<button type="button" class="initiate-follow-submit" data-action="submit-initiate-follow">Sure</button>' +
        "</div></aside></div>";
    }

    if (uiState.showFollowUpConfirmSheet && uiState.loadedInviteOrder) {
      overlayHtml +=
        '<div class="followup-confirm-overlay" data-action="dismiss-followup-overlay"><aside class="followup-confirm-sheet" role="dialog" aria-modal="true" aria-label="Follow up confirmation"><div class="followup-confirm-rows">' +
        '<div class="followup-confirm-row"><span>Title</span><strong>' +
        escapeHtml(uiState.loadedInviteOrder.title) +
        "</strong></div>" +
        '<div class="followup-confirm-row"><span>Release time</span><strong>' +
        escapeHtml(uiState.loadedInviteOrder.releaseTime) +
        "</strong></div>" +
        '<div class="followup-confirm-row followup-confirm-row-stack"><span>Order amount (' +
        escapeHtml(uiState.loadedInviteOrder.orderAmount) +
        ')</span><input type="text" value="' +
        escapeHtml(uiState.loadedInviteOrder.orderAmount) +
        '" readonly /></div>' +
        '<div class="followup-confirm-row"><span>Order percentage</span><strong>' +
        escapeHtml(uiState.loadedInviteOrder.orderPercentage) +
        "</strong></div>" +
        '<div class="followup-confirm-row"><span>Rate of return</span><strong>' +
        escapeHtml(uiState.loadedInviteOrder.rateOfReturn) +
        "</strong></div>" +
        '</div><button type="button" class="followup-confirm-submit" data-action="complete-followup">Done / OK</button></aside></div>';
    }

    if (uiState.inviteErrorMessage) {
      overlayHtml +=
        '<div class="invite-error-overlay" data-action="dismiss-invite-error"><aside class="invite-error-dialog" role="dialog" aria-modal="true" aria-label="Invite code error"><strong>' +
        escapeHtml(uiState.inviteErrorTitle) +
        "</strong><p>" +
        escapeHtml(uiState.inviteErrorMessage) +
        '</p><button type="button" class="followup-confirm-submit" data-action="dismiss-invite-error">OK</button></aside></div>';
    }

    host.innerHTML = overlayHtml;

    if (
      uiState.showCopyHistoryPage &&
      Number.isFinite(uiState.copyHistoryScrollTop)
    ) {
      const nextCopyHistoryPage = host.querySelector(
        ".copy-history-overlay-page",
      );
      if (nextCopyHistoryPage) {
        nextCopyHistoryPage.scrollTop = uiState.copyHistoryScrollTop;
      }
    }
  }

  function renderCopyHistoryOverlay(root, records) {
    const uiState = getTradeUiState(root);
    const sortedRecords = records.slice().sort((left, right) => {
      return (
        new Date(right.openPositionTime || 0).getTime() -
        new Date(left.openPositionTime || 0).getTime()
      );
    });
    const totalOrderAmount = sortedRecords.reduce(
      (sum, record) => sum + (Number(record.amountValue) || 0),
      0,
    );
    const totalProfit = sortedRecords.reduce(
      (sum, record) => sum + (Number(record.profitLossValue) || 0),
      0,
    );
    const winningCount = sortedRecords.filter(
      (record) => Number(record.profitLossValue) > 0,
    ).length;
    const winningRate = sortedRecords.length
      ? ((winningCount / sortedRecords.length) * 100).toFixed(2) + "%"
      : "0.00%";
    const totalPages = Math.max(
      1,
      Math.ceil(sortedRecords.length / uiState.copyHistoryItemsPerPage),
    );
    uiState.copyHistoryPage = Math.min(
      Math.max(uiState.copyHistoryPage, 1),
      totalPages,
    );
    const pageStart =
      (uiState.copyHistoryPage - 1) * uiState.copyHistoryItemsPerPage;
    const pageRecords = sortedRecords.slice(
      pageStart,
      pageStart + uiState.copyHistoryItemsPerPage,
    );

    return (
      '<section class="copy-history-overlay-page" role="dialog" aria-modal="true" aria-label="Copying History">' +
      '<header class="copy-history-page-header">' +
      '<button type="button" class="copy-history-back" data-action="close-copy-history-page" aria-label="Back to invited tab">' +
      renderTradeRuntimeIcon("arrowLeft") +
      "</button>" +
      "<strong>Copying History</strong>" +
      '<span class="copy-history-header-spacer"></span>' +
      "</header>" +
      '<div class="copy-history-page-body">' +
      '<section class="copy-history-summary-grid">' +
      '<article class="copy-history-metric-card"><strong>' +
      escapeHtml(totalOrderAmount.toFixed(2)) +
      "</strong><span>The Total Amount Of The Order (USDT)</span></article>" +
      '<article class="copy-history-metric-card"><strong>' +
      escapeHtml(String(sortedRecords.length)) +
      "</strong><span>Number Of Times To Follow Orders</span></article>" +
      '<article class="copy-history-metric-card"><strong>' +
      escapeHtml(totalProfit.toFixed(2)) +
      "</strong><span>Profit From The Following Orders</span></article>" +
      '<article class="copy-history-metric-card"><strong>' +
      escapeHtml(winningRate) +
      "</strong><span>Winning Rate</span></article>" +
      "</section>" +
      (pageRecords.length
        ? '<section class="copy-history-record-list">' +
          pageRecords
            .map((record) => renderCopyHistoryRecord(record))
            .join("") +
          "</section>" +
          '<footer class="copy-history-footer"><button type="button" class="copy-history-page-button" data-action="copy-history-prev-page"' +
          (uiState.copyHistoryPage === 1 ? " disabled" : "") +
          ">" +
          renderTradeRuntimeIcon("chevronLeft") +
          '</button><div class="copy-history-page-indicator"><button type="button" class="copy-history-page-number active">' +
          escapeHtml(String(uiState.copyHistoryPage)) +
          "</button><span>/</span><span>" +
          escapeHtml(String(totalPages)) +
          '</span></div><button type="button" class="copy-history-page-button" data-action="copy-history-next-page"' +
          (uiState.copyHistoryPage === totalPages ? " disabled" : "") +
          ">" +
          renderTradeRuntimeIcon("chevronRight") +
          "</button></footer>"
        : '<div class="copy-history-empty-state form-card"><strong>No copying history yet</strong><p>Settled follow orders will appear here after they finish and return funds to the Trade wallet.</p></div>') +
      "</div>" +
      "</section>"
    );
  }

  function renderCopyHistoryRecord(record) {
    const title = record.title || "VIP Futures Signal";
    const directionClass =
      record.direction === "Short" ? "negative" : "positive";
    const directionLabel =
      record.direction === "Short" ? "Buy Put" : "Buy Call";
    const releaseTime = formatTradeDeadline(
      new Date(record.releaseAt || Date.now()),
    );
    const profitLoss = Number(record.profitLossValue) || 0;
    const profitClass = profitLoss < 0 ? "negative" : "positive";

    return (
      '<article class="copy-history-record-card">' +
      '<div class="copy-history-record-row"><span>Title</span><strong>' +
      escapeHtml(title) +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Trading Pair</span><strong>' +
      escapeHtml(record.product || "--") +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Direction</span><strong class="' +
      directionClass +
      '">' +
      escapeHtml(directionLabel) +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Purchase Duration</span><strong>' +
      escapeHtml(record.timePeriod || "--") +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Order Time</span><strong>' +
      escapeHtml(record.openPositionTime || "--") +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Release Time</span><strong>' +
      escapeHtml(releaseTime) +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Order Amount</span><strong>' +
      escapeHtml((Number(record.amountValue) || 0).toFixed(2)) +
      "</strong></div>" +
      '<div class="copy-history-record-row"><span>Profit And Loss</span><strong class="' +
      profitClass +
      '">' +
      escapeHtml(profitLoss.toFixed(2)) +
      "</strong></div>" +
      "</article>"
    );
  }

  function renderTradeTabPanel(root, tabName) {
    const panel = root.querySelector(".trade-screen-tab-panel");
    if (!panel) {
      return;
    }

    const uiState = getTradeUiState(root);
    uiState.activeTab = tabName;
    settleTradeRecords(root, getCurrentTradeMeta(root).currentPrice);

    const pendingOrders = [
      ...getManualTradeRecords(root)
        .filter((record) => record.status === "Pending")
        .map(normaliseManualRecord),
      ...getInviteTradeRecords(root)
        .filter((record) => record.status === "Pending")
        .map(normaliseInviteRecord),
    ].sort(
      (left, right) =>
        new Date(right.openPositionTime).getTime() -
        new Date(left.openPositionTime).getTime(),
    );

    const historicalOrders = [
      ...getManualTradeRecords(root)
        .filter((record) => record.status !== "Pending")
        .map((record) => ({
          kind: "manual",
          record: normaliseManualRecord(record),
        })),
      ...getInviteTradeRecords(root)
        .filter((record) => record.status !== "Pending")
        .map((record) => ({
          kind: "invite",
          record: normaliseInviteRecord(record),
        })),
    ]
      .filter((entry) => {
        const orderDate = String(entry.record.openPositionTime || "")
          .slice(0, 10)
          .replaceAll("/", "-");
        return (
          (!uiState.historicalStartDate ||
            orderDate >= uiState.historicalStartDate) &&
          (!uiState.historicalEndDate || orderDate <= uiState.historicalEndDate)
        );
      })
      .sort(
        (left, right) =>
          new Date(right.record.openPositionTime).getTime() -
          new Date(left.record.openPositionTime).getTime(),
      );

    const totalHistoricalPages = Math.max(
      1,
      Math.ceil(historicalOrders.length / uiState.historicalItemsPerPage),
    );
    uiState.historicalPage = Math.min(
      uiState.historicalPage,
      totalHistoricalPages,
    );
    const historicalSlice = historicalOrders.slice(
      (uiState.historicalPage - 1) * uiState.historicalItemsPerPage,
      uiState.historicalPage * uiState.historicalItemsPerPage,
    );

    const settledInviteOrders = getInviteTradeRecords(root).filter(
      (record) => record.status !== "Pending",
    );
    const latestInviteSignal = getLatestInviteSignal(root);
    const activeInviteOrder = uiState.loadedInviteOrder || latestInviteSignal;
    const copiedCount = settledInviteOrders.length;
    const totalProfit = settledInviteOrders.reduce(
      (sum, record) => sum + (Number(record.profitLossValue) || 0),
      0,
    );
    const latestCopyOrder = settledInviteOrders[0] || null;
    const followedCodes = new Set(
      getInviteTradeRecords(root).map((record) =>
        String(record.code).toUpperCase(),
      ),
    );

    const panels = {
      orders: pendingOrders.length
        ? '<section class="trade-tab-stack">' +
          (uiState.tradeNotice
            ? '<p class="futures-followup-notice">' +
              escapeHtml(uiState.tradeNotice) +
              "</p>"
            : "") +
          pendingOrders
            .map((order) => renderPositionOrderCard(order, true))
            .join("") +
          "</section>"
        : renderTradeEmptyState("No data"),
      historical:
        '<section class="historical-order-panel">' +
        '<div class="historical-order-filters">' +
        '<label><span>Start Date</span><input type="date" data-action="history-start-date" value="' +
        escapeHtml(uiState.historicalStartDate) +
        '" /></label>' +
        '<label><span>End Date</span><input type="date" data-action="history-end-date" value="' +
        escapeHtml(uiState.historicalEndDate) +
        '" /></label>' +
        '<label><span>Items Per Page</span><select data-action="history-items-per-page"><option value="5"' +
        (uiState.historicalItemsPerPage === 5 ? " selected" : "") +
        '>5</option><option value="10"' +
        (uiState.historicalItemsPerPage === 10 ? " selected" : "") +
        '>10</option><option value="20"' +
        (uiState.historicalItemsPerPage === 20 ? " selected" : "") +
        ">20</option></select></label>" +
        "</div>" +
        (historicalOrders.length
          ? '<div class="historical-order-list">' +
            historicalSlice
              .map((entry) => renderPositionOrderCard(entry.record, false))
              .join("") +
            "</div>" +
            '<div class="historical-order-pagination"><span>Page ' +
            uiState.historicalPage +
            " of " +
            totalHistoricalPages +
            "</span><span>" +
            historicalOrders.length +
            " total item" +
            (historicalOrders.length === 1 ? "" : "s") +
            '</span><div class="historical-order-pagination-actions"><button type="button" data-action="history-prev"' +
            (uiState.historicalPage === 1 ? " disabled" : "") +
            '>Previous</button><button type="button" data-action="history-next"' +
            (uiState.historicalPage === totalHistoricalPages
              ? " disabled"
              : "") +
            ">Next</button></div></div>"
          : renderTradeEmptyState("No data")) +
        "</section>",
      invited:
        '<section class="futures-invited-panel">' +
        '<div class="futures-invited-actions"><button type="button" class="futures-invited-action futures-invited-action-primary" data-action="open-initiate-follow"><span>Initiate follow</span></button><button type="button" class="futures-invited-action futures-invited-action-secondary" data-action="open-copy-history"><span>Copying history</span></button></div>' +
        '<p class="futures-test-code-copy">Latest admin code: ' +
        escapeHtml(latestInviteSignal.code) +
        "</p>" +
        (uiState.followUpNotice
          ? '<p class="futures-followup-notice">' +
            escapeHtml(uiState.followUpNotice) +
            "</p>"
          : "") +
        '<label class="futures-invited-entry"><input type="text" data-action="invite-code-input" value="' +
        escapeHtml(uiState.invitedOrderCode) +
        '" placeholder="Please enter the order code" /><button type="button" data-action="confirm-invite-code">Confirm</button></label>' +
        (uiState.showInviteDetails && activeInviteOrder
          ? renderFollowUpOrderCard(
              activeInviteOrder,
              followedCodes.has(String(activeInviteOrder.code).toUpperCase()),
            )
          : renderTradeEmptyState("No data")) +
        "</section>",
      copy: settledInviteOrders.length
        ? '<section class="copying-history-panel">' +
          '<div class="copying-history-heading"><h2>Copying history</h2><p>Settled follow orders automatically return principal plus profit to the Trade wallet.</p></div>' +
          '<div class="copying-history-summary"><article class="copying-history-stat"><strong>' +
          copiedCount +
          '</strong><span>Settled orders</span></article><article class="copying-history-stat"><strong>' +
          escapeHtml(formatTradeSignedMoney(totalProfit)) +
          "</strong><span>Total profit</span></article></div>" +
          (latestCopyOrder
            ? '<section class="copying-history-detail">' +
              '<div class="copying-history-detail-row"><span>Title</span><strong>' +
              escapeHtml(latestCopyOrder.title || "VIP Futures Signal") +
              "</strong></div>" +
              '<div class="copying-history-detail-row"><span>Trading pair</span><strong>' +
              escapeHtml(latestCopyOrder.product) +
              "</strong></div>" +
              '<div class="copying-history-detail-row"><span>Direction</span><strong>' +
              escapeHtml(latestCopyOrder.direction) +
              "</strong></div>" +
              '<div class="copying-history-detail-row"><span>Purchase duration</span><strong>' +
              escapeHtml(latestCopyOrder.timePeriod) +
              "</strong></div>" +
              '<div class="copying-history-detail-row"><span>Order time</span><strong>' +
              escapeHtml(latestCopyOrder.openPositionTime) +
              "</strong></div>" +
              '<div class="copying-history-detail-row"><span>Release time</span><strong>' +
              escapeHtml(
                formatTradeDeadline(
                  new Date(latestCopyOrder.releaseAt || Date.now()),
                ),
              ) +
              "</strong></div>" +
              "</section>"
            : "") +
          "</section>"
        : '<div class="futures-followup-empty form-card"><strong>No copying history yet</strong><p>Confirmed invite orders will appear here once their purchase duration has expired and profit has been credited back to Trade.</p></div>',
    };

    panel.innerHTML = panels[tabName] || panels.orders;
    syncTradeOverlays(root);
  }

  function attachTradeTabPanelActions(root) {
    const panel = root.querySelector(".trade-screen-tab-panel");
    if (!panel || panel.__tradeActionsBound) {
      return;
    }

    panel.__tradeActionsBound = true;

    panel.addEventListener("click", async (event) => {
      const copyButton = event.target.closest(".trade-tab-copy-button");
      if (copyButton) {
        const text = copyButton.dataset.copyText || "";
        try {
          await navigator.clipboard.writeText(text);
          copyButton.textContent = "Copied";
          copyButton.classList.add("active");
        } catch {
          copyButton.textContent = "Ready";
        }
        return;
      }

      const uiState = getTradeUiState(root);
      const actionNode = event.target.closest("[data-action]");
      const action = actionNode?.dataset?.action;
      if (!action) {
        return;
      }

      if (action === "open-initiate-follow") {
        uiState.initiateFollowForm = createInitiateFollowForm(root);
        uiState.showInitiateFollowSheet = true;
        syncTradeOverlays(root);
        return;
      }

      if (action === "load-latest-signal") {
        uiState.loadedInviteOrder = getLatestInviteSignal(root);
        uiState.showInviteDetails = false;
        uiState.invitedOrderCode = uiState.loadedInviteOrder.code;
        uiState.followUpNotice =
          "Latest admin code loaded: " + uiState.loadedInviteOrder.code;
        renderTradeTabPanel(root, "invited");
        return;
      }

      if (action === "open-copy-history") {
        uiState.showCopyHistoryPage = true;
        uiState.copyHistoryPage = 1;
        syncTradeOverlays(root);
        return;
      }

      if (action === "confirm-invite-code") {
        const enteredCode = String(
          panel.querySelector('[data-action="invite-code-input"]')?.value || "",
        )
          .trim()
          .toUpperCase();
        const latestSignal = getLatestInviteSignal(root);
        const existingCodes = new Set(
          getInviteTradeRecords(root).map((record) =>
            String(record.code).toUpperCase(),
          ),
        );
        uiState.invitedOrderCode = enteredCode;

        if (!enteredCode) {
          uiState.followUpNotice =
            "Enter a generated admin code to preview this follow-up order.";
          uiState.showInviteDetails = false;
          renderTradeTabPanel(root, "invited");
          return;
        }

        if (existingCodes.has(enteredCode)) {
          uiState.inviteErrorTitle = "Invite Code Already Used";
          uiState.inviteErrorMessage =
            "Invite code " +
            enteredCode +
            " has already been used on this account.";
          syncTradeOverlays(root);
          return;
        }

        if (enteredCode !== String(latestSignal.code).toUpperCase()) {
          uiState.followUpNotice =
            "Use the latest admin code " +
            latestSignal.code +
            " to preview this follow-up order.";
          uiState.showInviteDetails = false;
          renderTradeTabPanel(root, "invited");
          return;
        }

        uiState.loadedInviteOrder = latestSignal;
        uiState.showInviteDetails = true;
        uiState.followUpNotice = "Order " + latestSignal.code + " loaded.";
        renderTradeTabPanel(root, "invited");
        return;
      }

      if (action === "confirm-followup") {
        if (!uiState.loadedInviteOrder) {
          uiState.followUpNotice =
            "Load a generated admin code before following this order.";
          renderTradeTabPanel(root, "invited");
          return;
        }

        uiState.showFollowUpConfirmSheet = true;
        syncTradeOverlays(root);
        return;
      }

      if (action === "complete-followup") {
        if (!uiState.loadedInviteOrder) {
          uiState.showFollowUpConfirmSheet = false;
          syncTradeOverlays(root);
          return;
        }

        const walletBalance = getTradeWalletBalance(root);
        const amountValue = Math.min(
          walletBalance,
          Number(uiState.loadedInviteOrder.orderAmountValue) || 0,
        );
        if (amountValue <= 0) {
          uiState.showFollowUpConfirmSheet = false;
          uiState.inviteErrorTitle = "Invalid Transaction";
          uiState.inviteErrorMessage =
            "Insufficient funds. Trade wallet balance is not enough to go through this order.";
          syncTradeOverlays(root);
          return;
        }

        const nextRecord = {
          id: createTradeIdentifier("invite"),
          code: uiState.loadedInviteOrder.code,
          title: uiState.loadedInviteOrder.title,
          product: uiState.loadedInviteOrder.tradingPair,
          direction: "Long",
          timePeriod: uiState.loadedInviteOrder.purchaseDuration,
          amountValue: Number(amountValue.toFixed(2)),
          orderPercentage: uiState.loadedInviteOrder.orderPercentage,
          openPositionTime: formatTradeDeadline(new Date()),
          openPrice:
            Number(uiState.loadedInviteOrder.openPrice) ||
            getCurrentTradeMeta(root).currentPrice,
          releaseAt: Number(uiState.loadedInviteOrder.releaseAt) || Date.now(),
          status: "Pending",
          rateOfReturn: uiState.loadedInviteOrder.rateOfReturn,
          rateOfReturnValue:
            Number(uiState.loadedInviteOrder.rateOfReturnValue) || 0,
        };

        setInviteTradeRecords(root, [
          nextRecord,
          ...getInviteTradeRecords(root),
        ]);
        setTradeWalletBalance(root, walletBalance - nextRecord.amountValue);
        uiState.showFollowUpConfirmSheet = false;
        uiState.showInviteDetails = false;
        uiState.followUpNotice =
          "Follow-up order " +
          nextRecord.code +
          " frozen in Trade wallet and moved to Orders.";
        uiState.loadedInviteOrder = null;
        uiState.activeTab = "orders";
        root
          .querySelectorAll(".trade-screen-tabs button")
          .forEach((button, index) => {
            button.classList.toggle("active", index === 0);
          });
        renderTradeTabPanel(root, "orders");
        return;
      }

      if (action === "history-prev") {
        uiState.historicalPage = Math.max(1, uiState.historicalPage - 1);
        renderTradeTabPanel(root, "historical");
        return;
      }

      if (action === "history-next") {
        uiState.historicalPage += 1;
        renderTradeTabPanel(root, "historical");
        return;
      }

      if (action === "dismiss-followup-overlay") {
        if (event.target.classList.contains("followup-confirm-overlay")) {
          uiState.showFollowUpConfirmSheet = false;
          syncTradeOverlays(root);
        }
        return;
      }

      if (action === "dismiss-invite-error") {
        uiState.inviteErrorTitle = "Invite Code Already Used";
        uiState.inviteErrorMessage = "";
        syncTradeOverlays(root);
      }
    });

    panel.addEventListener("change", (event) => {
      const uiState = getTradeUiState(root);
      const action = event.target?.dataset?.action;
      if (action === "history-start-date") {
        uiState.historicalStartDate = event.target.value;
        uiState.historicalPage = 1;
        renderTradeTabPanel(root, "historical");
      }
      if (action === "history-end-date") {
        uiState.historicalEndDate = event.target.value;
        uiState.historicalPage = 1;
        renderTradeTabPanel(root, "historical");
      }
      if (action === "history-items-per-page") {
        uiState.historicalItemsPerPage = Number(event.target.value) || 5;
        uiState.historicalPage = 1;
        renderTradeTabPanel(root, "historical");
      }
    });
  }

  function attachTradeOverlayActions(root) {
    const host = ensureTradeOverlayHost(root);
    if (!host || host.__tradeOverlayActionsBound) {
      return;
    }

    host.__tradeOverlayActionsBound = true;

    host.addEventListener("click", (event) => {
      const uiState = getTradeUiState(root);
      const actionNode = event.target.closest("[data-action]");
      const action = actionNode?.dataset?.action;
      if (!action) {
        return;
      }

      if (action === "dismiss-initiate-follow-overlay") {
        if (event.target.classList.contains("initiate-follow-overlay")) {
          uiState.showInitiateFollowSheet = false;
          syncTradeOverlays(root);
        }
        return;
      }

      if (action === "close-copy-history-page") {
        uiState.showCopyHistoryPage = false;
        syncTradeOverlays(root);
        return;
      }

      if (action === "copy-history-prev-page") {
        uiState.copyHistoryPage = Math.max(1, uiState.copyHistoryPage - 1);
        syncTradeOverlays(root);
        return;
      }

      if (action === "copy-history-next-page") {
        uiState.copyHistoryPage += 1;
        syncTradeOverlays(root);
        return;
      }

      if (action === "initiate-follow-sheet") {
        event.stopPropagation();
        return;
      }

      if (action === "close-initiate-follow-sheet") {
        uiState.showInitiateFollowSheet = false;
        syncTradeOverlays(root);
        return;
      }

      if (action === "set-follow-condition-fixed") {
        uiState.initiateFollowForm.conditionType = "fixed";
        syncTradeOverlays(root);
        return;
      }

      if (action === "set-follow-condition-percentage") {
        uiState.initiateFollowForm.conditionType = "percentage";
        syncTradeOverlays(root);
        return;
      }

      if (action === "submit-initiate-follow") {
        const nextOrder = buildInitiateFollowOrder(
          root,
          uiState.initiateFollowForm || createInitiateFollowForm(root),
        );
        if (!(Number(nextOrder.orderAmountValue) > 0)) {
          uiState.inviteErrorTitle = "Invalid Follow Order";
          uiState.inviteErrorMessage =
            "Enter a fixed amount or percentage greater than 0 before continuing.";
          syncTradeOverlays(root);
          return;
        }

        uiState.loadedInviteOrder = nextOrder;
        uiState.showInviteDetails = true;
        uiState.showInitiateFollowSheet = false;
        uiState.followUpNotice =
          "Follow setup ready for " + nextOrder.tradingPair + ".";
        uiState.invitedOrderCode = nextOrder.code;
        renderTradeTabPanel(root, "invited");
        return;
      }

      if (action === "dismiss-followup-overlay") {
        if (event.target.classList.contains("followup-confirm-overlay")) {
          uiState.showFollowUpConfirmSheet = false;
          syncTradeOverlays(root);
        }
        return;
      }

      if (action === "complete-followup") {
        if (!uiState.loadedInviteOrder) {
          uiState.showFollowUpConfirmSheet = false;
          syncTradeOverlays(root);
          return;
        }

        const walletBalance = getTradeWalletBalance(root);
        const amountValue = Math.min(
          walletBalance,
          Number(uiState.loadedInviteOrder.orderAmountValue) || 0,
        );
        if (amountValue <= 0) {
          uiState.showFollowUpConfirmSheet = false;
          uiState.inviteErrorTitle = "Invalid Transaction";
          uiState.inviteErrorMessage =
            "Insufficient funds. Trade wallet balance is not enough to go through this order.";
          syncTradeOverlays(root);
          return;
        }

        const nextRecord = {
          id: createTradeIdentifier("invite"),
          code: uiState.loadedInviteOrder.code,
          title: uiState.loadedInviteOrder.title,
          product: uiState.loadedInviteOrder.tradingPair,
          direction: uiState.loadedInviteOrder.direction || "Long",
          timePeriod: uiState.loadedInviteOrder.purchaseDuration,
          amountValue: Number(amountValue.toFixed(2)),
          orderPercentage: uiState.loadedInviteOrder.orderPercentage,
          openPositionTime: formatTradeDeadline(new Date()),
          openPrice:
            Number(uiState.loadedInviteOrder.openPrice) ||
            getCurrentTradeMeta(root).currentPrice,
          releaseAt: Number(uiState.loadedInviteOrder.releaseAt) || Date.now(),
          status: "Pending",
          rateOfReturn: uiState.loadedInviteOrder.rateOfReturn,
          rateOfReturnValue:
            Number(uiState.loadedInviteOrder.rateOfReturnValue) || 0,
        };

        setInviteTradeRecords(root, [
          nextRecord,
          ...getInviteTradeRecords(root),
        ]);
        setTradeWalletBalance(root, walletBalance - nextRecord.amountValue);
        uiState.showFollowUpConfirmSheet = false;
        uiState.showInviteDetails = false;
        uiState.followUpNotice =
          "Follow-up order " +
          nextRecord.code +
          " frozen in Trade wallet and moved to Orders.";
        uiState.loadedInviteOrder = null;
        uiState.activeTab = "orders";
        root
          .querySelectorAll(".trade-screen-tabs button")
          .forEach((button, index) => {
            button.classList.toggle("active", index === 0);
          });
        renderTradeTabPanel(root, "orders");
        return;
      }

      if (action === "dismiss-invite-error") {
        uiState.inviteErrorTitle = "Invite Code Already Used";
        uiState.inviteErrorMessage = "";
        syncTradeOverlays(root);
      }
    });

    host.addEventListener("input", (event) => {
      const uiState = getTradeUiState(root);
      const formState =
        uiState.initiateFollowForm || createInitiateFollowForm(root);
      const action = event.target?.dataset?.action;
      if (action === "initiate-follow-title") {
        formState.title = event.target.value;
      }
      if (action === "initiate-follow-primary") {
        if (formState.conditionType === "fixed") {
          formState.fixedMin = event.target.value;
        } else {
          formState.percentageMin = event.target.value;
        }
      }
      if (action === "initiate-follow-secondary") {
        if (formState.conditionType === "fixed") {
          formState.fixedMax = event.target.value;
        } else {
          formState.percentageMax = event.target.value;
        }
      }
      uiState.initiateFollowForm = formState;
    });

    host.addEventListener("change", (event) => {
      const uiState = getTradeUiState(root);
      const formState =
        uiState.initiateFollowForm || createInitiateFollowForm(root);
      const action = event.target?.dataset?.action;
      if (action === "initiate-follow-direction") {
        formState.direction = event.target.value;
      }
      if (action === "initiate-follow-duration") {
        formState.purchaseDuration = event.target.value;
      }
      if (action === "initiate-follow-order-time") {
        formState.orderTime = event.target.value;
      }
      uiState.initiateFollowForm = formState;
    });
  }

  function closeTradeMenus(root) {
    root.querySelectorAll(".trade-screen-select-menu").forEach((menu) => {
      menu.hidden = true;
    });
    root.querySelectorAll(".trade-screen-select-button").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }

  function attachTradeSelectMenu(root, wrap, options, onSelect) {
    const button = wrap?.querySelector(".trade-screen-select-button");
    if (!button || !options.length) {
      return;
    }

    let menu = wrap.querySelector(".trade-screen-select-menu");
    if (!menu) {
      menu = document.createElement("div");
      menu.className = "trade-screen-select-menu";
      menu.hidden = true;
      wrap.appendChild(menu);
    }

    menu.innerHTML = options
      .map(
        (option, index) =>
          '<button type="button" class="trade-screen-select-option' +
          (index === 0 ? " active" : "") +
          '" data-value="' +
          escapeHtml(option) +
          '">' +
          escapeHtml(option) +
          "</button>",
      )
      .join("");

    menu
      .querySelectorAll(".trade-screen-select-option")
      .forEach((optionButton) => {
        optionButton.addEventListener("click", () => {
          menu
            .querySelectorAll(".trade-screen-select-option")
            .forEach((node) => {
              node.classList.toggle("active", node === optionButton);
            });
          button.querySelector("span").textContent =
            optionButton.dataset.value || optionButton.textContent || "";
          onSelect(
            optionButton.dataset.value || optionButton.textContent || "",
          );
          closeTradeMenus(root);
        });
      });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const shouldOpen = menu.hidden;
      closeTradeMenus(root);
      menu.hidden = !shouldOpen;
      button.setAttribute("aria-expanded", String(shouldOpen));
    });
  }

  function attachTradeControls(root, callbacks) {
    const directionButtons = Array.from(
      root.querySelectorAll(".trade-direction-toggle button"),
    );
    const submitButton = root.querySelector(".trade-screen-submit");
    const quantityInput = root.querySelector(
      ".trade-screen-quantity-row input",
    );
    const quantitySlider = root.querySelector(
      '.trade-screen-slider-block input[type="range"]',
    );
    const tabButtons = Array.from(
      root.querySelectorAll(".trade-screen-tabs button"),
    );
    const selectWraps = Array.from(
      root.querySelectorAll(".trade-screen-select-wrap"),
    );
    const pairButton = root.querySelector(".trade-screen-pair-button");
    const pairLabel = root.querySelector(".trade-screen-pair-copy strong");
    const pairMeta = root.querySelector(".trade-screen-pair-meta");
    const pairOptions = [
      "BTCUSDT",
      "ETHUSDT",
      "XRPUSDT",
      "DOGEUSDT",
      "LTCUSDT",
      "BCHUSDT",
      "TRXUSDT",
    ];
    const intervalOptions = [
      "30s",
      DEFAULT_TRADE_COUNTDOWN_SECONDS + "s",
      "120s",
      "300s",
    ];
    const pairHost = root.querySelector(".trade-screen-pair");

    directionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        directionButtons.forEach((node) =>
          node.classList.toggle("active", node === button),
        );
        const isLong = button.classList.contains("long");
        if (submitButton) {
          submitButton.textContent = isLong ? "LONG" : "SHORT";
          submitButton.classList.toggle("long", isLong);
          submitButton.classList.toggle("short", !isLong);
        }
      });
    });

    if (quantityInput && quantitySlider) {
      quantitySlider.addEventListener("input", () => {
        const allocations = { 1: 0.01, 2: 0.5, 3: 0.75, 4: 1 };
        const walletBalance = getTradeWalletBalance(root);
        const allocation =
          allocations[Number(quantitySlider.value)] || allocations[1];
        quantityInput.value = (walletBalance * allocation).toFixed(2);
      });
      quantityInput.addEventListener("input", () => {
        const walletBalance = Math.max(getTradeWalletBalance(root), 1);
        const value = Math.min(
          Math.max(Number(quantityInput.value) || 0, 0),
          walletBalance,
        );
        const ratio = value / walletBalance;
        quantitySlider.value = String(
          ratio >= 1 ? 4 : ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : 1,
        );
      });
      quantitySlider.dispatchEvent(new Event("input"));
    }

    if (selectWraps[0]) {
      attachTradeSelectMenu(root, selectWraps[0], intervalOptions, (value) => {
        const timeFrameLabel = selectWraps[1]?.querySelector(
          ".trade-screen-select-button span",
        );
        if (timeFrameLabel) {
          timeFrameLabel.textContent = formatTradeWindow(value);
        }
        callbacks?.onIntervalChange?.(value);
      });
    }

    if (selectWraps[1]) {
      attachTradeSelectMenu(
        root,
        selectWraps[1],
        intervalOptions.map((value) => formatTradeWindow(value)),
        () => {},
      );
    }

    if (pairButton && pairHost) {
      let menu = pairHost.querySelector(".trade-screen-pair-menu");
      if (!menu) {
        menu = document.createElement("div");
        menu.className = "trade-screen-pair-menu trade-screen-select-menu";
        menu.hidden = true;
        pairHost.appendChild(menu);
      }

      menu.innerHTML = pairOptions
        .map(
          (symbol, index) =>
            '<button type="button" class="trade-screen-select-option' +
            (index === 0 ? " active" : "") +
            '" data-symbol="' +
            symbol +
            '">' +
            symbol +
            "</button>",
        )
        .join("");

      menu.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      menu
        .querySelectorAll(".trade-screen-select-option")
        .forEach((optionButton) => {
          optionButton.addEventListener("click", (event) => {
            event.stopPropagation();
            menu
              .querySelectorAll(".trade-screen-select-option")
              .forEach((node) => {
                node.classList.toggle("active", node === optionButton);
              });
            const symbol =
              optionButton.dataset.symbol ||
              optionButton.textContent ||
              "BTCUSDT";
            if (pairLabel) {
              pairLabel.textContent = symbol;
            }
            if (pairMeta) {
              pairMeta.textContent =
                "Quote: " + (symbol.endsWith("USDT") ? "USDT" : "USD");
            }
            callbacks?.onSymbolChange?.(symbol);
            closeTradeMenus(root);
          });
        });

      pairButton.addEventListener("click", (event) => {
        if (
          event.target !== pairButton &&
          event.target.closest(".trade-screen-pair-menu")
        ) {
          return;
        }
        event.stopPropagation();
        const shouldOpen = menu.hidden;
        closeTradeMenus(root);
        menu.hidden = !shouldOpen;
      });
    }

    tabButtons.forEach((button, index) => {
      const tabKey =
        ["orders", "historical", "invited", "copy"][index] || "orders";
      button.addEventListener("click", () => {
        tabButtons.forEach((node) =>
          node.classList.toggle("active", node === button),
        );
        renderTradeTabPanel(root, tabKey);
      });
    });

    if (submitButton) {
      submitButton.addEventListener("click", () => {
        callbacks?.onPlaceTrade?.({
          direction: submitButton.classList.contains("short")
            ? "Short"
            : "Long",
          symbol: pairLabel?.textContent || "BTCUSDT",
          interval:
            selectWraps[0]?.querySelector(".trade-screen-select-button span")
              ?.textContent || DEFAULT_TRADE_COUNTDOWN_SECONDS + "s",
          quantity: Number(quantityInput?.value) || 0,
        });
      });
    }

    document.addEventListener("click", () => closeTradeMenus(root));
    renderTradeTabPanel(root, "orders");
    attachTradeTabPanelActions(root);
    attachTradeOverlayActions(root);
  }

  function initTradePage() {
    const root = document;
    let currentSymbol =
      root.querySelector(".trade-screen-pair-copy strong")?.textContent ||
      "BTCUSDT";
    let currentProduct = toCoinbaseProduct(currentSymbol);
    let currentInterval =
      root.querySelector(".trade-screen-select-button span")?.textContent ||
      DEFAULT_TRADE_COUNTDOWN_SECONDS + "s";
    let state = {
      candles: createSyntheticCandles(
        numeric(root.querySelector(".trade-screen-mid-price")?.textContent) ||
          78314.4,
      ),
      asks: readOrderBook(
        root,
        ".trade-screen-book-list.ask .trade-screen-book-row",
      ),
      bids: readOrderBook(
        root,
        ".trade-screen-book-list.bid .trade-screen-book-row",
      ),
      lastPrice:
        numeric(root.querySelector(".trade-screen-mid-price")?.textContent) ||
        78314.4,
      mode: "simulated",
      updatedAt: new Date(),
    };

    root.__tradeMeta = {
      currentSymbol,
      currentInterval,
      currentPrice: state.lastPrice,
    };

    setTradeWalletBalance(root, getTradeWalletBalance(root));

    let refresh = async () => {};

    syncTradeDeadline(root, resolveTradeDeadline(root));

    attachTradeControls(root, {
      onSymbolChange(symbol) {
        currentSymbol = symbol;
        currentProduct = toCoinbaseProduct(currentSymbol);
        refresh();
      },
      onIntervalChange(value) {
        currentInterval = value;
        root.__tradeMeta.currentInterval = value;
      },
      onPlaceTrade(payload) {
        const placed = placeManualTrade(root, {
          ...payload,
          openPrice: state.lastPrice,
        });
        if (placed) {
          renderTradeTabPanel(root, "orders");
        }
      },
    });

    refresh = async () => {
      try {
        const [candles, book] = await Promise.all([
          fetchCoinbaseCandles(currentProduct, 60),
          fetchCoinbaseBook(currentProduct),
        ]);
        state = {
          candles,
          asks: book.asks,
          bids: book.bids,
          lastPrice:
            candles.at(-1)?.close || book.bids[0]?.price || state.lastPrice,
          mode: "live",
          updatedAt: new Date(),
        };
      } catch {
        state = buildSyntheticTradeState(root, state);
      }

      root.__tradeMeta = {
        currentSymbol,
        currentInterval,
        currentPrice: state.lastPrice,
      };

      settleTradeRecords(root, state.lastPrice);

      renderTradeState(root, state);
      renderTradeTabPanel(root, getTradeUiState(root).activeTab || "orders");
    };

    renderTradeState(root, state);
    refresh();
    window.setInterval(refresh, TRADE_REFRESH_INTERVAL_MS);
    window.setInterval(() => {
      tickCountdown(root);
      setLiveStatus(
        root.querySelector(".trade-chart-card .live-status-indicator"),
        state.mode,
        state.updatedAt,
      );
    }, STATUS_CLOCK_INTERVAL_MS);
  }

  const api = { initHomePage, initMarketsPage, initTradePage };

  window.AurxPages = {
    register(pageName, initializer) {
      if (typeof pageName === "string" && typeof initializer === "function") {
        pageRegistry.set(pageName, initializer);
      }
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    normalizeLegacyLinks();
    const pageName = document.body.dataset.page;
    const initializer = pageRegistry.get(pageName);
    if (typeof initializer === "function") {
      initializer(api);
    }
  });
})();
