export interface ITodo {
  idTask: string;
  title: string;
  completed: boolean;
  time: {
    seconds: number;
    nanoseconds: number;
  };
}
