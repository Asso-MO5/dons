var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});__name(function(){const relList=document.createElement("link").relList;if(relList&&relList.supports&&relList.supports("modulepreload"))return;for(const link of document.querySelectorAll('link[rel="modulepreload"]'))processPreload(link);new MutationObserver(mutations=>{for(const mutation of mutations)if(mutation.type==="childList")for(const node of mutation.addedNodes)node.tagName==="LINK"&&node.rel==="modulepreload"&&processPreload(node)}).observe(document,{childList:!0,subtree:!0});function getFetchOpts(link){const fetchOpts={};return link.integrity&&(fetchOpts.integrity=link.integrity),link.referrerPolicy&&(fetchOpts.referrerPolicy=link.referrerPolicy),link.crossOrigin==="use-credentials"?fetchOpts.credentials="include":link.crossOrigin==="anonymous"?fetchOpts.credentials="omit":fetchOpts.credentials="same-origin",fetchOpts}__name(getFetchOpts,"getFetchOpts");function processPreload(link){if(link.ep)return;link.ep=!0;const fetchOpts=getFetchOpts(link);fetch(link.href,fetchOpts)}__name(processPreload,"processPreload")},"polyfill")();function loadHyperscript(callback){const scriptSrc="https://unpkg.com/hyperscript.org@0.9.12",oldBal=document.querySelector("script[src*='hyperscript.org']");oldBal&&oldBal.remove();const scriptEl=document.createElement("script");scriptEl.setAttribute("src",scriptSrc),document.head.insertBefore(scriptEl,document.head.firstChild),scriptEl.onload=callback}__name(loadHyperscript,"loadHyperscript");const content$2=`<div class="grid grid-rows-[auto_1fr] gap-3 bg-sl-bg h-[100dvh]">\r
  <header class="bg-sl-white text-white p-2 flex items-center gap-2 justify-between">\r
    <a href="https://mo5.com">\r
\r
      <img src="/public/logo.webp" alt="logo MO5">\r
    </a>\r
    <div _="\r
      on load call app.helpers.getLang() \r
      then set $lang to result \r
      toggle @disabled on #{$lang}\r
      end\r
      ">\r
      <button class="bg-sl-primary text-white rounded-sm px-3 py-2 disabled:opacity-50" id="fr"\r
        _="on click call app.helpers.saveLang(@id) then toggle @disabled on me toggle @disabled on #en end">FR</button>\r
      <button class="bg-sl-primary text-white rounded-sm px-3 py-2 disabled:opacity-50" id="en"\r
        _="on click call app.helpers.saveLang(@id) then toggle @disabled on me toggle @disabled on #fr end">ENG</button>\r
    </div>\r
  </header>\r
\r
  <main class="flex flex-col gap-4 p-10 mb-3 relative h-full">\r
    <div class="absolute inset-0 overflow-y-auto p-6">\r
      <header class="mb-5">\r
        <h1 data-trans="support_title" class="text-center text-3xl uppercase"></h1>\r
        <div data-trans="support_subtitle" class="text-center text-sl-primary"></div>\r
      </header>\r
\r
      <section class="flex justify-center flex-wrap gap-5 md:grid md:grid-cols-2 max-w-md mx-auto">\r
\r
        <article\r
          class="border-2 border-sl-primary p-3 rounded flex flex-col items-stretch justify-between h-full gap-4 bg-white transition-all hover:scale-105">\r
\r
          <div class="flex flex-col gap-3">\r
            <h2 class="text-center text-xl" data-trans="gear_title"></h2>\r
            <div data-trans="gear_desc" class="text-sm border-t border-b border-gray-300 py-5"></div>\r
          </div>\r
          <div class="flex items-center justify-center">\r
            <button class="btn" data-trans="btn_gift" _="on click call #modal_gear.showModal()"></button>\r
          </div>\r
\r
        </article>\r
\r
        <article\r
          class="border-2 border-sl-primary p-3 rounded flex flex-col items-stretch justify-between h-full gap-4 bg-white transition-all hover:scale-105">\r
          <div class="flex flex-col gap-3">\r
            <h2 class="text-center text-xl" data-trans="money_title"></h2>\r
            <div data-trans="money_desc" class="text-sm border-t border-b border-gray-300 py-5"></div>\r
          </div>\r
          <div class="flex items-center justify-center">\r
            <button class="btn" data-trans="btn_gift" _="on click call #modal_money.showModal()"></button>\r
          </div>\r
        </article>\r
\r
      </section>\r
\r
      <h3 data-trans="faq_title" class="text-center mt-7 uppercase text-3xl font-FjallaOne"></h3>\r
      <section class="text-center mt-5 flex flex-col gap-3 max-w-xl mx-auto" id="faq">\r
      </section>\r
    </div>\r
  </main>\r
\r
</div>\r
\r
<span _="\r
  -- inject templates in the DOM, translate the page to the end, after the injection\r
  on load call app.helpers.injectTemplate('gearModal') \r
  then put result after me \r
  call app.helpers.injectTemplate('moneyModal') then put result after #modal_gear\r
\r
  call app.helpers.injectFaq() then put result into #faq\r
\r
  call app.helpers.translate()\r
  " class="fixed">\r
</span>`;function createPage(content2,...helpers){const helpersObj=Object.assign({},...helpers.map(fn=>({[fn.name]:fn})));return{content:content2,helpers:helpersObj}}__name(createPage,"createPage");const translation={support_title:{fr:"Soutenir l'association MO5",en:"Support MO5 association"},support_subtitle:{fr:"Vous pouvez nous soutenir dans notre action en faisant un don financier ponctuel ou régulier, ou un don de matériel.",en:"You can support us in our action by making a one-off or regular financial donation, or a donation of equipment."},gear_title:{fr:"Faire un don matériel",en:"Donate hardware"},gear_desc:{fr:"La quasi-totalité des pièces de nos collections viennent de vos dons. En léguant vos machines, jeux et documentations à MO5.COM, vous contribuez à la préservation du patrimoine, et permettez à d'autres de les découvrir.",en:"Almost all of our collections come from your donations. By bequeathing your machines, games and documentation to MO5.COM, you contribute to the preservation of heritage, and allow others to discover them."},money_title:{fr:"Faire un don financier",en:"Donate money"},money_desc:{fr:"Votre don financier permettra à l'association de financer ses projets, notamment l'organisation d'événements et la mise en place d'expositions.",en:"Your financial donation will allow the association to finance its projects, in particular the organization of events and the setting up of exhibitions."},btn_gift:{fr:"Je fais un don",en:"I make a donation"},gear_modal_title:{fr:"Faire un don matériel",en:"Donate hardware"},gear_modal_desc:{fr:"La quasi-totalité des pièces de nos collections viennent de vos dons. En léguant vos machines, jeux et documentations à MO5.COM, vous contribuez à la préservation du patrimoine, et permettez à d'autres de les découvrir.",en:"Almost all of our collections come from your donations. By bequeathing your machines, games and documentation to MO5.COM, you contribute to the preservation of heritage, and allow others to discover them."},money_modal_title:{fr:"Faire un don financier",en:"Donate money"},money_modal_desc:{fr:"Votre don financier permettra à l'association de financer ses projets, notamment l'organisation d'événements et la mise en place d'expositions.",en:"Your financial donation will allow the association to finance its projects, in particular the organization of events and the setting up of exhibitions."},donation_amount:{fr:"Montant du don",en:"Donation amount"},custom_amount:{fr:"Montant personnalisé",en:"Custom amount"},message:{fr:"Message",en:"Message"},name:{fr:"Nom",en:"Name"},email:{fr:"Email",en:"Email"},lastname:{fr:"Prénom",en:"Lastname"},phone:{fr:"Téléphone",en:"Phone"},address:{fr:"Adresse",en:"Address"},postal_code:{fr:"Code postal",en:"Postal code"},city:{fr:"Ville",en:"City"},send:{fr:"Envoyer",en:"Send"},faq_title:{fr:"Questions fréquentes",en:"Frequently asked questions"},faq_money_support_title:{fr:"Pourquoi demander un soutien financier ?",en:"Why ask for financial support?"},faq_money_support_content:{fr:"L'association MO5.COM existe maintenant depuis plus de 20 ans et fonctionne sans subvention. Elle se finance par les cotisations de ses membres et une contribution financière demandée aux partenaires qui reçoivent nos expositions. Les sommes sont souvent modiques, car nous voulons éviter à tout prix qu’il devienne coûteux d’accueillir une exposition de l’association. Nous avons recours aux dons pour assurer nos dépenses sans pénaliser financièrement nos autres activités.",en:"The MO5.COM association has now existed for more than 20 years and operates without subsidy. It is financed by the contributions of its members and a financial contribution requested from the partners who receive our exhibitions. The sums are often modest, because we want to avoid at all costs that it becomes expensive to host an exhibition of the association. We use donations to cover our expenses without financially penalizing our other activities."},faq_tax_deduction_title:{fr:"Mon don donne-t-il droit à une réduction d'impôt ?",en:"Is my donation eligible for a tax deduction?"},faq_tax_deduction_content:{fr:"Oui ! L'association a récemment été déclarée d'intérêt général. La réduction d’impôt est de 66 % du montant des sommes versées. La réduction s'applique dans la limite de 20 % du revenu imposable. En ce qui concerne les dons en nature, nous ne sommes malheureusement pas en mesure d'en estime la valeur, ils ne peuvent donc pas faire l'objet d'une réduction d'impôt.",en:"Yes ! The association has recently been declared of general interest. The tax reduction is 66% of the amount paid. The reduction applies within the limit of 20% of taxable income. As far as donations in kind are concerned, we are unfortunately not able to estimate their value, so they cannot be the subject of a tax reduction."},faq_donation_receipt_title:{fr:"Quelle est la destination des dons ?",en:"What is the destination of donations?"},faq_donation_receipt_content:{fr:"L’association doit investir pour améliorer encore la conservation de ses collections et financer ses locaux. Le matériel professionnel de conservation coûte cher. Il peut s’agir d’emballages en carton neutre, systèmes de filtrage d’air, de mobilier de stockage des textiles, d’aspirateurs à filtration absolue, de supports spécifiques pour le stockage des PLV et autres objets de grand format. L’achat de tous ces matériels nous permet de mieux préserver notre patrimoine, de nous approcher au maximum des normes de conservation de la « loi musée ».",en:'The association must invest to further improve the conservation of its collections and finance its premises. Professional conservation equipment is expensive. It can be neutral cardboard packaging, air filtration systems, textile storage furniture, absolute filtration vacuum cleaners, specific supports for the storage of PLV and other large format objects. The purchase of all this equipment allows us to better preserve our heritage, to get as close as possible to the conservation standards of the "museum law".'},faq_transaction_security_title:{fr:"La transaction est-elle sécurisée ?",en:"Is the transaction secure?"},faq_transaction_security_content:{fr:"Absolument. La sécurité et la confidentialité de vos informations est notre priorité. Nous utilisons un certificat SSL pour protéger vos informations, et les dons via la plateforme PayPal sont sécurisés. Nous ne vendrons, échangerons, ou partagerons vos informations personnelles avec personne, et nous n'enverrons aucun e-mail aux donateurs au nom d'autres organisations.",en:"Absolutely. The security and confidentiality of your information is our priority. We use an SSL certificate to protect your information, and donations via the PayPal platform are secure. We will not sell, trade, or share your personal information with anyone, and we will not send any emails to donors on behalf of other organizations."},gear_submit_success:{fr:"Votre message a bien été envoyé !",en:"Your message has been sent!"},gear_submit_error:{fr:"Une erreur est survenue lors de l'envoi du formulaire.",en:"An error occurred while sending the form."},thanks_title:{fr:"Merci !",en:"Thank you!"},back_to_mo5:{fr:"Retour sur MO5.COM",en:"Back to MO5.COM"},contact_soon:{fr:"Nous vous contacterons prochainement.",en:"We will contact you soon."},back_to_donation:{fr:"Retour à la page de don",en:"Back to donation page"},dl_link_tax:{fr:"Télécharger votre reçu fiscal",en:"Download your tax receipt"}};function translate(){const lang=getLang(),elToTranslate=document.querySelectorAll("[data-trans]"),placeholderToTranslate=document.querySelectorAll("[placeholder]");elToTranslate.forEach(el=>{var _a;const key2=el.getAttribute("data-trans"),trans=((_a=translation==null?void 0:translation[key2])==null?void 0:_a[lang])||key2;el.innerHTML=trans}),placeholderToTranslate.forEach(el=>{var _a;const key2=el.getAttribute("placeholder"),trans=((_a=translation==null?void 0:translation[key2])==null?void 0:_a[lang])||key2;el.setAttribute("placeholder",trans)})}__name(translate,"translate");const key="mo5_don_lang";function getLang(){const ls=localStorage.getItem(key);if(ls)return ls;const langShort=(navigator.language||navigator.userLanguage).split("-")[0];return localStorage.setItem(key,langShort),langShort}__name(getLang,"getLang");function saveLang(lang){return localStorage.setItem(key,lang),translate(),lang}__name(saveLang,"saveLang");const trashcan=`<template id="trashcan">\r
  <div>\r
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">\r
      <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->\r
      <path fill="#9c1616"\r
        d="M160 0H147.2L140 10.7 93.8 80H80 32 0v48H32V464v48H80 368h48V464 128h32V80H416 368 354.2L308 10.7 300.8 0H288 160zM296.5 80h-145l21.3-32H275.2l21.3 32zM80 464V128H368V464H80zm80-272V176H128v16V400v16h32V400 192zm80 0V176H208v16V400v16h32V400 192zm80 0V176H288v16V400v16h32V400 192z" />\r
    </svg>\r
  </div>\r
</template>`,pen=`<template id="pen">\r
  <div>\r
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"\r
      viewBox="0 0 512 512"><!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->\r
      <path\r
        d="M0 512l10.2-51L32 352l19.2-19.2-.5-.8 3.8-2.6L350.1 33.9 384 0l33.9 33.9 60.1 60.1L512 128l-33.9 33.9L182.5 457.5l-2.6 3.8-.8-.5L160 480 51 501.8 0 512zM76.2 375.7l-15 75.1 75.1-15 8.9-8.9 7.9-11.9-31-7.7-14-3.5-3.5-14-7.7-31-11.9 7.9-8.9 8.9zM382.1 190.1l-60.1-60.1L135.8 316.1l12 48.1 48.1 12L382.1 190.1zm-66.7 28.7l-96 96L208 326.1l-22.6-22.6 11.3-11.3 96-96L304 184.8l22.6 22.6-11.3 11.3z" />\r
    </svg>\r
  </div>\r
</template>`,gearModal=`<template id="gearModal">\r
\r
  <dialog id="modal_gear" class="dialog grid grid-rows-[auto_1fr] gap-3">\r
    <div class="flex justify-end item-center">\r
      <button _="on click call #modal_gear.close()" class="cross-btn">X</button>\r
    </div>\r
\r
    <div class="relative h-full">\r
      <div class="absolute inset-0 overflow-y-auto p-2">\r
        <header class="max-w-lg mx-auto">\r
          <h2 class="text-center " data-trans="gear_modal_title">sdcs</h2>\r
          <div class="text-center italic text-sm" data-trans="gear_modal_desc">sdfcs</div>\r
        </header>\r
        <form class="flex flex-col gap-3 sm:grid sm:grid-cols-2 p-3 max-w-lg mx-auto overflow-y-auto "\r
          _="on submit halt the event then call app.helpers.submitGear(me)">\r
          <fieldset>\r
            <label for="gear_name" required data-trans="name">\r
            </label>\r
            <input type="text" required id="gear_name" name="name">\r
          </fieldset>\r
          <fieldset>\r
            <label required for="gear_lastname" data-trans="lastname">\r
            </label>\r
            <input type="text" required id="gear_lastname" name="lastname">\r
          </fieldset>\r
          <fieldset>\r
            <label required for="gear_email" data-trans="email">\r
            </label>\r
            <input type="email" required id="gear_email" name="email">\r
          </fieldset>\r
          <fieldset>\r
            <label for="geat_tel" data-trans="phone">\r
\r
            </label>\r
            <input type="tel" id="gear_tel" name="tel">\r
          </fieldset>\r
          <fieldset class="col-span-2">\r
            <label for="gear_address" data-trans="address" required>\r
            </label>\r
            <input type="text" id="gear_address" name="address" required>\r
          </fieldset>\r
          <fieldset>\r
            <label for="gear_postal_code" data-trans="postal_code" required>\r
\r
            </label>\r
            <input type="text" id="gear_postal_code" name="postal_code" required>\r
          </fieldset>\r
          <fieldset>\r
            <label for="gear_city" data-trans="city" required>\r
\r
            </label>\r
            <input type="text" id="gear_city" name="city" required>\r
          </fieldset>\r
\r
          <textarea name="message" id="gear_message" cols="30" rows="10" class="col-span-2 p-2" placeholder="message"\r
            required></textarea>\r
          <button class="btn col-span-2" data-trans="send"></button>\r
        </form>\r
      </div>\r
    </div>\r
  </dialog>\r
\r
</template>`,moneyModal=`<template id="moneyModal">\r
\r
  <dialog id="modal_money" class="dialog">\r
    <span _="on load call app.helpers.loadMoneyModal()"></span>\r
    <div class="flex justify-end">\r
      <button _="on click call #modal_money.close()" class="cross-btn">X</button>\r
    </div>\r
    <div class="relative h-full">\r
      <div class="absolute inset-0 overflow-y-auto p-2">\r
        <header class="max-w-lg mx-auto">\r
          <h2 class="text-center " data-trans="money_modal_title">sdcs</h2>\r
          <div class="text-center italic text-sm" data-trans="money_modal_desc">sdfcs</div>\r
        </header>\r
        <form id="money_donation_form"\r
          class="flex flex-col gap-3 sm:grid sm:grid-cols-2 p-3 max-w-lg mx-auto overflow-y-auto"\r
          _="on submit halt the event">\r
\r
          <div class="col-span-2 grid grid-cols-2 gap-2 items-center justify-center" id="money_don_amount">\r
            <label class="col-span-2" data-trans="donation_amount" required></label>\r
            <fieldset>\r
              <input type="radio" id="amount_10" name="amount" value="10" class="hidden">\r
              <label for="amount_10" class="grade">10 €</label>\r
            </fieldset>\r
            <fieldset>\r
              <input type="radio" id="amount_20" name="amount" value="20" class="hidden" checked>\r
              <label for="amount_20" class="grade">20 €</label>\r
            </fieldset>\r
            <fieldset>\r
              <input type="radio" id="amount_50" name="amount" value="50" class="hidden">\r
              <label for="amount_50" class="grade">50 €</label>\r
            </fieldset>\r
            <fieldset>\r
              <input type="radio" id="amount_100" name="amount" value="100" class="hidden">\r
              <label for="amount_100" class="grade">100 €</label>\r
            </fieldset>\r
            <fieldset>\r
              <input type="radio" id="amount_200" name="amount" value="200" class="hidden">\r
              <label for="amount_200" class="grade">200 €</label>\r
            </fieldset>\r
            <fieldset>\r
              <input type="radio" id="amount_500" name="amount" value="500" class="hidden">\r
              <label for="amount_500" class="grade">500 €</label>\r
            </fieldset>\r
            <fieldset class="col-span-2">\r
              <label for="money_custom_amount" data-trans="custom_amount"></label>\r
              <input type="number" id="money_custom_amount" name="custom_amount" _="\r
                on change \r
                js\r
                document.querySelectorAll(\`input[name='amount']\`)?.forEach(radio => radio.checked = false)\r
                end\r
                end\r
                ">\r
            </fieldset>\r
          </div>\r
          <div id="paypal-buttons" class="flex col-span-2 mt-4">\r
\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </dialog>\r
\r
</template>`,accordion=`<template id="accordion">\r
  <section class="rounded border-2 border-sl-primary flex flex-col w-full ">\r
    <header _="on click toggle the *display of the next <div/> then toggle .rotate-180 on first <arrow/> in me end"\r
      class="grid grid-cols-[auto_1fr_auto] gap-2 cursor-pointer py-1 px-2 justify-between bg-sl-primary">\r
      <arrow class="pb-2">\r
\r
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512" class="fill-white">\r
          <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->\r
          <path d="M0 336L160 480 320 336V288H0v48z" />\r
        </svg>\r
      </arrow>\r
      <h2 class="uppercase text-white" data-type="title"></h2>\r
    </header>\r
\r
    <div class="flex flex-col gap-[1px] bg-white text-sm p-3" data-type="content" style="display: none;"></div>\r
  </section>\r
</template>`,toastSuccess=`<template id="toastSuccess">\r
  <div class="rounded-md bg-green-600 text-white font-FjallaOne p-2">\r
    <header class="flex justify-end">\r
      <div class="text-lg cursor-pointer" data-type='close'>X</div>\r
    </header>\r
    <div data-type="content"></div>\r
  </div>\r
</template>`,toastError=`<template id="toastError">\r
  <div class="rounded-md bg-sl-status-error font-FjallaOne p-2 text-white">\r
    <header class="flex justify-end">\r
      <div class="text-lg cursor-pointer" data-type='close'>X</div>\r
    </header>\r
    <div data-type="content"></div>\r
  </div>\r
</template>`,templates={gearModal,moneyModal,accordion,toastSuccess,toastError,trashcan,pen};function injectTemplate(name2){const el=document.createElement("div");if(!templates[name2])throw new Error(`Template ${name2} not found`);el.innerHTML=templates[name2];const template2=el.querySelector(`#${name2}`).content,componentInstance=document.importNode(template2,!0),container=document.createElement("div");return container.appendChild(componentInstance),container.innerHTML}__name(injectTemplate,"injectTemplate");const ROUTE_PREFIX="",BASE_URL=window.location.origin;function txtElementToHTML(txtElement){return new DOMParser().parseFromString(txtElement,"text/html").body.firstChild}__name(txtElementToHTML,"txtElementToHTML");function template(templateId){const htmlString=injectTemplate(templateId);return txtElementToHTML(htmlString)}__name(template,"template");function toast(msg,type2){const toast2=template(`toast${type2.charAt(0).toUpperCase()}${type2.slice(1)}`),content2=toast2.querySelector("[data-type='content']");toast2.querySelector("[data-type='close']").addEventListener("click",()=>{toast2.remove()}),content2.setAttribute("data-trans",msg),document.querySelector("#toast-container").appendChild(toast2),translate(),setTimeout(()=>{toast2.remove()},6e3)}__name(toast,"toast");async function submitGear(form){const data=new FormData(form),modal=document.querySelector("#modal_gear");try{const res=await fetch(BASE_URL+"/gear_submit",{method:"POST",body:data});if(modal.close(),!res.ok)return toast("gear_submit_error","error");window.location.replace("/thanks-gear")}catch{return modal.close(),toast("gear_submit_error","error")}}__name(submitGear,"submitGear");function injectFaq(){const container=document.createElement("div");return["money_support","tax_deduction","donation_receipt","transaction_security"].forEach(question=>{const el=template("accordion"),title=el.querySelector("[data-type='title']"),content2=el.querySelector("[data-type='content']");title.setAttribute("data-trans",`faq_${question}_title`),content2.setAttribute("data-trans",`faq_${question}_content`),container.appendChild(el)}),container.innerHTML}__name(injectFaq,"injectFaq");async function submitMoney(user,donation){try{return await(await fetch(BASE_URL+"/money_submit",{method:"POST",body:JSON.stringify({user,donation})})).json()}catch{return toast("money_submit_error","error")}}__name(submitMoney,"submitMoney");/*!
 * paypal-js v7.1.1 (2023-11-27T14:12:58.587Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function findScript(url,attributes){var currentScript=document.querySelector('script[src="'.concat(url,'"]'));if(currentScript===null)return null;var nextScript=createScriptElement(url,attributes),currentScriptClone=currentScript.cloneNode();if(delete currentScriptClone.dataset.uidAuto,Object.keys(currentScriptClone.dataset).length!==Object.keys(nextScript.dataset).length)return null;var isExactMatch=!0;return Object.keys(currentScriptClone.dataset).forEach(function(key2){currentScriptClone.dataset[key2]!==nextScript.dataset[key2]&&(isExactMatch=!1)}),isExactMatch?currentScript:null}__name(findScript,"findScript");function insertScriptElement(_a){var url=_a.url,attributes=_a.attributes,onSuccess=_a.onSuccess,onError=_a.onError,newScript=createScriptElement(url,attributes);newScript.onerror=onError,newScript.onload=onSuccess,document.head.insertBefore(newScript,document.head.firstElementChild)}__name(insertScriptElement,"insertScriptElement");function processOptions(options){var sdkBaseUrl="https://www.paypal.com/sdk/js";options.sdkBaseUrl&&(sdkBaseUrl=options.sdkBaseUrl,delete options.sdkBaseUrl);var optionsWithStringIndex=options,_a=Object.keys(optionsWithStringIndex).filter(function(key2){return typeof optionsWithStringIndex[key2]<"u"&&optionsWithStringIndex[key2]!==null&&optionsWithStringIndex[key2]!==""}).reduce(function(accumulator,key2){var value=optionsWithStringIndex[key2].toString();return key2=camelCaseToKebabCase(key2),key2.substring(0,4)==="data"||key2==="crossorigin"?accumulator.attributes[key2]=value:accumulator.queryParams[key2]=value,accumulator},{queryParams:{},attributes:{}}),queryParams=_a.queryParams,attributes=_a.attributes;return queryParams["merchant-id"]&&queryParams["merchant-id"].indexOf(",")!==-1&&(attributes["data-merchant-id"]=queryParams["merchant-id"],queryParams["merchant-id"]="*"),{url:"".concat(sdkBaseUrl,"?").concat(objectToQueryString(queryParams)),attributes}}__name(processOptions,"processOptions");function camelCaseToKebabCase(str){var replacer=__name(function(match,indexOfMatch){return(indexOfMatch?"-":"")+match.toLowerCase()},"replacer");return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g,replacer)}__name(camelCaseToKebabCase,"camelCaseToKebabCase");function objectToQueryString(params){var queryString="";return Object.keys(params).forEach(function(key2){queryString.length!==0&&(queryString+="&"),queryString+=key2+"="+params[key2]}),queryString}__name(objectToQueryString,"objectToQueryString");function createScriptElement(url,attributes){attributes===void 0&&(attributes={});var newScript=document.createElement("script");return newScript.src=url,Object.keys(attributes).forEach(function(key2){newScript.setAttribute(key2,attributes[key2]),key2==="data-csp-nonce"&&newScript.setAttribute("nonce",attributes["data-csp-nonce"])}),newScript}__name(createScriptElement,"createScriptElement");function loadScript(options,PromisePonyfill){if(PromisePonyfill===void 0&&(PromisePonyfill=Promise),validateArguments(options,PromisePonyfill),typeof document>"u")return PromisePonyfill.resolve(null);var _a=processOptions(options),url=_a.url,attributes=_a.attributes,namespace=attributes["data-namespace"]||"paypal",existingWindowNamespace=getPayPalWindowNamespace(namespace);return findScript(url,attributes)&&existingWindowNamespace?PromisePonyfill.resolve(existingWindowNamespace):loadCustomScript({url,attributes},PromisePonyfill).then(function(){var newWindowNamespace=getPayPalWindowNamespace(namespace);if(newWindowNamespace)return newWindowNamespace;throw new Error("The window.".concat(namespace," global variable is not available."))})}__name(loadScript,"loadScript");function loadCustomScript(options,PromisePonyfill){PromisePonyfill===void 0&&(PromisePonyfill=Promise),validateArguments(options,PromisePonyfill);var url=options.url,attributes=options.attributes;if(typeof url!="string"||url.length===0)throw new Error("Invalid url.");if(typeof attributes<"u"&&typeof attributes!="object")throw new Error("Expected attributes to be an object.");return new PromisePonyfill(function(resolve,reject){if(typeof document>"u")return resolve();insertScriptElement({url,attributes,onSuccess:function(){return resolve()},onError:function(){var defaultError=new Error('The script "'.concat(url,'" failed to load. Check the HTTP status code and response body in DevTools to learn more.'));return reject(defaultError)}})})}__name(loadCustomScript,"loadCustomScript");function getPayPalWindowNamespace(namespace){return window[namespace]}__name(getPayPalWindowNamespace,"getPayPalWindowNamespace");function validateArguments(options,PromisePonyfill){if(typeof options!="object"||options===null)throw new Error("Expected an options object.");if(typeof PromisePonyfill<"u"&&typeof PromisePonyfill!="function")throw new Error("Expected PromisePonyfill to be a function.")}__name(validateArguments,"validateArguments");function cleanEmail(email){return email.split("").reduce((acc,char)=>char==="@"?acc+"___at___":char==="."?acc+"___dot___":acc+char,"")}__name(cleanEmail,"cleanEmail");function uncleanEmail(email){return email.split("___at___").join("@").split("___dot___").join(".")}__name(uncleanEmail,"uncleanEmail");async function loadMoneyModal(){const modal=document.querySelector("#modal_money");document.querySelectorAll("input[name='amount']").forEach(input=>{input.addEventListener("click",e=>document.querySelector("input[name='custom_amount']").value="")}),(await loadScript({"client-id":"AbJAC6LdN2IxTXbOj09TUPlCYNu90m0Vspzng8VWylFphzNrgtblsyTEr7s43q9c6jR8m8-VFAm9DB1I",intent:"capture",commit:"false",vault:"true",locale:"fr_FR",currency:"EUR","merchant-id":["WW4EE7Q9HNUGQ"]})).Buttons({style:{color:"blue",shape:"rect"},createOrder(_data,actions){const form=document.querySelector("#money_donation_form"),formData=new FormData(form),amountRange=formData.get("amount"),amountStr=formData.get("custom_amount")||amountRange,amount=Number(amountStr);return!amount||amount===0?(modal.close(),toast("Veuillez choisir un montant","error")):actions.order.create({purchase_units:[{amount:{value:amount}}]})},async onApprove(_data,actions){const details=await actions.order.capture(),{payer,id:transactionId,create_time,purchase_units}=details,{email_address:email,name:{given_name:name2,surname:lastname}}=payer,{amount:{value,currency_code},shipping:{address:addr}}=purchase_units[0],{postal_code,address_line_1:address,country_code,admin_area_2:city}=addr,user={name:name2,lastname,email,address,postal_code,city,country_code},donation={amount:value,currency_code,transactionId,create_time};try{const{link,fileId}=await submitMoney(user,donation),linkEl=document.createElement("a");linkEl.href=link,linkEl.target="_blank",linkEl.rel="noopener noreferrer",document.body.appendChild(linkEl),modal.close(),linkEl.click(),document.body.removeChild(linkEl),window.location.replace(`/thanks/${fileId}/${cleanEmail(email)}`)}catch(err){console.log(err)}},onError:err=>(modal.close(),toast(err,"error"))}).render("#paypal-buttons")}__name(loadMoneyModal,"loadMoneyModal");const home=__name(()=>createPage(content$2,getLang,saveLang,translate,injectTemplate,submitGear,injectFaq,submitMoney,loadMoneyModal),"home"),content$1=`<div class="grid grid-rows-[auto_1fr] gap-3 bg-sl-bg h-[100dvh]">\r
  <header class="bg-sl-white text-white p-2 flex items-center gap-2 justify-between">\r
    <a href="https://mo5.com">\r
\r
      <img src="/public/logo.webp" alt="logo MO5">\r
    </a>\r
    <div _="\r
      on load call app.helpers.getLang() \r
      then set $lang to result \r
      toggle @disabled on #{$lang}\r
      end\r
      ">\r
      <button class="bg-sl-primary text-white rounded-sm px-3 py-2 disabled:opacity-50" id="fr"\r
        _="on click call app.helpers.saveLang(@id) then toggle @disabled on me toggle @disabled on #en end">FR</button>\r
      <button class="bg-sl-primary text-white rounded-sm px-3 py-2 disabled:opacity-50" id="en"\r
        _="on click call app.helpers.saveLang(@id) then toggle @disabled on me toggle @disabled on #fr end">ENG</button>\r
    </div>\r
  </header>\r
\r
  <main class="flex flex-col gap-4 p-10 mb-3 relative h-full">\r
    <div class="absolute inset-0 overflow-y-auto p-6">\r
      <div class="flex flex-col text-xl gap-3 justify-center items-center text-sl-primary">\r
\r
        <h1 class="text-3xl uppercase text-black" data-trans="thanks_title"></h1>\r
\r
        <div class=" text-black text-center " data-trans="contact_soon"></div>\r
        <a rel="noopener noreferer" target="_blank" id="file link" class="btn"\r
          _="on load call app.helpers.getDownloadLink() then set @href to result" data-trans="dl_link_tax"></a>\r
        <a href="https://mo5.com" data-trans="back_to_mo5"></a>\r
        <a href="/" data-trans="back_to_donation"></a>\r
\r
      </div>\r
    </div>\r
  </main>\r
\r
</div>\r
\r
<span _="\r
  -- inject templates in the DOM, translate the page to the end, after the injection\r
  on load \r
  call app.helpers.translate()\r
  " class="fixed">\r
</span>`;function getDownloadLink(){const{params}=parseRoute(),{email,id}=params;return`${BASE_URL}/cerfa/${id}/${uncleanEmail(email)}`}__name(getDownloadLink,"getDownloadLink");const thanks=__name(()=>createPage(content$1,getLang,saveLang,translate,injectTemplate,getDownloadLink),"thanks"),content=`<div class="grid grid-rows-[auto_1fr] gap-3 bg-sl-bg h-[100dvh]">\r
  <header class="bg-sl-white text-white p-2 flex items-center gap-2 justify-between">\r
    <a href="https://mo5.com">\r
\r
      <img src="/public/logo.webp" alt="logo MO5">\r
    </a>\r
    <div _="\r
      on load call app.helpers.getLang() \r
      then set $lang to result \r
      toggle @disabled on #{$lang}\r
      end\r
      ">\r
      <button class="bg-sl-primary text-white rounded-sm px-3 py-2 disabled:opacity-50" id="fr"\r
        _="on click call app.helpers.saveLang(@id) then toggle @disabled on me toggle @disabled on #en end">FR</button>\r
      <button class="bg-sl-primary text-white rounded-sm px-3 py-2 disabled:opacity-50" id="en"\r
        _="on click call app.helpers.saveLang(@id) then toggle @disabled on me toggle @disabled on #fr end">ENG</button>\r
    </div>\r
  </header>\r
\r
  <main class="flex flex-col gap-4 p-10 mb-3 relative h-full">\r
    <div class="absolute inset-0 overflow-y-auto p-6">\r
      <div class="flex flex-col text-xl gap-3 justify-center items-center text-sl-primary">\r
\r
        <h1 class="text-3xl uppercase text-black" data-trans="thanks_title"></h1>\r
        <div class=" text-black text-center " data-trans="contact_soon"></div>\r
        <a href="https://mo5.com" data-trans="back_to_mo5"></a>\r
        <a href="/" data-trans="back_to_donation"></a>\r
\r
      </div>\r
    </div>\r
  </main>\r
\r
</div>\r
\r
<span _="\r
  -- inject templates in the DOM, translate the page to the end, after the injection\r
  on load \r
  call app.helpers.translate()\r
  " class="fixed">\r
</span>`,thanksGear=__name(()=>createPage(content,translate,getLang),"thanksGear"),pages={home,"thanks-gear":thanksGear,"thanks/:id/:email":thanks};function parseRoute(href){const route=href||window.location.hash.replace(ROUTE_PREFIX,"")||window.location.pathname,routeParts=route.split("/").splice(1),routeKeys=Object.keys(pages),params={},template2=routeKeys.reduce((acc,route2)=>{const parts=route2.split("/");return parts.length!==routeParts.length||parts.forEach((part,i)=>{part.startsWith(":")?params[part.substring(1)]=routeParts[i]:part===routeParts[i]&&(acc=route2)}),acc},"home");return{params,template:template2,route}}__name(parseRoute,"parseRoute");function router(e,href){e&&e.preventDefault(),loadHyperscript(()=>{const{template:template2}=parseRoute(href),page=pages[template2],app=document.querySelector("#app"),pageObj=page();if(!pageObj)return app.innerHTML="404";const{content:content2,helpers}=pageObj;app.helpers=helpers,app.innerHTML=content2})}__name(router,"router");function init(){router(),window.addEventListener("popstate",router)}__name(init,"init");const name="front-don",version="0.0.3",type="module",scripts={dev:"vite",build:"vite build --mode production",preview:"vite preview"},devDependencies={postcss:"^8.4.29",tailwindcss:"^3.3.3"},dependencies={"@paypal/paypal-js":"^7.1.1",autoprefixer:"^10.4.16",vite:"^4.4.9"},pkg={name,private:!0,version,type,scripts,devDependencies,dependencies};"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").then(registration=>{console.log("ServiceWorker registration successful with scope: ",registration.scope)},err=>{console.log("ServiceWorker registration failed: ",err)})});console.log("WW4EE7Q9HNUGQ");console.log("VERSION:",pkg==null?void 0:pkg.version);document.addEventListener("DOMContentLoaded",init);
