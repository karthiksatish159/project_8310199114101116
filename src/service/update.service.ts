export const refineData=(Updatedlist:any)=>
{
    const data:{[key:string]:any}=Updatedlist;
    for(let [key,value] of Object.entries(data))
    {
        if(value.length<=0||typeof value==='undefined'||value===null)
        {
            delete data[key];
        }
    }
    return data;
}
export const updateTheDocument=(document:any,updated:any)=>
{
   const keys=Object.keys(updated);
   for(let i of keys)
   {
        document[i]=updated[i];
   }
}