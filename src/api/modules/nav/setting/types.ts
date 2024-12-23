export namespace NavWebsiteSetting{
  export interface ResWebsiteSetting {
    id: string
    title?: string
    logo?: string
    favicon?: string
    keywords?: string
    description?: string
    recordNumber?: string
    headScript?: string
    bodyScript?: string
    footerScript?: string

  }
  export interface ReqUpdateSettingForm {
    title?: string
    logo?: string
    favicon?: string
    keywords?: string
    description?: string
    recordNumber?: string
    headScript?: string
    bodyScript?: string
    footerScript?: string

  }
}
