let host = ""
const auth2Prefix = ""
const authPrefix = "/system"
const managePrefix = "/manage"
const taskPrefix = "/data"
const routerManagePrefix = "/routerController"
const pictureReviewPrefix = '/pictureReview'
const textReviewPrefix = '/textReview'
const videoReviewPrefix = '/videoReview'
const voiceReviewPrefix = '/voiceReview'
const statisticPrefix = '/statistic'
const laborReviewPrefix = '/laborReview'
const openPrefix = '/open'
const reviewTemplateManagePrefix = '/reviewTemplateManage'
const customFaceLibPrefix = '/customFaceLib'
const customLogoLibPrefix = '/customLogoLib'
const customTextLibPrefix = '/customTextLib'
const sensitiveWordPrefix = '/sensitiveWord'
const sensitiveImagePrefix = '/sensitiveImage'
const imageModelPrefix = '/imageModel'
const imageModelTrainEvaluatePrefix = '/imageModelTrainEvaluate'
const textModelTrainEvaluatePrefix = '/textModelTrainEvaluate'
const textModelPrefix = '/textModel'
const categoryLabelPrefix = '/categoryLabel'
const serviceResourcePrefix = '/resource'
const imageModelDeployPrefix = '/imageModelDeploy'
const textModelDeployPrefix = '/textModelDeploy'

const urls = {}

const auth2 = {
    auth: {
        login: "/login",
    },
}

const auth = {
    user: {
        loginout: "/logout",
        all: "/user/all",
        create: "/user/create",
        edit: "/user/edit",
        remove: "/user/remove",
        batchRemove: "/user/batchRemove",
        download: "/user/download",
        downloadUser: "/user/downloadUser",
        batchImport: "/user/batchImport",
        freeze: "/user/freeze",
        unfreeze: "/user/unfreeze",
    },
    role: {
        all: "/role/all",
        create: "/role/create",
        edit: "/role/edit",
        remove: "/role/removeById",
        addUserToRole: "/role/addUserToRole",
        getAllRoutes: "/route/all",
        searchRouteByRoleId: "/route/searchByRoleId",
        removeUserFromRole: "/role/removeUserFromRole",
        updateRoleRoute: "/role/updateRoleRoute",
        updateOrInsertRole: "/role/updateOrInsertRole",
        searchUserByRoleId: "/user/searchByRoleId",
    },
    basicPermissionUserRelationship: {
        deleteByUUID: "/basicPermissionUserRelationship/deleteByUUID",
    },
    button: {
        searchButtonByRoleId: "/button/searchByRoleId",
        addOrUpdate: "/button/addOrUpdate",
        delete: "/button/delete",
        updateOrInsertRoleButton: "/button/updateOrInsertRoleButton",
        manageButton: "/button/config",
    },
}

const manage = {
    // 数据字典
    system: {
        setting: "/system/setting",
        get: "/system/get",
        getOne: "/system/getOne",
        setting: "/system/setting", //修改系统参数
        insertOrUpdate: "/system/insertOrUpdate",
    },
    dictionary: {
        get: "/dictionary/get",
        getOne: "/dictionary/getOne",
        addOrUpdate: "/dictionary/addOrUpdate",
        deleteByUUID: "/dictionary/deleteByUUID",
    },
    menu: {
        getAll: "/menuManage/getAll",
        selectPid: "/menuManage/selectPid",
        addOrUpdate: "/menuManage/addOrUpdate",
        deleteByUUID: "/menuManage/deleteByUUID",
    },
}

const task = {
    task: {
        findOperateLog: "/log/findOperateLog", //查询操作日志
    },
}

const organ = {
    organ: {
        organs: "/org/query", //获取机构信息
        addOrgs: "/org/addOrgs", //添加机构信息
        updateOrgs: "/org/updateOrgs", //修改机构信息
        deleteOrgs: "/org/deleteOrgs", //根据uuid删除机构信息
    },
}

//路由管理
const routerManage = {
    routerManage: {
        getAll: "/getAll", //查询全部的路由管理
        getAllSonRouter: "/getAllSonRouter", //查询所有路由管理子类信息
        addRouter: "/addRouter", //添加服务路由
        delRouter: "/delRouter", //删除路由
        updateRouter: "/updateRouter", //修改路由
    },
}


const pictureReview = {
    pictureReview: {
        getPictureReviewInfo: '/getPictureReviewInfo',
        getPictureReviewList: '/getPictureReviewList',
        initiatePictureReview: '/initiatePictureReview',
        rePictureReview: '/rePictureReview',
        bathRePictureReview: '/bathRePictureReview',
        batchDelete: '/batchDelete',
        delete: '/delete'
    }
}

const textReview = {
    textReview: {
        info: '/info',
        batchDelete: '/batchDelete',
        batchRedo: '/batchRedo',
        delete: '/delete',
        initiateTextReview: '/initiateTextReview',
        list: '/list',
        redo: '/redo',
    }
}

