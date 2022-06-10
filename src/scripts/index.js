import Card from './Card.js'
import FormValidator from './Formvalidation.js';

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

const popupProfile = document.querySelector('#popupProfile');
const popupProfileOpenButton = document.querySelector('#popOpenProfile');
const popupProfileCloseButton = document.querySelector('#closeButtonProfile');
const profileName = document.querySelector('#profileName');
const profileProfession = document.querySelector('#profileProfession');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const formPopupProfile = document.querySelector('#popupContainerProfile');
const cardPopup = document.querySelector('#popupElements');
const cardPopupOpenButton = document.querySelector('#popOpenElements');
const cardPopupCloseButton = document.querySelector('#closeButtonElement');
const formCardPopup = document.querySelector('#popupContainerElements');
const popupPhoto = document.querySelector('#popupPhoto');
const photoPopupButtonClose = document.querySelector('#photoPopupButtonClose');
const elements = document.querySelector('.elements');
const inputTitleValue = document.querySelector('#title-input');
const inputImageValue = document.querySelector('#link-input');
const popupFormProfile = document.querySelector('#popupProfile');
const popupFormCard = document.querySelector('#popupElements');
const popupProfileValid = popupFormProfile.querySelector('.popup__container')
const popupCardValid = popupFormCard.querySelector('.popup__container');

const ESC_CODE = 'Escape';
const ENTER_CODE = 'Enter';

const formValidators = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactively',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
}

const validatorProfile = new FormValidator(formValidators, popupProfileValid)
validatorProfile.enableValidation()


const validatorCard = new FormValidator(formValidators, popupCardValid)
validatorCard.enableValidation()


function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    openPopup(popupProfile)
}


function openPopup(popup) {
    document.addEventListener('keydown', closeByEsc)
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEsc)
    popup.classList.remove('popup_opened')
}

function submitProfileForm(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    validatorProfile.disableButton()
    closePopup(popupProfile);
    // Вставьте новые значения с помощью textContent
}

function handleCardFormSubmit(evt) {
    evt.preventDefault()
    addNewElement(inputTitleValue.value, inputImageValue.value);
    evt.target.reset()
    validatorCard.disableButton()
    closePopup(cardPopup);
}


function createCard(name, link) {
    // тут создаете карточку и возвращаете ее
    const card = new Card(name, link, ".template", openPopup)
    const cardElement = card.generateCard();
    return cardElement
}

function render() {
    initialCards.forEach((step) => addNewElement(step.name, step.link));
}

function addNewElement(name, link) {
    const newObj = createCard(name, link)
    elements.prepend(newObj);
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    }
}

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup))
photoPopupButtonClose.addEventListener('click', () => closePopup(popupPhoto));
formPopupProfile.addEventListener('submit', submitProfileForm);
formCardPopup.addEventListener('submit', handleCardFormSubmit);
popupProfile.addEventListener('mousedown', closeByOverlayClick)
cardPopup.addEventListener('mousedown', closeByOverlayClick)
popupPhoto.addEventListener('mousedown', closeByOverlayClick)
cardPopupOpenButton.addEventListener('click', () => openPopup(cardPopup))
popupProfileOpenButton.addEventListener('click', () => openProfilePopup())

render()