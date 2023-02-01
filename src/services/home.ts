import {
  BannerItem,
  CategoryItem,
  GuessItem,
  GetHomeGoodsGuessLikeData,
  HotItem,
  NewItem,
  RecommendData,
  RecommendResult
} from '@/types/home';
import { PageResult } from '@/types/global';
import { http } from '@/utils/http';

/**
 * 首页-广告区域
 * @param distributionSite 说明：广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export function getHomeBanner(distributionSite = 1) {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite: distributionSite
    }
  });
}

/**
 * 首页-类别区域
 * @param
 */
export function getHomeCategoryHeadMutli() {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli'
  });
}

/**
 * 首页-人气推荐
 * @param
 */
export function getHomeMutli() {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli'
  });
}

/**
 * 首页-新鲜好物
 * @param
 */
export function getHomeNewList() {
  return http<NewItem[]>({
    method: 'GET',
    url: '/home/new'
  });
}

/**
 * 首页-猜你喜欢
 * @param
 */
export function getGuessLike(data: GetHomeGoodsGuessLikeData) {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data
  });
}

export function getHomeRecommend(url: string, data: RecommendData) {
  return http<RecommendResult>({
    method: 'GET',
    url: url,
    data
  });
}
