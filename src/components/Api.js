export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    /*1. Загрузка информации о пользователе с сервера
    Информация о пользователе должна подгружаться с сервера.
     Чтобы осуществить это, сделайте GET-запрос на URL (cohortId замените на идентификатор вашей группы):*/
    downLoadingUserInformationFromServer() {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._getResponseData)

    }

    /*2. Загрузка карточек с сервера
Начальные карточки должны подгружаться с сервера. Для этого сделайте GET-запрос: */

    downloadingCardsFromServer() {
            return fetch(`${this._url}/cards`, {
                    method: 'GET',
                    headers: this._headers
                })
                .then(this._getResponseData)
        }
        /* 3. Редактирование профиля
        Отредактированные данные профиля должны сохраняться на сервере. Для этого отправьте запрос методом PATCH:*/

    editingProfile(form) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: form['nameProfile'],
                    about: form['professionProfile']
                })
            })
            .then(this._getResponseData)
    }

    /* 4. Добавление новой карточки
    Чтобы добавить на сервер новую карточку, отправьте POST-запрос:*/
    addNewCard(form) {
            return fetch(`${this._url}/cards`, {
                    method: 'POST',
                    headers: this._headers,
                    body: JSON.stringify({
                        name: form['name'],
                        link: form['link']
                    })
                })
                .then(this._getResponseData)
        }
        /*5. Отображение количества лайков карточки
        У каждой карточки есть свойство likes — оно содержит массив пользователей, лайкнувших карточку: */

    /*6. Попап удаления карточки
    Удаление чего-то, как правило, безвозвратно. 
    Поэтому перед этим действием стоит спросить пользователя, уверен ли он, что хочет удалить карточку. 
    Для этого сделайте новый попап. Он должен открываться по клику на иконку удаления: */
    /*7. Удаление карточки
    Прежде чем браться за работу с API, исправьте элемент карточки. 
    Сделайте так, чтобы иконка удаления была только на созданных вами карточках, так как удалять чужие карточки нельзя. */
    popupDeleteCard(cardId) {
            return fetch(`${this._url}/cards/${cardId}`, {
                    method: 'DELETE',
                    headers: this._headers,
                })
                .then(this._getResponseData)
        }
        /*8. Постановка и снятие лайка
Чтобы лайкнуть карточку, отправьте PUT-запрос: */
    puttingLike(id) {
        return fetch(`${this._url}/cards/${id}/likes `, {
                method: 'PUT',
                headers: this._headers,

            })
            .then(this._getResponseData)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes `, {
                method: 'DELETE',
                headers: this._headers,

            })
            .then(this._getResponseData)
    }

    /*9. Обновление аватара пользователя
    Чтобы сменить аватар, отправьте такой PATCH-запрос:*/
    updateUseravatar(linkAvatar) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: linkAvatar['avatar-link']

                })

            })
            .then(this._getResponseData)
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}