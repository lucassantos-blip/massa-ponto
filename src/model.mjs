export function minutes(entries){const sorted=[...entries].sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));let total=0;for(let i=0;i+1<sorted.length;i+=2) total+=Math.max(0,Math.floor((Date.parse(sorted[i+1].at)-Date.parse(sorted[i].at))/60000));return total}
export function format(n){return String(Math.floor(Math.abs(n)/60)).padStart(2,'0')+':'+String(Math.abs(n)%60).padStart(2,'0')}
export function dayKey(at){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(at))}
export function expected(day){return [0,6].includes(new Date(day+'T12:00:00').getDay())?0:480}
export function summarize(entries,day){const worked=minutes(entries);const planned=expected(day);return {worked,planned,extra:entries.length%2?0:Math.max(0,worked-planned),missing:entries.length%2?0:Math.max(0,planned-worked),incomplete:entries.length%2===1}}
