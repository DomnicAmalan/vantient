export type RootState = ReturnType<typeof store.getState>

interface IAddWebsiteSlice {
  urladdloading: boolean,
  urladdresult: any | null,
  urladderror: string | null,
  websitelist: Array<any> | null,
  websitelistloading: boolean,
  websitelisterror: string | null,
  websitepage: number,
  websitelimit: number,
  websitestotal: number
}