const videoReview = {
    videoReview: {
        info: '/info',
        batchDelete: '/batchDelete',
        batchRedo: '/batchRedo',
        delete: '/delete',
        initiateVideoReview: '/initiateVideoReview',
        list: '/list',
        redo: '/redo',
    }
}

const voiceReview = {
    voiceReview: {
        info: '/info',
        batchDelete: '/batchDelete',
        batchRedo: '/batchRedo',
        delete: '/delete',
        initiateVoiceReview: '/initiateVoiceReview',
        list: '/list',
        redo: '/redo',
    }
}

const statistic = {
    statistic: {
        count: '/count',
        failed: '/failed',
        type: '/type',
        violation: '/violation',
    }
}

const laborReview = {
    laborReview: {
        imageError: '/imageError',
        imageMissing: '/imageMissing',
        imageInfo: '/imageInfo',
        submit: '/submit',
        videoError: '/videoError',
        videoMissing: '/videoMissing',
        videoInfo: '/videoInfo',
        textError: '/textError',
        textMissing: '/textMissing',
        textInfo: '/textInfo',
        voiceError: '/voiceError',
        voiceMissing: '/voiceMissing',
        voiceInfo: '/voiceInfo',
        videoCorrectError: '/videoCorrectError',
        videoCorrectMissing: '/videoCorrectMissing'
    }
}

const open = {
    open: {
        videoReview: '/videoReview/list',
        voiceReview: '/voiceReview/list',
        pictureReview: '/pictureReview/list',
        textReview: '/textReview/list',
    }
}

const reviewTemplateManage = {
    reviewTemplateManage: {
        add: '/add',
        all: '/all',
        delete: '/delete',
        info: '/info',
        update: '/update',
        getJSON: '/getJSON'
    }
}

const customFaceLib = {
    customFaceLib: {
        addFace: '/addFace',
        addGroup: '/addGroup',
        addLib: '/addLib',
        deleteFace: '/deleteFace',
        deleteGroup:'/deleteGroup',
        deleteLib: '/deleteLib',
        editLib: '/editLib',
        listFace: '/listFace',
        listLib: '/listLib'
    }
}

const customLogoLib = {
    customLogoLib: {
        addGroup: '/addGroup',
        addLib: '/addLib',
        addLogo: '/addLogo',
        deleteGroup: '/deleteGroup',
        deleteLib: '/deleteLib',
        deleteLogo: '/deleteLogo',
        editLib: '/editLib',
        listLib: '/listLib',
        listLogo: '/listLogo'
    }
}

const customTextLib = {
    customTextLib: {
        addLib: '/addLib',
        addText: '/addText',
        batchDelete: '/batchDelete',
        deleteLib: '/deleteLib',
        deleteText: '/deleteText',
        editLib: '/editLib',
        listLib: '/listLib',
        listText: '/listText'
    }
}

const sensitiveWord = {
    sensitiveWord: {
        deleteCommSensitiveWord: '/deleteCommSensitiveWord',
        deleteCustomizeSensitiveWord: '/deleteCustomizeSensitiveWord',
        getCommSensitiveWordList: '/getCommSensitiveWordList',
        getCustomizeSensitiveWordList: '/getCustomizeSensitiveWordList',
        saveCommSensitiveWord: '/saveCommSensitiveWord',
        saveCustomizeSensitiveWord: '/saveCustomizeSensitiveWord',
        setCommSensitiveWord: '/setCommSensitiveWord',
        cancelCommSensitiveWord: '/cancelCommSensitiveWord'
    }
}

const sensitiveImage = {
    sensitiveImage: {
        addCustomSensitiveImage: '/addCustomSensitiveImage',
        addCustomSensitiveImageClass: '/addCustomSensitiveImageClass',
        bathDeleteCustomSensitiveImage: '/bathDeleteCustomSensitiveImage',
        changeDisabled: '/changeDisabled',
        deleteCustomSensitiveImage: '/deleteCustomSensitiveImage',
        deleteCustomSensitiveImageClass: '/deleteCustomSensitiveImageClass',
        getCustomSensitiveImageClassById: '/getCustomSensitiveImageClassById',
        getCustomSensitiveImageClassList: '/getCustomSensitiveImageClassList',
        getCustomSensitiveImageList: '/getCustomSensitiveImageList',
        updateCustomSensitiveImageClass: '/updateCustomSensitiveImageClass'
    }
}

const imageModel = {
    imageModel: {
        addDataSet: '/addDataSet',
        addModel: '/addModel',
        classify: '/classify',
        deleteData: '/deleteData',
        deleteDataSet: '/deleteDataSet',
        deleteModel: '/deleteModel',
        editDataSet: '/editDataSet',
        editModel: '/editModel',
        feedback: '/feedback',
        invalid: '/invalid',
        listData: '/listData',
        listDataSet: '/listDataSet',
        listModel: '/listModel',
        load: '/load',
        mark: '/mark',
        progress: '/progress'
    }
}

