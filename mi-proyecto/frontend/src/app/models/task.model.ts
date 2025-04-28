export interface Task {
    _id?: string;
    user?: string;
    title: string;
    description?: string;
    status: 'pendiente' | 'en progreso' | 'completada';
    date?: Date;
  }