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

export const DemosScalarFieldEnumSchema = z.enum(['id','name','session_id']);

export const ItemsScalarFieldEnumSchema = z.enum(['id','demo_id','inserted_at']);

export const PlayersScalarFieldEnumSchema = z.enum(['id','color','demo_id','tournament_id','inserted_at','updated_at']);

export const SessionsScalarFieldEnumSchema = z.enum(['id','inserted_at']);

export const SlidersScalarFieldEnumSchema = z.enum(['id','value','demo_id']);

export const TournamentsScalarFieldEnumSchema = z.enum(['id','name','demo_id','inserted_at']);

export const UsersScalarFieldEnumSchema = z.enum(['id','session_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// DEMOS SCHEMA
/////////////////////////////////////////

export const demosSchema = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string(),
})

export type demos = z.infer<typeof demosSchema>

/////////////////////////////////////////
// ITEMS SCHEMA
/////////////////////////////////////////

export const itemsSchema = z.object({
  id: z.string(),
  demo_id: z.string(),
  inserted_at: z.string(),
})

export type items = z.infer<typeof itemsSchema>

/////////////////////////////////////////
// PLAYERS SCHEMA
/////////////////////////////////////////

export const playersSchema = z.object({
  id: z.string(),
  color: z.string(),
  demo_id: z.string(),
  tournament_id: z.string().nullable(),
  inserted_at: z.string(),
  updated_at: z.string(),
})

export type players = z.infer<typeof playersSchema>

/////////////////////////////////////////
// SESSIONS SCHEMA
/////////////////////////////////////////

export const sessionsSchema = z.object({
  id: z.string(),
  inserted_at: z.string(),
})

export type sessions = z.infer<typeof sessionsSchema>

/////////////////////////////////////////
// SLIDERS SCHEMA
/////////////////////////////////////////

export const slidersSchema = z.object({
  id: z.string(),
  value: z.number().int(),
  demo_id: z.string(),
})

export type sliders = z.infer<typeof slidersSchema>

/////////////////////////////////////////
// TOURNAMENTS SCHEMA
/////////////////////////////////////////

export const tournamentsSchema = z.object({
  id: z.string(),
  name: z.string(),
  demo_id: z.string(),
  inserted_at: z.string(),
})

export type tournaments = z.infer<typeof tournamentsSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const usersSchema = z.object({
  id: z.string(),
  session_id: z.string(),
})

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// DEMOS
//------------------------------------------------------

export const demosIncludeSchema: z.ZodType<Prisma.demosInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => sessionsArgsSchema)]).optional(),
  items: z.union([z.boolean(),z.lazy(() => itemsFindManyArgsSchema)]).optional(),
  players: z.union([z.boolean(),z.lazy(() => playersFindManyArgsSchema)]).optional(),
  sliders: z.union([z.boolean(),z.lazy(() => slidersFindManyArgsSchema)]).optional(),
  tournaments: z.union([z.boolean(),z.lazy(() => tournamentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DemosCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const demosArgsSchema: z.ZodType<Prisma.demosArgs> = z.object({
  select: z.lazy(() => demosSelectSchema).optional(),
  include: z.lazy(() => demosIncludeSchema).optional(),
}).strict();

export const demosCountOutputTypeArgsSchema: z.ZodType<Prisma.demosCountOutputTypeArgs> = z.object({
  select: z.lazy(() => demosCountOutputTypeSelectSchema).nullish(),
}).strict();

export const demosCountOutputTypeSelectSchema: z.ZodType<Prisma.demosCountOutputTypeSelect> = z.object({
  items: z.boolean().optional(),
  players: z.boolean().optional(),
  sliders: z.boolean().optional(),
  tournaments: z.boolean().optional(),
}).strict();

export const demosSelectSchema: z.ZodType<Prisma.demosSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  session_id: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => sessionsArgsSchema)]).optional(),
  items: z.union([z.boolean(),z.lazy(() => itemsFindManyArgsSchema)]).optional(),
  players: z.union([z.boolean(),z.lazy(() => playersFindManyArgsSchema)]).optional(),
  sliders: z.union([z.boolean(),z.lazy(() => slidersFindManyArgsSchema)]).optional(),
  tournaments: z.union([z.boolean(),z.lazy(() => tournamentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DemosCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ITEMS
//------------------------------------------------------

export const itemsIncludeSchema: z.ZodType<Prisma.itemsInclude> = z.object({
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
}).strict()

export const itemsArgsSchema: z.ZodType<Prisma.itemsArgs> = z.object({
  select: z.lazy(() => itemsSelectSchema).optional(),
  include: z.lazy(() => itemsIncludeSchema).optional(),
}).strict();

export const itemsSelectSchema: z.ZodType<Prisma.itemsSelect> = z.object({
  id: z.boolean().optional(),
  demo_id: z.boolean().optional(),
  inserted_at: z.boolean().optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
}).strict()

// PLAYERS
//------------------------------------------------------

export const playersIncludeSchema: z.ZodType<Prisma.playersInclude> = z.object({
  tournaments: z.union([z.boolean(),z.lazy(() => tournamentsArgsSchema)]).optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
}).strict()

export const playersArgsSchema: z.ZodType<Prisma.playersArgs> = z.object({
  select: z.lazy(() => playersSelectSchema).optional(),
  include: z.lazy(() => playersIncludeSchema).optional(),
}).strict();

export const playersSelectSchema: z.ZodType<Prisma.playersSelect> = z.object({
  id: z.boolean().optional(),
  color: z.boolean().optional(),
  demo_id: z.boolean().optional(),
  tournament_id: z.boolean().optional(),
  inserted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  tournaments: z.union([z.boolean(),z.lazy(() => tournamentsArgsSchema)]).optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
}).strict()

// SESSIONS
//------------------------------------------------------

export const sessionsIncludeSchema: z.ZodType<Prisma.sessionsInclude> = z.object({
  demos: z.union([z.boolean(),z.lazy(() => demosFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => usersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const sessionsArgsSchema: z.ZodType<Prisma.sessionsArgs> = z.object({
  select: z.lazy(() => sessionsSelectSchema).optional(),
  include: z.lazy(() => sessionsIncludeSchema).optional(),
}).strict();

export const sessionsCountOutputTypeArgsSchema: z.ZodType<Prisma.sessionsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => sessionsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const sessionsCountOutputTypeSelectSchema: z.ZodType<Prisma.sessionsCountOutputTypeSelect> = z.object({
  demos: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const sessionsSelectSchema: z.ZodType<Prisma.sessionsSelect> = z.object({
  id: z.boolean().optional(),
  inserted_at: z.boolean().optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => usersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SLIDERS
//------------------------------------------------------

export const slidersIncludeSchema: z.ZodType<Prisma.slidersInclude> = z.object({
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
}).strict()

export const slidersArgsSchema: z.ZodType<Prisma.slidersArgs> = z.object({
  select: z.lazy(() => slidersSelectSchema).optional(),
  include: z.lazy(() => slidersIncludeSchema).optional(),
}).strict();

export const slidersSelectSchema: z.ZodType<Prisma.slidersSelect> = z.object({
  id: z.boolean().optional(),
  value: z.boolean().optional(),
  demo_id: z.boolean().optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
}).strict()

// TOURNAMENTS
//------------------------------------------------------

export const tournamentsIncludeSchema: z.ZodType<Prisma.tournamentsInclude> = z.object({
  players: z.union([z.boolean(),z.lazy(() => playersFindManyArgsSchema)]).optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TournamentsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const tournamentsArgsSchema: z.ZodType<Prisma.tournamentsArgs> = z.object({
  select: z.lazy(() => tournamentsSelectSchema).optional(),
  include: z.lazy(() => tournamentsIncludeSchema).optional(),
}).strict();

export const tournamentsCountOutputTypeArgsSchema: z.ZodType<Prisma.tournamentsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => tournamentsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const tournamentsCountOutputTypeSelectSchema: z.ZodType<Prisma.tournamentsCountOutputTypeSelect> = z.object({
  players: z.boolean().optional(),
}).strict();

export const tournamentsSelectSchema: z.ZodType<Prisma.tournamentsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  demo_id: z.boolean().optional(),
  inserted_at: z.boolean().optional(),
  players: z.union([z.boolean(),z.lazy(() => playersFindManyArgsSchema)]).optional(),
  demos: z.union([z.boolean(),z.lazy(() => demosArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TournamentsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USERS
//------------------------------------------------------

export const usersIncludeSchema: z.ZodType<Prisma.usersInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => sessionsArgsSchema)]).optional(),
}).strict()

export const usersArgsSchema: z.ZodType<Prisma.usersArgs> = z.object({
  select: z.lazy(() => usersSelectSchema).optional(),
  include: z.lazy(() => usersIncludeSchema).optional(),
}).strict();

export const usersSelectSchema: z.ZodType<Prisma.usersSelect> = z.object({
  id: z.boolean().optional(),
  session_id: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => sessionsArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const demosWhereInputSchema: z.ZodType<Prisma.demosWhereInput> = z.object({
  AND: z.union([ z.lazy(() => demosWhereInputSchema),z.lazy(() => demosWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => demosWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => demosWhereInputSchema),z.lazy(() => demosWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessions: z.union([ z.lazy(() => SessionsRelationFilterSchema),z.lazy(() => sessionsWhereInputSchema) ]).optional(),
  items: z.lazy(() => ItemsListRelationFilterSchema).optional(),
  players: z.lazy(() => PlayersListRelationFilterSchema).optional(),
  sliders: z.lazy(() => SlidersListRelationFilterSchema).optional(),
  tournaments: z.lazy(() => TournamentsListRelationFilterSchema).optional()
}).strict();

export const demosOrderByWithRelationInputSchema: z.ZodType<Prisma.demosOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => sessionsOrderByWithRelationInputSchema).optional(),
  items: z.lazy(() => itemsOrderByRelationAggregateInputSchema).optional(),
  players: z.lazy(() => playersOrderByRelationAggregateInputSchema).optional(),
  sliders: z.lazy(() => slidersOrderByRelationAggregateInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const demosWhereUniqueInputSchema: z.ZodType<Prisma.demosWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const demosOrderByWithAggregationInputSchema: z.ZodType<Prisma.demosOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => demosCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => demosMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => demosMinOrderByAggregateInputSchema).optional()
}).strict();

export const demosScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.demosScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => demosScalarWhereWithAggregatesInputSchema),z.lazy(() => demosScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => demosScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => demosScalarWhereWithAggregatesInputSchema),z.lazy(() => demosScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  session_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const itemsWhereInputSchema: z.ZodType<Prisma.itemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => itemsWhereInputSchema),z.lazy(() => itemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => itemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => itemsWhereInputSchema),z.lazy(() => itemsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demos: z.union([ z.lazy(() => DemosRelationFilterSchema),z.lazy(() => demosWhereInputSchema) ]).optional(),
}).strict();

export const itemsOrderByWithRelationInputSchema: z.ZodType<Prisma.itemsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  demos: z.lazy(() => demosOrderByWithRelationInputSchema).optional()
}).strict();

export const itemsWhereUniqueInputSchema: z.ZodType<Prisma.itemsWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const itemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.itemsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => itemsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => itemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => itemsMinOrderByAggregateInputSchema).optional()
}).strict();

export const itemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.itemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => itemsScalarWhereWithAggregatesInputSchema),z.lazy(() => itemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => itemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => itemsScalarWhereWithAggregatesInputSchema),z.lazy(() => itemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const playersWhereInputSchema: z.ZodType<Prisma.playersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => playersWhereInputSchema),z.lazy(() => playersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => playersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => playersWhereInputSchema),z.lazy(() => playersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournament_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updated_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournaments: z.union([ z.lazy(() => TournamentsRelationFilterSchema),z.lazy(() => tournamentsWhereInputSchema) ]).optional().nullable(),
  demos: z.union([ z.lazy(() => DemosRelationFilterSchema),z.lazy(() => demosWhereInputSchema) ]).optional(),
}).strict();

export const playersOrderByWithRelationInputSchema: z.ZodType<Prisma.playersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  tournament_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tournaments: z.lazy(() => tournamentsOrderByWithRelationInputSchema).optional(),
  demos: z.lazy(() => demosOrderByWithRelationInputSchema).optional()
}).strict();

export const playersWhereUniqueInputSchema: z.ZodType<Prisma.playersWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const playersOrderByWithAggregationInputSchema: z.ZodType<Prisma.playersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  tournament_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => playersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => playersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => playersMinOrderByAggregateInputSchema).optional()
}).strict();

