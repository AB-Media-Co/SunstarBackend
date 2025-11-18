const t=n=>{if(n==null||n==="")return"0";const r=typeof n=="string"?parseFloat(n):n;return isNaN(r)?"0":Math.round(r).toLocaleString("en-IN")},e=n=>`₹${t(n)}`;export{e as f};
