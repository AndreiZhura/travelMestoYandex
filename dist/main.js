(()=>{"use strict";const e=document.querySelector(".popup__img"),t=document.querySelector(".popup__text"),n=document.querySelector("#popupPhoto");class o{_name;_link;_openPopup;_cardElement;constructor(e,t,n,o){this._name=e,this._link=t,this._openPopup=o,this._cardElement=n}_getTemplateElement(){return document.querySelector(this._cardElement).content.querySelector(".element").cloneNode(!0)}generateCard(){return this._element=this._getTemplateElement(),this._element.querySelector(".element__title").textContent=this._name,this._elementRectangle=this._element.querySelector(".element__rectangle"),this._elementRectangle.src=this._link,this._elementRectangle.alt=this._name,this._elementLike=this._element.querySelector(".element__like"),this._elementBascet=this._element.querySelector(".element__basket"),this._setEventListeners(),this._element}_setEventListeners(){this._elementBascet.addEventListener("click",this._handleDelete),this._elementLike.addEventListener("click",this._toggleLike),this._elementRectangle.addEventListener("click",this._handleImageClick)}_handleDelete=()=>{this._element.remove()};_toggleLike=()=>{this._elementLike.classList.toggle("element__like_active_black")};_handleImageClick=()=>{t.textContent=this._name,e.src=this._link,e.alt=this._name,this._openPopup(n)}}class s{_inputSelector;_submitButtonSelector;_inactiveButtonClass;_inputErrorClass;_errorClass;_formElement;_inputList;_buttonElement;constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}_showError(e,t){const n=this._formElement.querySelector(`.${e.id}-error`);e.classList.add(this._inputErrorClass),n.classList.add(this._errorClass),n.textContent=t}_hideError(e){const t=this._formElement.querySelector(`.${e.id}-error`);e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}_checkInputValidity(e){e.validity.valid?this._hideError(e):this._showError(e,e.validationMessage)}_hasInvalidInput(e){return e.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput(this._inputList)?this.disableButton():(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1)}_setIventListeners(){this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}disableButton(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0}enableValidation(){this._setIventListeners()}}const r=document.querySelector("#popupProfile"),i=document.querySelector("#popOpenProfile"),l=document.querySelector("#closeButtonProfile"),u=document.querySelector("#profileName"),c=document.querySelector("#profileProfession"),a=document.querySelector("#name-input"),p=document.querySelector("#job-input"),d=document.querySelector("#popupContainerProfile"),_=document.querySelector("#popupElements"),m=document.querySelector("#popOpenElements"),h=document.querySelector("#closeButtonElement"),v=document.querySelector("#popupContainerElements"),y=document.querySelector("#popupPhoto"),E=document.querySelector("#photoPopupButtonClose"),S=document.querySelector(".elements"),k=document.querySelector("#title-input"),L=document.querySelector("#link-input"),g=document.querySelector("#popupProfile"),q=document.querySelector("#popupElements"),f=g.querySelector(".popup__container"),C=q.querySelector(".popup__container"),b={inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_inactively",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_active"},B=new s(b,f);B.enableValidation();const x=new s(b,C);function P(e){document.addEventListener("keydown",V),e.classList.add("popup_opened")}function w(e){document.removeEventListener("keydown",V),e.classList.remove("popup_opened")}function I(e,t){const n=function(e,t){return new o(e,t,".template",P).generateCard()}(e,t);S.prepend(n)}function j(e){e.target.classList.contains("popup")&&w(e.target)}function V(e){"Escape"===e.key&&w(document.querySelector(".popup_opened"))}x.enableValidation(),l.addEventListener("click",(()=>w(r))),h.addEventListener("click",(()=>w(_))),E.addEventListener("click",(()=>w(y))),d.addEventListener("submit",(function(e){e.preventDefault(),u.textContent=a.value,c.textContent=p.value,B.disableButton(),w(r)})),v.addEventListener("submit",(function(e){e.preventDefault(),I(k.value,L.value),e.target.reset(),x.disableButton(),w(_)})),r.addEventListener("mousedown",j),_.addEventListener("mousedown",j),y.addEventListener("mousedown",j),m.addEventListener("click",(()=>P(_))),i.addEventListener("click",(()=>(a.value=u.textContent,p.value=c.textContent,void P(r)))),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((e=>I(e.name,e.link)))})();