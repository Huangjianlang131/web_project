/**
 * 获取字符串宽度
 * @param {*} str
 */
export const textSize = (fontSize, fontFamily, text) => {
  var span = document.createElement('span')
  var result = {}
  result.width = span.offsetWidth
  result.height = span.offsetHeight
  span.style.visibility = 'hidden'
  span.style.fontSize = fontSize
  span.style.fontFamily = fontFamily
  span.style.display = 'inline-block'
  document.body.appendChild(span)
  if (typeof span.textContent !== 'undefined') {
    span.textContent = text
  } else {
    span.innerText = text
  }
  result.width = parseFloat(window.getComputedStyle(span).width) - result.width
  result.height = parseFloat(window.getComputedStyle(span).height) - result.height
  return result
}
/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}
/**
 * 获取页面可视区高度
 */
export const getPageHeight = () => {
  return window.innerHeight || document.documentElement.innerHeight || document.body.innerHeight
}
/**
 * 获取页面可视区高度
 */
export const getPageWidth = () => {
  return window.innerWidth || document.documentElement.innerWidth || document.body.innerWidth
}

/**
 * 求数组差集
 */
export const subSet = function (arr1, arr2) {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  const subset = []
  for (const item of set1) {
    if (!set2.has(item)) {
      subset.push(item)
    }
  }
  return subset
}

/**
 * 数字加，
 */
export const formatNumber = function (n) {
  var b = parseInt(n).toString()
  var len = b.length
  if (len <= 3) { return b }
  var r = len % 3
  return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
}

/**
 * 时间格式化
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
export const dateFormat = function (date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

/**
 * 根据文件名和文件内容创建下载
 * @param {文件名} fileName
 * @param {文件内容} content
 */
export function createDownload (fileName, content) {
  // const type = isBinary ? 'application/octet-stream' : ''
  const blob = new Blob([content])
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * 对类别进行排序
 */
export function catalogOrderBy (catalogs) {
  if (catalogs) {
    catalogs.sort((a, b) => {
      return (a.order || 0) - (b.order || 0)
    })
    for (const catalog of catalogs) {
      catalogOrderBy(catalog.children)
    }
  }
}
/**
 * message自定义关闭方法
 */
export function error (info) {
  const hide = this.$message.error({
    content: h => {
      return (
      <span>{info}<a-icon type="close" style="margin: 0 5px;;cursor: pointer;" size="small" onClick={ () => setTimeout(hide, 0) }></a-icon></span>
      )
    },
    duration: 0
  })
}

/**
 * 
 * 日期格式化显示
 * 
 */
export function DateToStr(date) {
  var year = date.getFullYear();//年
  var month = date.getMonth();//月
  var day = date.getDate();//日
  var hours = date.getHours();//时
  var min = date.getMinutes();//分
  var second = date.getSeconds();//秒
  return year + "-" +
      ((month + 1) > 9 ? (month + 1) : "0" + (month + 1)) + "-" +
      (day > 9 ? day : ("0" + day)) + " " +
      (hours > 9 ? hours : ("0" + hours)) + ":" +
      (min > 9 ? min : ("0" + min)) + ":" +
      (second > 9 ? second : ("0" + second));
}

/**
 * 
 * 产生固定长度随机字符
 * 
 */
 export const createRandomPassword = (size) =>{
  var seed = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'm',
    'n',
    'p',
    'Q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '@',
    '#',
    '.',
    '&'
  ] // 密码源数组
  var n = ''
  var t
  for (var i = 0; i < size; i++) {
    t = Math.round(Math.random() * (seed.length - 1))
    n += seed[t]
  }
  return n
}


/**
 * 将解析ANSI 字符得出的JSON数组，输出成 HTML
 */
export function createHtml(ansiList, wrap = "") {
    let html = "";
    for (let i = 0; i < ansiList.length; i++) {
        const htmlFrame = ansiList[i];

        const { background = "", text, foreground = "" } = htmlFrame;
        if (background && foreground) {
            if (text.includes("\n")) {
                html += wrap;
                continue;
            }
            html += `<div style= "color:${foreground}" bg-${background}">${text}</div>`;
            continue;
        }
        if (background || foreground) {
            const color = background ? `bg-${background}` : foreground;
            let textColor = `<div style="color:${color}">${text}</div>`;
            textColor = textColor.replace(/\n/g, wrap);
            html += textColor;
            continue;
        }
        if (text.includes("\n")) {
            const textColor = text.replace(/\n/g, wrap);
            html += textColor;
            continue;
        }
        html += `<div>${text}</div>`;
    }
    html += "";
    return html;
}
