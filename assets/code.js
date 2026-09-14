(function(g){
  var KW=('import from as while for in if elif else def return break continue with try except '+
          'finally pass and or not True False None class lambda global del raise yield print').split(' ');
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function tag(c,s){return '<span class="'+c+'">'+esc(s)+'</span>'}

  function py(src){
    var o='',i=0,n=src.length;
    while(i<n){
      var ch=src[i];
      if(ch==='#'){var j=src.indexOf('\n',i);if(j<0)j=n;o+=tag('c',src.slice(i,j));i=j;continue}
      if(ch==='"'||ch==="'"){
        var q=ch,j=i+1;
        while(j<n&&src[j]!==q){if(src[j]==='\\')j++;j++}
        j=Math.min(j+1,n);o+=tag('s',src.slice(i,j));i=j;continue;
      }
      if(/[0-9]/.test(ch)&&!/[A-Za-z_]/.test(src[i-1]||'')){
        var j=i;while(j<n&&/[0-9._]/.test(src[j]))j++;
        o+=tag('n',src.slice(i,j));i=j;continue;
      }
      if(/[A-Za-z_]/.test(ch)){
        var j=i;while(j<n&&/[A-Za-z0-9_]/.test(src[j]))j++;
        var w=src.slice(i,j),k=j;while(k<n&&src[k]===' ')k++;
        o+= KW.indexOf(w)>-1 ? tag('k',w) : (src[k]==='(' ? tag('f',w) : esc(w));
        i=j;continue;
      }
      o+=esc(ch);i++;
    }
    return o;
  }

  function http(src){
    return src.split('\n').map(function(ln,idx){
      if(!ln)return '';
      if(idx===0){
        var p=ln.split(' ');
        return tag('k',p[0])+' '+esc(p.slice(1,-1).join(' '))+' '+tag('n',p[p.length-1]);
      }
      var c=ln.indexOf(':');
      if(c<0)return esc(ln);
      return tag('f',ln.slice(0,c+1))+tag('s',ln.slice(c+1));
    }).join('\n');
  }

  g.CODE={py:py,http:http};
})(window);
