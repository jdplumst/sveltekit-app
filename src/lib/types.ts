export const StatusValues = ['To Do', 'In Progress', 'Complete', 'Cancelled'] as const;
export type Status = (typeof StatusValues)[number];

export const PriorityValues = ['Low', 'Medium', 'High'] as const;
export type Priority = (typeof PriorityValues)[number];
