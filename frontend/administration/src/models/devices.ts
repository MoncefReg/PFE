export interface Cluster {
  id?: string;
  name: string;
  nodes?: Device[];
  created_on?: string;
}

export interface Device {
  id?: string;
  ip_address: string;
  port: string;
  user?: string;
  password?: string;
  active: boolean;
  created_on?: string;
  cluster?: Cluster;
  cluster_data?: Cluster;
}
