import datetime
import json
import pathlib
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "boersenbrief" / "market.json"
SYMBOLS = {
    "DAX": "^GDAXI", "MDAX": "^MDAXI", "EURO STOXX 50": "^STOXX50E",
    "S&P 500": "^GSPC", "NASDAQ": "^IXIC", "Gold": "GC=F",
    "Brent": "BZ=F", "WTI": "CL=F", "Bitcoin": "BTC-USD",
    "Ethereum": "ETH-USD", "Solana": "SOL-USD", "XRP": "XRP-USD",
    "Dogecoin": "DOGE-USD", "EUR/USD": "EURUSD=X",
    "SAP": "SAP.DE", "Amazon": "AMZN", "Nvidia": "NVDA",
    "ASML": "ASML.AS", "Allianz": "ALV.DE",
}
def quote(symbol):
    url = "https://query1.finance.yahoo.com/v8/finance/chart/" + urllib.parse.quote(symbol, safe="") + "?range=5d&interval=1d"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as response:
        result = json.load(response)["chart"]["result"][0]
    values = [x for x in result["indicators"]["quote"][0]["close"] if x is not None]
    if not values:
        raise ValueError("No closing price")
    last, previous = values[-1], values[-2] if len(values) > 1 else values[-1]
    return {
        "value": last,
        "changePct": (last / previous - 1) * 100 if previous else 0,
        "currency": result["meta"].get("currency", ""),
        "marketTime": result["meta"].get("regularMarketTime"),
    }

data = {
    "updated": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "quotes": {},
    "source": "Yahoo Finance chart feed (indicative)",
}
for name, symbol in SYMBOLS.items():
    try:
        data["quotes"][name] = quote(symbol)
    except Exception as error:
        print(f"{name}: {error}")
if not any("value" in item for item in data["quotes"].values()):
    raise RuntimeError("No market quotes retrieved; preserve existing published data")
OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
