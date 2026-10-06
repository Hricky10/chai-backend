class Apierror extends Errors{
    constructor(
        statusCode,
        message= "Something west wrong",
        errors=[],
        statck=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        if(statck){
            this.statck=statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {Apierror}