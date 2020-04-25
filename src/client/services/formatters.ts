import { IAsset } from '../interfaces/product'
import { IFile } from '../components/ProductForm'

export function convertAssetToAntFile(asset: IAsset){
  return {
    uid: asset.key,
    url: asset.location,
    type: asset.mimetype,
    name: asset.originalname,
  }
}

export function convertAntFileToAsset(asset: IFile){
  return {
    key: asset.uid,
    location: asset.url,
    mimetype: asset.type,
    originalname: asset.name,
  }
}

export function assetToFile(asset: IAsset): IFile{
  return {
    uid: asset.key,
    name: asset.originalname,
    status: 'done',
    url: asset.location,
    size: 0,
    type: asset.mimetype,
  }
}
