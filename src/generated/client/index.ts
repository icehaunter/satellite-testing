import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TableSchema, DbSchema, Relation, ElectricClient, HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ItemsScalarFieldEnumSchema = z.enum(['id','content','content_text_null','content_text_null_default','intvalue_null','intvalue_null_default']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ITEMS SCHEMA
/////////////////////////////////////////

export const itemsSchema = z.object({
  id: z.string(),
  content: z.string(),
  content_text_null: z.string().nullable(),
  content_text_null_default: z.string().nullable(),
  intvalue_null: z.number().int().nullable(),
  intvalue_null_default: z.number().int().nullable(),
})

export type items = z.infer<typeof itemsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ITEMS
//------------------------------------------------------

export const itemsSelectSchema: z.ZodType<Prisma.itemsSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  content_text_null: z.boolean().optional(),
  content_text_null_default: z.boolean().optional(),
  intvalue_null: z.boolean().optional(),
  intvalue_null_default: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const itemsWhereInputSchema: z.ZodType<Prisma.itemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => itemsWhereInputSchema),z.lazy(() => itemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => itemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => itemsWhereInputSchema),z.lazy(() => itemsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content_text_null: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content_text_null_default: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  intvalue_null: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  intvalue_null_default: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const itemsOrderByWithRelationInputSchema: z.ZodType<Prisma.itemsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  content_text_null: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content_text_null_default: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  intvalue_null: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  intvalue_null_default: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const itemsWhereUniqueInputSchema: z.ZodType<Prisma.itemsWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const itemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.itemsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  content_text_null: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content_text_null_default: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  intvalue_null: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  intvalue_null_default: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => itemsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => itemsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => itemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => itemsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => itemsSumOrderByAggregateInputSchema).optional()
}).strict();

export const itemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.itemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => itemsScalarWhereWithAggregatesInputSchema),z.lazy(() => itemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => itemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => itemsScalarWhereWithAggregatesInputSchema),z.lazy(() => itemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content_text_null: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  content_text_null_default: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  intvalue_null: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  intvalue_null_default: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const itemsCreateInputSchema: z.ZodType<Prisma.itemsCreateInput> = z.object({
  id: z.string(),
  content: z.string(),
  content_text_null: z.string().optional().nullable(),
  content_text_null_default: z.string().optional().nullable(),
  intvalue_null: z.number().int().optional().nullable(),
  intvalue_null_default: z.number().int().optional().nullable()
}).strict();

export const itemsUncheckedCreateInputSchema: z.ZodType<Prisma.itemsUncheckedCreateInput> = z.object({
  id: z.string(),
  content: z.string(),
  content_text_null: z.string().optional().nullable(),
  content_text_null_default: z.string().optional().nullable(),
  intvalue_null: z.number().int().optional().nullable(),
  intvalue_null_default: z.number().int().optional().nullable()
}).strict();

export const itemsUpdateInputSchema: z.ZodType<Prisma.itemsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content_text_null: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content_text_null_default: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null_default: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const itemsUncheckedUpdateInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content_text_null: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content_text_null_default: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null_default: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const itemsCreateManyInputSchema: z.ZodType<Prisma.itemsCreateManyInput> = z.object({
  id: z.string(),
  content: z.string(),
  content_text_null: z.string().optional().nullable(),
  content_text_null_default: z.string().optional().nullable(),
  intvalue_null: z.number().int().optional().nullable(),
  intvalue_null_default: z.number().int().optional().nullable()
}).strict();

export const itemsUpdateManyMutationInputSchema: z.ZodType<Prisma.itemsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content_text_null: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content_text_null_default: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null_default: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const itemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content_text_null: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content_text_null_default: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intvalue_null_default: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const itemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.itemsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  content_text_null: z.lazy(() => SortOrderSchema).optional(),
  content_text_null_default: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null_default: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const itemsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.itemsAvgOrderByAggregateInput> = z.object({
  intvalue_null: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null_default: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const itemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.itemsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  content_text_null: z.lazy(() => SortOrderSchema).optional(),
  content_text_null_default: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null_default: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const itemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.itemsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  content_text_null: z.lazy(() => SortOrderSchema).optional(),
  content_text_null_default: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null_default: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const itemsSumOrderByAggregateInputSchema: z.ZodType<Prisma.itemsSumOrderByAggregateInput> = z.object({
  intvalue_null: z.lazy(() => SortOrderSchema).optional(),
  intvalue_null_default: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const itemsFindFirstArgsSchema: z.ZodType<Prisma.itemsFindFirstArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithRelationInputSchema.array(),itemsOrderByWithRelationInputSchema ]).optional(),
  cursor: itemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const itemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.itemsFindFirstOrThrowArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithRelationInputSchema.array(),itemsOrderByWithRelationInputSchema ]).optional(),
  cursor: itemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const itemsFindManyArgsSchema: z.ZodType<Prisma.itemsFindManyArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithRelationInputSchema.array(),itemsOrderByWithRelationInputSchema ]).optional(),
  cursor: itemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const itemsAggregateArgsSchema: z.ZodType<Prisma.itemsAggregateArgs> = z.object({
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithRelationInputSchema.array(),itemsOrderByWithRelationInputSchema ]).optional(),
  cursor: itemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const itemsGroupByArgsSchema: z.ZodType<Prisma.itemsGroupByArgs> = z.object({
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithAggregationInputSchema.array(),itemsOrderByWithAggregationInputSchema ]).optional(),
  by: ItemsScalarFieldEnumSchema.array(),
  having: itemsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const itemsFindUniqueArgsSchema: z.ZodType<Prisma.itemsFindUniqueArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const itemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.itemsFindUniqueOrThrowArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const itemsCreateArgsSchema: z.ZodType<Prisma.itemsCreateArgs> = z.object({
  select: itemsSelectSchema.optional(),
  data: z.union([ itemsCreateInputSchema,itemsUncheckedCreateInputSchema ]),
}).strict()

