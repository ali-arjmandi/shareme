import{s as g,j as P,P as x,_ as L,a as o,u as _,g as k,c as B,d as w,e as A,f as j,A as C,t as O,r as I,B as T,J as D,I as S}from"./sanity-d662b08f.js";import{P as H}from"./PaneItem-51d63fac-f3dafe4f.js";var v;function W(s,t){return t||(t=s.slice(0)),Object.freeze(Object.defineProperties(s,{raw:{value:Object.freeze(t)}}))}const G=s=>{let{index:t,menuItems:a,menuItemGroups:i,title:c}=s;const{features:r}=_(),{collapsed:l,isLast:p}=k(),u=p&&!l?-1:0;return o(B,{actions:o(w,{menuItems:a,menuItemGroups:i}),backButton:r.backButton&&t>0&&o(A,{as:j,"data-as":"a",icon:C,mode:"bleed"}),tabIndex:u,title:c})},z=g.hr(v||(v=W([`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`])));function E(s){const{childItemId:t,items:a,isActive:i,layout:c,showIcons:r,title:l}=s,{collapsed:p}=O(),u=I.useCallback(e=>{var n;return((n=a==null?void 0:a.find((d,h)=>h===e))==null?void 0:n.type)==="divider"},[a]),m=I.useCallback(e=>{var n;const d=(n=e.displayOptions)==null?void 0:n.showIcon;return typeof d<"u"?d!==!1:r!==!1},[r]),f=I.useCallback((e,n)=>{const{virtualIndex:d}=n;if(e.type==="divider")return o(T,{marginTop:1,marginBottom:2,children:o(z,{})},"divider-".concat(d));const h=!i&&t===e.id,y=i&&t===e.id,b=e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0;return o(H,{icon:m(e)?e.icon:!1,id:e.id,layout:c,marginBottom:1,pressed:h,schemaType:e.schemaType,selected:y,title:e.title,value:b},e.id)},[t,i,c,m]);return o(D,{overflow:p?"hidden":"auto",children:a&&a.length>0&&o(S,{activeItemDataAttr:"data-hovered",ariaLabel:"List of ".concat(l),canReceiveFocus:!0,focusRingOffset:-3,getItemDisabled:u,itemHeight:51,items:a,onlyShowSelectionWhenActive:!0,padding:2,paddingBottom:1,renderItem:f,wrapAround:!1})})}function J(s){const{childItemId:t,index:a,isActive:i,isSelected:c,pane:r,paneKey:l}=s,{defaultLayout:p,displayOptions:u,items:m,menuItems:f,menuItemGroups:e,title:n}=r,d=(u==null?void 0:u.showIcons)!==!1;return P(x,{currentMaxWidth:350,"data-testid":"desk-tool-list-pane","data-ui":"ListPane",id:l,maxWidth:640,minWidth:320,selected:c,children:[L,o(G,{index:a,menuItems:f,menuItemGroups:e,title:n}),o(E,{childItemId:t,isActive:i,items:m,layout:p,showIcons:d,title:n},l)]})}export{J as default};
