import graphene

#from categories.schema import Query as CategoryQuery, Mutation as CategoryMutation
from memories.schema import Query as MemoryQuery
from accounts.schema import Query as UserQuery, Mutation as UserMutation

class Query(
    MemoryQuery,
    UserQuery,
    graphene.ObjectType):
    pass

class Mutation(
    UserMutation,
    graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)