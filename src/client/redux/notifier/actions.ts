import getTranslationById from '../../services/getTranslationById'

export const NOTIFIER_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  LOADING: 'loading',
}

export const ENABLE_NOTIFIER = 'ENABLE_NOTIFIER'
export const enableNotifier = (type, content, duration = 5) => ({
  type: ENABLE_NOTIFIER,
  payload: {
    type,
    content,
    duration
  }
})

export const DISABLE_NOTIFIER = 'DISABLE_NOTIFIER'
export const disableNotifier = () => ({
  type: DISABLE_NOTIFIER
})

export const showError = (reason: string, duration?: number) => ({
  type: ENABLE_NOTIFIER,
  payload: {
    type: NOTIFIER_TYPES.ERROR,
    content: reason,
    duration,
  }
})

export const showWarning = (reason: string, duration?: number) => ({
  type: ENABLE_NOTIFIER,
  payload: {
    type: NOTIFIER_TYPES.WARNING,
    content: reason,
    duration,
  }
})

export const showNotification = (reason: string, duration?: number) => ({
  type: ENABLE_NOTIFIER,
  payload: {
    type: NOTIFIER_TYPES.SUCCESS,
    content: reason,
    duration,
  }
})

export const showLoading = (duration?: number) => ({
  type: ENABLE_NOTIFIER,
  payload: {
    type: NOTIFIER_TYPES.LOADING,
    content: getTranslationById('loading'),
    duration,
  }
})
