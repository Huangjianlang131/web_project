import { fetch, urls } from '@/api'
import global from '@/assets/commonData/globalData.json'

async function checkTemplate() {
    let temData = []
    await fetch(urls.reviewTemplateManage.all)
        .then(res => {
        if (res.data.errorCode === 0) {
            console.log(res)
            temData = res.data.responseBody
        } else {
            this.$message.error(res.data.message)
        }
        })
    return temData
}

// 获取文本库列表
async function textTemplate() {
    let textList = []
    await fetch(urls.customTextLib.listLib, {})
        .then(res => {
            console.log(res)
            if (res.data.errorCode === 0) {
                textList = res.data.responseBody
            } else {
                this.$message.error(res.data.message)
            }
        })
    return textList
}

// 获取人脸库列表
async function faceTemplate() {
    let faceList = []
    await fetch(urls.customFaceLib.listLib, {})
        .then(res => {
            console.log(res)
            if (res.data.errorCode === 0) {
                faceList = res.data.responseBody
            } else {
                this.$message.error(res.data.message)
            }
        })
    return faceList
}

// 获取logo库列表
async function logoTemplate() {
    let logoList = []
    await fetch(urls.customLogoLib.listLib, {})
        .then(res => {
            console.log(res)
            if (res.data.errorCode === 0) {
                logoList = res.data.responseBody
            } else {
                this.$message.error(res.data.message)
            }
        })
    return logoList
}

// code转name（三类）
function codeToName(text) {
    let reviewName = ''
    let template = global.template
    template.forEach((item, index) => {
        item.list.forEach((items, index) => {
            items.list.forEach((itemss, index) => {
                if(text==undefined) {
                    reviewName = undefined
                } else {
                    if(text == itemss.reviewCode) reviewName = itemss.reviewName
                }
            })
        })
    })
    return reviewName
}

// code转name（二类）
function codeToNameTwo(text) {
    let reviewName = ''
    let template = global.template
    template.forEach((item, index) => {
        item.list.forEach((items, index) => {
            if(text==undefined) {
                reviewName = undefined
            } else {
                if(text == items.reviewCode) reviewName = items.reviewName
            }
        })
    })
    return reviewName
}

// name转code（三类）
function nameToCode(text) {
    let reviewCode
    for(let item of global.template) {
        for(let sitem of item.list) {
            for(let subitem of sitem.list) {
                if(text == subitem.reviewName) {
                    reviewCode = subitem.reviewCode
                }
            }
        }
    }
    return reviewCode
}

// name转code（二类）
function nameToCodeTwo(text) {
    let reviewCode
    for(let item of global.template) {
        for(let sitem of item.list) {
            if(text == sitem.reviewName) {
                reviewCode = sitem.reviewCode
            }
        }
    }
    return reviewCode
}

// 标准的深拷贝 => 引用数据类型（数组、对象）   ########### 必须背熟并手写出来 ###########
function deepClone(source) {
    // constructor 指向的是基类，如：[] => Array(基类) ; {} => Object
    const targetObj = source.constructor === Array ? [] : {};
    for(let keys in source) {
        // keys => 包含有三种数据类型，字符串、数组、对象
        // 引用数据类型
        // 判断拷贝的对象是否有属性
        if(source.hasOwnProperty(keys)){
            // 判断属性是否为数组或对象
            if(source[keys] && typeof source[keys] === 'object') {
                // 属性内部的数组或对象
                targetObj[keys] = source[keys].constructor === Array ? [] : {};   // 可以注释，属于维护层代码
                // 递归
                targetObj[keys] = deepClone(source[keys])
            }else{
                // 基本数据类型，直接赋值
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj
}

export { checkTemplate, textTemplate, faceTemplate, logoTemplate, codeToName, nameToCode, deepClone, nameToCodeTwo, codeToNameTwo }