export const itemsUpsertArgsSchema: z.ZodType<Prisma.itemsUpsertArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereUniqueInputSchema,
  create: z.union([ itemsCreateInputSchema,itemsUncheckedCreateInputSchema ]),
  update: z.union([ itemsUpdateInputSchema,itemsUncheckedUpdateInputSchema ]),
}).strict()

export const itemsCreateManyArgsSchema: z.ZodType<Prisma.itemsCreateManyArgs> = z.object({
  data: z.union([ itemsCreateManyInputSchema,itemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const itemsDeleteArgsSchema: z.ZodType<Prisma.itemsDeleteArgs> = z.object({
  select: itemsSelectSchema.optional(),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const itemsUpdateArgsSchema: z.ZodType<Prisma.itemsUpdateArgs> = z.object({
  select: itemsSelectSchema.optional(),
  data: z.union([ itemsUpdateInputSchema,itemsUncheckedUpdateInputSchema ]),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const itemsUpdateManyArgsSchema: z.ZodType<Prisma.itemsUpdateManyArgs> = z.object({
  data: z.union([ itemsUpdateManyMutationInputSchema,itemsUncheckedUpdateManyInputSchema ]),
  where: itemsWhereInputSchema.optional(),
}).strict()

export const itemsDeleteManyArgsSchema: z.ZodType<Prisma.itemsDeleteManyArgs> = z.object({
  where: itemsWhereInputSchema.optional(),
}).strict()

interface itemsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.itemsArgs
  readonly type: Prisma.itemsGetPayload<this['_A']>
}

export const tableSchemas = {
  items: {
    fields: ["id","content","content_text_null","content_text_null_default","intvalue_null","intvalue_null_default"],
    relations: [
    ],
    modelSchema: (itemsCreateInputSchema as any)
      .partial()
      .or((itemsUncheckedCreateInputSchema as any).partial()),
    createSchema: itemsCreateArgsSchema,
    createManySchema: itemsCreateManyArgsSchema,
    findUniqueSchema: itemsFindUniqueArgsSchema,
    findSchema: itemsFindFirstArgsSchema,
    updateSchema: itemsUpdateArgsSchema,
    updateManySchema: itemsUpdateManyArgsSchema,
    upsertSchema: itemsUpsertArgsSchema,
    deleteSchema: itemsDeleteArgsSchema,
    deleteManySchema: itemsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof itemsCreateInputSchema>,
    Prisma.itemsCreateArgs['data'],
    Prisma.itemsUpdateArgs['data'],
    Prisma.itemsFindFirstArgs['select'],
    Prisma.itemsFindFirstArgs['where'],
    Prisma.itemsFindUniqueArgs['where'],
    never,
    Prisma.itemsFindFirstArgs['orderBy'],
    Prisma.ItemsScalarFieldEnum,
    itemsGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