export const playersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.playersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => playersScalarWhereWithAggregatesInputSchema),z.lazy(() => playersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => playersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => playersScalarWhereWithAggregatesInputSchema),z.lazy(() => playersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tournament_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  inserted_at: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updated_at: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const sessionsWhereInputSchema: z.ZodType<Prisma.sessionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => sessionsWhereInputSchema),z.lazy(() => sessionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => sessionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => sessionsWhereInputSchema),z.lazy(() => sessionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demos: z.lazy(() => DemosListRelationFilterSchema).optional(),
  users: z.lazy(() => UsersListRelationFilterSchema).optional()
}).strict();

export const sessionsOrderByWithRelationInputSchema: z.ZodType<Prisma.sessionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  demos: z.lazy(() => demosOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => usersOrderByRelationAggregateInputSchema).optional()
}).strict();

export const sessionsWhereUniqueInputSchema: z.ZodType<Prisma.sessionsWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const sessionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.sessionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => sessionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => sessionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => sessionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const sessionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.sessionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => sessionsScalarWhereWithAggregatesInputSchema),z.lazy(() => sessionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => sessionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => sessionsScalarWhereWithAggregatesInputSchema),z.lazy(() => sessionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const slidersWhereInputSchema: z.ZodType<Prisma.slidersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => slidersWhereInputSchema),z.lazy(() => slidersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => slidersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => slidersWhereInputSchema),z.lazy(() => slidersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demos: z.union([ z.lazy(() => DemosRelationFilterSchema),z.lazy(() => demosWhereInputSchema) ]).optional(),
}).strict();

export const slidersOrderByWithRelationInputSchema: z.ZodType<Prisma.slidersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  demos: z.lazy(() => demosOrderByWithRelationInputSchema).optional()
}).strict();

export const slidersWhereUniqueInputSchema: z.ZodType<Prisma.slidersWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const slidersOrderByWithAggregationInputSchema: z.ZodType<Prisma.slidersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => slidersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => slidersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => slidersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => slidersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => slidersSumOrderByAggregateInputSchema).optional()
}).strict();

export const slidersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.slidersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => slidersScalarWhereWithAggregatesInputSchema),z.lazy(() => slidersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => slidersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => slidersScalarWhereWithAggregatesInputSchema),z.lazy(() => slidersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const tournamentsWhereInputSchema: z.ZodType<Prisma.tournamentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tournamentsWhereInputSchema),z.lazy(() => tournamentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tournamentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tournamentsWhereInputSchema),z.lazy(() => tournamentsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  players: z.lazy(() => PlayersListRelationFilterSchema).optional(),
  demos: z.union([ z.lazy(() => DemosRelationFilterSchema),z.lazy(() => demosWhereInputSchema) ]).optional(),
}).strict();

export const tournamentsOrderByWithRelationInputSchema: z.ZodType<Prisma.tournamentsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  players: z.lazy(() => playersOrderByRelationAggregateInputSchema).optional(),
  demos: z.lazy(() => demosOrderByWithRelationInputSchema).optional()
}).strict();

export const tournamentsWhereUniqueInputSchema: z.ZodType<Prisma.tournamentsWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const tournamentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.tournamentsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => tournamentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => tournamentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => tournamentsMinOrderByAggregateInputSchema).optional()
}).strict();

export const tournamentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.tournamentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => tournamentsScalarWhereWithAggregatesInputSchema),z.lazy(() => tournamentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => tournamentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tournamentsScalarWhereWithAggregatesInputSchema),z.lazy(() => tournamentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const usersWhereInputSchema: z.ZodType<Prisma.usersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessions: z.union([ z.lazy(() => SessionsRelationFilterSchema),z.lazy(() => sessionsWhereInputSchema) ]).optional(),
}).strict();

export const usersOrderByWithRelationInputSchema: z.ZodType<Prisma.usersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => sessionsOrderByWithRelationInputSchema).optional()
}).strict();

export const usersWhereUniqueInputSchema: z.ZodType<Prisma.usersWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const usersOrderByWithAggregationInputSchema: z.ZodType<Prisma.usersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => usersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => usersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => usersMinOrderByAggregateInputSchema).optional()
}).strict();

export const usersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.usersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema),z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema),z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  session_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const demosCreateInputSchema: z.ZodType<Prisma.demosCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  sessions: z.lazy(() => sessionsCreateNestedOneWithoutDemosInputSchema),
  items: z.lazy(() => itemsCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUncheckedCreateInputSchema: z.ZodType<Prisma.demosUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string(),
  items: z.lazy(() => itemsUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUpdateInputSchema: z.ZodType<Prisma.demosUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => sessionsUpdateOneRequiredWithoutDemosNestedInputSchema).optional(),
  items: z.lazy(() => itemsUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateInputSchema: z.ZodType<Prisma.demosUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => itemsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosCreateManyInputSchema: z.ZodType<Prisma.demosCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string()
}).strict();

export const demosUpdateManyMutationInputSchema: z.ZodType<Prisma.demosUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const demosUncheckedUpdateManyInputSchema: z.ZodType<Prisma.demosUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const itemsCreateInputSchema: z.ZodType<Prisma.itemsCreateInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  demos: z.lazy(() => demosCreateNestedOneWithoutItemsInputSchema)
}).strict();

export const itemsUncheckedCreateInputSchema: z.ZodType<Prisma.itemsUncheckedCreateInput> = z.object({
  id: z.string(),
  demo_id: z.string(),
  inserted_at: z.string()
}).strict();

export const itemsUpdateInputSchema: z.ZodType<Prisma.itemsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUpdateOneRequiredWithoutItemsNestedInputSchema).optional()
}).strict();

export const itemsUncheckedUpdateInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const itemsCreateManyInputSchema: z.ZodType<Prisma.itemsCreateManyInput> = z.object({
  id: z.string(),
  demo_id: z.string(),
  inserted_at: z.string()
}).strict();

export const itemsUpdateManyMutationInputSchema: z.ZodType<Prisma.itemsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const itemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const playersCreateInputSchema: z.ZodType<Prisma.playersCreateInput> = z.object({
  id: z.string(),
  color: z.string(),
  inserted_at: z.string(),
  updated_at: z.string(),
  tournaments: z.lazy(() => tournamentsCreateNestedOneWithoutPlayersInputSchema).optional(),
  demos: z.lazy(() => demosCreateNestedOneWithoutPlayersInputSchema)
}).strict();

export const playersUncheckedCreateInputSchema: z.ZodType<Prisma.playersUncheckedCreateInput> = z.object({
  id: z.string(),
  color: z.string(),
  demo_id: z.string(),
  tournament_id: z.string().optional().nullable(),
  inserted_at: z.string(),
  updated_at: z.string()
}).strict();

export const playersUpdateInputSchema: z.ZodType<Prisma.playersUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournaments: z.lazy(() => tournamentsUpdateOneWithoutPlayersNestedInputSchema).optional(),
  demos: z.lazy(() => demosUpdateOneRequiredWithoutPlayersNestedInputSchema).optional()
}).strict();

export const playersUncheckedUpdateInputSchema: z.ZodType<Prisma.playersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournament_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const playersCreateManyInputSchema: z.ZodType<Prisma.playersCreateManyInput> = z.object({
  id: z.string(),
  color: z.string(),
  demo_id: z.string(),
  tournament_id: z.string().optional().nullable(),
  inserted_at: z.string(),
  updated_at: z.string()
}).strict();

export const playersUpdateManyMutationInputSchema: z.ZodType<Prisma.playersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const playersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.playersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournament_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const sessionsCreateInputSchema: z.ZodType<Prisma.sessionsCreateInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  demos: z.lazy(() => demosCreateNestedManyWithoutSessionsInputSchema).optional(),
  users: z.lazy(() => usersCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const sessionsUncheckedCreateInputSchema: z.ZodType<Prisma.sessionsUncheckedCreateInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  demos: z.lazy(() => demosUncheckedCreateNestedManyWithoutSessionsInputSchema).optional(),
  users: z.lazy(() => usersUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const sessionsUpdateInputSchema: z.ZodType<Prisma.sessionsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUpdateManyWithoutSessionsNestedInputSchema).optional(),
  users: z.lazy(() => usersUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const sessionsUncheckedUpdateInputSchema: z.ZodType<Prisma.sessionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional(),
  users: z.lazy(() => usersUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const sessionsCreateManyInputSchema: z.ZodType<Prisma.sessionsCreateManyInput> = z.object({
  id: z.string(),
  inserted_at: z.string()
}).strict();

export const sessionsUpdateManyMutationInputSchema: z.ZodType<Prisma.sessionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const sessionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.sessionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const slidersCreateInputSchema: z.ZodType<Prisma.slidersCreateInput> = z.object({
  id: z.string(),
  value: z.number().int(),
  demos: z.lazy(() => demosCreateNestedOneWithoutSlidersInputSchema)
}).strict();

export const slidersUncheckedCreateInputSchema: z.ZodType<Prisma.slidersUncheckedCreateInput> = z.object({
  id: z.string(),
  value: z.number().int(),
  demo_id: z.string()
}).strict();

export const slidersUpdateInputSchema: z.ZodType<Prisma.slidersUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUpdateOneRequiredWithoutSlidersNestedInputSchema).optional()
}).strict();

export const slidersUncheckedUpdateInputSchema: z.ZodType<Prisma.slidersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const slidersCreateManyInputSchema: z.ZodType<Prisma.slidersCreateManyInput> = z.object({
  id: z.string(),
  value: z.number().int(),
  demo_id: z.string()
}).strict();

export const slidersUpdateManyMutationInputSchema: z.ZodType<Prisma.slidersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const slidersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.slidersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tournamentsCreateInputSchema: z.ZodType<Prisma.tournamentsCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  inserted_at: z.string(),
  players: z.lazy(() => playersCreateNestedManyWithoutTournamentsInputSchema).optional(),
  demos: z.lazy(() => demosCreateNestedOneWithoutTournamentsInputSchema)
}).strict();

export const tournamentsUncheckedCreateInputSchema: z.ZodType<Prisma.tournamentsUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  demo_id: z.string(),
  inserted_at: z.string(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutTournamentsInputSchema).optional()
}).strict();

export const tournamentsUpdateInputSchema: z.ZodType<Prisma.tournamentsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => playersUpdateManyWithoutTournamentsNestedInputSchema).optional(),
  demos: z.lazy(() => demosUpdateOneRequiredWithoutTournamentsNestedInputSchema).optional()
}).strict();

export const tournamentsUncheckedUpdateInputSchema: z.ZodType<Prisma.tournamentsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutTournamentsNestedInputSchema).optional()
}).strict();

export const tournamentsCreateManyInputSchema: z.ZodType<Prisma.tournamentsCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  demo_id: z.string(),
  inserted_at: z.string()
}).strict();

