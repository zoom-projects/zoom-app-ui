import * as htmlToImage from 'html-to-image'
import jsPDF from 'jspdf'
import { useLegoJsonStoreHook } from '../store/lego'

export async function exportLego(el: HTMLElement, type: string) {
  if (type === 'pdf') {
    exportLegoPdf(el)
  }
  else if (type === 'img') {
    exportLegoPNG(el)
  }
}

// 生成pdf方法
export async function exportLegoPdf(el: HTMLElement) {
  const { HJSchemaJsonStore } = useLegoJsonStoreHook()
  const fileName = HJSchemaJsonStore.config.title
  htmlToImage.toCanvas(el)
    .then((canvas) => {
      // document.body.appendChild(canvas);
      const contentWidth = canvas.width
      const contentHeight = canvas.height

      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = contentWidth / 592.28 * 841.89
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight
      // 页面偏移
      let position = 0
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = 595.28
      const imgHeight = 592.28 / contentWidth * contentHeight

      const pageData = canvas.toDataURL('image/jpeg', 1.0)

      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('', 'pt', 'a4')

      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        console.log(imgWidth, imgHeight, 'imgWidth, imgHeight')
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      }
      else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
      pdf.save(`${fileName}.pdf`)
    })
}

// 生成PNG方法
export async function exportLegoPNG(el: HTMLElement) {
  const { HJSchemaJsonStore } = useLegoJsonStoreHook()
  const fileName = HJSchemaJsonStore.config.title
  htmlToImage.toPng(el)
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = dataUrl
      link.click()
    })
}
