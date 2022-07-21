const allowed = require('./allowed')

const corsOptions = {
    origin:(origin,callback)=>{
        if(allowed.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not Allowed by CORS !'))
        }
    },
    optionsSuccessStatus:200
}

module.exports = corsOptions