export const tournamentsUpdateManyMutationInputSchema: z.ZodType<Prisma.tournamentsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tournamentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.tournamentsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersCreateInputSchema: z.ZodType<Prisma.usersCreateInput> = z.object({
  id: z.string(),
  sessions: z.lazy(() => sessionsCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const usersUncheckedCreateInputSchema: z.ZodType<Prisma.usersUncheckedCreateInput> = z.object({
  id: z.string(),
  session_id: z.string()
}).strict();

export const usersUpdateInputSchema: z.ZodType<Prisma.usersUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => sessionsUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateInputSchema: z.ZodType<Prisma.usersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersCreateManyInputSchema: z.ZodType<Prisma.usersCreateManyInput> = z.object({
  id: z.string(),
  session_id: z.string()
}).strict();

export const usersUpdateManyMutationInputSchema: z.ZodType<Prisma.usersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.usersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SessionsRelationFilterSchema: z.ZodType<Prisma.SessionsRelationFilter> = z.object({
  is: z.lazy(() => sessionsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => sessionsWhereInputSchema).optional().nullable()
}).strict();

export const ItemsListRelationFilterSchema: z.ZodType<Prisma.ItemsListRelationFilter> = z.object({
  every: z.lazy(() => itemsWhereInputSchema).optional(),
  some: z.lazy(() => itemsWhereInputSchema).optional(),
  none: z.lazy(() => itemsWhereInputSchema).optional()
}).strict();

export const PlayersListRelationFilterSchema: z.ZodType<Prisma.PlayersListRelationFilter> = z.object({
  every: z.lazy(() => playersWhereInputSchema).optional(),
  some: z.lazy(() => playersWhereInputSchema).optional(),
  none: z.lazy(() => playersWhereInputSchema).optional()
}).strict();

export const SlidersListRelationFilterSchema: z.ZodType<Prisma.SlidersListRelationFilter> = z.object({
  every: z.lazy(() => slidersWhereInputSchema).optional(),
  some: z.lazy(() => slidersWhereInputSchema).optional(),
  none: z.lazy(() => slidersWhereInputSchema).optional()
}).strict();

export const TournamentsListRelationFilterSchema: z.ZodType<Prisma.TournamentsListRelationFilter> = z.object({
  every: z.lazy(() => tournamentsWhereInputSchema).optional(),
  some: z.lazy(() => tournamentsWhereInputSchema).optional(),
  none: z.lazy(() => tournamentsWhereInputSchema).optional()
}).strict();

export const itemsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.itemsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const playersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.playersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const slidersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.slidersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tournamentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.tournamentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const demosCountOrderByAggregateInputSchema: z.ZodType<Prisma.demosCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const demosMaxOrderByAggregateInputSchema: z.ZodType<Prisma.demosMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const demosMinOrderByAggregateInputSchema: z.ZodType<Prisma.demosMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional()
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

export const DemosRelationFilterSchema: z.ZodType<Prisma.DemosRelationFilter> = z.object({
  is: z.lazy(() => demosWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => demosWhereInputSchema).optional().nullable()
}).strict();

export const itemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.itemsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const itemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.itemsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const itemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.itemsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
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

export const TournamentsRelationFilterSchema: z.ZodType<Prisma.TournamentsRelationFilter> = z.object({
  is: z.lazy(() => tournamentsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => tournamentsWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const playersCountOrderByAggregateInputSchema: z.ZodType<Prisma.playersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  tournament_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const playersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.playersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  tournament_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const playersMinOrderByAggregateInputSchema: z.ZodType<Prisma.playersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  tournament_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
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

export const DemosListRelationFilterSchema: z.ZodType<Prisma.DemosListRelationFilter> = z.object({
  every: z.lazy(() => demosWhereInputSchema).optional(),
  some: z.lazy(() => demosWhereInputSchema).optional(),
  none: z.lazy(() => demosWhereInputSchema).optional()
}).strict();

export const UsersListRelationFilterSchema: z.ZodType<Prisma.UsersListRelationFilter> = z.object({
  every: z.lazy(() => usersWhereInputSchema).optional(),
  some: z.lazy(() => usersWhereInputSchema).optional(),
  none: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const demosOrderByRelationAggregateInputSchema: z.ZodType<Prisma.demosOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.usersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const sessionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.sessionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const sessionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.sessionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const sessionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.sessionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const slidersCountOrderByAggregateInputSchema: z.ZodType<Prisma.slidersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const slidersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.slidersAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const slidersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.slidersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const slidersMinOrderByAggregateInputSchema: z.ZodType<Prisma.slidersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const slidersSumOrderByAggregateInputSchema: z.ZodType<Prisma.slidersSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const tournamentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.tournamentsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tournamentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.tournamentsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const tournamentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.tournamentsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  demo_id: z.lazy(() => SortOrderSchema).optional(),
  inserted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersCountOrderByAggregateInputSchema: z.ZodType<Prisma.usersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.usersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersMinOrderByAggregateInputSchema: z.ZodType<Prisma.usersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const sessionsCreateNestedOneWithoutDemosInputSchema: z.ZodType<Prisma.sessionsCreateNestedOneWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => sessionsCreateWithoutDemosInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutDemosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => sessionsCreateOrConnectWithoutDemosInputSchema).optional(),
  connect: z.lazy(() => sessionsWhereUniqueInputSchema).optional()
}).strict();

export const itemsCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.itemsCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => itemsCreateWithoutDemosInputSchema),z.lazy(() => itemsCreateWithoutDemosInputSchema).array(),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => itemsCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const playersCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.playersCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutDemosInputSchema),z.lazy(() => playersCreateWithoutDemosInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const slidersCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.slidersCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => slidersCreateWithoutDemosInputSchema),z.lazy(() => slidersCreateWithoutDemosInputSchema).array(),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => slidersCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const tournamentsCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => tournamentsCreateWithoutDemosInputSchema),z.lazy(() => tournamentsCreateWithoutDemosInputSchema).array(),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tournamentsCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const itemsUncheckedCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.itemsUncheckedCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => itemsCreateWithoutDemosInputSchema),z.lazy(() => itemsCreateWithoutDemosInputSchema).array(),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => itemsCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const playersUncheckedCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.playersUncheckedCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutDemosInputSchema),z.lazy(() => playersCreateWithoutDemosInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const slidersUncheckedCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.slidersUncheckedCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => slidersCreateWithoutDemosInputSchema),z.lazy(() => slidersCreateWithoutDemosInputSchema).array(),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => slidersCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const tournamentsUncheckedCreateNestedManyWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUncheckedCreateNestedManyWithoutDemosInput> = z.object({
  create: z.union([ z.lazy(() => tournamentsCreateWithoutDemosInputSchema),z.lazy(() => tournamentsCreateWithoutDemosInputSchema).array(),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tournamentsCreateManyDemosInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const sessionsUpdateOneRequiredWithoutDemosNestedInputSchema: z.ZodType<Prisma.sessionsUpdateOneRequiredWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => sessionsCreateWithoutDemosInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutDemosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => sessionsCreateOrConnectWithoutDemosInputSchema).optional(),
  upsert: z.lazy(() => sessionsUpsertWithoutDemosInputSchema).optional(),
  connect: z.lazy(() => sessionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => sessionsUpdateWithoutDemosInputSchema),z.lazy(() => sessionsUncheckedUpdateWithoutDemosInputSchema) ]).optional(),
}).strict();

export const itemsUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.itemsUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => itemsCreateWithoutDemosInputSchema),z.lazy(() => itemsCreateWithoutDemosInputSchema).array(),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => itemsUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => itemsUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => itemsCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => itemsUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => itemsUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => itemsUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => itemsUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => itemsScalarWhereInputSchema),z.lazy(() => itemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const playersUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.playersUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutDemosInputSchema),z.lazy(() => playersCreateWithoutDemosInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => playersUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => playersUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => playersUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => playersUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => playersUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => playersUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => playersScalarWhereInputSchema),z.lazy(() => playersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const slidersUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.slidersUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => slidersCreateWithoutDemosInputSchema),z.lazy(() => slidersCreateWithoutDemosInputSchema).array(),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => slidersUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => slidersUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => slidersCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => slidersUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => slidersUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => slidersUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => slidersUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => slidersScalarWhereInputSchema),z.lazy(() => slidersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const tournamentsUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.tournamentsUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => tournamentsCreateWithoutDemosInputSchema),z.lazy(() => tournamentsCreateWithoutDemosInputSchema).array(),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tournamentsUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => tournamentsUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tournamentsCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tournamentsUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => tournamentsUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tournamentsUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => tournamentsUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tournamentsScalarWhereInputSchema),z.lazy(() => tournamentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const itemsUncheckedUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => itemsCreateWithoutDemosInputSchema),z.lazy(() => itemsCreateWithoutDemosInputSchema).array(),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => itemsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => itemsUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => itemsUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => itemsCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => itemsWhereUniqueInputSchema),z.lazy(() => itemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => itemsUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => itemsUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => itemsUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => itemsUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => itemsScalarWhereInputSchema),z.lazy(() => itemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const playersUncheckedUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.playersUncheckedUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutDemosInputSchema),z.lazy(() => playersCreateWithoutDemosInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => playersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => playersUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => playersUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => playersUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => playersUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => playersUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => playersUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => playersScalarWhereInputSchema),z.lazy(() => playersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const slidersUncheckedUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.slidersUncheckedUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => slidersCreateWithoutDemosInputSchema),z.lazy(() => slidersCreateWithoutDemosInputSchema).array(),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema),z.lazy(() => slidersCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => slidersUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => slidersUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => slidersCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => slidersWhereUniqueInputSchema),z.lazy(() => slidersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => slidersUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => slidersUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => slidersUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => slidersUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => slidersScalarWhereInputSchema),z.lazy(() => slidersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const tournamentsUncheckedUpdateManyWithoutDemosNestedInputSchema: z.ZodType<Prisma.tournamentsUncheckedUpdateManyWithoutDemosNestedInput> = z.object({
  create: z.union([ z.lazy(() => tournamentsCreateWithoutDemosInputSchema),z.lazy(() => tournamentsCreateWithoutDemosInputSchema).array(),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema),z.lazy(() => tournamentsCreateOrConnectWithoutDemosInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => tournamentsUpsertWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => tournamentsUpsertWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  createMany: z.lazy(() => tournamentsCreateManyDemosInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => tournamentsWhereUniqueInputSchema),z.lazy(() => tournamentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => tournamentsUpdateWithWhereUniqueWithoutDemosInputSchema),z.lazy(() => tournamentsUpdateWithWhereUniqueWithoutDemosInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => tournamentsUpdateManyWithWhereWithoutDemosInputSchema),z.lazy(() => tournamentsUpdateManyWithWhereWithoutDemosInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => tournamentsScalarWhereInputSchema),z.lazy(() => tournamentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const demosCreateNestedOneWithoutItemsInputSchema: z.ZodType<Prisma.demosCreateNestedOneWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutItemsInputSchema),z.lazy(() => demosUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional()
}).strict();

export const demosUpdateOneRequiredWithoutItemsNestedInputSchema: z.ZodType<Prisma.demosUpdateOneRequiredWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutItemsInputSchema),z.lazy(() => demosUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutItemsInputSchema).optional(),
  upsert: z.lazy(() => demosUpsertWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => demosUpdateWithoutItemsInputSchema),z.lazy(() => demosUncheckedUpdateWithoutItemsInputSchema) ]).optional(),
}).strict();

export const tournamentsCreateNestedOneWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsCreateNestedOneWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => tournamentsCreateWithoutPlayersInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tournamentsCreateOrConnectWithoutPlayersInputSchema).optional(),
  connect: z.lazy(() => tournamentsWhereUniqueInputSchema).optional()
}).strict();

export const demosCreateNestedOneWithoutPlayersInputSchema: z.ZodType<Prisma.demosCreateNestedOneWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutPlayersInputSchema),z.lazy(() => demosUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutPlayersInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional()
}).strict();

export const tournamentsUpdateOneWithoutPlayersNestedInputSchema: z.ZodType<Prisma.tournamentsUpdateOneWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => tournamentsCreateWithoutPlayersInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => tournamentsCreateOrConnectWithoutPlayersInputSchema).optional(),
  upsert: z.lazy(() => tournamentsUpsertWithoutPlayersInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => tournamentsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => tournamentsUpdateWithoutPlayersInputSchema),z.lazy(() => tournamentsUncheckedUpdateWithoutPlayersInputSchema) ]).optional(),
}).strict();

