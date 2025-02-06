import type { ISetterMap } from '../types/widgetMap'

import activeColorEditor from './ActiveColorEditor.vue'
import aidedTextColorEditor from './AidedTextColorEditor.vue'
import backgroundColorEditor from './BackgroundColorEditor.vue'
import borderColorEditor from './BorderColorEditor.vue'
import borderRadiusEditor from './BorderRadiusEditor.vue'
import borderStyleEditor from './BorderStyleEditor.vue'
import borderWidthEditor from './BorderWidthEditor.vue'
import borderWidthPropsEditor from './BorderWidthPropsEditor.vue'
import avatarUploadEditor from './dataSetters/AvatarUploadEditor.vue'
import dateRangeEditor from './dataSetters/DateRangeEditor.vue'
import dayEditor from './dataSetters/DayEditor.vue'
import imgUrlUploadEditor from './dataSetters/ImgUrlUploadEditor.vue'
import liListEditor from './dataSetters/LiListEditor.vue'
import monthEditor from './dataSetters/MonthEditor.vue'
import monthRangeEditor from './dataSetters/MonthRangeEditor.vue'
import rateValueEditor from './dataSetters/RateValueEditor.vue'
import textEditEditor from './dataSetters/TextEditEditor.vue'
import yearEditor from './dataSetters/YearEditor.vue'
import fontColorEditor from './FontColorEditor.vue'
import fontFamilyEditor from './FontFamilyEditor.vue'
import fontSizeEditor from './FontSizeEditor.vue'
import fontWeightEditor from './FontWeightEditor.vue'
import heightEditor from './HeightEditor.vue'

import iconColorEditor from './IconColorEditor.vue'
import iconEditror from './IconEditor.vue'
import iconSizeEditor from './IconSizeEditor.vue'
import leftEditorVue from './LeftEditor.vue'
import letterSpaceEditor from './LetterSpaceEditor.vue'
import lineHeightEditor from './LineHeightEditor.vue'
import markerColorEditor from './MarkerColorEditor.vue'
import markerPositionEditor from './MarkerPositionEditor.vue'
import markerSizeEditor from './MarkerSizeEditor.vue'
import paddingEditor from './PaddingEditor.vue'

import rateHeightEditor from './RateHeightEditor.vue'
import rateSizeEditor from './RateSizeEditor.vue'
import rotateEditor from './RotateEditor.vue'
import showTextEditor from './ShowTextEditor.vue'
import sizeEditor from './SizeEditor.vue'
import textAlignEditor from './TextAlignEditor.vue'
import topEditor from './TopEditor.vue'
import voidColorEditor from './VoidColorEditor.vue'
import widthEditor from './WidthEditor.vue'
import zIndexEditor from './ZIndexEditor.vue'

// 属性设置组件对应关系
export const SETTERS_MAP: ISetterMap = {
  activeColor: activeColorEditor,
  aidedTextColor: aidedTextColorEditor,
  backgroundColor: backgroundColorEditor,
  zIndex: zIndexEditor,
  width: widthEditor,
  height: heightEditor,
  fontSize: fontSizeEditor,
  fontFamily: fontFamilyEditor,
  fontWeight: fontWeightEditor,
  fontColor: fontColorEditor,
  left: leftEditorVue,
  top: topEditor,
  rotate: rotateEditor,
  padding: paddingEditor,
  borderRadius: borderRadiusEditor,
  borderWidth: borderWidthEditor,
  borderColor: borderColorEditor,
  borderStyle: borderStyleEditor,
  borderWidthProps: borderWidthPropsEditor,
  lineHeight: lineHeightEditor,
  textAlign: textAlignEditor,
  iconColor: iconColorEditor,
  iconSize: iconSizeEditor,
  markerSize: markerSizeEditor,
  markerColor: markerColorEditor,
  markerPosition: markerPositionEditor,
  size: sizeEditor,
  rateSize: rateSizeEditor,
  voidColor: voidColorEditor,
  showText: showTextEditor,
  rateHeight: rateHeightEditor,
  icon: iconEditror,
  letterSpace: letterSpaceEditor,
}

// 数据设置组件对应关系
export const DATA_SETTERS_MAP: ISetterMap = {
  avatarSrc: avatarUploadEditor,
  text: textEditEditor,
  liList: liListEditor,
  rateValue: rateValueEditor,
  year: yearEditor,
  month: monthEditor,
  day: dayEditor,
  monthRange: monthRangeEditor,
  dateRange: dateRangeEditor,
  imgUrl: imgUrlUploadEditor,
}
