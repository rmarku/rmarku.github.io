(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{iwTS:function(e,t,a){"use strict";a.r(t);a("dRSK"),a("rE2o"),a("ioFf"),a("rGqo"),a("yt8O"),a("Btvt"),a("XfO3"),a("T39b");var r=a("jrgX"),s=(a("q1tI"),a("Wbzz")),n=a("kCIJ"),o=a("wd/R"),i=a.n(o),u=(a("iYuL"),a("Bl7J")),d=a("FCmb"),l=a.n(d),c=a("qKvR");t.default=function(){var e=r.data,t=Object(n.useIntl)(),a=t.locale,o=t.defaultLocale;i.a.locale(a);var d=new Set,f=e.allMdx.edges,m=Array.isArray(f),p=0;for(f=m?f:f[Symbol.iterator]();;){var g;if(m){if(p>=f.length)break;g=f[p++]}else{if((p=f.next()).done)break;g=p.value}var b=g.node;d.add(b.fields.slug)}var v=[],w=function(){if(y){if(j>=I.length)return"break";h=I[j++]}else{if((j=I.next()).done)return"break";h=j.value}var t=h,r=(e.allMdx.edges.find((function(e){var r=e.node.fields,s=r.lang;return r.slug===t&&s===a}))||e.allMdx.edges.find((function(e){var a=e.node.fields,r=a.lang;return a.slug===t&&r===o}))).node;r&&v.push(r)},I=d,y=Array.isArray(I),j=0;for(I=y?I:I[Symbol.iterator]();;){var h;if("break"===w())break}return Object(c.c)(u.a,null,Object(c.c)("main",{className:l.a.blog},Object(c.c)("h1",null,"Materias"),Object(c.c)("p",null,"En esta pagina tengo información sobre las distintas materias que dicto."),v.map((function(e){return Object(c.c)("article",{key:e.fields.slug},Object(c.c)(s.Link,{to:""+e.fields.slug},Object(c.c)("span",{className:"univ"},e.frontmatter.univ),Object(c.c)("h2",null,e.frontmatter.title),Object(c.c)("time",{dateTime:i.a.unix(e.frontmatter.date).format("YYYY-MM-DD")},i.a.unix(e.frontmatter.date).format("MMMM D, YYYY")),Object(c.c)("br",null),Object(c.c)("p",null,e.frontmatter.description)))}))))}},jrgX:function(e){e.exports=JSON.parse('{"data":{"allMdx":{"edges":[{"node":{"frontmatter":{"title":"Arq. de Computadoras II","date":1583243490,"description":"En esta materia estudiamos como funciona un procesador ARM y que metodos se utilizan para acelerar su funcionamiento.","univ":"IUA"},"fields":{"slug":"/courses/arq_compu_II","type":"courses","lang":"es"}}},{"node":{"frontmatter":{"title":"Software Architecture I","date":1583243490,"description":"In this subject we study about design patterns, MVC and web development","univ":"UCC"},"fields":{"slug":"/courses/arq_de_software","type":"courses","lang":"en"}}},{"node":{"frontmatter":{"title":"Arq. de Software","date":1583243490,"description":"En esta materia estudiamos sobre los patrones de diseño.","univ":"UCC"},"fields":{"slug":"/courses/arq_de_software","type":"courses","lang":"es"}}},{"node":{"frontmatter":{"title":"Programing III","date":1583243490,"description":"In this subject we study algorithms and data structures.","univ":"UCC"},"fields":{"slug":"/courses/programacion3","type":"courses","lang":"en"}}},{"node":{"frontmatter":{"title":"Computer Architecture II","date":1583243490,"description":"In this subject we study how an ARM processor works and what methods are used to speed up its operation.","univ":"IUA"},"fields":{"slug":"/courses/arq_compu_II","type":"courses","lang":"en"}}},{"node":{"frontmatter":{"title":"Programación 3","date":1583243490,"description":"En esta materia estudiamos algoritmos y estructuras de datos.","univ":"UCC"},"fields":{"slug":"/courses/programacion3","type":"courses","lang":"es"}}}]}}}')}}]);
//# sourceMappingURL=component---src-pages-courses-js-9d406e8d7d1bf5cd612d.js.map