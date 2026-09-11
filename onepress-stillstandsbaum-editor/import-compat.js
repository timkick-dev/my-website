// Compatibility layer for legacy plant Excel files.
// Loaded after app.js and intentionally overrides detect().
function detect(ws,name){
  const data=XLSX.utils.sheet_to_json(ws,{header:1,defval:'',raw:false});
  let best=null;
  const looksNumeric=(col,start)=>{
    let n=0,num=0;
    for(let r=start+1;r<Math.min(data.length,start+35);r++){
      const v=clean(data[r]?.[col]); if(!v)continue; n++;
      if(/^\d+(?:\.0+)?$/.test(v))num++;
    }
    return n>0&&num/n>=0.6;
  };
  for(let r=0;r<Math.min(data.length,40);r++){
    const raw=data[r].map(clean), h=raw.map(norm), map={}, filters=[];
    h.forEach((x,i)=>{
      if(!x)return;
      if(/ebene 1 sortierung|ebbene 1 sortierung|ebene 1 nummer|ebene 1 nr/.test(x))map.e1id=i;
      else if(/ebene 1 text|ebbene 1 text|ebene 1 beschreibung/.test(x))map.e1text=i;
      else if(/ebene 2 text|ebbene 2 text|ebene 2 beschreibung/.test(x))map.e2text=i;
      else if(/ebene 2 nummer|ebbene 2 nummer|ebene 2 nr/.test(x))map.e2id=i;
      else if(/^ebene 1$|^ebbene 1$/.test(x)){
        if(looksNumeric(i,r))map.e1id=i; else map.e1text=i;
      }
      else if(/^ebene 2$|^ebbene 2$/.test(x)){
        if(looksNumeric(i,r))map.e2id=i; else map.e2text=i;
      }
      else {
        const m=x.match(/(?:ebene|ebbene)\s*([3-7])/);
        if(m)map['e'+m[1]]=i;
        else if(/^s\s*\d/.test(x)||/^s\d/.test(x))filters.push({i,label:raw[i]});
      }
    });
    const levels=[3,4,5,6,7].filter(n=>map['e'+n]!=null).length;
    const score=levels*2+(map.e1id!=null||map.e1text!=null?3:0)+(map.e2id!=null||map.e2text!=null?3:0);
    if(levels>=1&&score>=8&&(!best||score>best.score))best={name,data,row:r,map,filters,score};
  }
  return best;
}
