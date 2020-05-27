import graphene
from .mutations import CreateMemory,UpdateMemory, CreateMemoryMedia, DeleteMemoryMedia
from .queries import MemoryFileQuery, MemoryQuery

class Query(MemoryFileQuery, MemoryQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    create_memory = CreateMemory.Field()
    update_memory = UpdateMemory.Field()

    create_memory_file = CreateMemoryMedia.Field()
    delete_memory_file = DeleteMemoryMedia.Field()