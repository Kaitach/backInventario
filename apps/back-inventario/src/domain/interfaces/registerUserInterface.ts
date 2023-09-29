export interface  IRegisterUser  {
    email: string;
    password: string;
    role: string;
    name: {
      firstName:string ,
      lastName: string
    }
    branchId: string;
  }