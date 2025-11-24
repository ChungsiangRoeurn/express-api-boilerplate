import type { Request, Response } from "express";
export declare const addAddress: (req: Request, res: Response) => Promise<void>;
export declare const deleteAddress: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listAddress: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=users.d.ts.map