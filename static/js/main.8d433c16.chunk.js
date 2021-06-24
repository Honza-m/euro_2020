(this.webpackJsonpeuro_2020=this.webpackJsonpeuro_2020||[]).push([[0],{19:function(e,t,a){},23:function(e,t,a){"use strict";a.r(t);var s=a(1),c=a.n(s),n=a(5),i=a.n(n),r=a(10),d=a(11),h=a(2),l=a(13),o=a(12),m=(a(19),a(25)),u=a(26),j=a(0);function f(e){var t=e.match,a=e.teams.find((function(e){return e.id===t.home_team})),s=e.teams.find((function(e){return e.id===t.away_team})),c=e.stadiums.find((function(e){return e.id===t.stadium}));return void 0===a&&(a={name:"To be decided",flag:{unicode:""}}),void 0===s&&(s={name:"To be decided",flag:{unicode:""}}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"names",children:[Object(j.jsx)("div",{className:"home flag",children:a.flag.unicode}),Object(j.jsx)("div",{className:"home name",children:a.name}),Object(j.jsx)("div",{className:"vs",children:" vs "}),Object(j.jsx)("div",{className:"away flag left",children:s.flag.unicode}),Object(j.jsx)("div",{className:"away name",children:s.name}),Object(j.jsx)("div",{className:"away flag right",children:s.flag.unicode})]}),Object(j.jsxs)("div",{className:"desc",children:[Object(j.jsx)("div",{children:new Date(t.date).toLocaleString()}),Object(j.jsxs)("div",{children:[c.name,", ",c.city]})]})]})}function v(e){var t=e.match,a=e.teams.find((function(e){return e.id===t.home_team})),s=e.teams.find((function(e){return e.id===t.away_team}));return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"names",children:[Object(j.jsx)("div",{className:"home flag",children:a.flag.unicode}),Object(j.jsx)("div",{className:"home name",children:a.name}),Object(j.jsx)("div",{className:"vs",children:" vs "}),Object(j.jsx)("div",{className:"away flag left",children:s.flag.unicode}),Object(j.jsx)("div",{className:"away name",children:s.name}),Object(j.jsx)("div",{className:"away flag right",children:s.flag.unicode})]}),Object(j.jsxs)("div",{className:"score",children:[t.home_result," : ",t.away_result]})]})}var b=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var s;return Object(r.a)(this,a),(s=t.call(this,e)).state={matches:null,filteredMatches:null,i:null,now2h:null},s.prevMatch=s.prevMatch.bind(Object(h.a)(s)),s.nextMatch=s.nextMatch.bind(Object(h.a)(s)),s.filterByTeam=s.filterByTeam.bind(Object(h.a)(s)),s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://raw.githubusercontent.com/lsv/uefa-euro-2020/master/data.json").then((function(e){return e.json()})).then((function(t){for(var a=[],s=0;s<t.groups.length;s++)a=a.concat(t.groups[s].matches);for(var c in t.knockoutphases)a=a.concat(t.knockoutphases[c].matches);a=a.sort((function(e,t){return new Date(e.date).getTime()-new Date(t.date).getTime()}));var n=new Date;n.setHours(n.getHours()-2),e.setState({matches:a,filteredMatches:a,teams:t.teams,stadiums:t.stadiums,i:e.currentMatchIndex(a,n),now2h:n})}))}},{key:"currentMatchIndex",value:function(e,t){for(var a=e.length-1,s=0;s<e.length;s++)if(new Date(e[s].date)>t){a=s;break}return a}},{key:"nextMatch",value:function(){this.setState({changedMatch:!1}),this.setState((function(e){return{i:e.i+1,changedMatch:!0}}))}},{key:"prevMatch",value:function(){this.setState({changedMatch:!1}),this.setState((function(e){return{i:e.i-1,changedMatch:!0}}))}},{key:"filterByTeam",value:function(e){var t=this,a=e.target.value;""===a?this.setState((function(e){return{filteredMatches:e.matches,i:t.currentMatchIndex(e.matches,e.now2h)}})):this.setState((function(e){var s=e.matches.filter((function(e){return e.home_team===a||e.away_team===a}));return{filteredMatches:s,i:t.currentMatchIndex(s,e.now2h)}}))}},{key:"render",value:function(){if(null===this.state.matches)return Object(j.jsx)("div",{className:"loading-wrapper",children:Object(j.jsxs)("div",{className:"loading",children:[Object(j.jsx)("div",{}),Object(j.jsx)("div",{}),Object(j.jsx)("div",{})]})});var e,t=this.state.filteredMatches[this.state.i];return e=new Date(t.date)>this.state.now2h?Object(j.jsx)(f,{match:t,teams:this.state.teams,stadiums:this.state.stadiums}):Object(j.jsx)(v,{match:t,teams:this.state.teams}),Object(j.jsx)("div",{className:"App",children:Object(j.jsx)(m.a,{in:!0,appear:!0,classNames:"fade",children:Object(j.jsxs)("div",{className:"box",children:[Object(j.jsx)("div",{children:Object(j.jsxs)("select",{onChange:this.filterByTeam,children:[Object(j.jsx)("option",{value:"",children:"All matches"}),this.state.teams.sort((function(e,t){return e.name.localeCompare(t.name)})).map((function(e,t){return Object(j.jsx)("option",{value:e.id,children:e.name},t)}))]})}),Object(j.jsx)(u.a,{className:"match",children:Object(j.jsx)(m.a,{timeout:600,classNames:"fade",children:e},this.state.filteredMatches[this.state.i].id)}),Object(j.jsxs)("div",{className:"navigation",children:[Object(j.jsx)("div",{children:0!==this.state.i?Object(j.jsx)("button",{onClick:this.prevMatch,children:"Prev match"}):""}),Object(j.jsx)("div",{children:this.state.i===this.state.filteredMatches.length-1?"":Object(j.jsx)("button",{onClick:this.nextMatch,children:"Next match"})})]})]})})})}}]),a}(c.a.Component);i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(b,{})}),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.8d433c16.chunk.js.map