import { all } from 'redux-saga/effects'

import {
  watchRegistration,
  watchLogin,
  watchLogout,
  watchResetPassword,
  watchCompanyCreate,
  watchCompanyUpdate,
  watchDesignerProfileUpdate,
  watchInviteToCompany,
  watchChangeUserRoleRequest,
  watchChangeUserStatusRequest,
  watchDeleteUser,
} from './user/saga'

import {
  watchRemoveCategory,
  watchEditCategory,
  watchCreateCategory,
  watchSearchCategory,
  watchGetAllCategories,
} from './category/saga'

import {
  watchUploadModel,
  watchUploadImage,
  watchUploadTexture,
  watchCreateProduct,
  watchEditProduct,
  watchRemoveProduct,
  watchProductPagination,
} from './product/saga'

import {
  watchPlanCharge
} from './plan/saga'

export default function* rootSaga(){
  yield all([
    // user
    watchRegistration(),
    watchLogin(),
    watchLogout(),
    watchResetPassword(),
    watchCompanyCreate(),
    watchCompanyUpdate(),
    watchDesignerProfileUpdate(),
    watchInviteToCompany(),
    watchChangeUserRoleRequest(),
    watchChangeUserStatusRequest(),
    watchDeleteUser(),

    // category
    watchRemoveCategory(),
    watchEditCategory(),
    watchCreateCategory(),
    watchSearchCategory(),
    watchGetAllCategories(),

    // product
    watchUploadModel(),
    watchUploadImage(),
    watchUploadTexture(),
    watchCreateProduct(),
    watchEditProduct(),
    watchRemoveProduct(),
    watchProductPagination(),

    // plan
    watchPlanCharge(),
  ])
}