export const demosUpdateOneRequiredWithoutPlayersNestedInputSchema: z.ZodType<Prisma.demosUpdateOneRequiredWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutPlayersInputSchema),z.lazy(() => demosUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutPlayersInputSchema).optional(),
  upsert: z.lazy(() => demosUpsertWithoutPlayersInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => demosUpdateWithoutPlayersInputSchema),z.lazy(() => demosUncheckedUpdateWithoutPlayersInputSchema) ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const demosCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.demosCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutSessionsInputSchema),z.lazy(() => demosCreateWithoutSessionsInputSchema).array(),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => demosCreateManySessionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const usersCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.usersCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutSessionsInputSchema),z.lazy(() => usersCreateWithoutSessionsInputSchema).array(),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => usersCreateManySessionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const demosUncheckedCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.demosUncheckedCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutSessionsInputSchema),z.lazy(() => demosCreateWithoutSessionsInputSchema).array(),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => demosCreateManySessionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const usersUncheckedCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.usersUncheckedCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutSessionsInputSchema),z.lazy(() => usersCreateWithoutSessionsInputSchema).array(),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => usersCreateManySessionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const demosUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.demosUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutSessionsInputSchema),z.lazy(() => demosCreateWithoutSessionsInputSchema).array(),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => demosUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => demosUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => demosCreateManySessionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => demosUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => demosUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => demosUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => demosUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => demosScalarWhereInputSchema),z.lazy(() => demosScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const usersUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.usersUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutSessionsInputSchema),z.lazy(() => usersCreateWithoutSessionsInputSchema).array(),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => usersUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => usersUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => usersCreateManySessionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => usersUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => usersUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => usersUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => usersUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => usersScalarWhereInputSchema),z.lazy(() => usersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const demosUncheckedUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.demosUncheckedUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutSessionsInputSchema),z.lazy(() => demosCreateWithoutSessionsInputSchema).array(),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => demosCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => demosUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => demosUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => demosCreateManySessionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => demosWhereUniqueInputSchema),z.lazy(() => demosWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => demosUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => demosUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => demosUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => demosUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => demosScalarWhereInputSchema),z.lazy(() => demosScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const usersUncheckedUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.usersUncheckedUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutSessionsInputSchema),z.lazy(() => usersCreateWithoutSessionsInputSchema).array(),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => usersCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => usersUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => usersUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => usersCreateManySessionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => usersWhereUniqueInputSchema),z.lazy(() => usersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => usersUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => usersUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => usersUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => usersUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => usersScalarWhereInputSchema),z.lazy(() => usersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const demosCreateNestedOneWithoutSlidersInputSchema: z.ZodType<Prisma.demosCreateNestedOneWithoutSlidersInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutSlidersInputSchema),z.lazy(() => demosUncheckedCreateWithoutSlidersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutSlidersInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const demosUpdateOneRequiredWithoutSlidersNestedInputSchema: z.ZodType<Prisma.demosUpdateOneRequiredWithoutSlidersNestedInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutSlidersInputSchema),z.lazy(() => demosUncheckedCreateWithoutSlidersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutSlidersInputSchema).optional(),
  upsert: z.lazy(() => demosUpsertWithoutSlidersInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => demosUpdateWithoutSlidersInputSchema),z.lazy(() => demosUncheckedUpdateWithoutSlidersInputSchema) ]).optional(),
}).strict();

export const playersCreateNestedManyWithoutTournamentsInputSchema: z.ZodType<Prisma.playersCreateNestedManyWithoutTournamentsInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutTournamentsInputSchema),z.lazy(() => playersCreateWithoutTournamentsInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema),z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyTournamentsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const demosCreateNestedOneWithoutTournamentsInputSchema: z.ZodType<Prisma.demosCreateNestedOneWithoutTournamentsInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutTournamentsInputSchema),z.lazy(() => demosUncheckedCreateWithoutTournamentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutTournamentsInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional()
}).strict();

export const playersUncheckedCreateNestedManyWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUncheckedCreateNestedManyWithoutTournamentsInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutTournamentsInputSchema),z.lazy(() => playersCreateWithoutTournamentsInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema),z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyTournamentsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const playersUpdateManyWithoutTournamentsNestedInputSchema: z.ZodType<Prisma.playersUpdateManyWithoutTournamentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutTournamentsInputSchema),z.lazy(() => playersCreateWithoutTournamentsInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema),z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => playersUpsertWithWhereUniqueWithoutTournamentsInputSchema),z.lazy(() => playersUpsertWithWhereUniqueWithoutTournamentsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyTournamentsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => playersUpdateWithWhereUniqueWithoutTournamentsInputSchema),z.lazy(() => playersUpdateWithWhereUniqueWithoutTournamentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => playersUpdateManyWithWhereWithoutTournamentsInputSchema),z.lazy(() => playersUpdateManyWithWhereWithoutTournamentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => playersScalarWhereInputSchema),z.lazy(() => playersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const demosUpdateOneRequiredWithoutTournamentsNestedInputSchema: z.ZodType<Prisma.demosUpdateOneRequiredWithoutTournamentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => demosCreateWithoutTournamentsInputSchema),z.lazy(() => demosUncheckedCreateWithoutTournamentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => demosCreateOrConnectWithoutTournamentsInputSchema).optional(),
  upsert: z.lazy(() => demosUpsertWithoutTournamentsInputSchema).optional(),
  connect: z.lazy(() => demosWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => demosUpdateWithoutTournamentsInputSchema),z.lazy(() => demosUncheckedUpdateWithoutTournamentsInputSchema) ]).optional(),
}).strict();

export const playersUncheckedUpdateManyWithoutTournamentsNestedInputSchema: z.ZodType<Prisma.playersUncheckedUpdateManyWithoutTournamentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => playersCreateWithoutTournamentsInputSchema),z.lazy(() => playersCreateWithoutTournamentsInputSchema).array(),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema),z.lazy(() => playersCreateOrConnectWithoutTournamentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => playersUpsertWithWhereUniqueWithoutTournamentsInputSchema),z.lazy(() => playersUpsertWithWhereUniqueWithoutTournamentsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => playersCreateManyTournamentsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => playersWhereUniqueInputSchema),z.lazy(() => playersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => playersUpdateWithWhereUniqueWithoutTournamentsInputSchema),z.lazy(() => playersUpdateWithWhereUniqueWithoutTournamentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => playersUpdateManyWithWhereWithoutTournamentsInputSchema),z.lazy(() => playersUpdateManyWithWhereWithoutTournamentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => playersScalarWhereInputSchema),z.lazy(() => playersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const sessionsCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.sessionsCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => sessionsCreateWithoutUsersInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => sessionsCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => sessionsWhereUniqueInputSchema).optional()
}).strict();

export const sessionsUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.sessionsUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => sessionsCreateWithoutUsersInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => sessionsCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => sessionsUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => sessionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => sessionsUpdateWithoutUsersInputSchema),z.lazy(() => sessionsUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
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

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const sessionsCreateWithoutDemosInputSchema: z.ZodType<Prisma.sessionsCreateWithoutDemosInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  users: z.lazy(() => usersCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const sessionsUncheckedCreateWithoutDemosInputSchema: z.ZodType<Prisma.sessionsUncheckedCreateWithoutDemosInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  users: z.lazy(() => usersUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const sessionsCreateOrConnectWithoutDemosInputSchema: z.ZodType<Prisma.sessionsCreateOrConnectWithoutDemosInput> = z.object({
  where: z.lazy(() => sessionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => sessionsCreateWithoutDemosInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const itemsCreateWithoutDemosInputSchema: z.ZodType<Prisma.itemsCreateWithoutDemosInput> = z.object({
  id: z.string(),
  inserted_at: z.string()
}).strict();

export const itemsUncheckedCreateWithoutDemosInputSchema: z.ZodType<Prisma.itemsUncheckedCreateWithoutDemosInput> = z.object({
  id: z.string(),
  inserted_at: z.string()
}).strict();

export const itemsCreateOrConnectWithoutDemosInputSchema: z.ZodType<Prisma.itemsCreateOrConnectWithoutDemosInput> = z.object({
  where: z.lazy(() => itemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => itemsCreateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const itemsCreateManyDemosInputEnvelopeSchema: z.ZodType<Prisma.itemsCreateManyDemosInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => itemsCreateManyDemosInputSchema),z.lazy(() => itemsCreateManyDemosInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const playersCreateWithoutDemosInputSchema: z.ZodType<Prisma.playersCreateWithoutDemosInput> = z.object({
  id: z.string(),
  color: z.string(),
  inserted_at: z.string(),
  updated_at: z.string(),
  tournaments: z.lazy(() => tournamentsCreateNestedOneWithoutPlayersInputSchema).optional()
}).strict();

export const playersUncheckedCreateWithoutDemosInputSchema: z.ZodType<Prisma.playersUncheckedCreateWithoutDemosInput> = z.object({
  id: z.string(),
  color: z.string(),
  tournament_id: z.string().optional().nullable(),
  inserted_at: z.string(),
  updated_at: z.string()
}).strict();

export const playersCreateOrConnectWithoutDemosInputSchema: z.ZodType<Prisma.playersCreateOrConnectWithoutDemosInput> = z.object({
  where: z.lazy(() => playersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => playersCreateWithoutDemosInputSchema),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const playersCreateManyDemosInputEnvelopeSchema: z.ZodType<Prisma.playersCreateManyDemosInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => playersCreateManyDemosInputSchema),z.lazy(() => playersCreateManyDemosInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const slidersCreateWithoutDemosInputSchema: z.ZodType<Prisma.slidersCreateWithoutDemosInput> = z.object({
  id: z.string(),
  value: z.number()
}).strict();

export const slidersUncheckedCreateWithoutDemosInputSchema: z.ZodType<Prisma.slidersUncheckedCreateWithoutDemosInput> = z.object({
  id: z.string(),
  value: z.number()
}).strict();

export const slidersCreateOrConnectWithoutDemosInputSchema: z.ZodType<Prisma.slidersCreateOrConnectWithoutDemosInput> = z.object({
  where: z.lazy(() => slidersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => slidersCreateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const slidersCreateManyDemosInputEnvelopeSchema: z.ZodType<Prisma.slidersCreateManyDemosInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => slidersCreateManyDemosInputSchema),z.lazy(() => slidersCreateManyDemosInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const tournamentsCreateWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsCreateWithoutDemosInput> = z.object({
  id: z.string(),
  name: z.string(),
  inserted_at: z.string(),
  players: z.lazy(() => playersCreateNestedManyWithoutTournamentsInputSchema).optional()
}).strict();

export const tournamentsUncheckedCreateWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUncheckedCreateWithoutDemosInput> = z.object({
  id: z.string(),
  name: z.string(),
  inserted_at: z.string(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutTournamentsInputSchema).optional()
}).strict();

export const tournamentsCreateOrConnectWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsCreateOrConnectWithoutDemosInput> = z.object({
  where: z.lazy(() => tournamentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tournamentsCreateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const tournamentsCreateManyDemosInputEnvelopeSchema: z.ZodType<Prisma.tournamentsCreateManyDemosInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => tournamentsCreateManyDemosInputSchema),z.lazy(() => tournamentsCreateManyDemosInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const sessionsUpsertWithoutDemosInputSchema: z.ZodType<Prisma.sessionsUpsertWithoutDemosInput> = z.object({
  update: z.union([ z.lazy(() => sessionsUpdateWithoutDemosInputSchema),z.lazy(() => sessionsUncheckedUpdateWithoutDemosInputSchema) ]),
  create: z.union([ z.lazy(() => sessionsCreateWithoutDemosInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const sessionsUpdateWithoutDemosInputSchema: z.ZodType<Prisma.sessionsUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => usersUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const sessionsUncheckedUpdateWithoutDemosInputSchema: z.ZodType<Prisma.sessionsUncheckedUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => usersUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const itemsUpsertWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.itemsUpsertWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => itemsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => itemsUpdateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedUpdateWithoutDemosInputSchema) ]),
  create: z.union([ z.lazy(() => itemsCreateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const itemsUpdateWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.itemsUpdateWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => itemsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => itemsUpdateWithoutDemosInputSchema),z.lazy(() => itemsUncheckedUpdateWithoutDemosInputSchema) ]),
}).strict();

export const itemsUpdateManyWithWhereWithoutDemosInputSchema: z.ZodType<Prisma.itemsUpdateManyWithWhereWithoutDemosInput> = z.object({
  where: z.lazy(() => itemsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => itemsUpdateManyMutationInputSchema),z.lazy(() => itemsUncheckedUpdateManyWithoutItemsInputSchema) ]),
}).strict();

export const itemsScalarWhereInputSchema: z.ZodType<Prisma.itemsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => itemsScalarWhereInputSchema),z.lazy(() => itemsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => itemsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => itemsScalarWhereInputSchema),z.lazy(() => itemsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const playersUpsertWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.playersUpsertWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => playersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => playersUpdateWithoutDemosInputSchema),z.lazy(() => playersUncheckedUpdateWithoutDemosInputSchema) ]),
  create: z.union([ z.lazy(() => playersCreateWithoutDemosInputSchema),z.lazy(() => playersUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const playersUpdateWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.playersUpdateWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => playersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => playersUpdateWithoutDemosInputSchema),z.lazy(() => playersUncheckedUpdateWithoutDemosInputSchema) ]),
}).strict();

export const playersUpdateManyWithWhereWithoutDemosInputSchema: z.ZodType<Prisma.playersUpdateManyWithWhereWithoutDemosInput> = z.object({
  where: z.lazy(() => playersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => playersUpdateManyMutationInputSchema),z.lazy(() => playersUncheckedUpdateManyWithoutPlayersInputSchema) ]),
}).strict();

export const playersScalarWhereInputSchema: z.ZodType<Prisma.playersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => playersScalarWhereInputSchema),z.lazy(() => playersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => playersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => playersScalarWhereInputSchema),z.lazy(() => playersScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournament_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updated_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const slidersUpsertWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.slidersUpsertWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => slidersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => slidersUpdateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedUpdateWithoutDemosInputSchema) ]),
  create: z.union([ z.lazy(() => slidersCreateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const slidersUpdateWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.slidersUpdateWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => slidersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => slidersUpdateWithoutDemosInputSchema),z.lazy(() => slidersUncheckedUpdateWithoutDemosInputSchema) ]),
}).strict();

export const slidersUpdateManyWithWhereWithoutDemosInputSchema: z.ZodType<Prisma.slidersUpdateManyWithWhereWithoutDemosInput> = z.object({
  where: z.lazy(() => slidersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => slidersUpdateManyMutationInputSchema),z.lazy(() => slidersUncheckedUpdateManyWithoutSlidersInputSchema) ]),
}).strict();

export const slidersScalarWhereInputSchema: z.ZodType<Prisma.slidersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => slidersScalarWhereInputSchema),z.lazy(() => slidersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => slidersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => slidersScalarWhereInputSchema),z.lazy(() => slidersScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const tournamentsUpsertWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUpsertWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => tournamentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => tournamentsUpdateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedUpdateWithoutDemosInputSchema) ]),
  create: z.union([ z.lazy(() => tournamentsCreateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutDemosInputSchema) ]),
}).strict();

export const tournamentsUpdateWithWhereUniqueWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUpdateWithWhereUniqueWithoutDemosInput> = z.object({
  where: z.lazy(() => tournamentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => tournamentsUpdateWithoutDemosInputSchema),z.lazy(() => tournamentsUncheckedUpdateWithoutDemosInputSchema) ]),
}).strict();

export const tournamentsUpdateManyWithWhereWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUpdateManyWithWhereWithoutDemosInput> = z.object({
  where: z.lazy(() => tournamentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => tournamentsUpdateManyMutationInputSchema),z.lazy(() => tournamentsUncheckedUpdateManyWithoutTournamentsInputSchema) ]),
}).strict();

export const tournamentsScalarWhereInputSchema: z.ZodType<Prisma.tournamentsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => tournamentsScalarWhereInputSchema),z.lazy(() => tournamentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => tournamentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => tournamentsScalarWhereInputSchema),z.lazy(() => tournamentsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  demo_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inserted_at: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const demosCreateWithoutItemsInputSchema: z.ZodType<Prisma.demosCreateWithoutItemsInput> = z.object({
  id: z.string(),
  name: z.string(),
  sessions: z.lazy(() => sessionsCreateNestedOneWithoutDemosInputSchema),
  players: z.lazy(() => playersCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.demosUncheckedCreateWithoutItemsInput> = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.demosCreateOrConnectWithoutItemsInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => demosCreateWithoutItemsInputSchema),z.lazy(() => demosUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const demosUpsertWithoutItemsInputSchema: z.ZodType<Prisma.demosUpsertWithoutItemsInput> = z.object({
  update: z.union([ z.lazy(() => demosUpdateWithoutItemsInputSchema),z.lazy(() => demosUncheckedUpdateWithoutItemsInputSchema) ]),
  create: z.union([ z.lazy(() => demosCreateWithoutItemsInputSchema),z.lazy(() => demosUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const demosUpdateWithoutItemsInputSchema: z.ZodType<Prisma.demosUpdateWithoutItemsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => sessionsUpdateOneRequiredWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.demosUncheckedUpdateWithoutItemsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const tournamentsCreateWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsCreateWithoutPlayersInput> = z.object({
  id: z.string(),
  name: z.string(),
  inserted_at: z.string(),
  demos: z.lazy(() => demosCreateNestedOneWithoutTournamentsInputSchema)
}).strict();

export const tournamentsUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsUncheckedCreateWithoutPlayersInput> = z.object({
  id: z.string(),
  name: z.string(),
  demo_id: z.string(),
  inserted_at: z.string()
}).strict();

export const tournamentsCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsCreateOrConnectWithoutPlayersInput> = z.object({
  where: z.lazy(() => tournamentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => tournamentsCreateWithoutPlayersInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const demosCreateWithoutPlayersInputSchema: z.ZodType<Prisma.demosCreateWithoutPlayersInput> = z.object({
  id: z.string(),
  name: z.string(),
  sessions: z.lazy(() => sessionsCreateNestedOneWithoutDemosInputSchema),
  items: z.lazy(() => itemsCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.demosUncheckedCreateWithoutPlayersInput> = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string(),
  items: z.lazy(() => itemsUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.demosCreateOrConnectWithoutPlayersInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => demosCreateWithoutPlayersInputSchema),z.lazy(() => demosUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const tournamentsUpsertWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsUpsertWithoutPlayersInput> = z.object({
  update: z.union([ z.lazy(() => tournamentsUpdateWithoutPlayersInputSchema),z.lazy(() => tournamentsUncheckedUpdateWithoutPlayersInputSchema) ]),
  create: z.union([ z.lazy(() => tournamentsCreateWithoutPlayersInputSchema),z.lazy(() => tournamentsUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const tournamentsUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUpdateOneRequiredWithoutTournamentsNestedInputSchema).optional()
}).strict();

export const tournamentsUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.tournamentsUncheckedUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const demosUpsertWithoutPlayersInputSchema: z.ZodType<Prisma.demosUpsertWithoutPlayersInput> = z.object({
  update: z.union([ z.lazy(() => demosUpdateWithoutPlayersInputSchema),z.lazy(() => demosUncheckedUpdateWithoutPlayersInputSchema) ]),
  create: z.union([ z.lazy(() => demosCreateWithoutPlayersInputSchema),z.lazy(() => demosUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const demosUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.demosUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => sessionsUpdateOneRequiredWithoutDemosNestedInputSchema).optional(),
  items: z.lazy(() => itemsUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.demosUncheckedUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => itemsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosCreateWithoutSessionsInputSchema: z.ZodType<Prisma.demosCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  items: z.lazy(() => itemsCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.demosUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  items: z.lazy(() => itemsUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.demosCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => demosCreateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const demosCreateManySessionsInputEnvelopeSchema: z.ZodType<Prisma.demosCreateManySessionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => demosCreateManySessionsInputSchema),z.lazy(() => demosCreateManySessionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const usersCreateWithoutSessionsInputSchema: z.ZodType<Prisma.usersCreateWithoutSessionsInput> = z.object({
  id: z.string()
}).strict();

export const usersUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string()
}).strict();

export const usersCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const usersCreateManySessionsInputEnvelopeSchema: z.ZodType<Prisma.usersCreateManySessionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => usersCreateManySessionsInputSchema),z.lazy(() => usersCreateManySessionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const demosUpsertWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.demosUpsertWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => demosUpdateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => demosCreateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const demosUpdateWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.demosUpdateWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => demosUpdateWithoutSessionsInputSchema),z.lazy(() => demosUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const demosUpdateManyWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.demosUpdateManyWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => demosScalarWhereInputSchema),
  data: z.union([ z.lazy(() => demosUpdateManyMutationInputSchema),z.lazy(() => demosUncheckedUpdateManyWithoutDemosInputSchema) ]),
}).strict();

export const demosScalarWhereInputSchema: z.ZodType<Prisma.demosScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => demosScalarWhereInputSchema),z.lazy(() => demosScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => demosScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => demosScalarWhereInputSchema),z.lazy(() => demosScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const usersUpsertWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.usersUpsertWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => usersUpdateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const usersUpdateWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.usersUpdateWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => usersUpdateWithoutSessionsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const usersUpdateManyWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.usersUpdateManyWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => usersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => usersUpdateManyMutationInputSchema),z.lazy(() => usersUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const usersScalarWhereInputSchema: z.ZodType<Prisma.usersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => usersScalarWhereInputSchema),z.lazy(() => usersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersScalarWhereInputSchema),z.lazy(() => usersScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const demosCreateWithoutSlidersInputSchema: z.ZodType<Prisma.demosCreateWithoutSlidersInput> = z.object({
  id: z.string(),
  name: z.string(),
  sessions: z.lazy(() => sessionsCreateNestedOneWithoutDemosInputSchema),
  items: z.lazy(() => itemsCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUncheckedCreateWithoutSlidersInputSchema: z.ZodType<Prisma.demosUncheckedCreateWithoutSlidersInput> = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string(),
  items: z.lazy(() => itemsUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosCreateOrConnectWithoutSlidersInputSchema: z.ZodType<Prisma.demosCreateOrConnectWithoutSlidersInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => demosCreateWithoutSlidersInputSchema),z.lazy(() => demosUncheckedCreateWithoutSlidersInputSchema) ]),
}).strict();

export const demosUpsertWithoutSlidersInputSchema: z.ZodType<Prisma.demosUpsertWithoutSlidersInput> = z.object({
  update: z.union([ z.lazy(() => demosUpdateWithoutSlidersInputSchema),z.lazy(() => demosUncheckedUpdateWithoutSlidersInputSchema) ]),
  create: z.union([ z.lazy(() => demosCreateWithoutSlidersInputSchema),z.lazy(() => demosUncheckedCreateWithoutSlidersInputSchema) ]),
}).strict();

export const demosUpdateWithoutSlidersInputSchema: z.ZodType<Prisma.demosUpdateWithoutSlidersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => sessionsUpdateOneRequiredWithoutDemosNestedInputSchema).optional(),
  items: z.lazy(() => itemsUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateWithoutSlidersInputSchema: z.ZodType<Prisma.demosUncheckedUpdateWithoutSlidersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => itemsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const playersCreateWithoutTournamentsInputSchema: z.ZodType<Prisma.playersCreateWithoutTournamentsInput> = z.object({
  id: z.string(),
  color: z.string(),
  inserted_at: z.string(),
  updated_at: z.string(),
  demos: z.lazy(() => demosCreateNestedOneWithoutPlayersInputSchema)
}).strict();

export const playersUncheckedCreateWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUncheckedCreateWithoutTournamentsInput> = z.object({
  id: z.string(),
  color: z.string(),
  demo_id: z.string(),
  inserted_at: z.string(),
  updated_at: z.string()
}).strict();

export const playersCreateOrConnectWithoutTournamentsInputSchema: z.ZodType<Prisma.playersCreateOrConnectWithoutTournamentsInput> = z.object({
  where: z.lazy(() => playersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => playersCreateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema) ]),
}).strict();

export const playersCreateManyTournamentsInputEnvelopeSchema: z.ZodType<Prisma.playersCreateManyTournamentsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => playersCreateManyTournamentsInputSchema),z.lazy(() => playersCreateManyTournamentsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const demosCreateWithoutTournamentsInputSchema: z.ZodType<Prisma.demosCreateWithoutTournamentsInput> = z.object({
  id: z.string(),
  name: z.string(),
  sessions: z.lazy(() => sessionsCreateNestedOneWithoutDemosInputSchema),
  items: z.lazy(() => itemsCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosUncheckedCreateWithoutTournamentsInputSchema: z.ZodType<Prisma.demosUncheckedCreateWithoutTournamentsInput> = z.object({
  id: z.string(),
  name: z.string(),
  session_id: z.string(),
  items: z.lazy(() => itemsUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  players: z.lazy(() => playersUncheckedCreateNestedManyWithoutDemosInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedCreateNestedManyWithoutDemosInputSchema).optional()
}).strict();

export const demosCreateOrConnectWithoutTournamentsInputSchema: z.ZodType<Prisma.demosCreateOrConnectWithoutTournamentsInput> = z.object({
  where: z.lazy(() => demosWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => demosCreateWithoutTournamentsInputSchema),z.lazy(() => demosUncheckedCreateWithoutTournamentsInputSchema) ]),
}).strict();

export const playersUpsertWithWhereUniqueWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUpsertWithWhereUniqueWithoutTournamentsInput> = z.object({
  where: z.lazy(() => playersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => playersUpdateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedUpdateWithoutTournamentsInputSchema) ]),
  create: z.union([ z.lazy(() => playersCreateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedCreateWithoutTournamentsInputSchema) ]),
}).strict();

export const playersUpdateWithWhereUniqueWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUpdateWithWhereUniqueWithoutTournamentsInput> = z.object({
  where: z.lazy(() => playersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => playersUpdateWithoutTournamentsInputSchema),z.lazy(() => playersUncheckedUpdateWithoutTournamentsInputSchema) ]),
}).strict();

export const playersUpdateManyWithWhereWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUpdateManyWithWhereWithoutTournamentsInput> = z.object({
  where: z.lazy(() => playersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => playersUpdateManyMutationInputSchema),z.lazy(() => playersUncheckedUpdateManyWithoutPlayersInputSchema) ]),
}).strict();

export const demosUpsertWithoutTournamentsInputSchema: z.ZodType<Prisma.demosUpsertWithoutTournamentsInput> = z.object({
  update: z.union([ z.lazy(() => demosUpdateWithoutTournamentsInputSchema),z.lazy(() => demosUncheckedUpdateWithoutTournamentsInputSchema) ]),
  create: z.union([ z.lazy(() => demosCreateWithoutTournamentsInputSchema),z.lazy(() => demosUncheckedCreateWithoutTournamentsInputSchema) ]),
}).strict();

export const demosUpdateWithoutTournamentsInputSchema: z.ZodType<Prisma.demosUpdateWithoutTournamentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => sessionsUpdateOneRequiredWithoutDemosNestedInputSchema).optional(),
  items: z.lazy(() => itemsUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateWithoutTournamentsInputSchema: z.ZodType<Prisma.demosUncheckedUpdateWithoutTournamentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => itemsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const sessionsCreateWithoutUsersInputSchema: z.ZodType<Prisma.sessionsCreateWithoutUsersInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  demos: z.lazy(() => demosCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const sessionsUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.sessionsUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string(),
  inserted_at: z.string(),
  demos: z.lazy(() => demosUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const sessionsCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.sessionsCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => sessionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => sessionsCreateWithoutUsersInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const sessionsUpsertWithoutUsersInputSchema: z.ZodType<Prisma.sessionsUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => sessionsUpdateWithoutUsersInputSchema),z.lazy(() => sessionsUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => sessionsCreateWithoutUsersInputSchema),z.lazy(() => sessionsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const sessionsUpdateWithoutUsersInputSchema: z.ZodType<Prisma.sessionsUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const sessionsUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.sessionsUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const itemsCreateManyDemosInputSchema: z.ZodType<Prisma.itemsCreateManyDemosInput> = z.object({
  id: z.string(),
  inserted_at: z.string()
}).strict();

export const playersCreateManyDemosInputSchema: z.ZodType<Prisma.playersCreateManyDemosInput> = z.object({
  id: z.string(),
  color: z.string(),
  tournament_id: z.string().optional().nullable(),
  inserted_at: z.string(),
  updated_at: z.string()
}).strict();

export const slidersCreateManyDemosInputSchema: z.ZodType<Prisma.slidersCreateManyDemosInput> = z.object({
  id: z.string(),
  value: z.number().int()
}).strict();

export const tournamentsCreateManyDemosInputSchema: z.ZodType<Prisma.tournamentsCreateManyDemosInput> = z.object({
  id: z.string(),
  name: z.string(),
  inserted_at: z.string()
}).strict();

export const itemsUpdateWithoutDemosInputSchema: z.ZodType<Prisma.itemsUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const itemsUncheckedUpdateWithoutDemosInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const itemsUncheckedUpdateManyWithoutItemsInputSchema: z.ZodType<Prisma.itemsUncheckedUpdateManyWithoutItemsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const playersUpdateWithoutDemosInputSchema: z.ZodType<Prisma.playersUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournaments: z.lazy(() => tournamentsUpdateOneWithoutPlayersNestedInputSchema).optional()
}).strict();

export const playersUncheckedUpdateWithoutDemosInputSchema: z.ZodType<Prisma.playersUncheckedUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournament_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const playersUncheckedUpdateManyWithoutPlayersInputSchema: z.ZodType<Prisma.playersUncheckedUpdateManyWithoutPlayersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournament_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const slidersUpdateWithoutDemosInputSchema: z.ZodType<Prisma.slidersUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const slidersUncheckedUpdateWithoutDemosInputSchema: z.ZodType<Prisma.slidersUncheckedUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const slidersUncheckedUpdateManyWithoutSlidersInputSchema: z.ZodType<Prisma.slidersUncheckedUpdateManyWithoutSlidersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const tournamentsUpdateWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => playersUpdateManyWithoutTournamentsNestedInputSchema).optional()
}).strict();

export const tournamentsUncheckedUpdateWithoutDemosInputSchema: z.ZodType<Prisma.tournamentsUncheckedUpdateWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutTournamentsNestedInputSchema).optional()
}).strict();

export const tournamentsUncheckedUpdateManyWithoutTournamentsInputSchema: z.ZodType<Prisma.tournamentsUncheckedUpdateManyWithoutTournamentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const demosCreateManySessionsInputSchema: z.ZodType<Prisma.demosCreateManySessionsInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const usersCreateManySessionsInputSchema: z.ZodType<Prisma.usersCreateManySessionsInput> = z.object({
  id: z.string()
}).strict();

export const demosUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.demosUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => itemsUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.demosUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => itemsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  players: z.lazy(() => playersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  sliders: z.lazy(() => slidersUncheckedUpdateManyWithoutDemosNestedInputSchema).optional(),
  tournaments: z.lazy(() => tournamentsUncheckedUpdateManyWithoutDemosNestedInputSchema).optional()
}).strict();

export const demosUncheckedUpdateManyWithoutDemosInputSchema: z.ZodType<Prisma.demosUncheckedUpdateManyWithoutDemosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.usersUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const usersUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const playersCreateManyTournamentsInputSchema: z.ZodType<Prisma.playersCreateManyTournamentsInput> = z.object({
  id: z.string(),
  color: z.string(),
  demo_id: z.string(),
  inserted_at: z.string(),
  updated_at: z.string()
}).strict();

export const playersUpdateWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUpdateWithoutTournamentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demos: z.lazy(() => demosUpdateOneRequiredWithoutPlayersNestedInputSchema).optional()
}).strict();

export const playersUncheckedUpdateWithoutTournamentsInputSchema: z.ZodType<Prisma.playersUncheckedUpdateWithoutTournamentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  demo_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inserted_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const demosFindFirstArgsSchema: z.ZodType<Prisma.demosFindFirstArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereInputSchema.optional(),
  orderBy: z.union([ demosOrderByWithRelationInputSchema.array(),demosOrderByWithRelationInputSchema ]).optional(),
  cursor: demosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DemosScalarFieldEnumSchema,DemosScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const demosFindFirstOrThrowArgsSchema: z.ZodType<Prisma.demosFindFirstOrThrowArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereInputSchema.optional(),
  orderBy: z.union([ demosOrderByWithRelationInputSchema.array(),demosOrderByWithRelationInputSchema ]).optional(),
  cursor: demosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DemosScalarFieldEnumSchema,DemosScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const demosFindManyArgsSchema: z.ZodType<Prisma.demosFindManyArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereInputSchema.optional(),
  orderBy: z.union([ demosOrderByWithRelationInputSchema.array(),demosOrderByWithRelationInputSchema ]).optional(),
  cursor: demosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DemosScalarFieldEnumSchema,DemosScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const demosAggregateArgsSchema: z.ZodType<Prisma.demosAggregateArgs> = z.object({
  where: demosWhereInputSchema.optional(),
  orderBy: z.union([ demosOrderByWithRelationInputSchema.array(),demosOrderByWithRelationInputSchema ]).optional(),
  cursor: demosWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const demosGroupByArgsSchema: z.ZodType<Prisma.demosGroupByArgs> = z.object({
  where: demosWhereInputSchema.optional(),
  orderBy: z.union([ demosOrderByWithAggregationInputSchema.array(),demosOrderByWithAggregationInputSchema ]).optional(),
  by: DemosScalarFieldEnumSchema.array(),
  having: demosScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const demosFindUniqueArgsSchema: z.ZodType<Prisma.demosFindUniqueArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereUniqueInputSchema,
}).strict()

export const demosFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.demosFindUniqueOrThrowArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereUniqueInputSchema,
}).strict()

export const itemsFindFirstArgsSchema: z.ZodType<Prisma.itemsFindFirstArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithRelationInputSchema.array(),itemsOrderByWithRelationInputSchema ]).optional(),
  cursor: itemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const itemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.itemsFindFirstOrThrowArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
  where: itemsWhereInputSchema.optional(),
  orderBy: z.union([ itemsOrderByWithRelationInputSchema.array(),itemsOrderByWithRelationInputSchema ]).optional(),
  cursor: itemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const itemsFindManyArgsSchema: z.ZodType<Prisma.itemsFindManyArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
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
  include: itemsIncludeSchema.optional(),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const itemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.itemsFindUniqueOrThrowArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const playersFindFirstArgsSchema: z.ZodType<Prisma.playersFindFirstArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereInputSchema.optional(),
  orderBy: z.union([ playersOrderByWithRelationInputSchema.array(),playersOrderByWithRelationInputSchema ]).optional(),
  cursor: playersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayersScalarFieldEnumSchema,PlayersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const playersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.playersFindFirstOrThrowArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereInputSchema.optional(),
  orderBy: z.union([ playersOrderByWithRelationInputSchema.array(),playersOrderByWithRelationInputSchema ]).optional(),
  cursor: playersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayersScalarFieldEnumSchema,PlayersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const playersFindManyArgsSchema: z.ZodType<Prisma.playersFindManyArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereInputSchema.optional(),
  orderBy: z.union([ playersOrderByWithRelationInputSchema.array(),playersOrderByWithRelationInputSchema ]).optional(),
  cursor: playersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayersScalarFieldEnumSchema,PlayersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const playersAggregateArgsSchema: z.ZodType<Prisma.playersAggregateArgs> = z.object({
  where: playersWhereInputSchema.optional(),
  orderBy: z.union([ playersOrderByWithRelationInputSchema.array(),playersOrderByWithRelationInputSchema ]).optional(),
  cursor: playersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const playersGroupByArgsSchema: z.ZodType<Prisma.playersGroupByArgs> = z.object({
  where: playersWhereInputSchema.optional(),
  orderBy: z.union([ playersOrderByWithAggregationInputSchema.array(),playersOrderByWithAggregationInputSchema ]).optional(),
  by: PlayersScalarFieldEnumSchema.array(),
  having: playersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const playersFindUniqueArgsSchema: z.ZodType<Prisma.playersFindUniqueArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereUniqueInputSchema,
}).strict()

export const playersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.playersFindUniqueOrThrowArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereUniqueInputSchema,
}).strict()

export const sessionsFindFirstArgsSchema: z.ZodType<Prisma.sessionsFindFirstArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereInputSchema.optional(),
  orderBy: z.union([ sessionsOrderByWithRelationInputSchema.array(),sessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: sessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionsScalarFieldEnumSchema,SessionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const sessionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.sessionsFindFirstOrThrowArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereInputSchema.optional(),
  orderBy: z.union([ sessionsOrderByWithRelationInputSchema.array(),sessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: sessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionsScalarFieldEnumSchema,SessionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const sessionsFindManyArgsSchema: z.ZodType<Prisma.sessionsFindManyArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereInputSchema.optional(),
  orderBy: z.union([ sessionsOrderByWithRelationInputSchema.array(),sessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: sessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionsScalarFieldEnumSchema,SessionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const sessionsAggregateArgsSchema: z.ZodType<Prisma.sessionsAggregateArgs> = z.object({
  where: sessionsWhereInputSchema.optional(),
  orderBy: z.union([ sessionsOrderByWithRelationInputSchema.array(),sessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: sessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const sessionsGroupByArgsSchema: z.ZodType<Prisma.sessionsGroupByArgs> = z.object({
  where: sessionsWhereInputSchema.optional(),
  orderBy: z.union([ sessionsOrderByWithAggregationInputSchema.array(),sessionsOrderByWithAggregationInputSchema ]).optional(),
  by: SessionsScalarFieldEnumSchema.array(),
  having: sessionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const sessionsFindUniqueArgsSchema: z.ZodType<Prisma.sessionsFindUniqueArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereUniqueInputSchema,
}).strict()

export const sessionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.sessionsFindUniqueOrThrowArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereUniqueInputSchema,
}).strict()

export const slidersFindFirstArgsSchema: z.ZodType<Prisma.slidersFindFirstArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereInputSchema.optional(),
  orderBy: z.union([ slidersOrderByWithRelationInputSchema.array(),slidersOrderByWithRelationInputSchema ]).optional(),
  cursor: slidersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SlidersScalarFieldEnumSchema,SlidersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const slidersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.slidersFindFirstOrThrowArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereInputSchema.optional(),
  orderBy: z.union([ slidersOrderByWithRelationInputSchema.array(),slidersOrderByWithRelationInputSchema ]).optional(),
  cursor: slidersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SlidersScalarFieldEnumSchema,SlidersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const slidersFindManyArgsSchema: z.ZodType<Prisma.slidersFindManyArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereInputSchema.optional(),
  orderBy: z.union([ slidersOrderByWithRelationInputSchema.array(),slidersOrderByWithRelationInputSchema ]).optional(),
  cursor: slidersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SlidersScalarFieldEnumSchema,SlidersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const slidersAggregateArgsSchema: z.ZodType<Prisma.slidersAggregateArgs> = z.object({
  where: slidersWhereInputSchema.optional(),
  orderBy: z.union([ slidersOrderByWithRelationInputSchema.array(),slidersOrderByWithRelationInputSchema ]).optional(),
  cursor: slidersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const slidersGroupByArgsSchema: z.ZodType<Prisma.slidersGroupByArgs> = z.object({
  where: slidersWhereInputSchema.optional(),
  orderBy: z.union([ slidersOrderByWithAggregationInputSchema.array(),slidersOrderByWithAggregationInputSchema ]).optional(),
  by: SlidersScalarFieldEnumSchema.array(),
  having: slidersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const slidersFindUniqueArgsSchema: z.ZodType<Prisma.slidersFindUniqueArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereUniqueInputSchema,
}).strict()

export const slidersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.slidersFindUniqueOrThrowArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereUniqueInputSchema,
}).strict()

export const tournamentsFindFirstArgsSchema: z.ZodType<Prisma.tournamentsFindFirstArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereInputSchema.optional(),
  orderBy: z.union([ tournamentsOrderByWithRelationInputSchema.array(),tournamentsOrderByWithRelationInputSchema ]).optional(),
  cursor: tournamentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentsScalarFieldEnumSchema,TournamentsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const tournamentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.tournamentsFindFirstOrThrowArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereInputSchema.optional(),
  orderBy: z.union([ tournamentsOrderByWithRelationInputSchema.array(),tournamentsOrderByWithRelationInputSchema ]).optional(),
  cursor: tournamentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentsScalarFieldEnumSchema,TournamentsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const tournamentsFindManyArgsSchema: z.ZodType<Prisma.tournamentsFindManyArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereInputSchema.optional(),
  orderBy: z.union([ tournamentsOrderByWithRelationInputSchema.array(),tournamentsOrderByWithRelationInputSchema ]).optional(),
  cursor: tournamentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentsScalarFieldEnumSchema,TournamentsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const tournamentsAggregateArgsSchema: z.ZodType<Prisma.tournamentsAggregateArgs> = z.object({
  where: tournamentsWhereInputSchema.optional(),
  orderBy: z.union([ tournamentsOrderByWithRelationInputSchema.array(),tournamentsOrderByWithRelationInputSchema ]).optional(),
  cursor: tournamentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const tournamentsGroupByArgsSchema: z.ZodType<Prisma.tournamentsGroupByArgs> = z.object({
  where: tournamentsWhereInputSchema.optional(),
  orderBy: z.union([ tournamentsOrderByWithAggregationInputSchema.array(),tournamentsOrderByWithAggregationInputSchema ]).optional(),
  by: TournamentsScalarFieldEnumSchema.array(),
  having: tournamentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const tournamentsFindUniqueArgsSchema: z.ZodType<Prisma.tournamentsFindUniqueArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereUniqueInputSchema,
}).strict()

export const tournamentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.tournamentsFindUniqueOrThrowArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereUniqueInputSchema,
}).strict()

export const usersFindFirstArgsSchema: z.ZodType<Prisma.usersFindFirstArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const usersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.usersFindFirstOrThrowArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const usersFindManyArgsSchema: z.ZodType<Prisma.usersFindManyArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const usersAggregateArgsSchema: z.ZodType<Prisma.usersAggregateArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const usersGroupByArgsSchema: z.ZodType<Prisma.usersGroupByArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithAggregationInputSchema.array(),usersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: usersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const usersFindUniqueArgsSchema: z.ZodType<Prisma.usersFindUniqueArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict()

export const usersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.usersFindUniqueOrThrowArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict()

export const demosCreateArgsSchema: z.ZodType<Prisma.demosCreateArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  data: z.union([ demosCreateInputSchema,demosUncheckedCreateInputSchema ]),
}).strict()

export const demosUpsertArgsSchema: z.ZodType<Prisma.demosUpsertArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereUniqueInputSchema,
  create: z.union([ demosCreateInputSchema,demosUncheckedCreateInputSchema ]),
  update: z.union([ demosUpdateInputSchema,demosUncheckedUpdateInputSchema ]),
}).strict()

export const demosCreateManyArgsSchema: z.ZodType<Prisma.demosCreateManyArgs> = z.object({
  data: z.union([ demosCreateManyInputSchema,demosCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const demosDeleteArgsSchema: z.ZodType<Prisma.demosDeleteArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  where: demosWhereUniqueInputSchema,
}).strict()

export const demosUpdateArgsSchema: z.ZodType<Prisma.demosUpdateArgs> = z.object({
  select: demosSelectSchema.optional(),
  include: demosIncludeSchema.optional(),
  data: z.union([ demosUpdateInputSchema,demosUncheckedUpdateInputSchema ]),
  where: demosWhereUniqueInputSchema,
}).strict()

export const demosUpdateManyArgsSchema: z.ZodType<Prisma.demosUpdateManyArgs> = z.object({
  data: z.union([ demosUpdateManyMutationInputSchema,demosUncheckedUpdateManyInputSchema ]),
  where: demosWhereInputSchema.optional(),
}).strict()

export const demosDeleteManyArgsSchema: z.ZodType<Prisma.demosDeleteManyArgs> = z.object({
  where: demosWhereInputSchema.optional(),
}).strict()

export const itemsCreateArgsSchema: z.ZodType<Prisma.itemsCreateArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
  data: z.union([ itemsCreateInputSchema,itemsUncheckedCreateInputSchema ]),
}).strict()

export const itemsUpsertArgsSchema: z.ZodType<Prisma.itemsUpsertArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
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
  include: itemsIncludeSchema.optional(),
  where: itemsWhereUniqueInputSchema,
}).strict()

export const itemsUpdateArgsSchema: z.ZodType<Prisma.itemsUpdateArgs> = z.object({
  select: itemsSelectSchema.optional(),
  include: itemsIncludeSchema.optional(),
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

export const playersCreateArgsSchema: z.ZodType<Prisma.playersCreateArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  data: z.union([ playersCreateInputSchema,playersUncheckedCreateInputSchema ]),
}).strict()

export const playersUpsertArgsSchema: z.ZodType<Prisma.playersUpsertArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereUniqueInputSchema,
  create: z.union([ playersCreateInputSchema,playersUncheckedCreateInputSchema ]),
  update: z.union([ playersUpdateInputSchema,playersUncheckedUpdateInputSchema ]),
}).strict()

export const playersCreateManyArgsSchema: z.ZodType<Prisma.playersCreateManyArgs> = z.object({
  data: z.union([ playersCreateManyInputSchema,playersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const playersDeleteArgsSchema: z.ZodType<Prisma.playersDeleteArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  where: playersWhereUniqueInputSchema,
}).strict()

export const playersUpdateArgsSchema: z.ZodType<Prisma.playersUpdateArgs> = z.object({
  select: playersSelectSchema.optional(),
  include: playersIncludeSchema.optional(),
  data: z.union([ playersUpdateInputSchema,playersUncheckedUpdateInputSchema ]),
  where: playersWhereUniqueInputSchema,
}).strict()

export const playersUpdateManyArgsSchema: z.ZodType<Prisma.playersUpdateManyArgs> = z.object({
  data: z.union([ playersUpdateManyMutationInputSchema,playersUncheckedUpdateManyInputSchema ]),
  where: playersWhereInputSchema.optional(),
}).strict()

export const playersDeleteManyArgsSchema: z.ZodType<Prisma.playersDeleteManyArgs> = z.object({
  where: playersWhereInputSchema.optional(),
}).strict()

export const sessionsCreateArgsSchema: z.ZodType<Prisma.sessionsCreateArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  data: z.union([ sessionsCreateInputSchema,sessionsUncheckedCreateInputSchema ]),
}).strict()

export const sessionsUpsertArgsSchema: z.ZodType<Prisma.sessionsUpsertArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereUniqueInputSchema,
  create: z.union([ sessionsCreateInputSchema,sessionsUncheckedCreateInputSchema ]),
  update: z.union([ sessionsUpdateInputSchema,sessionsUncheckedUpdateInputSchema ]),
}).strict()

