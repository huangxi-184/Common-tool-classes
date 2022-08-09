//下面是压缩部分的核心代码
/**
 * 通过canvas画布实现压缩，并转化为base64格式的图片
 * @param {File} file : 图片
 * @param {Object} item ：通过item找到当前对象的img标签
 * @param {Function} callback ：回调函数
 */
export function canvasDataURL(file, callback) { //压缩转化为base64
    var reader = new FileReader();      //读取文件的对象
    reader.readAsDataURL(file);         //对文件读取，读取完成后会将内容以base64的形式赋值给result属性
    reader.onload = function (e) {      //读取完成的钩子
        const img = new Image();
        const quality = 0.2; // 图像质量
        //先创建canvas画布，再获取canvas画布上的2d绘图环境，通过这个2d绘图环境才可使用绘制API
        const canvas = document.createElement('canvas');        //创建canvas画布
        const drawer = canvas.getContext('2d');                 //返回一个在画布上绘制2d图的环境对象，该对象上包含有canvas绘制2d图形的API
        img.src = this.result;
        // console.log("FileReader对象：",this);
        //图片压缩代码，需要注意的是，img图片渲染是异步的，所以必须在img的onlaod钩子中再进行相应操作
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            convertBase64UrlToBlob(canvas.toDataURL(file.type, quality), callback);
        }
    }
}

export function canvasDataBase64(value, callback) { //压缩转化为base64
    const img = new Image();
    const quality = 0.2; // 图像质量
    //先创建canvas画布，再获取canvas画布上的2d绘图环境，通过这个2d绘图环境才可使用绘制API
    const canvas = document.createElement('canvas');        //创建canvas画布
    const drawer = canvas.getContext('2d');                 //返回一个在画布上绘制2d图的环境对象，该对象上包含有canvas绘制2d图形的API
    img.src = value;

    const arr = value.split(',')
    // console.log("arr",arr);
    const mime = arr[0].match(/:(.*?);/)[1]
    // console.log("FileReader对象：",this);
    //图片压缩代码，需要注意的是，img图片渲染是异步的，所以必须在img的onlaod钩子中再进行相应操作
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        convertBase64UrlToBlob(canvas.toDataURL(mime, quality), callback);
    }
}

//下面是上传部分的核心代码
/**
 * 将base64格式转化为Blob格式
 * @param {string} urlData : urlData格式的数据，通过这个转化为Blob对象
 * @param {Function} callback : 回调函数
 */
export function convertBase64UrlToBlob(urlData, callback) { //将base64转化为文件格式
    // console.log("压缩成base64的对象：",urlData);
    const arr = urlData.split(',')
    // console.log("arr",arr);
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])   //atob方法用于解码base64
    // console.log("将base64进行解码:",bstr);
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    // console.log("Uint8Array:",u8arr);
    callback(new Blob([u8arr], {
        type: mime
    }));
}