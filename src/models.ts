export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  time: {
    seconds: number;
    nanoseconds: number;
  };
}