export const sessionsCreateManyArgsSchema: z.ZodType<Prisma.sessionsCreateManyArgs> = z.object({
  data: z.union([ sessionsCreateManyInputSchema,sessionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const sessionsDeleteArgsSchema: z.ZodType<Prisma.sessionsDeleteArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  where: sessionsWhereUniqueInputSchema,
}).strict()

export const sessionsUpdateArgsSchema: z.ZodType<Prisma.sessionsUpdateArgs> = z.object({
  select: sessionsSelectSchema.optional(),
  include: sessionsIncludeSchema.optional(),
  data: z.union([ sessionsUpdateInputSchema,sessionsUncheckedUpdateInputSchema ]),
  where: sessionsWhereUniqueInputSchema,
}).strict()

export const sessionsUpdateManyArgsSchema: z.ZodType<Prisma.sessionsUpdateManyArgs> = z.object({
  data: z.union([ sessionsUpdateManyMutationInputSchema,sessionsUncheckedUpdateManyInputSchema ]),
  where: sessionsWhereInputSchema.optional(),
}).strict()

export const sessionsDeleteManyArgsSchema: z.ZodType<Prisma.sessionsDeleteManyArgs> = z.object({
  where: sessionsWhereInputSchema.optional(),
}).strict()

export const slidersCreateArgsSchema: z.ZodType<Prisma.slidersCreateArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  data: z.union([ slidersCreateInputSchema,slidersUncheckedCreateInputSchema ]),
}).strict()

