export function minutes(entries){const sorted=[...entries].sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));let total=0;for(let i=0;i+1<sorted.length;i+=2) total+=Math.max(0,Math.floor((Date.parse(sorted[i+1].at)-Date.parse(sorted[i].at))/60000));return total}
export function format(n){return String(Math.floor(Math.abs(n)/60)).padStart(2,'0')+':'+String(Math.abs(n)%60).padStart(2,'0')}
export function dayKey(at){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(at))}
export function expected(day){return [0,6].includes(new Date(day+'T12:00:00').getDay())?0:480}
export function summarize(entries,day){const worked=minutes(entries);const planned=expected(day);return {worked,planned,extra:entries.length%2?0:Math.max(0,worked-planned),missing:entries.length%2?0:Math.max(0,planned-worked),incomplete:entries.length%2===1}}

export function once(fn){let done=false;return (...args)=>{if(done)return;done=true;return fn(...args)}}
export function nextPunchLabel(count){return ['Entrada','Saída para intervalo','Retorno do intervalo','Saída final'][count]??'Marcação adicional'}

export function dayReport(marks,requests,day,planned,nowDay){
 const original=[...marks].sort((a,b)=>a.at.localeCompare(b.at));
 const approved=requests.filter(r=>r.status==='Aprovada');
 const batch=approved.filter(r=>r.kind==='Ajuste de ponto'&&Array.isArray(r.adjustments)).flatMap(r=>r.adjustments.map((e,i)=>({...e,person:r.person,requestId:r.id,index:i})));const ignored=new Set(approved.filter(r=>!r.adjustments).filter(r=>r.kind==='Ajuste de ponto'&&['Corrigir','Desconsiderar'].includes(r.adjustAction)).map(r=>r.targetId));
 for(const e of batch){if(e.targetId&&(e.action==='Desconsiderar'||(e.action==='Corrigir'&&original.some(m=>m.id===e.targetId&&new Date(m.at).toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit'})!==e.time))))ignored.add(e.targetId)}
 const included=approved.filter(r=>!r.adjustments).filter(r=>r.kind==='Ajuste de ponto'&&r.adjustAction!=='Desconsiderar'&&/^\d{2}:\d{2}$/.test(r.time)).map(r=>({id:'ajuste-'+r.id,person:r.person,at:new Date(day+'T'+r.time+':00-03:00').toISOString(),loc:'Ajuste aprovado'}));
 const added=batch.filter(e=>e.action==='Incluir'||(e.action==='Corrigir'&&ignored.has(e.targetId))).filter(e=>/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time)).map(e=>({id:'ajuste-'+e.requestId+'-'+e.index,person:e.person,at:new Date(day+'T'+e.time+':00-03:00').toISOString(),loc:'Ajuste aprovado'}));
 const list=[...original.filter(m=>!ignored.has(m.id)),...included,...added].sort((a,b)=>a.at.localeCompare(b.at));
 const worked=minutes(list);const incomplete=list.length%2===1;
 const abono=approved.filter(r=>r.kind==='Abono').reduce((sum,r)=>{if(r.abonoMode==='Dia inteiro')return sum+planned;const [h,m]=r.time.split(':').map(Number);return sum+(Number.isFinite(h)&&Number.isFinite(m)?h*60+m:0)},0);
 const pending=incomplete||day>=nowDay;
 return {list,original,worked,planned,abono:Math.min(abono,Math.max(0,planned-worked)),extra:pending?0:Math.max(0,worked-planned),missing:pending?0:Math.max(0,planned-worked-abono),incomplete};
}
export function timeMinutes(value){const [h,m]=value.split(':').map(Number);return h*60+m}
export function scheduledMinutes(day,schedule,exceptions){if(exceptions.includes(day))return 0;if(!schedule.days.includes(new Date(day+'T12:00:00').getDay()))return 0;const start=timeMinutes(schedule.start),end=timeMinutes(schedule.end);return Math.max(0,(end-start+1440)%1440-schedule.breakMinutes)}
