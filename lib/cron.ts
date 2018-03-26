import {ScheduledTask} from 'node-cron';

export default class Cron {
  public static getCron() {
    if (!Cron.instance) {
      Cron.instance = new Cron();
    }
    return Cron.instance;
  }

  public static cleanCron(): void {
    Cron.instance = new Cron();
  }

  private static instance: Cron;

  private tasks: { [key: string]: ScheduledTask };

  private constructor() {
    this.tasks = {};
  }

  public add(id: string, job: ScheduledTask) {
    this.tasks[id] = job;
  }

  public has(id: string): boolean {
    return this.tasks.hasOwnProperty(id);
  }

  public start(id: string) {
    const task = this.tasks[id];
    if (task) {
      task.start();
    }
  }

  public stop(id: string) {
    const job = this.tasks[id];
    if (job) {
      job.stop();
    }
  }

  public destroy(id: string) {
    const job = this.tasks[id];
    if (job) {
      job.destroy();
      delete this.tasks[id];
    }
  }
}