export const slidersUpsertArgsSchema: z.ZodType<Prisma.slidersUpsertArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereUniqueInputSchema,
  create: z.union([ slidersCreateInputSchema,slidersUncheckedCreateInputSchema ]),
  update: z.union([ slidersUpdateInputSchema,slidersUncheckedUpdateInputSchema ]),
}).strict()

export const slidersCreateManyArgsSchema: z.ZodType<Prisma.slidersCreateManyArgs> = z.object({
  data: z.union([ slidersCreateManyInputSchema,slidersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const slidersDeleteArgsSchema: z.ZodType<Prisma.slidersDeleteArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  where: slidersWhereUniqueInputSchema,
}).strict()

export const slidersUpdateArgsSchema: z.ZodType<Prisma.slidersUpdateArgs> = z.object({
  select: slidersSelectSchema.optional(),
  include: slidersIncludeSchema.optional(),
  data: z.union([ slidersUpdateInputSchema,slidersUncheckedUpdateInputSchema ]),
  where: slidersWhereUniqueInputSchema,
}).strict()

export const slidersUpdateManyArgsSchema: z.ZodType<Prisma.slidersUpdateManyArgs> = z.object({
  data: z.union([ slidersUpdateManyMutationInputSchema,slidersUncheckedUpdateManyInputSchema ]),
  where: slidersWhereInputSchema.optional(),
}).strict()

export const slidersDeleteManyArgsSchema: z.ZodType<Prisma.slidersDeleteManyArgs> = z.object({
  where: slidersWhereInputSchema.optional(),
}).strict()

export const tournamentsCreateArgsSchema: z.ZodType<Prisma.tournamentsCreateArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  data: z.union([ tournamentsCreateInputSchema,tournamentsUncheckedCreateInputSchema ]),
}).strict()

