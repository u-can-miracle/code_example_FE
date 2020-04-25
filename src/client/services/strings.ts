import engTranslation from '../../translations/en'

const {
  largeAsset, setScale, compensate,
  writingHash,
} = engTranslation

const WARNING = {
  // 1
  LARGE_ASSET: largeAsset,
  SET_SCALE: setScale,
  COMPENSATE: compensate,
  // 2
}

interface ILargeAsset {
  type: string,
  size: string,
  scale: string
}

type paramsTypes = ILargeAsset

export function mapTranslateWarning(str: string): paramsTypes {
  if (str.startsWith(WARNING.LARGE_ASSET)) {
    const { SET_SCALE, COMPENSATE } = WARNING
    // size
    const openBracket = str.indexOf('(')
    const closeBracket = str.indexOf(')')
    const sizeStr = str.slice(openBracket, closeBracket + 1)

    // scale
    const startScalePos = str.indexOf(SET_SCALE) + SET_SCALE.length
    const endScalePos = str.indexOf(COMPENSATE)
    const scaleStr = str.slice(startScalePos, endScalePos)

    return {
      type: WARNING.LARGE_ASSET,
      size: sizeStr,
      scale: scaleStr
    }
  }

  throw Error(`no such matching for "${str}"`)
}

const ERROR = {
  // 1
  WRITING_HASH: writingHash,
}
export function mapTranslateError(str: string) {
  if (str.startsWith(ERROR.WRITING_HASH)) {
    // error path
    const startPathIndex = str.indexOf('\'')
    const endPathIndex = str.indexOf('\'', startPathIndex + 1)
    const errPath = str.slice(startPathIndex, endPathIndex + 1)

    return {
      type: ERROR.WRITING_HASH,
      errPath,
    }
  }

  throw Error(`no such matching for "${str}"`)
}
