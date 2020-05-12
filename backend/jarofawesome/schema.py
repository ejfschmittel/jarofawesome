import graphene

#from categories.schema import Query as CategoryQuery, Mutation as CategoryMutation
from memories.schema import Query as MemoryQuery

class Query(
    MemoryQuery,
    graphene.ObjectType):
    pass

class Mutation(
    graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)