export const tournamentsUpsertArgsSchema: z.ZodType<Prisma.tournamentsUpsertArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereUniqueInputSchema,
  create: z.union([ tournamentsCreateInputSchema,tournamentsUncheckedCreateInputSchema ]),
  update: z.union([ tournamentsUpdateInputSchema,tournamentsUncheckedUpdateInputSchema ]),
}).strict()

export const tournamentsCreateManyArgsSchema: z.ZodType<Prisma.tournamentsCreateManyArgs> = z.object({
  data: z.union([ tournamentsCreateManyInputSchema,tournamentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const tournamentsDeleteArgsSchema: z.ZodType<Prisma.tournamentsDeleteArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  where: tournamentsWhereUniqueInputSchema,
}).strict()

export const tournamentsUpdateArgsSchema: z.ZodType<Prisma.tournamentsUpdateArgs> = z.object({
  select: tournamentsSelectSchema.optional(),
  include: tournamentsIncludeSchema.optional(),
  data: z.union([ tournamentsUpdateInputSchema,tournamentsUncheckedUpdateInputSchema ]),
  where: tournamentsWhereUniqueInputSchema,
}).strict()

export const tournamentsUpdateManyArgsSchema: z.ZodType<Prisma.tournamentsUpdateManyArgs> = z.object({
  data: z.union([ tournamentsUpdateManyMutationInputSchema,tournamentsUncheckedUpdateManyInputSchema ]),
  where: tournamentsWhereInputSchema.optional(),
}).strict()

export const tournamentsDeleteManyArgsSchema: z.ZodType<Prisma.tournamentsDeleteManyArgs> = z.object({
  where: tournamentsWhereInputSchema.optional(),
}).strict()

export const usersCreateArgsSchema: z.ZodType<Prisma.usersCreateArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  data: z.union([ usersCreateInputSchema,usersUncheckedCreateInputSchema ]),
}).strict()

export const usersUpsertArgsSchema: z.ZodType<Prisma.usersUpsertArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
  create: z.union([ usersCreateInputSchema,usersUncheckedCreateInputSchema ]),
  update: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
}).strict()

export const usersCreateManyArgsSchema: z.ZodType<Prisma.usersCreateManyArgs> = z.object({
  data: z.union([ usersCreateManyInputSchema,usersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const usersDeleteArgsSchema: z.ZodType<Prisma.usersDeleteArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict()

export const usersUpdateArgsSchema: z.ZodType<Prisma.usersUpdateArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  data: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
  where: usersWhereUniqueInputSchema,
}).strict()

export const usersUpdateManyArgsSchema: z.ZodType<Prisma.usersUpdateManyArgs> = z.object({
  data: z.union([ usersUpdateManyMutationInputSchema,usersUncheckedUpdateManyInputSchema ]),
  where: usersWhereInputSchema.optional(),
}).strict()

export const usersDeleteManyArgsSchema: z.ZodType<Prisma.usersDeleteManyArgs> = z.object({
  where: usersWhereInputSchema.optional(),
}).strict()

interface demosGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.demosArgs
  readonly type: Prisma.demosGetPayload<this['_A']>
}

interface itemsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.itemsArgs
  readonly type: Prisma.itemsGetPayload<this['_A']>
}

interface playersGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.playersArgs
  readonly type: Prisma.playersGetPayload<this['_A']>
}

interface sessionsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.sessionsArgs
  readonly type: Prisma.sessionsGetPayload<this['_A']>
}

interface slidersGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.slidersArgs
  readonly type: Prisma.slidersGetPayload<this['_A']>
}

interface tournamentsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.tournamentsArgs
  readonly type: Prisma.tournamentsGetPayload<this['_A']>
}

interface usersGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.usersArgs
  readonly type: Prisma.usersGetPayload<this['_A']>
}

export const tableSchemas = {
  demos: {
    fields: ["id","name","session_id"],
    relations: [
      new Relation("sessions", "session_id", "id", "sessions", "demosTosessions", "one"),
      new Relation("items", "", "", "items", "demosToitems", "many"),
      new Relation("players", "", "", "players", "demosToplayers", "many"),
      new Relation("sliders", "", "", "sliders", "demosTosliders", "many"),
      new Relation("tournaments", "", "", "tournaments", "demosTotournaments", "many"),
    ],
    modelSchema: (demosCreateInputSchema as any)
      .partial()
      .or((demosUncheckedCreateInputSchema as any).partial()),
    createSchema: demosCreateArgsSchema,
    createManySchema: demosCreateManyArgsSchema,
    findUniqueSchema: demosFindUniqueArgsSchema,
    findSchema: demosFindFirstArgsSchema,
    updateSchema: demosUpdateArgsSchema,
    updateManySchema: demosUpdateManyArgsSchema,
    upsertSchema: demosUpsertArgsSchema,
    deleteSchema: demosDeleteArgsSchema,
    deleteManySchema: demosDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof demosCreateInputSchema>,
    Prisma.demosCreateArgs['data'],
    Prisma.demosUpdateArgs['data'],
    Prisma.demosFindFirstArgs['select'],
    Prisma.demosFindFirstArgs['where'],
    Prisma.demosFindUniqueArgs['where'],
    Omit<Prisma.demosInclude, '_count'>,
    Prisma.demosFindFirstArgs['orderBy'],
    Prisma.DemosScalarFieldEnum,
    demosGetPayload
  >,
  items: {
    fields: ["id","demo_id","inserted_at"],
    relations: [
      new Relation("demos", "demo_id", "id", "demos", "demosToitems", "one"),
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
    Omit<Prisma.itemsInclude, '_count'>,
    Prisma.itemsFindFirstArgs['orderBy'],
    Prisma.ItemsScalarFieldEnum,
    itemsGetPayload
  >,
  players: {
    fields: ["id","color","demo_id","tournament_id","inserted_at","updated_at"],
    relations: [
      new Relation("tournaments", "tournament_id", "id", "tournaments", "playersTotournaments", "one"),
      new Relation("demos", "demo_id", "id", "demos", "demosToplayers", "one"),
    ],
    modelSchema: (playersCreateInputSchema as any)
      .partial()
      .or((playersUncheckedCreateInputSchema as any).partial()),
    createSchema: playersCreateArgsSchema,
    createManySchema: playersCreateManyArgsSchema,
    findUniqueSchema: playersFindUniqueArgsSchema,
    findSchema: playersFindFirstArgsSchema,
    updateSchema: playersUpdateArgsSchema,
    updateManySchema: playersUpdateManyArgsSchema,
    upsertSchema: playersUpsertArgsSchema,
    deleteSchema: playersDeleteArgsSchema,
    deleteManySchema: playersDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof playersCreateInputSchema>,
    Prisma.playersCreateArgs['data'],
    Prisma.playersUpdateArgs['data'],
    Prisma.playersFindFirstArgs['select'],
    Prisma.playersFindFirstArgs['where'],
    Prisma.playersFindUniqueArgs['where'],
    Omit<Prisma.playersInclude, '_count'>,
    Prisma.playersFindFirstArgs['orderBy'],
    Prisma.PlayersScalarFieldEnum,
    playersGetPayload
  >,
  sessions: {
    fields: ["id","inserted_at"],
    relations: [
      new Relation("demos", "", "", "demos", "demosTosessions", "many"),
      new Relation("users", "", "", "users", "sessionsTousers", "many"),
    ],
    modelSchema: (sessionsCreateInputSchema as any)
      .partial()
      .or((sessionsUncheckedCreateInputSchema as any).partial()),
    createSchema: sessionsCreateArgsSchema,
    createManySchema: sessionsCreateManyArgsSchema,
    findUniqueSchema: sessionsFindUniqueArgsSchema,
    findSchema: sessionsFindFirstArgsSchema,
    updateSchema: sessionsUpdateArgsSchema,
    updateManySchema: sessionsUpdateManyArgsSchema,
    upsertSchema: sessionsUpsertArgsSchema,
    deleteSchema: sessionsDeleteArgsSchema,
    deleteManySchema: sessionsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof sessionsCreateInputSchema>,
    Prisma.sessionsCreateArgs['data'],
    Prisma.sessionsUpdateArgs['data'],
    Prisma.sessionsFindFirstArgs['select'],
    Prisma.sessionsFindFirstArgs['where'],
    Prisma.sessionsFindUniqueArgs['where'],
    Omit<Prisma.sessionsInclude, '_count'>,
    Prisma.sessionsFindFirstArgs['orderBy'],
    Prisma.SessionsScalarFieldEnum,
    sessionsGetPayload
  >,
  sliders: {
    fields: ["id","value","demo_id"],
    relations: [
      new Relation("demos", "demo_id", "id", "demos", "demosTosliders", "one"),
    ],
    modelSchema: (slidersCreateInputSchema as any)
      .partial()
      .or((slidersUncheckedCreateInputSchema as any).partial()),
    createSchema: slidersCreateArgsSchema,
    createManySchema: slidersCreateManyArgsSchema,
    findUniqueSchema: slidersFindUniqueArgsSchema,
    findSchema: slidersFindFirstArgsSchema,
    updateSchema: slidersUpdateArgsSchema,
    updateManySchema: slidersUpdateManyArgsSchema,
    upsertSchema: slidersUpsertArgsSchema,
    deleteSchema: slidersDeleteArgsSchema,
    deleteManySchema: slidersDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof slidersCreateInputSchema>,
    Prisma.slidersCreateArgs['data'],
    Prisma.slidersUpdateArgs['data'],
    Prisma.slidersFindFirstArgs['select'],
    Prisma.slidersFindFirstArgs['where'],
    Prisma.slidersFindUniqueArgs['where'],
    Omit<Prisma.slidersInclude, '_count'>,
    Prisma.slidersFindFirstArgs['orderBy'],
    Prisma.SlidersScalarFieldEnum,
    slidersGetPayload
  >,
  tournaments: {
    fields: ["id","name","demo_id","inserted_at"],
    relations: [
      new Relation("players", "", "", "players", "playersTotournaments", "many"),
      new Relation("demos", "demo_id", "id", "demos", "demosTotournaments", "one"),
    ],
    modelSchema: (tournamentsCreateInputSchema as any)
      .partial()
      .or((tournamentsUncheckedCreateInputSchema as any).partial()),
    createSchema: tournamentsCreateArgsSchema,
    createManySchema: tournamentsCreateManyArgsSchema,
    findUniqueSchema: tournamentsFindUniqueArgsSchema,
    findSchema: tournamentsFindFirstArgsSchema,
    updateSchema: tournamentsUpdateArgsSchema,
    updateManySchema: tournamentsUpdateManyArgsSchema,
    upsertSchema: tournamentsUpsertArgsSchema,
    deleteSchema: tournamentsDeleteArgsSchema,
    deleteManySchema: tournamentsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof tournamentsCreateInputSchema>,
    Prisma.tournamentsCreateArgs['data'],
    Prisma.tournamentsUpdateArgs['data'],
    Prisma.tournamentsFindFirstArgs['select'],
    Prisma.tournamentsFindFirstArgs['where'],
    Prisma.tournamentsFindUniqueArgs['where'],
    Omit<Prisma.tournamentsInclude, '_count'>,
    Prisma.tournamentsFindFirstArgs['orderBy'],
    Prisma.TournamentsScalarFieldEnum,
    tournamentsGetPayload
  >,
  users: {
    fields: ["id","session_id"],
    relations: [
      new Relation("sessions", "session_id", "id", "sessions", "sessionsTousers", "one"),
    ],
    modelSchema: (usersCreateInputSchema as any)
      .partial()
      .or((usersUncheckedCreateInputSchema as any).partial()),
    createSchema: usersCreateArgsSchema,
    createManySchema: usersCreateManyArgsSchema,
    findUniqueSchema: usersFindUniqueArgsSchema,
    findSchema: usersFindFirstArgsSchema,
    updateSchema: usersUpdateArgsSchema,
    updateManySchema: usersUpdateManyArgsSchema,
    upsertSchema: usersUpsertArgsSchema,
    deleteSchema: usersDeleteArgsSchema,
    deleteManySchema: usersDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof usersCreateInputSchema>,
    Prisma.usersCreateArgs['data'],
    Prisma.usersUpdateArgs['data'],
    Prisma.usersFindFirstArgs['select'],
    Prisma.usersFindFirstArgs['where'],
    Prisma.usersFindUniqueArgs['where'],
    Omit<Prisma.usersInclude, '_count'>,
    Prisma.usersFindFirstArgs['orderBy'],
    Prisma.UsersScalarFieldEnum,
    usersGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
