import {
  CONTACT_EMAIL,
  PLANES_NAMES,
} from './constants'
import { DAYS_TO_EXPIRE_NOTIFY } from '../client/constants'

const translationRu = {
  // common
  required: 'Поле обязательно',
  userNameLengthErr: 'Имя должно быть белее не менее 2-х символов',
  emailPlaceholder: 'Эл. почта',
  emailInvalid: 'Неверный формат ел. почты',
  passwordPlaceholder: 'Пароль',
  passwordConfirmPlaceholder: 'Повторите пароль',
  passwordErrLength: 'Пароль должен быть более 4-х символов',
  passwordErrEqual: 'Пароли дложны совпадать',
  companyNamePlaceholder: 'Название компании',
  compNameLengthError: 'Имя компании должно быть более 1 символа',
  countryWrongError: 'Пожалуйста, введите корректное название страны',
  cityWrongError: 'Пожалуйста, введите корректное название города',
  register: 'регистрация',
  regCompany: 'Создать компанию',
  countryPlaceholder: 'Страна компании',
  cityPlaceholder: 'Город компании',
  requestError: 'Ошибка во время запроса',
  loading: 'Загрузка ...',
  noPermission: 'У Вас не достаточно прав доступа',
  cancelText: 'Cancel',
  okText: 'Ok',
  from: 'с',
  to: 'по',

  // delete common
  deletePreText: 'Вы действительно хотите удалить',
  category: 'категорию',
  product: 'продукт',
  user: 'пользователя',

  brand: 'Appearance',
  homeTitle: 'Просмотрите 3D модели с',
  homeStartBtn: 'Создать модель',
  notFound: 'Страница не найдена',

  // registration
  regSubmit: 'Регистрация',
  regPlaceholderName: 'Ваше имя',
  regPlaceholderConfirm: 'Подтвердить пароль',
  regCongirmMessage: 'Мы отправили Вам письмо, пожалуйста, подтвердите указанную эл. почту',
  regErrEmailExists: 'Этот емейл уже зарегистрирован',
  regHaveAccount: 'Уже есть аккаунт? Пожалуйста,',
  regToLogin: 'авторизируйтесь',

  // login
  loginSubmit: 'Вход',
  loginSuccess: 'Вы успешно вошли в систему!',
  loginNoAccount: 'Нет аккаунта? Пожалуйста, перейдите к',
  loginRegister: 'регистрации',
  loginForgotPwd: 'Забыли пароль?',
  loginError: 'Емейл или пароль несовпадают. Пожалуйста, введите другое значение',
  loginErrorVerify: 'Эл. адрес не подтвержден, пожалуйста подтвердите регистрационное письмо на Вашей почте',
  youAreDisabled: 'Ваш аккаунт отключен, пожалуйста свяжитесь с Вашим администратором',

  // confirm
  confirmStart: 'Создать 3D модель',
  confirmCongrats: 'Вы успешно зарегистрировались! Теперь Вы можете начать создание 3D моделей!',

  // reset-password
  resetPwd: 'Обновить пароль',
  resetPwdPlaceholderNewPwd: 'Новый пароль',
  resetPwdPlaceholderRepeatNewPwd: 'Повторите новый пароль',
  resetPwdConfirm: 'Мы отправили письмо на указанную почту, пожалуйста перейдите на почту и подтвердите смену пароля',
  resetPwdErrorEmail: 'Этот емейл не найден. Это правильный адрес эл. почты? ',
  resetPwdCongrats: 'Вы успешно сменили пароль',

  // logout
  logout: 'Выйти',

  // categories
  categories: 'Категории',
  categoriesEmpty: 'Список категорий пуст',
  categoryName: 'Имя категории',
  categoryPriority: 'Приоритет',
  categoryParent: 'Родительская категория',
  categoryErrPriorityNegative: 'Приоритет должен быть положителен',
  categoryCreate: 'Создать категорию',
  categoryNotifyRemove: 'Категория была удалена',
  categoryUpdateBtn: 'Обновить',
  categoryUpdateTitle: 'Редактировать категорию',
  categoryUpdated: 'Категория была обновлена',
  categoryAbsent: 'Такой категории нет',
  categoryCreateBtn: 'Создать',
  categoryCreatTitle: 'Создать категорию',
  categorySelectParentCategory: 'Родительская категория',
  categoryCreated: 'Категория была создана успешно',
  categoryAlreadyExist: 'Категория с таким названием уже существует',

  // products
  products: 'Продукты',
  selectCategory: 'Выберите категорию что бы увидеть находящиеся в ней продукты, либо перейдите на вкладку "Продукты"',
  productsEmptyForCategoryStart: 'Категория ',
  productsEmptyForCategoryEnd: ' не содержит продуктов',
  productsSearchTitleProduct: 'Поиск по имени продукта',
  productsSearchTitleCategory: 'Поиск в содержании родительской категории',
  productsEmpty: 'Список продуктов пуст',
  productSearch: 'Поиск продуктов',
  productCreateTitle: 'Создать новый продукт',
  productCreateBtn: 'Создать',
  productName: 'Название продукта',
  productDescription: 'Описание продукта',
  productModelBtn: 'Загрузка 3D модели',
  productModelUploaded: 'Модель успешно загружена',
  productModelUploadErr: 'Ошибка во время загрузки модели',
  productModelVerificationTitle: 'Модель не загружена',
  productModelVerificationContent: 'Пожалуйста, загрузите модель прежде чем загружать текстуры',
  productImageLabel: 'Загрузка изображений продукта',
  productImageUploaded: 'Изображение успешно загружено',
  productTextureUploaded: 'Текстура успешно загружена',
  productImageUploadErr: 'Ошибка во время загрузки изображения',
  productTextureUploadLabel: 'Загрузка текстур модели',
  productCreateSuccess: 'Продукт создан',
  productEditTitle: 'Редактирование продукта',
  productTextureAlertTitle: 'Важно',
  productTextureAlertDescription: `
		Если модель содержит текстуры, так же загрузите эти текстуры.
		Прежде чем применять эти текстуры, они должны быть расположены в одной папке с моделью.
		\n1 - сперва сохраните модель в выбранную папку,
		\n2 - после, переместите изображение с текстурой в эту папку,
		\n3 - примените эту текстуру к медели.
		\n
		Это необходимо что бы мы могли отобразить текстуры на модели
		во время просмотра, иначе - модель будет без текстур.
		Если Вам нужна помощь, пожалуйста, свяжитесь с нами: ${CONTACT_EMAIL}`,
  productEditBtn: 'Применить изменения',
  productUpdateSuccess: 'Продукт обновлен',
  productRemoveSuccess: 'Продукт был успешно удален',
  productSizeError: 'Значение должно быть больше чем 0',
  productHeight: 'Высота продукта',
  productWidth: 'Ширина продукта',
  productDepth: 'Глубина продукта',

  // profile
  profileNav: 'Профайл',
  myProfile: 'Мой профайл',
  companyInfo: 'Компания',
  companyMembers: 'Сотрудники компании',
  profilePhoneErrLength: 'Номер телефона не должен превышать 25 символов',
  profilePhoneErrLetters: 'Номер телефона не должен содержать буквы',
  profilePhonePlaceholder: 'Тел. номер',
  phoneNotNumbericErr: 'Номер телефона должен содержать только код страцы и цифры',
  companyNotCreated: 'У Вас пока еще нет компании',
  companyCreate: 'Создать компанию',
  companyCreated: 'Компания успешно создана',
  companyAddress: 'Адрес компании',
  phonePlaceholder: 'Телефон',
  rolePlaceholder: 'Роль',
  namePlaceholder: 'Имя',
  companyUpdate: 'Обновить данные компании',
  profileUpdate: 'Обновить мой профайл',
  profileUpdated: 'Профайл обновлен',
  inviteMemberText: 'Пригласить в компанию',
  invitationWasSent: 'Приглашение было отправлено',
  ADMIN: 'Администратор',
  MANAGER: 'Менеджер',
  MEMBER: 'Дизайнер',
  userUpdated: 'Пользователь обновлен',
  companyUpdated: 'Компания обновлена',
  deleteUser: 'Вы уверены что хотите удалить пользователя?',
  userDeleted: 'Пользователь был удален',

    // status
  status: 'Статус',
  statusActive: 'Активный',
  statusDisabled: 'Отключен',

  // upload
  uploadUploading: 'Загрузка',
  uploadRemoveFile: 'Удалить файл',
  uploadError: 'Ошибка во время загрузки',
  uploadPreviewFile: 'Просмотреть',

  // convertation messages
  successfullyConverted: 'Модель успешно сконветрирована',
  // warning
  largeAsset: 'Файл модели очень большой ',
  setScale: ' Масштаб изменен до: ',
  compensate: '',
  // error
  writingHash: 'Ошибка при обработке ',
  failedFind: ': Не найден файл ',
  onDisk: ' на диске',

  // Plans
  plans: 'Тарифы',
  planPersonalTitle: `Если Вы работаете самостоятельно,
    воспользуйтесь тарифом "${PLANES_NAMES.PERSONAL}"`,
  planPersonalDevices: 'Только 1 устройство',
  planPriceInMonth: `$/месяц`,
  planCompanyTitle: `Если Вам необходимо сотрудничать вместе и
    сделать продукты доступными для всех -
    выберите тариф "${PLANES_NAMES.COMPANY}"
  `,
  planGetPlan: 'Выбрать',
  planSubmitPlanPayout: 'Оплатить',
  planCardDetails: 'Карта',
  price: 'Цена',
  monthAmount: 'Кол-во месяцев',
  month: 'Месяц',
  total: 'Сумма',
  planPersonalDeviceText: '1 устройство',
  planManyDevicesText: 'устройств',
  planUnlimit: `Неограничено`,
  planPayment: 'Оплата плана',
  planExpired: 'Необходимо оплатить тариф',
  planExpDesStart: 'Тариф не выбран, либо период его использования исчерпан. Пожалуйста',
  planDesEnd: 'выберите необходимый Вам тариф.',
  planExpSoonTitle: `Период действия плана будет окончен через ${DAYS_TO_EXPIRE_NOTIFY} дней.`,
  planExpSoonDesStart: `Что бы модели были доступны на мобильных устройствах, пожалуйста`,
  planUsagePeriod: 'Период использования плана',
  planName: 'План',
  planCurrentText: 'Текущий план',
  planCurrentTitle: 'Время действия плана',
}

export default translationRu
