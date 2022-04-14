export interface IPage {
  id: number;
  title: string;
  imageUrl: any;
  createdTime: Date;
  content: string;
  isPublic: boolean;
  appUserId: string;
  tagId: number;
}

export class Page {
  id: number = 0;
  title: string = '';
  imageUrl: any;
  createdTime: Date = new Date();
  content: string = '';
  isPublic: boolean = false;
  appUserId: string = '';
  tagId: number = 0;
}
