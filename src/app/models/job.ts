export interface Job {
  id?: string;
  categoryId: string;
  description: string;
  name: string;
  type: number;
  requirements: [
    {
      name: string;
      description: string;
    }
  ];
}
