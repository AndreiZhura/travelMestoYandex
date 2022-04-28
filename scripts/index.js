const popupProfile = document.querySelector('#popupProfile');
const popupProfileOpenButton = document.querySelector('#popOpenProfile');
const popupProfileCloseButton = document.querySelector('#closeButtonProfile');
const profileName = document.querySelector('#profileName');
const profileProfession = document.querySelector('#profileProfession');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const formPopupProfile = document.querySelector('#popupContainerProfile');
const popupElement = document.querySelector('#popupElements');
const popupElementOpenButton = document.querySelector('#popOpenElements');
const popupElementCloseButton = document.querySelector('#closeButtonElement');
const formPopupElement = document.querySelector('#popupContainerElements');
const popupElementsButtonSave = document.querySelector('#popupElementsButtonSave');
const popupProfileButtonSave = document.querySelector('#popupProfileButtonSave');
const popupPhoto = document.querySelector('#popupPhoto');
const photoPopupButtonClose = document.querySelector('#photoPopupButtonClose');
const template = document.querySelector('.template');
const elements = document.querySelector('.elements');
const photoPopupImage = document.querySelector('.popup__img');
const photopopupTitle = document.querySelector('.popup__text');
const inputTitleValue = document.querySelector('#title-input');
const inputImage = document.querySelector('#link-input');





function addPopupValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    openPopup(popupProfile)
}

function openPopup(open) {
    open.classList.add('popup_opened');
}

function closePopup(close) {
    close.classList.remove('popup_open')
}

function submitFormHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    closePopup(popupProfile);
    // Вставьте новые значения с помощью textContent
}

function addImageAndTitle(evt) {
    evt.preventDefault();
    inputTitleValue.value
    inputImage.value
    addNewElement(inputTitleValue.value, inputImage.value);
    closePopup(popupElement);
}

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


function render() {
    initialCards.forEach(step => addNewElement(step.name, step.link));
}

function addNewElement(name, link) {
    const newObj = createElement(name, link);

    elements.prepend(newObj);
}

function createElement(name, link) {
    const elementTemplate = template.content.querySelector('.element').cloneNode(true);
    const elementTitle = elementTemplate.querySelector('.element__title').textContent = name;
    const elementLink = elementTemplate.querySelector('.element__rectangle').src = link;

    const elementLike = elementTemplate.querySelector('.element__like');
    const elementBascet = elementTemplate.querySelector('.element__basket');
    const elementRectangle = elementTemplate.querySelector('.element__rectangle');

    elementBascet.addEventListener('click', removeElement);
    elementLike.addEventListener('click', likeClick);
    elementRectangle.addEventListener('click', () => lookingElement(name, link));

    return elementTemplate;
}

function lookingElement(name, link) {
    photoPopupImage.src = link;
    photopopupTitle.textContent = name;
    openPopup(popupPhoto)
}

function likeClick(like) {
    like.target.classList.toggle('element__like_active_black');
}

function removeElement(bascet) {
    const element = bascet.target.closest('.element');
    element.remove();
}


render();


document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        if (popupProfile) {
            closePopup(popupProfile)
        }
    }
})

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        if (popupElement) {
            closePopup(popupElement)
        }
    }
})

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Enter') {
        if (popupElement) {
            closePopup(popupElement)
        }
    }
})


popupProfileOpenButton.addEventListener('click', addPopupValue);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupElementOpenButton.addEventListener('click', () => openPopup(popupElement));
popupElementCloseButton.addEventListener('click', () => closePopup(popupElement))
photoPopupButtonClose.addEventListener('click', () => closePopup(popupPhoto));
formPopupProfile.addEventListener('submit', submitFormHandler);
formPopupElement.addEventListener('submit', addImageAndTitle);
popupProfile.addEventListener('click', function(evt) {
    closePopup(evt.target)
})
popupElement.addEventListener('click', function(evt) {
    closePopup(evt.target)
})



const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage
    errorElement.classList.add(enableValidation.errorClass)
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(enableValidation.inputErrorClass)
    errorElement.textContent = '';
    errorElement.classList.remove(enableValidation.errorClass)
}

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

function setEventListeners(formElement) {
    let inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector))
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
    toggleButton(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            isValid(formElement, inputElement)
            toggleButton(inputList, buttonElement)
        })
    })
}



function enableValidationList() {
    let formList =
        Array.from(document.querySelectorAll(enableValidation.formSelector))
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })


        setEventListeners(formElement)
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

const toggleButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidation.inactiveButtonClass);
        buttonElement.disabled = true
    } else {
        buttonElement.classList.remove(enableValidation.inactiveButtonClass)
        buttonElement.disabled = false
    }
}



enableValidationList();