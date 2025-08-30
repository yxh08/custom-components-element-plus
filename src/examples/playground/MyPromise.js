const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isPromiseLike = (val)=>{
  return val&&typeof val?.then == 'function'
}

class MyPromise {
  #state = PENDING
  #value = undefined
  #handlers = []
  constructor(executor) {
    const resolve = (value) => {
      this.#setState(FULFILLED, value)
    }
    const reject = (reason) => {
      this.#setState(REJECTED, reason)
    }
    
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #setState(state, value) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#value = value

    this.#runTask()
  }

  #runTask(){
    
    this.#handlers.forEach(handle=>{
      queueMicrotask(()=>{
        handle()
      })
    })
    this.#handlers=[]
  }

  

  then(onSuccess, onError) {
      return new MyPromise((resolve, reject) => {
        const handle = ()=>{
          const cb = this.#state == FULFILLED ? onSuccess : this.#state == REJECTED ? onError : ()=>{}
          const res = cb(this.#value)
          if(isPromiseLike(res)){
            res.then(resolve)
          }else{
            resolve(res)
          }
        }
        if(this.#state !== PENDING){
          queueMicrotask(()=>{
            handle()
          })
        }else{
          this.#handlers.push(handle)
        }
      })
  }
}

const p = new MyPromise((resolve, reject) => {
    console.log('start');
    resolve(0)
}).then(res1=>{
    return new MyPromise((resolve,reject)=>{
      console.log('1?',res1);
      resolve(res1 + 1)
    })
}).then(res2=>{
    console.log('2?',res2);
})
console.log('end');



