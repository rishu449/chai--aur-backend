const asyncHandler= async(requestHandler)=>(req,res,next)=>{
    try {
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>{ next(error)})
    } catch (error) {
        
    }

}
export {asyncHandler}