
//conver numver into the hour minute second
const time=(time)=>{
    const hour=parseInt(time/3600)
    let remainingSecond=time%3600
    const minute=parseInt(remainingSecond/60)
    remainingSecond = parseInt(remainingSecond/60)
    
    return `${hour}h ${minute}min ${remainingSecond}sec`
}
console.log(time(4444))