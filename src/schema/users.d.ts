import { z } from "zod";
export declare const SignUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const AddressSchema: z.ZodObject<{
    lineOne: z.ZodString;
    lineTwo: z.ZodNullable<z.ZodString>;
    pincode: z.ZodString;
    country: z.ZodString;
    city: z.ZodString;
}, z.core.$strip>;
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    defaultShippingAddress: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    defaultBillingAddress: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
//# sourceMappingURL=users.d.ts.map