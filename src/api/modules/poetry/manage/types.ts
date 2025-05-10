import type { ReqPage } from '@/api/types'
import type { PoetryAuthor } from '../author/types'
import type { PoetryCollection } from '../collection/types'
import type { PoetryRhythmic } from '../rhythmic/types'

export namespace PoetryInfo{

  export interface ReqQuery extends ReqPage {
    title?: string
    authorId?: string
    dynastyId?: string
    rhythmicId?: string
    collectionId?: string
  }

  /**
   * 诗词信息
   */
  export interface ResPoetryInfo {
    /**
     * 诗词ID
     */
    id: string
    /**
     * 诗词标题
     */
    title: string
    /**
     * 诗人/作者
     */
    author: PoetryAuthor.ResAuthor
    /**
     * 词牌，
     */
    rhythmic?: PoetryRhythmic.ResRhythmic
    /**
     * 收录
     */
    collection?: PoetryCollection.ResCollection
    /**
     * 内容
     */
    paragraphs: string[]
    /**
     * 正文
     */
    paragraph: string
    /**
     * 笔记
     */
    notes?: string[]
    /**
     * 笔记
     */
    node?: string
    /**
     * 译文
     */
    summares?: string[]
    /**
     * 译文
     */
    summary?: string
    /**
     * 鉴赏
     */
    appreciations?: string[]
    /**
     * 鉴赏
     */
    appreciation?: string
    /**
     * 创建时间
     */
    created: string
    /**
     * 创建人
     */
    createdBy: string
  }

  /**
   * 创建/更新诗词
   */
  export interface ReqCreate {
    /**
     * 诗词标题
     */
    title: string
    /**
     * 诗人/作者ID
     */
    authorId: string
    /**
     * 词牌ID
     */
    rhythmicId?: string
    /**
     * 收录ID
     */
    collectionId?: string
    /**
     * 正文
     */
    paragraph: string
    /**
     * 笔记
     */
    node?: string

    /**
     * 译文
     */
    summary?: string

    /**
     * 诗词鉴赏
     */
    appreciation?: string
  }
}
