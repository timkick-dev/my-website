import json, urllib.request, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "boersenbrief" / "market.json"

# Public market feed used only for indicative quotes. The dashboard labels stale/missing data.
SYMBOLS = {
  "DAX":"^GDAXI","MDAX":"^MDAXI","EURO STOXX 50":"^STOXX50E",
  "S&P 500":"^GSPC","NASDAQ":"^IXIC","Gold":"GC=F","Brent":"BZ=F",
  "WTI":"CL=F","Bitcoin":"BTC-USD","EUR/USD":"EURUSD=X",
  "SAP":"SAP.DE","Amazon":"AMZN","Nvidia":"NVDA","ASML":"ASML.AS","Allianz":"ALV.DE"
}
def quote(symbol):
    u="https://query1.finance.yahoo.com/v8/finance/chart/"+urllib.parse.quote(symbol,safe="")+"?range=5d&interval=1d"
    req=urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"})
    with urllib.request.urlopen(req,timeout=15) as r: d=json.load(r)
    x=d["chart"]["result"][0]; m=x["meta"]; closes=x["indicators"]["quote"][0]["close"]
    vals=[v for v in closes if v is not None]
    last=vals[-1]; prev=vals[-2] if len(vals)>1 else last
    return {"value":last,"changePct":((last/prev)-1)*100 if prev else 0,"currency":m.get("currency",""),"marketTime":m.get("regularMarketTime")}
data={"updated":datetime.datetime.now(datetime.timezone.utc).isoformat(),"quotes":{},"source":"Yahoo Finance chart feed (indicative)"}
for name,sym in SYMBOLS.items():
    try:data["quotes"][name]=quote(sym)
    except Exception as e:data["quotes"][name]={"error":str(e)}
OUT.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8")
