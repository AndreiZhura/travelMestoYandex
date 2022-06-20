import Card from "./Card.js";
import Popup from "./Popup.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from './UserInfo.js'
import FormValidator from './FormValidator.js'
import '../pages/index.css'


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// константы ***************************************************************************************************************
// секция попапа профиля
const popupProfile = document.querySelector('.popupProfile');
// кнопка открытия попапа профиля
const popupProfileOpenButton = document.querySelector('#popOpenProfile');
//кнопка закрытия попапа профиля
const popupProfileCloseButton = document.querySelector('#closeButtonProfile');
// экспортируем иконку закрытия попапа
export const popupClose = document.querySelector('.popup__button')
    // имя профиля
const profileName = document.querySelector('#profileName');
//профессия профиля
const profileProfession = document.querySelector('#profileProfession');
// ввод имени профиля
const nameInput = document.querySelector('#name-input');
// профессия имени профиля
const jobInput = document.querySelector('#job-input');
// контайнер попапа профиля
const formPopupProfile = document.querySelector('#popupContainerProfile');
// попап создания карточки
const cardPopup = document.querySelector('.popupElements');
// кнопка открытия попапа карточки
const cardPopupOpenButton = document.querySelector('#popOpenElements');
//кнопка закрытия попапа карточки
const cardPopupCloseButton = document.querySelector('#closeButtonElement');
// форма контэйнера попапа карточки
const formCardPopup = document.querySelector('#popupContainerElements');
// попап с  картинкой и текстом
const popupPhoto = document.querySelector('.popupPhoto');
// кнопка его закрития
const photoPopupButtonClose = document.querySelector('#photoPopupButtonClose');
// div вставки карточки
const elements = document.querySelector('.elements');
// значение первого поля карточки попапа 
export const inputTitleValue = document.querySelector('#title-input');
export const inputImageValue = document.querySelector('#link-input');

const popupFormProfile = document.querySelector('.popupProfile');
const popupFormCard = document.querySelector('.popupElements');
// валидация
const popupProfileValid = popupFormProfile.querySelector('.popup__container')
const popupCardValid = popupFormCard.querySelector('.popup__container');

export const popupImg = document.querySelector('.popup__img')
export const popupTitle = document.querySelector('.popup__text')

export const ESC_CODE = 'Escape';
const ENTER_CODE = 'Enter';

const formValidators = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactively',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
}

const userInfo = new UserInfo({
    profileName: ".profile__name",
    profileProfession: ".profile__profession",
})
const userNameAndProfession = userInfo.getUserInfo()




//создаем карточку**************************************************************************************************************************
const popupWithImage = new PopupWithImage('.popupPhoto')

const createCard = (data) => {
    const newCard = new Card({
        data: data,
        handleCardClick: (name, link) => {

            popupWithImage.open(name, link)
        }
    }, '.template')
    return newCard.generateCard()
}

// отрисовываем карточку****************************************************************************************************************
const section = new Section({
    items: initialCards,
    renderer: (item) => {
        section.addItem(createCard(item))
    }

}, '.elements')
section.rendererValue()



// сами попапы **********************************************************************************************************************



const popupWithFormClassProfile = new PopupWithForm({
    selectorPopup: '.popupProfile',

    submitForm: (form) => {
        userInfo.setUserInfo(form)
        profileName.value =
            popupWithFormClassProfile.close()
        validatorProfile.disableButton()
    }
})
popupWithFormClassProfile.setEventListeners()

const popupWithFormClassCard = new PopupWithForm({
    selectorPopup: '.popupElements',

    submitForm: (item) => {
        section.addItem(createCard(item))
        popupWithFormClassCard.close()
        validatorCard.disableButton()
    }
})

popupWithFormClassCard.setEventListeners()


// класс UserInfo******************************************************************************************************************

//Функционал кнопок открытия попапа************************************************************************************************

popupProfileOpenButton.addEventListener('click', () => {

    nameInput.value = userNameAndProfession.name
    jobInput.value = userNameAndProfession.profession
    popupWithFormClassProfile.open()
})

cardPopupOpenButton.addEventListener('click', () => {
    popupWithFormClassCard.open()
})

const validatorProfile = new FormValidator(formValidators, popupProfileValid)
validatorProfile.enableValidation()


const validatorCard = new FormValidator(formValidators, popupCardValid)
validatorCard.enableValidation()