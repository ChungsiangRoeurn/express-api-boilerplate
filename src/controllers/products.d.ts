import type { Request, Response } from "express";
interface ProductParams {
    id: string;
}
export declare const createProduct: (req: Request, res: Response) => Promise<void>;
export declare const updateProduct: (req: Request<ProductParams>, res: Response) => Promise<void>;
export declare const listProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProduct: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=products.d.ts.map