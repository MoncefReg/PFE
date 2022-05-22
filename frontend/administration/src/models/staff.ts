export interface Employee {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  mobile?: string;
  created_on?: string;
  image?: any;
}

export interface Log {
  id: string;
  employee_data?: Employee;
  employee: string;
  image: any;
  created_on?: any;
}

export interface INotification {
  id?: string;
  data: any;
  seen: boolean;
  seen_date?: string;
  created_on: string;
}
