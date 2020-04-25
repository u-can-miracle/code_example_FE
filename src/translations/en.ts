import {
  CONTACT_EMAIL,
  PLANES_NAMES,
} from './constants'
import { DAYS_TO_EXPIRE_NOTIFY } from '../client/constants'

const translationEn = {
  // common
  required: 'Required',
  userNameLengthErr: 'Username should be atleast 2 symbols',
  emailPlaceholder: 'Email',
  emailInvalid: 'Invalid email address',
  passwordPlaceholder: 'Password',
  passwordConfirmPlaceholder: 'Repeat password',
  passwordErrLength: 'Password should be more than 4 symbols',
  passwordErrEqual: 'Passwords should be equal',
  companyNamePlaceholder: 'Company name',
  compNameLengthError: 'Company name should be more than 1 symbols',
  countryWrongError: 'Please, enter correct country name',
  cityWrongError: 'Please, enter correct city name',
  register: 'registration',
  regCompany: 'Create company',
  countryPlaceholder: 'Company country',
  cityPlaceholder: 'Company city',
  requestError: 'Error while request',
  loading: 'Loading ...',
  noPermission: 'You have no permission',
  cancelText: 'Cancel',
  okText: 'Ok',
  from: 'From',
  to: 'To',

  // delete common
  deletePreText: 'Are you sure that you want to delete',
  category: 'category',
  product: 'product',
  user: 'user',

  brand: 'Appearance',
  homeTitle: 'Preview your 3D models with',
  homeStartBtn: 'Start creating models',
  notFound: 'Not Found',

  // registration
  regSubmit: 'Registration',
  regPlaceholderName: 'Your name',
  regPlaceholderConfirm: 'Confirm password',
  regCongirmMessage: 'We sent letterto your email, please, confirm your email address',
  regErrEmailExists: 'This email is already registered',
  regHaveAccount: 'Already have account? Just go to',
  regToLogin: 'login',

  // login
  loginSubmit: 'Login',
  loginSuccess: 'You have successful logged!',
  loginNoAccount: 'Have no account yet? Just go to',
  loginRegister: 'registration',
  loginForgotPwd: 'Forgot password?',
  loginError: 'Email or password is incorrect. Please try another one',
  loginErrorVerify: 'Email is not verified yet, please visit your email address and verify registration email',
  youAreDisabled: 'Your account is disabled, please contact your administrator',

  // confirm
  confirmStart: 'Start creating 3D models',
  confirmCongrats: 'Congratulations! You have successfully registered! Now you can create 3D models!',

  // reset-password
  resetPwd: 'Reset password',
  resetPwdPlaceholderNewPwd: 'New password',
  resetPwdPlaceholderRepeatNewPwd: 'Repeat new password',
  resetPwdConfirm: 'We have sent confirmation on chousen email, please visit your email and confirm password changing',
  resetPwdErrorEmail: 'Is this email your\'s? It doesn\'t not exist in application',
  resetPwdCongrats: 'You have successfuly changed your password',

  // logout
  logout: 'Logout',

  // categories
  categories: 'Categories',
  categoriesEmpty: 'There are no categories yet',
  categoryName: 'Category name',
  categoryPriority: 'Category priority',
  categoryParent: 'Parent category',
  categoryErrPriorityNegative: 'Priority should be positive number',
  categoryCreate: 'Create category',
  categoryNotifyRemove: 'Category was removed',
  categoryUpdateBtn: 'Update',
  categoryUpdateTitle: 'Edit category',
  categoryUpdated: 'Category was updated',
  categoryAbsent: 'No such category',
  categoryCreateBtn: 'Create',
  categoryCreatTitle: 'Create new category',
  categorySelectParentCategory: 'Select parent category',
  categoryCreated: 'Category was created successfully',
  categoryAlreadyExist: 'Category with such name already exist',

  // products
  products: 'Products',
  selectCategory: 'Please, select category to see it\'s products or click on "Products" tab',
  productsEmptyForCategoryStart: 'There are no products for category ',
  productsEmptyForCategoryEnd: '',
  productsSearchTitleProduct: 'Search by product name',
  productsSearchTitleCategory: 'Search inside parent category',
  productsEmpty: 'There are no products yet',
  productSearch: 'Search product',
  productCreateTitle: 'Create new product',
  productCreateBtn: 'Create',
  productName: 'Product name',
  productDescription: 'Product description',
  productModelBtn: 'Upload 3D model',
  productModelUploaded: 'Model uploaded successfully',
  productModelUploadErr: 'Error while uploading model',
  productModelVerificationTitle: 'Model is not uploaded',
  productModelVerificationContent: 'Please, upload model then you will be able to upload textures',
  productImageLabel: 'Upload product\'s images',
  productImageUploaded: 'Image uploaded successfully',
  productTextureUploaded: 'Texture uploaded successfully',
  productTextureUploadLabel: 'Upload model\'s textures',
  productTextureAlertTitle: 'Important',
  productTextureAlertDescription: `
		If you have model with textures you need to upload them.
		These textures should be in same directory with model before you will apply them.
		1 - at first? save model to folder, 2 - then, put image with texture to this folder,
		3 - apply this texture to model.
		In another case we will not be able to apply this texture to your model
		If you need some help, please contact us: ${CONTACT_EMAIL}`,
  productImageUploadErr: 'Error while uploading image',
  productCreateSuccess: 'Product was created successfully',
  productEditTitle: 'Update product',
  productEditBtn: 'Apply changes',
  productUpdateSuccess: 'Product was updated successfully',
  productRemoveSuccess: 'Product was removed successfully',
  productSizeError: 'Value should be more than 0',
  productHeight: 'Product height',
  productWidth: 'Product width',
  productDepth: 'Product depth',

  // profile
  profileNav: 'Profile',
  myProfile: 'My profile',
  companyInfo: 'Company info',
  companyMembers: 'Company members',
  profilePhoneErrLength: 'Phone number should not bigger that 25 synbols',
  profilePhoneErrLetters: 'Phone number should not contain letters',
  profilePhonePlaceholder: 'Phone',
  phoneNotNumbericErr: 'Phone should contain only country code and numbers',
  companyNotCreated: 'You have no company yet',
  companyCreate: 'Create company',
  companyCreated: 'Company was created successfuly',
  companyAddress: 'Company address',
  phonePlaceholder: 'Phone',
  namePlaceholder: 'Name',
  rolePlaceholder: 'Role',
  companyUpdate: 'Update company',
  profileUpdate: 'Update my profile',
  profileUpdated: 'Profile updated',
  inviteMemberText: 'Invite to company',
  invitationWasSent: 'Invitation was sent',
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  MEMBER: 'Member',
  userUpdated: 'User was updated',
  companyUpdated: 'Company was updated',
  deleteUser: 'Are you sure that you want to delete user?',
  userDeleted: 'User was deleted',

  // status
  status: 'Status',
  statusActive: 'Active',
  statusDisabled: 'Disabled',

  // upload
  uploadUploading: 'Uploading',
  uploadRemoveFile: 'Remove file',
  uploadError: 'Error while uploading',
  uploadPreviewFile: 'Preview file',

  // convertation messages
  successfullyConverted: 'Model was successfully converted',
  // warning
  largeAsset: 'Imported asset was very large ',
  setScale: ' Setting scale to: ',
  compensate: ' to compensate',
  // error
  writingHash: 'Writing hashes for ',
  failedFind: ': Failed to find ',
  onDisk: ' on disk',

  // Plans
  plans: 'Plans',
  planPersonalTitle: `If you work alone just pick plan ${PLANES_NAMES.PERSONAL}`,
  planPersonalDevices: 'Only 1 device',
  planPriceInMonth: `$/month`,
  planCompanyTitle: `
    If you want collaborate together and share products between designers
    choose plan "${PLANES_NAMES.COMPANY}"
  `,
  planGetPlan: 'Get it',
  planSubmitPlanPayout: 'Pay',
  planCardDetails: 'Card details',
  price: 'Price',
  monthAmount: 'Month amount',
  month: 'Month',
  total: 'Total',
  planPersonalDeviceText: 'Only 1 device',
  planManyDevicesText: 'devices',
  planUnlimit: `Unlimit`,
  planPayment: 'Payment for plan',
  planExpired: 'Plan is expired.',
  planExpDesStart: 'Usage plan is not choosen or it\'s time period of using is ended. Please,',
  planDesEnd: 'choose plan.',
  planExpSoonTitle: `Time period of using plan will be expired in ${DAYS_TO_EXPIRE_NOTIFY} days.`,
  planExpSoonDesStart: 'To allow access to model from mobile devices, please',
  planUsagePeriod: 'Plan usage period',
  planName: 'Plan name',
  planCurrentText: 'Current plan',
  planCurrentTitle: 'Active time',
}

export default translationEn
