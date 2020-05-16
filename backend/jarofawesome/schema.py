import graphene

#from categories.schema import Query as CategoryQuery, Mutation as CategoryMutation
from memories.schema import Query as MemoryQuery, Mutation as MemoryMutation
from accounts.schema import Query as UserQuery, Mutation as UserMutation

class Query(
    MemoryQuery,
    UserQuery,
    graphene.ObjectType):
    pass

class Mutation(
    UserMutation,
    MemoryMutation,
    graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)