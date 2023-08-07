

function np(array) {
  return {
    adds:function(items){
      if(typeof(items)=="object"){
        if (array.length==items.length) {
          let result=[]
          for (let i = 0; i < array.length; i++) {
            result.push(array[i]+items[i])
          }
          return result;
        }
        else{
          console.error("you use different length arrays")
        }
      }
      else{
        let outputs=[]
        for (let i = 0; i < array.length; i++) {
          outputs.push(array[i]+items)
        }
        return outputs;
      }
    },
    biadd:function(f){
      
      let result=[];
      
      for (let i = 0; i < array.length; i++) {
        result.push([])
        result[i]=np(array[i]).adds(f[0])
        
      }
    
      return result
    }
    ,
    subs:function(items){
      if(typeof(items)=="object"){
        if (array.length==items.length) {
          let result=[]
          for (let i = 0; i < array.length; i++) {
            result.push(array[i]-items[i])
          }
          return result;
        }
        else{
          console.error("you use different length arrays")
        }
      }
      else{
        let outputs=[]
        for (let i = 0; i < array.length; i++) {
          outputs.push(array[i]-items)
        }
        return outputs;
      }
    },
    mal:function(items){
      if(typeof(items)=="object"){
        if (array.length==items.length) {
          let result=[]
          for (let i = 0; i < array.length; i++) {
            result.push(array[i]*items[i])
          }
          return result;
        }
        else{
          console.error("you use different length arrays")
        }
      }
      else{
        let outputs=[]
        for (let i = 0; i < array.length; i++) {
          outputs.push(array[i]*items)
        }
        return outputs;
      }
    },
    div:function(items){
      
      if(typeof(items)=="object"){
        if (array.length==items.length) {
          let result=[]
          for (let i = 0; i < array.length; i++) {
            result.push(array[i]/items[i])
          }
          return result;
        }
        else{
          console.error("you use different length arrays")
        }
      }
      else{
        let outputs=[]
        for (let i = 0; i < array.length; i++) {
          outputs.push(array[i]/items)
        }
        return outputs;
      }
    },
    rounds:function(num){
      let result=[]
      if (num==undefined) {
        for (let i = 0; i < array.length; i++) {
          result.push([])
          for (let v = 0; v < array[i].length; v++) {
          result[i].push(Math.round(array[i][v]))
          }
        }
      }
      else{
        for (let i = 0; i < array.length; i++) {
          result.push([])
          for (let v = 0; v < array[i].length; v++) {
          result[i].push(Math.round(array[i][v]*num)/num)
          }
        }
      }
      return result
    },
    round:function(num){
      if (num==undefined) {
        for (let i = 0; i < array.length; i++) {
          array[i]=Math.round(array[i])
        }
      }
      else{
        for (let i = 0; i < array.length; i++) {
          array[i]=Math.round(array[i]*num)/num
        }
      }
    },
    zeros:function(f){
      let arr=[]
      if (f!=undefined) {
        for (let i = 0; i < array; i++) {
          let point=[]
          for (let v = 0; v < f; v++) {
            point.push(0)
          }
          arr.push(point)
        }
      }
      else{
        for (let i = 0; i < array; i++) {
          arr.push(0)
        }
      }
      return arr
    }
    ,
    random:function(f){
      let arr=[]
      if (f!=undefined) {
        for (let i = 0; i < array; i++) {
          let point=[]
          for (let v = 0; v < f; v++) {
            point.push(Math.random())
          }
          arr.push(point)
        }
      }
      else{
        for (let i = 0; i < array; i++) {
          arr.push(Math.random())
        }
      }
      return arr
    },
    swap:function(a,b){
      if (a==undefined) {
        let copy=JSON.parse(JSON.stringify(array));
        for (let i = 0; i < array.length; i++) {
          let v=(array.length-1)-i
            array[i]=copy[v]
        }
      }
      else{
        [array[a],array[b]]=[array[b],array[a]]
      }
    }
    ,
    sum:function(){
      
      let outputs=0;
      for (let i = 0; i < array.length; i++) {
        outputs+=array[i]
      }
      return [outputs]
    },
    base:function(f,rate){
      let count=[[]];
      let tran=np(array).T(); 
      for (let i = 0; i < tran.length; i++) {
        let out=np(tran[i]).sum()
        count[0].push(out[0])
      }
      if (f!=undefined && rate==undefined) {
        let result=np(count).A(f)
        return result
      }
      else if(f!=undefined && rate!=undefined){
        let result=np(count).A(f)
        let outputs=np(result).M(rate)
        return outputs
      }
      
      return count
    }
    ,
    togather:function(){
      let count=0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].length==1) {
            count+=array[i][0]
        }
        else{
          let side=np(array[i]).sum();
          count+=side[0]
        }
      }
      return [[count/array.length]]
    },
    linear:function(outputs,num){
      let inputes=array;
      let results=[]
      if (num==0 || num==undefined) {
        for (let i = 0; i < inputes.length; i++) {
          let first=np(inputes[i]).div(inputes[i][0])
          let second=np(outputs[i]).div(inputes[i][0])
          let final=second[0]-first[1];
          results.push([final])
        }
      }
    
    else{
      for (let i = 0; i < inputes.length; i++) {
        let first=np(inputes[i]).div(inputes[i][1])
        let second=np(outputs[i]).div(inputes[i][1])
        let final=second[0]-first[0];
        results.push([final])
      }
    }
    return results
    },
    victor:function(outputs){
      let inputes=array;
      let result=[];
      for (let i = 0; i < inputes.length; i++) {
        if (i==inputes.length-1) {
          break
        }
        let data=[];
        for (let v = 0; v < inputes[i].length; v++) {
          if (i==inputes.length-1) {
            break
         }
          let one=np(inputes[0]).div(-inputes[0][v])
          let step_one=np(outputs[0]).div(-inputes[0][v])
          let two=np(one).mal(inputes[i+1][v])
          let step_two=np(step_one).mal(inputes[i+1][v])
          let three=np(two).adds(inputes[i+1])
          let step_three=np(step_two).adds(outputs[i+1])
          let point=1-v
          let end=np([three]).linear([step_three,point],point)
          data.push(end[0][0])
        }
      result.push(data)
      }
      this.rewrite(result)
    return result;
    },
    rewrite:function(items){
      let same = JSON.parse(JSON.stringify(items));
      for (let i = 0; i < items.length; i++) {
        for (let v = 0; v < items[i].length; v++) {
         let count = (items[i].length - 1) - v;
          items[i][v] = same[i][count];
        }
      }
    },
    matrix:function(s){
      let f=array;
      let result=[]
      let inputes=[]
      let outputs=[]
      for (let i = 0; i < f[0].length; i+=2) {
        for (let v = 0; v < f.length; v++) {
          if (f.length-1==v) {
          continue;
        }
        let divided=np(f[0]).div(-f[0][i])
        let min_one=np(s[0]).div(-f[0][i])
        let maltiple=np(divided).mal(f[v+1][i])
        let min_two=np(min_one).mal(f[v+1][i])
        let additon=np(maltiple).adds(f[v+1])
        let min_three=np(min_two).adds(s[v+1])
        additon.splice(i,1)
        inputes.push(additon)
        outputs.push(min_three)
        if (inputes.length==2) {
          result.splice(0,0,np(inputes).victor(outputs)[0])
          inputes=[]
          outputs=[]
        }
      }
    }
    function clear(item) {
      for (let i = 0; i < item.length; i++) {
        if (i==0) {
          continue
        }
        item[i].splice(0,1)
      }
    }
     clear(result)
     let final_result=[result.flatMap(item => item.concat())];
     return final_result;
      },
    T:function(){
      let inputes=array;
      let result=[]
      for (let i = 0; i < inputes[0].length; i++) {
        result.push([])
        for (let v = 0; v < inputes.length; v++) {
            result[i].push(inputes[v][i])
         }
      }
      return result
    },
    products:function(f){
      return np(np(array).mal(f)).sum()
    }
    ,
    dots:function(b){
      let tran=np(b).T(); 
      let result=[]
      for (let i = 0; i < array.length; i++) {
        result.push([])
        for (let v = 0; v < b[0].length; v++) {
          let outputs=np(np(tran[v]).div(array[i])).sum()
          result[i].push(outputs[0])
        }
      }
      return result
    }
    ,
    dot:function(b){
      let a=array;
      let outputs=[]
      let tran=np(b).T() 
      for (let i = 0; i < a.length; i++) {
        outputs.push([])
        for (let v = 0; v < b[0].length; v++) {
          let result=np(np(a[i]).mal(tran[v])).sum()
          outputs[i].push(result[0])
        }
      }
        return outputs
      },
    A:function(b){
      
      let a=array;
      let result=[]
      if(typeof(b)=="object"){
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).adds(b[i])
          result.push(answer)
        }
      }
      else{
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).adds(b)
          result.push(answer)
        }
      }
      return result;
    }
    ,
    S:function(b){
      let a=array;
      let result=[]
      if(typeof(b)=="object"){
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).subs(b[i])
          result.push(answer)
        }
      }
      else{
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).subs(b)
          result.push(answer)
        }
      }
      return result;
    },
    M:function(b){
      let a=array;
      let result=[]
      if(typeof(b)=="object"){
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).mal(b[i])
          result.push(answer)
        }
      }
      else{
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).mal(b)
          result.push(answer)
        }
      }
      return result;
    }
    ,
    D:function(b){
      let a=array;
      let result=[]
      if(typeof(b)=="object"){
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).div(b[i])
          result.push(answer)
        }
      }
      else{
        for (let i = 0; i < a.length; i++) {
          let answer=np(a[i]).div(b)
          result.push(answer)
        }
      }
      return result;
    },
    }
  }
module.exports=np