import{i as e,f as l,T as t,o as a,a as n,b as s,w as o,n as i,P as r,U as u,F as d,d as c,Q as f,R as m,r as h,p}from"./vendor.32102158.js";import{V as b}from"./VSheet.af283e94.js";import{e as w,f as y,V as v,a as g,c as _,b as x,g as C}from"./VRow.e59343f3.js";const k={data:()=>({selectedComp:""})},V=e=>(f("data-v-a24af734"),e=e(),m(),e),S=c(" Owned Submarines "),A=c(" Campaign Settings "),E=c(" Crew "),T=c(" Misc Tools "),M=c("Owned Submarines"),I=V((()=>r("span",{class:"text-h6"},"Displays a list of currently owned submarines.",-1))),R=V((()=>r("br",null,null,-1))),P=V((()=>r("br",null,null,-1))),D=c(" Each submarine on the list has 3 buttons: "),W={class:"pl-8"},O=c("mdi-file-download-outline"),j=c(" - extracts submarine file from the save and downloads it "),B=c("mdi-clipboard-arrow-right-outline"),z=c(" - loads submarine file in the submarine editor "),H=c("mdi-delete-outline"),L=c(' - removes submarine from the "owned submarines" list and deletes its file '),U=c(" There is also a radiobutton on the left of each submarine which allows to set currently selected sub. "),F=V((()=>r("br",null,null,-1))),N=c(" Loading .sub file when the save is loaded will add it to that list and attach it to the savefile (or update existing submarine file with the same name). "),q=c("Campaign Settings"),G=V((()=>r("span",{class:"text-h6"}," Max Missions ",-1))),J=V((()=>r("br",null,null,-1))),Q=c(" Allows to set how many missions can be selected at the same time. "),K=V((()=>r("br",null,null,-1))),X=V((()=>r("br",null,null,-1))),Y=V((()=>r("span",{class:"text-h6"}," Radiation ",-1))),Z=V((()=>r("br",null,null,-1))),$=c(" Allows to toggle radiation."),ee=V((()=>r("br",null,null,-1))),le=c(" Off -> On - will turn on the radiation"),te=V((()=>r("br",null,null,-1))),ae=c(" On -> Off - will turn off the radiation and reset its progress on the map and outposts. Outposts that have already been abandoned due to its effects will stay that way. "),ne=V((()=>r("br",null,null,-1))),se=V((()=>r("br",null,null,-1))),oe=V((()=>r("span",{class:"text-h6"}," Difficulty ",-1))),ie=V((()=>r("br",null,null,-1))),re=c(" Allows to mass-update difficulties across all generated levels."),ue=V((()=>r("br",null,null,-1))),de=c(' The input can take any value, with "current" being the current difficuly for any given level.'),ce=V((()=>r("br",null,null,-1))),fe=c(" Example uses: "),me=V((()=>r("ul",{class:"pl-8"},[r("li",null,[r("span",{class:"text-secondary"},"current * 2"),c(" - will double the difficulty in each level")]),r("li",null,[r("span",{class:"text-secondary"},"current + 10"),c(" - will increase the difficuly by 10 in each level")]),r("li",null,[r("span",{class:"text-secondary"},"85"),c(" - will set the difficuly to 85 in each level")])],-1))),he=c(" It won't let you set any difficuly higher than 100 or lower than 0 as that might break some things. "),pe=c("Crew / Bots"),be=V((()=>r("span",{class:"text-h6"}," Displays a list of current single-player crew or bots hired in multi-player campaign. ",-1))),we=V((()=>r("br",null,null,-1))),ye=V((()=>r("br",null,null,-1))),ve=c(" Each character on the list has 3 buttons: "),ge={class:"pl-8"},_e=c("mdi-drag-horizontal-variant"),xe=c(" - can be grabbed to reorder crew"),Ce=c("mdi-file-edit-outline"),ke=c(" - opens character editing menu where you can edit name, job, skills or copy/edit raw .xml "),Ve=c("mdi-delete-outline"),Se=c(" - deletes the character"),Ae=c(" To add characters you can: "),Ee={class:"pl-8"},Te=V((()=>r("li",null,[c(" Load "),r("span",{class:"text-secondary"},"CharacterData.xml"),c(" file - to import all multiplayer characters as bots. ")],-1))),Me=c("mdi-account-plus-outline"),Ie=c(" - to add a new assistant (inventory will be empty because i don't know how to make it auto fill and don't want to risk item id conflicts) "),Re=c("mdi-account-edit-outline"),Pe=c(" - to add a new character from xml textfield "),De=c("mdi-clipboard-arrow-up-outline"),We=c(" - to add a new character from xml in the clipboard "),Oe=c(" After loading "),je=V((()=>r("span",{class:"text-secondary"},"CharacterData.xml",-1))),Be=c(" file, "),ze=c("mdi-file-download-outline"),He=c(" icon will be available, which allows you to export player characters back as "),Le=V((()=>r("span",{class:"text-secondary"},"CharacterData.xml",-1))),Ue=c(" file."),Fe=V((()=>r("br",null,null,-1))),Ne=c(" This has some limitations though, the save editor temporarily keeps a list of steam data mapped to character names and uses it when exporting player characters. This means that changing the \"originalname\" of the character won't allow it to be exported properly. Also, there is no way to safely store this list in the save file, so it won't be stored there, meaning the export option will disappear after downloading the modified save and loading it again. "),qe=c("Miscellaneous tools"),Ge=V((()=>r("span",{class:"text-h6"}," Gamesession.xml tools ",-1))),Je=V((()=>r("br",null,null,-1))),Qe=c(" Four buttons allowing to directly edit gamesession.xml file: "),Ke={class:"pl-8"},Xe=c("mdi-clipboard-arrow-down-outline"),Ye=c(" - copies contents of gamesession.xml to the clipboard "),Ze=c("mdi-clipboard-arrow-up-outline"),$e=c(" - replaces gamesession.xml file with the contents of the clipboard "),el=c("mdi-file-download-outline"),ll=c(" - downloads gamesession.xml file"),tl=c("mdi-file-edit-outline"),al=c(" - opens gamesession.xml content in one large textarea "),nl=c(" Loading gamesession.xml file will replace the current one. "),sl=V((()=>r("br",null,null,-1))),ol=V((()=>r("br",null,null,-1))),il=V((()=>r("span",{class:"text-h6"}," Save conversion ",-1))),rl=V((()=>r("br",null,null,-1))),ul=c(" Allows to convert savefile between single-player and multi-player formats."),dl=V((()=>r("br",null,null,-1))),cl=c(" Important notes: "),fl=V((()=>r("ul",{class:"pl-8"},[r("li",null," When converting MP->SP only bots will be turned into the crew. Any human-controlled characters need to be imported by loading CharacterData.xml file. "),r("li",null," When converting SP->MP random capaign id will be generted. Make sure its unique from your other MP savefiles. ")],-1))),ml=V((()=>r("br",null,null,-1))),hl=V((()=>r("span",{class:"text-h6"}," Campaign ID (MP saves only) ",-1))),pl=V((()=>r("br",null,null,-1))),bl=c(" Allows to set campaign id property. "),wl=V((()=>r("br",null,null,-1))),yl=V((()=>r("br",null,null,-1))),vl=V((()=>r("span",{class:"text-h6"}," Current Money ",-1))),gl=V((()=>r("br",null,null,-1))),_l=c(" Allows to set current money. ");k.render=function(e,l,t,c,f,m){const p=h("v-btn"),b=h("v-sheet"),w=h("v-col"),y=h("v-row"),v=h("v-card-title"),g=h("v-card-header"),_=h("v-icon"),x=h("v-card-text"),C=h("v-card");return a(),n(d,null,[s(y,null,{default:o((()=>[s(w,null,{default:o((()=>[s(b,{elevation:"1",class:"buttonWrapper"},{default:o((()=>[s(p,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[0]||(l[0]=e=>f.selectedComp="ownedSubs")},{default:o((()=>[S])),_:1}),s(p,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[1]||(l[1]=e=>f.selectedComp="campSettings")},{default:o((()=>[A])),_:1}),s(p,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[2]||(l[2]=e=>f.selectedComp="crew")},{default:o((()=>[E])),_:1}),s(p,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[3]||(l[3]=e=>f.selectedComp="misc")},{default:o((()=>[T])),_:1})])),_:1})])),_:1})])),_:1}),s(y,null,{default:o((()=>[s(w,null,{default:o((()=>["ownedSubs"===f.selectedComp?(a(),i(C,{key:0,elevation:"1",class:"aboutCard"},{default:o((()=>[s(g,null,{default:o((()=>[s(v,{class:"text-h4"},{default:o((()=>[M])),_:1})])),_:1}),s(x,null,{default:o((()=>[I,R,P,D,r("ul",W,[r("li",null,[s(_,{color:"secondary"},{default:o((()=>[O])),_:1}),j]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[B])),_:1}),z]),r("li",null,[s(_,{color:"red"},{default:o((()=>[H])),_:1}),L])]),U,F,N])),_:1})])),_:1})):u("",!0),"campSettings"===f.selectedComp?(a(),i(C,{key:1,elevation:"1",class:"aboutCard"},{default:o((()=>[s(g,null,{default:o((()=>[s(v,{class:"text-h4"},{default:o((()=>[q])),_:1})])),_:1}),s(x,null,{default:o((()=>[G,J,Q,K,X,Y,Z,$,ee,le,te,ae,ne,se,oe,ie,re,ue,de,ce,fe,me,he])),_:1})])),_:1})):u("",!0),"crew"===f.selectedComp?(a(),i(C,{key:2,elevation:"1",class:"aboutCard"},{default:o((()=>[s(g,null,{default:o((()=>[s(v,{class:"text-h4"},{default:o((()=>[pe])),_:1})])),_:1}),s(x,null,{default:o((()=>[be,we,ye,ve,r("ul",ge,[r("li",null,[s(_,{color:"secondary"},{default:o((()=>[_e])),_:1}),xe]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[Ce])),_:1}),ke]),r("li",null,[s(_,{color:"red"},{default:o((()=>[Ve])),_:1}),Se])]),Ae,r("ul",Ee,[Te,r("li",null,[s(_,{color:"secondary"},{default:o((()=>[Me])),_:1}),Ie]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[Re])),_:1}),Pe]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[De])),_:1}),We])]),Oe,je,Be,s(_,{color:"secondary"},{default:o((()=>[ze])),_:1}),He,Le,Ue,Fe,Ne])),_:1})])),_:1})):u("",!0),"misc"===f.selectedComp?(a(),i(C,{key:3,elevation:"1",class:"aboutCard"},{default:o((()=>[s(g,null,{default:o((()=>[s(v,{class:"text-h4"},{default:o((()=>[qe])),_:1})])),_:1}),s(x,null,{default:o((()=>[Ge,Je,Qe,r("ul",Ke,[r("li",null,[s(_,{color:"secondary"},{default:o((()=>[Xe])),_:1}),Ye]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[Ze])),_:1}),$e]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[el])),_:1}),ll]),r("li",null,[s(_,{color:"secondary"},{default:o((()=>[tl])),_:1}),al])]),nl,sl,ol,il,rl,ul,dl,cl,fl,ml,hl,pl,bl,wl,yl,vl,gl,_l])),_:1})])),_:1})):u("",!0)])),_:1})])),_:1})],64)},k.__scopeId="data-v-a24af734",e(k,"components",{VBtn:l,VSheet:b,VCol:w,VRow:y,VCardTitle:v,VCardHeader:g,VIcon:t,VCardText:_,VCard:x});const xl={data:()=>({selectedComp:""})},Cl=e=>(f("data-v-95b44e5e"),e=e(),m(),e),kl=c(" Export from file "),Vl=c("Wire Hider"),Sl=c("Run Script"),Al=c("Misc Tools"),El=c("Export from file"),Tl=Cl((()=>r("span",{class:"text-h6"},"Allows to export preview image or shuttles from the submarine file.",-1))),Ml=Cl((()=>r("br",null,null,-1))),Il=Cl((()=>r("br",null,null,-1))),Rl=c(" Pressing "),Pl=c("mdi-file-download-outline"),Dl=c(" button triggers download. "),Wl=c("Wire hider"),Ol=Cl((()=>r("span",{class:"text-h6"}," A tool to make mass wire hiding easy. ",-1))),jl=Cl((()=>r("br",null,null,-1))),Bl=Cl((()=>r("br",null,null,-1))),zl=c(' Just select desired wire color ("all" will affect all wires) and press buttons to hide or unhide them. This tool uses the "hidden in game" property so the wires will still be visible in the in-game submarine editor. '),Hl=c("Run script"),Ll=Cl((()=>r("span",{class:"text-h6"}," Edit submarine directly with a script. ",-1))),Ul=Cl((()=>r("br",null,null,-1))),Fl=Cl((()=>r("br",null,null,-1))),Nl=c(" Work-in-progress tool. Allows to directly edit your submarine with javascript. "),ql=c("Miscellaneous tools"),Gl=Cl((()=>r("br",null,null,-1))),Jl=Cl((()=>r("span",{class:"text-h6"}," Change Price ",-1))),Ql=Cl((()=>r("br",null,null,-1))),Kl=c(" Allows to change submarine price without any limits. "),Xl=Cl((()=>r("br",null,null,-1))),Yl=Cl((()=>r("br",null,null,-1))),Zl=Cl((()=>r("span",{class:"text-h6"}," Clean walls ",-1))),$l=Cl((()=>r("br",null,null,-1))),et=c(" Removes stains from background walls. Checkbox allows to also clean walls in shuttles. "),lt=Cl((()=>r("br",null,null,-1))),tt=Cl((()=>r("br",null,null,-1))),at=Cl((()=>r("span",{class:"text-h6"}," Compact submarine ",-1))),nt=Cl((()=>r("br",null,null,-1))),st=c(" Allows to massively reduce submarine file size by replacing preview images with 4 pixels. "),ot=Cl((()=>r("ul",{class:"pl-8"},[r("li",null,[r("span",{class:"text-secondary"},"SHUTTLES"),c(" button replaces preview images in all shuttles attached to the main submarine. ")]),r("li",null,[r("span",{class:"text-secondary"},"SUB"),c(" button replaces preview image of main submarine.")])],-1))),it=c(" Note that the shuttle images aren't used anywhere so removing them reduces file size with no downsides. Removing the main submarine preview image will make it even lighter but it will deffinitely be notieable in-game."),rt=Cl((()=>r("br",null,null,-1))),ut=c(" If buttons are locked that means that there is no preview image or shuttles. ");xl.render=function(e,l,t,r,c,f){const m=h("v-btn"),p=h("v-sheet"),b=h("v-col"),w=h("v-row"),y=h("v-card-title"),v=h("v-card-header"),g=h("v-icon"),_=h("v-card-text"),x=h("v-card");return a(),n(d,null,[s(w,null,{default:o((()=>[s(b,null,{default:o((()=>[s(p,{elevation:"1",class:"buttonWrapper"},{default:o((()=>[s(m,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[0]||(l[0]=e=>c.selectedComp="export")},{default:o((()=>[kl])),_:1}),s(m,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[1]||(l[1]=e=>c.selectedComp="wirehider")},{default:o((()=>[Vl])),_:1}),s(m,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[2]||(l[2]=e=>c.selectedComp="script")},{default:o((()=>[Sl])),_:1}),s(m,{color:"secondary",variant:"outlined",class:"mx-2",onClick:l[3]||(l[3]=e=>c.selectedComp="misc")},{default:o((()=>[Al])),_:1})])),_:1})])),_:1})])),_:1}),s(w,null,{default:o((()=>[s(b,null,{default:o((()=>["export"===c.selectedComp?(a(),i(x,{key:0,elevation:"1",class:"aboutCard"},{default:o((()=>[s(v,null,{default:o((()=>[s(y,{class:"text-h4"},{default:o((()=>[El])),_:1})])),_:1}),s(_,null,{default:o((()=>[Tl,Ml,Il,Rl,s(g,{color:"secondary"},{default:o((()=>[Pl])),_:1}),Dl])),_:1})])),_:1})):u("",!0),"wirehider"===c.selectedComp?(a(),i(x,{key:1,elevation:"1",class:"aboutCard"},{default:o((()=>[s(v,null,{default:o((()=>[s(y,{class:"text-h4"},{default:o((()=>[Wl])),_:1})])),_:1}),s(_,null,{default:o((()=>[Ol,jl,Bl,zl])),_:1})])),_:1})):u("",!0),"script"===c.selectedComp?(a(),i(x,{key:2,elevation:"1",class:"aboutCard"},{default:o((()=>[s(v,null,{default:o((()=>[s(y,{class:"text-h4"},{default:o((()=>[Hl])),_:1})])),_:1}),s(_,null,{default:o((()=>[Ll,Ul,Fl,Nl])),_:1})])),_:1})):u("",!0),"misc"===c.selectedComp?(a(),i(x,{key:3,elevation:"1",class:"aboutCard"},{default:o((()=>[s(v,null,{default:o((()=>[s(y,{class:"text-h4"},{default:o((()=>[ql])),_:1})])),_:1}),s(_,null,{default:o((()=>[Gl,Jl,Ql,Kl,Xl,Yl,Zl,$l,et,lt,tt,at,nt,st,ot,it,rt,ut])),_:1})])),_:1})):u("",!0)])),_:1})])),_:1})],64)},xl.__scopeId="data-v-95b44e5e",e(xl,"components",{VBtn:l,VSheet:b,VCol:w,VRow:y,VCardTitle:v,VCardHeader:g,VIcon:t,VCardText:_,VCard:x});const dt={data:()=>({subEditor:!1}),components:{AboutSaveEditor:k,AboutSubEditor:xl}},ct=e=>(f("data-v-7e79ce1e"),e=e(),m(),e),ft=c(" About Save Editor "),mt=c(" About Submarine Editor "),ht=ct((()=>r("b",null,[c(" Note: Always back up the original file before replacing it with the downloaded one."),r("br"),c(" Even if something had worked for you before, there is always a risk that a game update breaks some stuff. ")],-1))),pt=c(" If the editor freezes, crashes or outputs corrupted file feel free to create a "),bt=ct((()=>r("a",{style:{color:"rgb(var(--v-theme-secondary))"},href:"https://github.com/ignis05/baro-save-editor/issues"}," github issue ",-1))),wt=c(" attaching original file(s) and providing steps for reproduction. ");dt.render=function(e,l,t,n,r,u){const d=h("v-btn"),c=h("v-sheet"),f=h("v-col"),m=h("v-row"),b=h("AboutSubEditor"),w=h("AboutSaveEditor"),y=h("v-container");return a(),i(y,null,{default:o((()=>[s(m,null,{default:o((()=>[s(f,null,{default:o((()=>[s(c,{elevation:"1",class:"buttonWrapper"},{default:o((()=>[s(d,{class:p([{"text-black":!r.subEditor},"mx-2"]),color:"secondary",onClick:l[0]||(l[0]=e=>r.subEditor=!1)},{default:o((()=>[ft])),_:1},8,["class"]),s(d,{class:p([{"text-black":r.subEditor},"mx-2"]),color:"secondary",onClick:l[1]||(l[1]=e=>r.subEditor=!0)},{default:o((()=>[mt])),_:1},8,["class"])])),_:1})])),_:1})])),_:1}),s(m,null,{default:o((()=>[s(f,null,{default:o((()=>[s(c,{elevation:"1",class:"pa-2",style:{"text-align":"center"}},{default:o((()=>[ht])),_:1})])),_:1})])),_:1}),r.subEditor?(a(),i(b,{key:0})):(a(),i(w,{key:1})),s(m,null,{default:o((()=>[s(f,null,{default:o((()=>[s(c,{elevation:"1",class:"pa-2",style:{"text-align":"center"}},{default:o((()=>[pt,bt,wt])),_:1})])),_:1})])),_:1})])),_:1})},dt.__scopeId="data-v-7e79ce1e",e(dt,"components",{VBtn:l,VSheet:b,VCol:w,VRow:y,VContainer:C});export{dt as default};