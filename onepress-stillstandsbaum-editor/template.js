document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('#downloadTemplate');
  if(!btn)return;
  btn.addEventListener('click',()=>{
    if(typeof XLSX==='undefined')return alert('Excel-Bibliothek konnte nicht geladen werden.');
    const rows=[['Ebene 1 Sortierung','Ebene 1 Text','Ebene 2','Ebene 2 Text','Ebene 3','Ebene 4','Ebene 5','Ebene 6','Ebene 7']];
    MASTER.forEach(m1=>{
      if(!m1.children.length) rows.push([m1.id,m1.text,'','','','','','','']);
      else m1.children.forEach(m2=>rows.push([m1.id,m1.text,m2.id,m2.text,'','','','','']));
    });
    const ws=XLSX.utils.aoa_to_sheet(rows);
    ws['!cols']=[{wch:19},{wch:42},{wch:12},{wch:44},{wch:32},{wch:32},{wch:32},{wch:32},{wch:32}];
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Template Deutsch');
    XLSX.writeFile(wb,'OnePress_Stillstandsbaum_Template.xlsx');
  });
});
