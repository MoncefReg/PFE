export interface Cluster {
  id?: string;
  name: string;
  nodes: Device[];
}

export interface Device {
  id?: string;
  ip_address: string;
  port: string;
  user?: string;
  password?: string;
  active: boolean;
}
