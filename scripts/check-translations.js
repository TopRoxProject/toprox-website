// compare structure of dictionaries vs ro
require(require('path').join(__dirname,'..','node_modules','esbuild')).buildSync({entryPoints:[require('path').join(__dirname,'..','src','i18n','index.js')],bundle:true,platform:'node',format:'cjs',outfile:require('path').join(__dirname,'..','node_modules','.cache','dicts.js'),jsx:'automatic',loader:{'.js':'jsx'},external:['react'],logLevel:'error'});
const {DICTS}=require(require('path').join(__dirname,'..','node_modules','.cache','dicts.js'));
function walk(a,b,path,out){
  if(Array.isArray(a)){ if(!Array.isArray(b)) return out.push(path+' not array'); if(a.length!==b.length) out.push(`${path} length ${a.length}!=${b.length}`); a.forEach((x,i)=>walk(x,b[i],path+'['+i+']',out)); return;}
  if(a&&typeof a==='object'){ if(!b||typeof b!=='object') return out.push(path+' missing'); for(const k of Object.keys(a)) walk(a[k],b[k],path+'.'+k,out); for(const k of Object.keys(b)) if(!(k in a)) out.push(path+'.'+k+' extra'); return;}
  if(typeof a==='string'&&typeof b!=='string') out.push(path+' missing string');
  if(typeof a==='string'&&typeof b==='string'){ const t=x=>(x.match(/\{[a-z]+\}/g)||[]).join(); if(t(a)!==t(b)) out.push(path+' tokens differ'); if(a===b && a.length>25 && process.argv[2]!=='same') out.push(path+' UNTRANSLATED?'); }
}
for(const l of ['en','de','it','fr']){ const out=[]; walk(DICTS.ro,DICTS[l],l,out); console.log(l, out.length? out.slice(0,15).join('\n  '):'OK', out.length>15?`(+${out.length-15})`:''); }