const imageModelTrainEvaluate = {
    imageModelTrainEvaluate: {
        delTrainModel: '/delTrainModel',
        getTrainAndEvaluates: '/getTrainAndEvaluates',
        getTrainDetail: '/getTrainDetail',
        getTrainLogs: '/getTrainLogs',
        restartTrain: '/restartTrain',
        startEvaluate: '/startEvaluate',
        restartEvaluate: '/restartEvaluate',
        startTrain: '/startTrain',
    }
}

const textModelTrainEvaluate = {
    textModelTrainEvaluate: {
        delTrainModel: '/delTrainModel',
        getTrainAndEvaluates: '/getTrainAndEvaluates',
        getTrainDetail: '/getTrainDetail',
        getTrainLogs: '/getTrainLogs',
        restartTrain: '/restartTrain',
        startEvaluate: '/startEvaluate',
        restartEvaluate: '/restartEvaluate',
        startTrain: '/startTrain',
    }
}

const textModel = {
    textModel: {
        addData: '/addData',
        addDataSet: '/addDataSet',
        addModel: '/addModel',
        classify: '/classify',
        deleteData: '/deleteData',
        deleteDataSet: '/deleteDataSet',
        deleteModel: '/deleteModel',
        editDataSet: '/editDataSet',
        editModel: '/editModel',
        feedback: '/feedback',
        invalid: '/invalid',
        listData: '/listData',
        listDataSet: '/listDataSet',
        listModel: '/listModel',
        load: '/load',
        progress: '/progress'
    }
}

const categoryLabel = {
    categoryLabel: {
        addCategoryLabel: '/addCategoryLabel',
        deleteCategoryLabel: '/deleteCategoryLabel',
        getCategoryLabelList: '/getCategoryLabelList',
        updateCategoryLabel: '/updateCategoryLabel',
    }
}

const serviceResource = {
    serviceResource: {
        delModResContainer: '/delModResContainer',
        delModResNode: '/delModResNode',
        getContainerErrorLogs: '/getContainerErrorLogs',
        getModResContainers: '/getModResContainers',
        getNodes: '/getNodes',
        getResources: '/getResources',
        monitor: '/monitor',
        restartContainer: '/restartContainer',
        saveModResContainer: '/saveModResContainer',
        saveModResNode: '/saveModResNode',
        startContainer: '/startContainer',
        stopContainer: '/stopContainer',
    }
}

const imageModelDeploy = {
    imageModelDeploy: {
        getHistoryPublishVersion: '/getHistoryPublishVersion',
        getModelPublishDetails: '/getModelPublishDetails',
        publishNewVersion: '/publishNewVersion',
    }
}

const textModelDeploy = {
    textModelDeploy: {
        getHistoryPublishVersion: '/getHistoryPublishVersion',
        getModelPublishDetails: '/getModelPublishDetails',
        publishNewVersion: '/publishNewVersion',
    }
}



addHost(auth2, auth2Prefix)
addHost(auth, authPrefix)
addHost(organ, authPrefix)
addHost(manage, managePrefix)
addHost(task, taskPrefix)
addHost(routerManage, routerManagePrefix)
addHost(pictureReview,pictureReviewPrefix)
addHost(textReview, textReviewPrefix)
addHost(videoReview, videoReviewPrefix)
addHost(voiceReview, voiceReviewPrefix)
addHost(statistic, statisticPrefix)
addHost(laborReview, laborReviewPrefix)
addHost(open, openPrefix)
addHost(reviewTemplateManage, reviewTemplateManagePrefix)
addHost(customFaceLib, customFaceLibPrefix)
addHost(sensitiveWord, sensitiveWordPrefix)
addHost(sensitiveImage, sensitiveImagePrefix)
addHost(customLogoLib, customLogoLibPrefix)
addHost(customTextLib, customTextLibPrefix)
addHost(imageModel, imageModelPrefix)
addHost(imageModelTrainEvaluate, imageModelTrainEvaluatePrefix)
addHost(textModelTrainEvaluate, textModelTrainEvaluatePrefix)
addHost(textModel, textModelPrefix)
addHost(categoryLabel, categoryLabelPrefix)
addHost(serviceResource, serviceResourcePrefix)
addHost(imageModelDeploy, imageModelDeployPrefix)
addHost(textModelDeploy, textModelDeployPrefix)

function addHost(urls, tag) {
    Object.keys(urls).forEach(key => {
        const value = urls[key]
        if (typeof value === "string") {
            urls[key] = host + tag + value
        }
        if (typeof value === "object") {
            addHost(value, tag)
        }
    })
}


Object.assign(urls, auth2, auth, manage, task, organ, routerManage, pictureReview, textReview, videoReview, voiceReview, statistic, laborReview, open, reviewTemplateManage, customFaceLib, sensitiveWord, sensitiveImage, customLogoLib, customTextLib, imageModel, imageModelTrainEvaluate, textModelTrainEvaluate, categoryLabel, textModel, serviceResource, imageModelDeploy, textModelDeploy)

export default urls
