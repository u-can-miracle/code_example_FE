export interface IConvertingMessage {
  id?: number
  error?: string
  warning?: string
  modelId?: number
}

export interface IModel extends IAsset {
  convertingMessage: IConvertingMessage
}

export interface IAsset {
  location: string
  mimetype: string
  originalname: string
  key: string
}

export interface IProduct {
  id: number
  name: string
  description: string
  categoryId: number
  height: number
  width: number
  depth: number
  userId: number
  companyId: number
  isActive: boolean
  images: IAsset[]
  model: IModel
  textures: IAsset[]
}
