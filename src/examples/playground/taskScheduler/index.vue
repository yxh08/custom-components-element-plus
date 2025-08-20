<template>

</template>

<script lang="ts" setup>

/**
 * 需求:100个异步任务,如何大文件分片上传的时候,浏览器做多并发五个,
 * 如果都用来上传文件,那么就没有资源给页面其他请求任务,导致用户感知的页面卡顿.
 * 所以要控制任务最多并发3 个,剩下两个留给页面其他任务
 *
 */

const createRequest = () => {
  return (delay: number, msg: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${delay}ms,${msg}`)
      }, delay)
    })
  }
}

class TaskScheduler {
  tasksQueue: any[]
  maxCount: number
  isRunning: number

  constructor(maxCount: number) {
    this.maxCount = maxCount
    this.tasksQueue = []
    this.isRunning = 0
  }

  addTask(asyncTask) {
    const task = () => {
      return new Promise((resolve, reject) => {
        return asyncTask().then(resolve, reject)
      })
    }
    this.tasksQueue.push(task)
    this.runTask()
  }

  runTask() {
    if (this.isRunning < 3) {
      const task = this.tasksQueue.shift()
      if (task) {
        this.isRunning++
        task().then(res => {
          console.log(res)
        }).finally(() => {
          this.isRunning--
          this.runTask()
        })
      }
    }
  }
}


const scheduler = new TaskScheduler(3)
const asyncTask = createRequest()

scheduler.addTask(() => asyncTask(1000, 'task1'))
scheduler.addTask(() => asyncTask(1000, 'task2'))
scheduler.addTask(() => asyncTask(1000, 'task3'))
scheduler.addTask(() => asyncTask(10000, 'task4'))
scheduler.addTask(() => asyncTask(2000, 'task5'))
scheduler.addTask(() => asyncTask(2000, 'task6'))
scheduler.addTask(() => asyncTask(3000, 'task7'))
scheduler.addTask(() => asyncTask(3000, 'task8'))
scheduler.addTask(() => asyncTask(3000, 'task9'))
scheduler.addTask(() => asyncTask(4000, 'task10'))

</script>


<style scoped>

</style>