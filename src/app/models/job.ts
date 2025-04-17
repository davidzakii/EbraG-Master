export interface Job {
  id?: string;
  categoryId: string;
  description: string;
  name: string;
  type: number;
  requirments: [
    {
      name: string;
      description: string;
    }
  ];
}
