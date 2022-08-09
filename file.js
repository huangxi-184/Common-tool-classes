// 将dataurl 转化成file 
export function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
//将base64转换为blob  将base64 转化成 二进制文件
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
//将blob转换为file
//后端使用统一的文件上传接口，要求前端做图片裁剪。前端裁剪上传图片组件开发会单独一篇文章总结，
//写完后会在此处链接过去。前端裁剪图片后获取的实际是blob对象，
//后端统一的文件上传接口实际接收的file对象，前端需要在数据提交前将blob对象转为file对象。
export function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}