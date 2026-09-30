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
    path = urllib.parse.quote(symbol, safe="")
    last_error = None
    # Yahoo exposes two equivalent chart hosts. Retry the second host when the
    # first one is throttled/unavailable; scheduled GitHub runners can hit 429s.
    for host in ("query1.finance.yahoo.com", "query2.finance.yahoo.com"):
        try:
            url = f"https://{host}/v8/finance/chart/{path}?range=10d&interval=1d"
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (compatible; KicksteinsBoersenbrief/1.0)",
                "Accept": "application/json",
            })
            with urllib.request.urlopen(req, timeout=20) as response:
                result = json.load(response)["chart"]["result"][0]
            break
        except Exception as error:
            last_error = error
    else:
        raise last_error
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
# Do not silently replace a complete publication with a mostly empty response.
if len(data["quotes"]) < max(8, len(SYMBOLS) // 2):
    raise RuntimeError(f"Only {len(data['quotes'])}/{len(SYMBOLS)} quotes retrieved; preserve existing published data")
OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
