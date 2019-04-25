const Koa = require('koa');
const koaBody = require('koa-body')
const {join} = require('path')

const app = new Koa;

app.use(koaBody({
    multipart:true, //允许支持文件上传
    formidable:{
        uploadDir:join(__dirname,'upload') ,
        maxFieldsSize:200*1024*1024,
        keepExtensions:true,
        multiples:true,// 是否多文件上传,默认true
        
        //这个属性是在文件上传前触发的一个钩子函数
        onFileBegin:(files,file)=>{
            //name 就是前段input（file） 的name值
            // file就是input中的数据

            const postfix = /\.[A-Za-z]+$/g; //文件名的后缀
            const ext = file.name.match(postfix)[0];

            file.path = join(__dirname,'upload/'+Date.now()+ext)

        }
        
    },
    onError(err){
        console.log(err)
    }
}))
app.use(async (ctx)=>{
    //表单数据在body
    console.log(ctx.request.body);
    //文件在files
    console.log(ctx.request.files);
    ctx.body = '上传成功'
})



app.listen(3001,function(){
    console.log('3001端口启动')
})